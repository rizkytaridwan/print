import React from 'react';
import CurrencyInput from './CurrencyInput'; // Import komponen baru

function InvoiceForm({ invoiceData, setInvoiceData }) {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] = value;
    setInvoiceData({ ...invoiceData, items });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { name: '', qty: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    // Jangan hapus item terakhir, beri peringatan
    if (invoiceData.items.length === 1) {
        alert("Tidak bisa menghapus item terakhir.");
        return;
    }
    const items = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData({ ...invoiceData, items });
  };

  return (
    <div className="p-6 md:p-8 bg-gray-800 rounded-xl shadow-2xl shadow-gray-900">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-violet-900 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400"><path d="M14 19.5a2.5 2.5 0 1 0 5 0"/><path d="M14 4a2 2 0 1 0-4 0V9a2 2 0 1 0 4 0Z"/><path d="M18 19h-4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z"/><path d="M6 2v16"/><path d="M6 18a4 4 0 0 0 4 4h4"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Invoice Baru</h2>
      </div>
      
      {/* Info Pelanggan */}
      <div className="space-y-4 mb-6">
        <input type="text" name="cashierName" placeholder="Nama Kasir" value={invoiceData.cashierName} onChange={handleInputChange} className="input-style" />
      </div>

      {/* Detail Item */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-300">Detail Produk</h3>
        <div className="space-y-3">
          {invoiceData.items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-2">
              <input type="text" name="name" placeholder="Nama Parfum, Ukuran, Jenis" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} className="input-style flex-grow w-full" />
              <div className="flex gap-2 w-full sm:w-auto">
                <input type="number" name="qty" placeholder="Qty" value={item.qty} min="1" onChange={(e) => handleItemChange(index, 'qty', parseInt(e.target.value) || 1)} className="input-style w-20 text-center" />
                <CurrencyInput value={item.price} onChange={(value) => handleItemChange(index, 'price', value)} />
                <button onClick={() => removeItem(index)} className="bg-gray-700 text-gray-400 p-2 rounded-md hover:bg-red-800 hover:text-red-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-4 bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition-all w-full">+ Tambah Item</button>
      </div>

      {/* Opsi Pembayaran */}
      <div>
        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-400 mb-1">Metode Pembayaran</label>
        <select name="paymentMethod" id="paymentMethod" value={invoiceData.paymentMethod} onChange={handleInputChange} className="input-style">
          <option>QRIS</option>
          <option>Tunai</option>
          <option>Debit BCA</option>
          <option>Kartu Kredit</option>
        </select>
      </div>
    </div>
  );
}

export default InvoiceForm;