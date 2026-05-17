import { useState, useMemo, useCallback } from "react";
import { useFinance } from "@/contexts/FinanceContext";
import usePace from "@/hooks/UsePace";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PERIOD_RANGES = {
  este_mes: () => {
    const now = new Date();
    return {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59),
    };
  },
  mes_passado: () => {
    const now = new Date();
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      end: new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59),
    };
  },
  ultimos_3_meses: () => {
    const now = new Date();
    return {
      start: new Date(now.getFullYear(), now.getMonth() - 2, 1),
      end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59),
    };
  },
  este_ano: () => {
    const now = new Date();
    return {
      start: new Date(now.getFullYear(), 0, 1),
      end: new Date(now.getFullYear(), 11, 31, 23, 59, 59),
    };
  },
};

/** Suporta ISO (2025-04-27) e formato BR (27/04/2025 14:32) */
function parseDate(dataStr) {
  // DD/MM/YYYY ou DD/MM/YYYY HH:mm
  if (/^\d{2}\/\d{2}\/\d{4}/.test(dataStr)) {
    const [datePart] = dataStr.split(" ");
    const [day, month, year] = datePart.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  return new Date(dataStr);
}

function isInPeriod(dataStr, periodo) {
  const date = parseDate(dataStr);
  const { start, end } = PERIOD_RANGES[periodo]();
  return date >= start && date <= end;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const useTransactions = ({ perPageDefault = 8 } = {}) => {
  const { transacoes } = useFinance();

  // Pace data (mesmos hooks de antes, centralizados aqui)
  const dadosGastos = usePace("gasto");
  const dadosGanhos = usePace("ganho");
  const ultimoGasto = dadosGastos.at(-1) ?? { atual: 0, passado: 0 };
  const ultimoGanho = dadosGanhos.at(-1) ?? { atual: 0, passado: 0 };

  // ── Filter state ────────────────────────────────────────────────────────────
  const [search, setSearchRaw] = useState("");
  const [tipo, setTipoRaw] = useState("todos");
  const [categoria, setCategoriaRaw] = useState("Todas");
  const [periodo, setPeriodoRaw] = useState("este_mes");
  const [page, setPageRaw] = useState(1);
  const [perPage, setPerPageRaw] = useState(perPageDefault);

  // Qualquer mudança de filtro reseta para a página 1
  const setSearch = useCallback((v) => { setSearchRaw(v); setPageRaw(1); }, []);
  const setTipo = useCallback((v) => { setTipoRaw(v); setPageRaw(1); }, []);
  const setCategoria = useCallback((v) => { setCategoriaRaw(v); setPageRaw(1); }, []);
  const setPeriodo = useCallback((v) => { setPeriodoRaw(v); setPageRaw(1); }, []);
  const setPerPage = useCallback((v) => { setPerPageRaw(v); setPageRaw(1); }, []);

  // ── Derived: categorias disponíveis ─────────────────────────────────────────
  const categorias = useMemo(() => {
    const cats = new Set(
      transacoes
        .map((t) => {
          if (!t.categoria) return null;
          return typeof t.categoria === "string" ? t.categoria : t.categoria.nome;
        })
        .filter(Boolean),
    );

    return ["Todas", ...Array.from(cats).sort()];
  }, [transacoes]);

  // ── Derived: transações filtradas ────────────────────────────────────────────
  const transacoesFiltradas = useMemo(() => {
    const term = search.toLowerCase().trim();
    const normalize = (s = "") =>
      String(s)
        .normalize ? String(s).normalize("NFD").replace(/[\u0000-\u036f]/g, "").toLowerCase() : String(s).toLowerCase();

    return transacoes.filter((t) => {
      const desc = (t.description || "").toLowerCase();
      const catName = typeof t.categoria === "string" ? t.categoria : t.categoria?.nome || "";
      const forma = (t.formaPagamento || t.forma_pagamento || "").toLowerCase();

      const matchSearch = !term || desc.includes(term) || catName.toLowerCase().includes(term) || forma.includes(term);

      let matchTipo = true;
      if (tipo !== "todos") {
        if (tipo === "entrada") {
          matchTipo = Number(t.amount) > 0;
        } else if (tipo === "saida" || tipo === "saída") {
          matchTipo = Number(t.amount) < 0;
        } else {
          matchTipo = normalize(t.type || t.tipo || "") === tipo;
        }
      }

      const matchCategoria = (() => {
        if (!categoria) return true;
        const catNorm = String(categoria).toLowerCase();
        if (catNorm === "todas" || catNorm === "todos") return true;
        return String(catName || "").toLowerCase() === catNorm;
      })();

      const matchPeriodo = isInPeriod(t.date, periodo);

      return matchSearch && matchTipo && matchCategoria && matchPeriodo;
    });
  }, [transacoes, search, tipo, categoria, periodo]);

  // ── Derived: paginação ───────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(transacoesFiltradas.length / perPage));
  const safePage = Math.min(page, totalPages);
  const from = transacoesFiltradas.length === 0 ? 0 : (safePage - 1) * perPage + 1;
  const to = Math.min(safePage * perPage, transacoesFiltradas.length);

  const transacoesPaginadas = useMemo(() => {
    const start = (safePage - 1) * perPage;
    return transacoesFiltradas.slice(start, start + perPage);
  }, [transacoesFiltradas, safePage, perPage]);

  // ── Derived: métricas dos cards ──────────────────────────────────────────────
  const saldoAtual = ultimoGanho.atual - ultimoGasto.atual;
  const saldoPassado = ultimoGanho.passado - ultimoGasto.passado;

  const entradasCount = useMemo(
    () => transacoesFiltradas.filter((t) => Number(t.amount) > 0).length,
    [transacoesFiltradas],
  );

  const saidasCount = useMemo(
    () => transacoesFiltradas.filter((t) => Number(t.amount) < 0).length,
    [transacoesFiltradas],
  );

  // Ticket médio: média simples sobre todas as transações do período
  const ticketMedioAtual =
    transacoesFiltradas.length > 0
      ? (ultimoGanho.atual + ultimoGasto.atual) / transacoesFiltradas.length
      : 0;
  const ticketMedioPassado =
    transacoesFiltradas.length > 0
      ? (ultimoGanho.passado + ultimoGasto.passado) / transacoesFiltradas.length
      : 0;

  const metrics = {
    entradas: {
      valor: ultimoGanho.atual,
      passado: ultimoGanho.passado,
      count: entradasCount,
    },
    saidas: {
      valor: ultimoGasto.atual,
      passado: ultimoGasto.passado,
      count: saidasCount,
    },
    saldo: {
      valor: saldoAtual,
      passado: saldoPassado,
      count: transacoesFiltradas.length,
    },
    ticketMedio: {
      valor: ticketMedioAtual,
      passado: ticketMedioPassado,
      count: transacoesFiltradas.length,
    },
  };

  // ── Return ───────────────────────────────────────────────────────────────────
  return {
    // Cards
    metrics,

    // Tabela
    transacoes: transacoesPaginadas,
    transacoesFiltradas,

    // Filtros (leitura + escrita)
    filters: { search, tipo, categoria, periodo },
    setSearch,
    setTipo,
    setCategoria,
    setPeriodo,

    // Opções disponíveis para selects
    categorias,

    // Paginação
    pagination: {
      page: safePage,
      perPage,
      total: transacoesFiltradas.length,
      totalPages,
      from,
      to,
    },
    setPage: setPageRaw,
    setPerPage,
  };
};

export default useTransactions;