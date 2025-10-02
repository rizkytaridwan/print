import React from 'react';

// Komponen ini secara khusus menangani input mata uang
function CurrencyInput({ value, onChange }) {
  // Helper untuk format angka ke Rupiah
  const format = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Helper untuk mengubah string Rupiah kembali ke angka
  const parse = (str) => {
    // Hilangkan semua karakter kecuali digit
    const digits = str.replace(/\D/g, '');
    return digits ? parseInt(digits, 10) : 0;
  };
  
  const handleChange = (e) => {
    const numericValue = parse(e.target.value);
    onChange(numericValue); // Kirim kembali nilai angka murni
  };

  return (
    <input
      type="text" // Gunakan type text agar bisa menampilkan format 'Rp' dan '.'
      value={format(value)}
      onChange={handleChange}
      placeholder="Harga"
      className="input-style w-40 text-right" // Styling untuk input harga
    />
  );
}

export default CurrencyInput;
