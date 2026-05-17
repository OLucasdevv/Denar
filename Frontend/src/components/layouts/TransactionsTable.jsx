import {
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Home,
  CreditCard,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PixIcon } from "../ui/PixIcon";

// ─── Maps ─────────────────────────────────────────────────────────────────────

const CATEGORIA_DOT = {
  Salário:     "bg-green-500",
  Transporte:  "bg-yellow-500",
  Alimentação: "bg-orange-400",
  Freelance:   "bg-emerald-400",
  Moradia:     "bg-blue-500",
  Venda:       "bg-green-400",
  Saúde:       "bg-blue-400",
  Pessoas:     "bg-purple-400",
  Financeiro:  "bg-cyan-400",
  Educação:    "bg-indigo-400",
};

// ─── Pagamento icon matcher ───────────────────────────────────────────────────

const PAGAMENTO_RULES = [
  { keywords: ["pix"],                                         icon: PixIcon   },
  { keywords: ["automático", "automatico", "auto debit"],      icon: RefreshCw  },
  { keywords: ["crédito", "credito", "credit"],                icon: CreditCard },
  { keywords: ["débito", "debito", "debit"],                   icon: CreditCard },
  { keywords: ["transferência", "transferencia", "ted", "doc"], icon: Home      },
];

const normalize = (str = "") =>
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function getPagamentoIcon(pagamento = "") {
  const norm = normalize(pagamento);
  for (const rule of PAGAMENTO_RULES) {
    if (rule.keywords.some((kw) => norm.includes(normalize(kw)))) {
      return rule.icon;
    }
  }
  return CreditCard;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr = "") {
  const [datePart, timePart = ""] = String(dateStr).split(" ");
  return { date: datePart, time: timePart };
}

function formatValue(amount) {
  return Math.abs(Number(amount)).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function buildPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4)         return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

// ─── Component ────────────────────────────────────────────────────────────────

const TransactionsTable = ({
  transacoes = [],
  pagination = {},
  setPage,
  setPerPage,
}) => {
  const {
    page       = 1,
    perPage    = 8,
    total      = 0,
    totalPages = 1,
    from       = 0,
    to         = 0,
  } = pagination;

  const pages = buildPages(page, totalPages);

  return (
    <div className="shadow-neu-badge rounded-lg">
      <div className="rounded-lg overflow-hidden">
        <table className="w-full">

          {/* ── Head ── */}
          <thead className="border-b border-border">
            <tr className="h-12 text-xs text-zinc-500 uppercase tracking-wide">
              <th className="text-left px-4 font-medium w-36">
                <span className="flex items-center gap-1">Data <ChevronDown size={12} /></span>
              </th>
              <th className="text-left px-4 font-medium">Descrição</th>
              <th className="text-left px-4 font-medium w-40">Categoria</th>
              <th className="text-left px-4 font-medium w-32">Tipo</th>
              <th className="text-right px-4 font-medium w-36">Valor</th>
              <th className="text-left px-6 font-medium w-52">Forma de pagamento</th>
              <th className="text-right px-4 font-medium w-16">Ações</th>
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody>
            {transacoes.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-20 text-center text-sm text-zinc-500">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            ) : (
              transacoes.map((t) => {
                const amount    = Number(t.amount);
                const isEntrada = amount >= 0;
                const catName   = typeof t.categoria === "string"
                                    ? t.categoria
                                    : (t.categoria?.nome ?? "—");
                const dotColor  = CATEGORIA_DOT[catName] ?? "bg-zinc-600";
                const { date, time } = formatDate(t.date);
                const pagamento = t.type ?? t.forma_pagamento ?? t.pagamento;
                const PagIcon   = getPagamentoIcon(pagamento);

                return (
                  <tr
                    key={t.id}
                    className="border-b border-border last:border-0 hover:bg-sidebar transition-colors"
                  >
                    {/* Data */}
                    <td className="px-4 py-4">
                      <span className="block text-sm leading-snug">{date}</span>
                      {time && (
                        <span className="block text-xs text-zinc-500 mt-0.5">{time}</span>
                      )}
                    </td>

                    {/* Descrição */}
                    <td className="px-4 py-4 text-sm max-w-xs truncate">
                      {t.description ?? "—"}
                    </td>

                    {/* Categoria */}
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-2 text-sm">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                        {catName}
                      </span>
                    </td>

                    {/* Tipo */}
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1.5 text-sm">
                        {isEntrada
                          ? <ArrowUp   size={14} className="text-green" />
                          : <ArrowDown size={14} className="text-red"   />
                        }
                        <span className={isEntrada ? "text-green" : "text-red"}>
                          {isEntrada ? "Entrada" : "Saída"}
                        </span>
                      </span>
                    </td>

                    {/* Valor */}
                    <td className={`
                      px-4 py-4 text-sm font-semibold text-right tabular-nums
                      ${isEntrada ? "text-green" : "text-red"}
                    `}>
                      {!isEntrada && "- "}
                      {formatValue(amount)}
                    </td>

                    {/* Forma de pagamento */}
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-sm text-zinc-400">
                        <PagIcon size={14} className="text-zinc-500 shrink-0" />
                        {pagamento ?? "—"}
                      </span>
                    </td>

                    {/* Ações */}
                    <td className="px-4 py-4 text-right">
                      <button className="p-1.5 rounded hover:bg-zinc-800 transition text-zinc-500 hover:text-zinc-200">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* ── Footer / Paginação ── */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">

          {/* Contador */}
          <span className="text-xs text-zinc-500">
            {total === 0
              ? "Nenhuma transação"
              : `Mostrando ${from} a ${to} de ${total} transações`}
          </span>

          {/* Páginas */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage?.(page - 1)}
              disabled={page <= 1}
              className="p-1.5 rounded border border-border hover:border-zinc-600 disabled:opacity-25 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={13} />
            </button>

            {pages.map((p, i) =>
              p === "..." ? (
                <span key={`el-${i}`} className="w-8 text-center text-sm text-zinc-500">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage?.(Number(p))}
                  className={`
                    w-8 h-8 text-sm rounded border transition font-medium
                    ${p === page
                      ? "bg-primary border-primary text-white"
                      : "border-border hover:border-zinc-600 text-zinc-400 hover:text-zinc-200"
                    }
                  `}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => setPage?.(page + 1)}
              disabled={page >= totalPages}
              className="p-1.5 rounded border border-border hover:border-blue-600 disabled:opacity-25 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Por página */}
          <div className="relative">
            <select
              value={perPage}
              onChange={(e) => setPerPage?.(Number(e.target.value))}
              className="h-8 pl-3 pr-7 border border-border rounded-sm bg-sidebar text-sm appearance-none outline-none focus:border-zinc-600 transition text-zinc-300 cursor-pointer"
            >
              {[8, 16, 24, 50].map((n) => (
                <option key={n} value={n}>{n} por página</option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;