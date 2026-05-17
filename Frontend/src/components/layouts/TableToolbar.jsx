import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Download, FileText, File } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const TableToolBar = ({
  filters,
  categorias,
  setSearch,
  setTipo,
  setCategoria,
  setPeriodo,
  transacoesFiltradas = [],
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

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

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function dateToYMD(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function formatBR(d) {
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  }

  function getRangeForPeriodo(periodo) {
    const fn = PERIOD_RANGES[periodo] || PERIOD_RANGES.este_mes;
    return fn();
  }

  const exportCSV = () => {
    const rows = transacoesFiltradas.map((t) => ({
      data: t.date,
      descricao: t.description || t.nome || "",
      categoria: typeof t.categoria === "string" ? t.categoria : t.categoria?.nome || "",
      valor: t.amount ?? t.value ?? "",
      forma_pagamento: t.formaPagamento || t.forma_pagamento || "",
    }));

    const header = ["data","descricao","categoria","valor","forma_pagamento"];
    const csv = [header.join(","), ...rows.map(r => {
      return [r.data, r.descricao, r.categoria, r.valor, r.forma_pagamento]
        .map(v => typeof v === 'string' && (v.includes(',') || v.includes('\n') || v.includes('"')) ? '"'+v.replace(/"/g,'""')+'"' : v)
        .join(",");
    })].join("\n");

    const periodoRange = getRangeForPeriodo(filters.periodo || 'este_mes');
    const filename = `transacoes_${filters.periodo || 'periodo'}_${dateToYMD(periodoRange.start)}_to_${dateToYMD(periodoRange.end)}.csv`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setMenuOpen(false);
  };

  const exportPDF = async () => {
    try {
      const periodoRange = getRangeForPeriodo(filters.periodo || 'este_mes');
      const title = `Transações - ${filters.periodo || 'Período'}`;

      const rowsHtml = transacoesFiltradas
        .map((t) => {
          const desc = (t.description || t.nome || "").toString().replace(/</g, "&lt;");
          const cat = typeof t.categoria === "string" ? t.categoria : t.categoria?.nome || "";
          const val = t.amount ?? t.value ?? "";
          const forma = t.formaPagamento || t.forma_pagamento || "";
          return `
            <tr>
              <td style="border:1px solid #ddd;padding:8px">${t.date}</td>
              <td style="border:1px solid #ddd;padding:8px">${desc}</td>
              <td style="border:1px solid #ddd;padding:8px">${cat}</td>
              <td style="border:1px solid #ddd;padding:8px">${val}</td>
              <td style="border:1px solid #ddd;padding:8px">${forma}</td>
            </tr>`;
        })
        .join("\n");

      const html = `
        <div style="font-family: Arial, Helvetica, sans-serif; color:#111; padding:12px; background:white; width:1000px">
          <h1 style="font-size:18px;margin:0 0 8px 0">${title}</h1>
          <div style="margin-bottom:12px">Período: ${formatBR(periodoRange.start)} — ${formatBR(periodoRange.end)}</div>
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr>
                <th style="border:1px solid #ddd;padding:8px;background:#f5f5f5">Data</th>
                <th style="border:1px solid #ddd;padding:8px;background:#f5f5f5">Descrição</th>
                <th style="border:1px solid #ddd;padding:8px;background:#f5f5f5">Categoria</th>
                <th style="border:1px solid #ddd;padding:8px;background:#f5f5f5">Valor</th>
                <th style="border:1px solid #ddd;padding:8px;background:#f5f5f5">Forma</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      `;

      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.innerHTML = html;
      document.body.appendChild(container);

      const canvas = await html2canvas(container, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const pxPerMm = canvas.width / pdfWidth;
      const pageHeightPx = Math.floor(pdfHeight * pxPerMm);

      let offsetY = 0;
      while (offsetY < canvas.height) {
        const fragmentCanvas = document.createElement("canvas");
        fragmentCanvas.width = canvas.width;
        const fragHeight = Math.min(pageHeightPx, canvas.height - offsetY);
        fragmentCanvas.height = fragHeight;
        const ctx = fragmentCanvas.getContext("2d");
        ctx.drawImage(canvas, 0, offsetY, canvas.width, fragHeight, 0, 0, canvas.width, fragHeight);
        const fragmentData = fragmentCanvas.toDataURL("image/png");

        const props = pdf.getImageProperties(fragmentData);
        const fragmentHeightMm = (props.height * pdfWidth) / props.width;

        if (offsetY > 0) pdf.addPage();
        pdf.addImage(fragmentData, "PNG", 0, 0, pdfWidth, fragmentHeightMm);

        offsetY += fragHeight;
      }

      const periodoLabel = `${dateToYMD(periodoRange.start)}_to_${dateToYMD(periodoRange.end)}`;
      pdf.save(`transacoes_${filters.periodo || 'periodo'}_${periodoLabel}.pdf`);

      container.remove();
      setMenuOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar PDF: " + (err && err.message ? err.message : err));
      setMenuOpen(false);
    }
  };
  return (
    <div className="flex gap-3 h-full p-5 rounded-lg shadow-neu-badge justify-between">
      <div className="flex gap-5">
        <div className="relative w-full max-w-md">
          <input
            placeholder="Buscar transações..."
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              appearance-none
              w-full
              h-10
              rounded-sm
              border
              border-border
              bg-sidebar
              pl-4
              pr-10
              text-sm
              cursor-pointer
              outline-none
              transition
              focus:border-zinc-700
            "
          />

          <Search
            size={18}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />
        </div>

        <div className="relative">
          <select
            value={filters.tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-40 h-10 pl-4 border border-border rounded-sm bg-sidebar outline-none transition focus:border-zinc-700 cursor-pointer text-sm appearance-none"
          >
            <option value="todos">Todos</option>
            <option value="entrada">Entrada</option>
            <option value="saida"> Saída</option>
          </select>

          <ChevronDown
            size={18}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />
        </div>

        <div className="relative">
          <select
            value={filters.categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-48 h-10 pl-4 border border-border rounded-sm bg-sidebar outline-none transition focus:border-zinc-700 cursor-pointer text-sm appearance-none"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />
        </div>

        <div className="relative">
          <select
            value={filters.periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="w-48 h-10 pl-4 border border-border rounded-sm bg-sidebar outline-none transition focus:border-zinc-700 cursor-pointer text-sm appearance-none"
          >
            <option value="este_mes">Este mês</option>
            <option value="mes_passado">Mês passado</option>
            <option value="ultimos_3_meses">Últimos 3 meses</option>
            <option value="este_ano">Este ano</option>
          </select>

          <ChevronDown
            size={18}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />
        </div>
      </div>

      <div className="flex items-center relative">
        <button
          onClick={() => setMenuOpen((s) => !s)}
          className="
            flex
            items-center
            gap-2
            h-10
            px-4
            rounded-sm
            border
            border-border
            bg-sidebar
            text-sm
            transition
            hover:border-zinc-700
          "
        >
          <Download size={16} className="text-foreground" />

          <span>Exportar</span>

          <ChevronDown size={16} className="text-foreground" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-sidebar border border-border rounded shadow-lg z-50">
            <button onClick={exportCSV} className="w-full text-left px-3 py-2 hover:bg-zinc-100 flex items-center gap-2">
              <FileText size={16} />
              <span>Exportar CSV</span>
            </button>
            <button onClick={exportPDF} className="w-full text-left px-3 py-2 hover:bg-zinc-100 flex items-center gap-2">
              <File size={16} />
              <span>Exportar PDF</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableToolBar; 