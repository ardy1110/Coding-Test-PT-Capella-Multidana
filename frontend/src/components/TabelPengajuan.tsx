// TabelPengajuan.tsx
import { useDaftarPengajuan } from "../hooks/useTabelPengajuan";
import { formatRupiah } from "../utils/format";
import { ConfirmModal, DetailModal } from "./Modal";

const STATUS_STYLE: Record<string, string> = {
  APPROVED: "bg-green-400 text-white",
  PENDING: "bg-yellow-400 text-white",
  REJECTED: "bg-red-500 text-white",
};

const STATUS_LABEL: Record<string, string> = {
  APPROVED: "Approved",
  PENDING: "Pending",
  REJECTED: "Rejected",
};

export default function TabelPengajuan({
  refreshTrigger,
}: {
  refreshTrigger: number;
}) {
  const {
    data,
    isLoading,
    filterStatus,
    setFilterStatus,
    detailModal,
    setDetailModal,
    confirmModal,
    setConfirmModal,
    fetchData,
    handleUpdateStatus,
    counts,
    filtered,
  } = useDaftarPengajuan(refreshTrigger);

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-7 pt-7 pb-5 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-1 rounded-full bg-yellow-400" />
            <div>
              <h2 className="text-lg font-bold text-yellow-400 tracking-tight">
                Daftar Pengajuan
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">
                {data.length} total entri
              </p>
            </div>
          </div>
          <button
            onClick={fetchData}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 hover:text-black transition cursor-pointer"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
          {(["APPROVED", "PENDING", "REJECTED"] as const).map((s) => (
            <div key={s} className="px-6 py-4 text-center">
              <p className="text-2xl font-black text-black">{counts[s]}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mt-0.5">
                {STATUS_LABEL[s]}
              </p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="px-7 pt-4 pb-2 flex gap-1">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                filterStatus === s
                  ? "bg-yellow-400 text-white"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
              }`}
            >
              {s === "ALL"
                ? `Semua (${counts.ALL})`
                : `${STATUS_LABEL[s]} (${counts[s]})`}
            </button>
          ))}
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-300">
            <svg
              className="animate-spin h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            <span className="text-sm">Memuat data...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-gray-100 bg-gray-50">
                  {[
                    "Nama",
                    "Tipe",
                    "Nominal",
                    "Tenor",
                    "Tagihan/Bln",
                    "Status",
                    "Aksi",
                  ].map((h, i) => (
                    <th
                      key={h}
                      className={`px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gray-700 
   ${i === 6 ? "text-center w-55" : "text-left"}
    ${i === 0 ? "pl-7" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-gray-50 transition"
                  >
                    <td className="pl-7 pr-4 py-3.5 font-semibold text-black whitespace-nowrap">
                      {item.namaLengkap}
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap">
                      {item.tipePengajuan}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-gray-700 whitespace-nowrap">
                      {formatRupiah(item.nominalPengajuan)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="rounded-md border border-gray-200 px-2 py-0.5 font-mono text-xs text-gray-500">
                        {item.tenor} bln
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-semibold text-black whitespace-nowrap">
                      {formatRupiah(item.tagihan)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[item.status] || "bg-gray-100 text-gray-500"}`}
                      >
                        {STATUS_LABEL[item.status] || item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 pr-7 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status === "PENDING" && (
                          <>
                            <button
                              onClick={() =>
                                setConfirmModal({
                                  id: item.id,
                                  action: "APPROVED",
                                })
                              }
                              className="rounded-lg px-2.5 py-1 text-xs font-bold text-gray-600 border border-gray-200 hover:bg-green-400 hover:text-white transition cursor-pointer"
                            >
                              Setujui
                            </button>
                            <button
                              onClick={() =>
                                setConfirmModal({
                                  id: item.id,
                                  action: "REJECTED",
                                })
                              }
                              className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-white hover:bg-red-500 transition cursor-pointer"
                            >
                              Tolak
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setDetailModal(item)}
                          className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:border-black hover:text-black transition cursor-pointer"
                        >
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="py-12 text-center text-sm text-gray-300">
                Tidak ada data pengajuan.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Render Modals */}
      {detailModal && (
        <DetailModal data={detailModal} onClose={() => setDetailModal(null)} />
      )}
      {confirmModal && (
        <ConfirmModal
          action={confirmModal.action}
          onClose={() => setConfirmModal(null)}
          onConfirm={handleUpdateStatus}
        />
      )}
    </>
  );
}
