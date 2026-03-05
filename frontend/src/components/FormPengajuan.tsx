import { usePengajuan } from '../hooks/usePengajuan'
import { formatRupiah } from '../utils/format'

const FormGroup = ({ label, children, optional }: { label: string, children: React.ReactNode, optional?: boolean }) => (
  <div>
    <label className="block text-xs font-semibold uppercase tracking-widest text-gray-600 mb-1.5">
      {label} {optional && <span className="normal-case text-gray-300">(Opsional)</span>}
    </label>
    {children}
  </div>
)

export default function FormPengajuan({ onPengajuanSukses }: { onPengajuanSukses: () => void }) {
  const {
    formData,
    isLoading,
    tagihanPreview,
    handleChange,
    handleNominalChange,
    handlePendapatanChange,
    handleSubmit,
  } = usePengajuan(onPengajuanSukses)

  const inputClass = 'w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-black placeholder-gray-300 outline-none transition focus:border-black focus:ring-2 focus:ring-black/5'

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
      <div className="mb-6 flex items-center gap-2.5">
        <div className="h-5 w-1 rounded-full bg-yellow-400" />
        <h2 className="text-lg font-bold text-yellow-400 tracking-tight">Form Pengajuan Kredit</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup label="Nama Lengkap">
          <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} required placeholder="Masukkan nama lengkap" className={inputClass} />
        </FormGroup>

        <FormGroup label="Tipe Pengajuan">
          <select name="tipePengajuan" value={formData.tipePengajuan} onChange={handleChange} className={inputClass}>
            <option value="Sepeda Motor">Sepeda Motor</option>
            <option value="Mobil">Mobil</option>
            <option value="Multiguna">Multiguna</option>
          </select>
        </FormGroup>

        <div className="grid grid-cols-2 gap-3">
          <FormGroup label="Nominal (RP)">
            <input type="text" name="nominalPengajuan" value={formData.nominalPengajuan} onChange={handleNominalChange} placeholder="0" required className={inputClass} />
          </FormGroup>

          <FormGroup label="Tenor (Bulan)">
            <input type="number" name="tenor" value={formData.tenor} onChange={handleChange} placeholder="Maks. 24" required className={inputClass} />
          </FormGroup>
        </div>

        {tagihanPreview > 0 && (
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Estimasi / bulan</span>
            <span className="font-mono text-base font-bold text-black">{formatRupiah(tagihanPreview)}</span>
          </div>
        )}

        <FormGroup label="Pendapatan Bulanan">
          <input type="text" name="pendapatanBulanan" value={formData.pendapatanBulanan} onChange={handlePendapatanChange} placeholder="Min. 1.000.000" required className={inputClass} />
        </FormGroup>

        <FormGroup label="Catatan" optional>
          <textarea name="catatan" value={formData.catatan} onChange={handleChange} rows={3} placeholder="Catatan tambahan..." className={`${inputClass} resize-none`} />
        </FormGroup>

        <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-yellow-400 py-3 text-sm font-bold text-white transition hover:bg-yellow-500 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer">
          {isLoading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="white" strokeWidth="4" className="opacity-75" />
            </svg>
          )}
          {isLoading ? 'Memproses...' : 'Kirim Pengajuan'}
        </button>
      </form>
    </div>
  )
}