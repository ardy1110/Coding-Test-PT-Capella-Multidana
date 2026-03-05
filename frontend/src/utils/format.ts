
// format 1000000 -> 1.000.000
export const formatNumber = (value: string) => {
  const number = value.replace(/\D/g, '')
  return new Intl.NumberFormat('id-ID').format(Number(number))
}

// format 1000000 -> Rp 1.000.000
export const formatRupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n)