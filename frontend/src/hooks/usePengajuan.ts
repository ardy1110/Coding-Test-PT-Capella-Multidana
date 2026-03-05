import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { formatNumber } from '../utils/format'

export function usePengajuan(onPengajuanSukses?: () => void) {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    tipePengajuan: 'Sepeda Motor',
    nominalPengajuan: '',
    tenor: '',
    pendapatanBulanan: '',
    catatan: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '')
    setFormData((prev) => ({ ...prev, nominalPengajuan: formatNumber(raw) }))
  }

  const handlePendapatanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\./g, '')
    setFormData((prev) => ({ ...prev, pendapatanBulanan: formatNumber(raw) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const nominal = Number(formData.nominalPengajuan.replace(/\./g, ''))
    const tenor = Number(formData.tenor)
    const pendapatan = Number(formData.pendapatanBulanan.replace(/\./g, ''))

    if (pendapatan < 1000000) {
      toast.error('Nasabah belum dapat mengajukan pinjaman.')
      setIsLoading(false)
      return
    }

    if (nominal > 200000000) {
      toast.error('Nominal maksimal pinjaman yang dapat disetujui adalah 200 juta.')
      setIsLoading(false)
      return
    }

    if (tenor > 24) {
      toast.error('Tenor pinjaman tertinggi adalah 24 bulan.')
      setIsLoading(false)
      return
    }

    try {
      await axios.post('http://localhost:5000/api/pengajuan', {
        ...formData,
        nominalPengajuan: nominal,
        tenor,
        pendapatanBulanan: pendapatan,
      })

      toast.success('Pengajuan berhasil ditambahkan!')
      setFormData({
        namaLengkap: '',
        tipePengajuan: 'Sepeda Motor',
        nominalPengajuan: '',
        tenor: '',
        pendapatanBulanan: '',
        catatan: '',
      })

      if (onPengajuanSukses) onPengajuanSukses()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan saat menghubungi server.')
    } finally {
      setIsLoading(false)
    }
  }

  // Kalkulasi preview tagihan
  const nominal = Number(formData.nominalPengajuan.replace(/\./g, '')) || 0
  const tenor = Number(formData.tenor) || 0
  const tagihanPreview = tenor > 0 ? Math.ceil(nominal / tenor) : 0

  return {
    formData,
    isLoading,
    tagihanPreview,
    handleChange,
    handleNominalChange,
    handlePendapatanChange,
    handleSubmit,
  }
}