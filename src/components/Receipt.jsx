import React, { forwardRef } from 'react';

const Receipt = forwardRef(({ invoiceData }, ref) => {
  const subtotal = invoiceData.items.reduce((acc, item) => acc + (item.qty * item.price || 0), 0);
  
  // Fungsi untuk format angka ke Rupiah tanpa 'Rp'
  const formatNumber = (num) => new Intl.NumberFormat('id-ID').format(num);

  // Generate nomor invoice yang lebih dinamis
  const invoiceNumber = `VP-${new Date().toISOString().slice(2,10).replace(/-/g,"")}-${Date.now().toString().slice(-4)}`;

  return (
    <div ref={ref} className="w-[58mm] bg-white text-black p-2 font-mono text-[10px] leading-tight">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-sm font-bold">VillaParfum</h1>
        <p>Jl. Wangi Sejati No. 45, Bandung</p>
        <p>WA: 081-987-654-321</p>
        <p>--------------------------</p>
      </div>

      {/* Info Transaksi */}
      <div className="mb-2">
        <p>No: {invoiceNumber}</p>
        <p>Tgl: {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        <p>Kasir: {invoiceData.cashierName || 'Admin'}</p>
        <p>--------------------------</p>
      </div>

      {/* Daftar Item */}
      <div>
        {invoiceData.items.map((item, index) => (
          item.name && <div key={index} className="mb-1">
            <p className="font-semibold">{item.name}</p>
            <div className="flex justify-between">
              <span>{item.qty} x {formatNumber(item.price)}</span>
              <span>{formatNumber(item.qty * item.price)}</span>
            </div>
          </div>
        ))}
        <p>--------------------------</p>
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold mb-2 text-xs">
        <span>TOTAL</span>
        <span>Rp{formatNumber(subtotal)}</span>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p>Bayar: {invoiceData.paymentMethod}</p>
        <p>--------------------------</p>
        <p className="font-bold">Terima Kasih!</p>
        <p>IG: @villaparfum_id</p>
      </div>
    </div>
  );
});

export default Receipt;