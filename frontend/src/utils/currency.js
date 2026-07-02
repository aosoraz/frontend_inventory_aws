export function formatRupiah(amount) {
  if (amount == null) return 'Rp 0';
  return 'Rp ' + Number(amount).toLocaleString('id-ID');
}
