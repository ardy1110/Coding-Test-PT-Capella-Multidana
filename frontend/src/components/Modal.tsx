import type { Pengajuan } from "../hooks/useTabelPengajuan";
import { formatRupiah } from "../utils/format";

export function DetailModal({ data, onClose }: { data: Pengajuan; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 shadow-xl">
        <div className="mb-5 flex items-center gap-2.5">
          <div className="h-5 w-1 rounded-full bg-black" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">Detail Pengajuan</p>
            <h3 className="text-lg font-bold text-black">{data.namaLengkap}</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Tipe', value: data.tipePengajuan },
            { label: 'Tenor', value: `${data.tenor} Bulan` },
            { label: 'Pendapatan', value: formatRupiah(data.pendapatanBulanan) },
            { label: 'Nominal', value: formatRupiah(data.nominalPengajuan) },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">{label}</p>
              <p className="text-sm font-semibold text-black font-mono">{value}</p>
            </div>
          ))}
        </div>

        <div className="mb-4 rounded-xl p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Tagihan per Bulan</p>
          <p className="text-2xl font-black font-mono">{formatRupiah(data.tagihan)}</p>
        </div>

        {data.catatan && (
          <div className="mb-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Catatan</p>
            <p className="text-sm text-gray-700">{data.catatan}</p>
          </div>
        )}

        <button onClick={onClose} className="w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-white bg-yellow-400 hover:bg-yellow-500 transition cursor-pointer">
          Tutup
        </button>
      </div>
    </div>
  );
}

export function ConfirmModal({ action, onClose, onConfirm }: { action: 'APPROVED' | 'REJECTED'; onClose: () => void; onConfirm: () => void }) {
  const isApproved = action === 'APPROVED';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-7 shadow-xl text-center">
        <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold ${isApproved ? 'bg-yellow-400 text-white' : 'bg-red-500 text-white'}`}>
          {isApproved ? '✓' : '✕'}
        </div>
        <h3 className="text-lg font-black text-black mb-2">{isApproved ? 'Setujui Pengajuan?' : 'Tolak Pengajuan?'}</h3>
        <p className="text-sm text-gray-400 mb-6">Tindakan ini tidak dapat dibatalkan setelah dikonfirmasi.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition cursor-pointer">
            Batal
          </button>
          <button onClick={onConfirm} className={`flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition cursor-pointer ${isApproved ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-red-500 hover:bg-red-600'}`}>
            Ya, Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}