import React, { useState, useRef } from 'react';
import InvoiceForm from './components/InvoiceForm';
import Receipt from './components/Receipt';
import './print-styles.css'; // File CSS khusus untuk print

function App() {
  const [invoiceData, setInvoiceData] = useState({
    cashierName: 'Admin',
    paymentMethod: 'QRIS',
    items: [{ name: 'Dior Sauvage EDP 100ml', qty: 1, price: 50000 }]
  });

  const receiptRef = useRef();

  const handlePrint = () => {
    window.print();
  };
  
  const subtotal = invoiceData.items.reduce((acc, item) => acc + (item.qty * item.price || 0), 0);
  const formattedSubtotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(subtotal);

  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-8 font-sans text-white">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10 no-print">
          <h1 className="text-4xl font-extrabold text-white">VillaParfum</h1>
          <p className="text-gray-400">Invoice Generator</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Kolom Kiri: Form Input */}
          <div className="lg:col-span-3 no-print">
            <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
            <div className="mt-6 p-6 bg-gray-800 rounded-xl shadow-2xl shadow-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-sm text-gray-400">Total Tagihan</h3>
                <p className="text-3xl font-bold text-white">{formattedSubtotal}</p>
              </div>
              <button 
                onClick={handlePrint} 
                className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-900 w-full sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                CETAK STRUK
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Live Preview Struk */}
          <div className="lg:col-span-2 flex flex-col items-center">
              <h2 className="text-xl font-bold mb-4 text-gray-300 no-print">Preview Struk</h2>
              <div className="p-4 bg-gray-800 rounded-md shadow-lg print-area w-full sm:w-auto">
                  <Receipt invoiceData={invoiceData} ref={receiptRef} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;