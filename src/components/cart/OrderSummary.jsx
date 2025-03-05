import React from "react";

export default function OrderSummary({ subTotal, vatAmount, totalWithVAT }) {
  const formatAmount = (amount) => `$${amount.toFixed(2)}`;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal (excl. VAT):</span>
          <span>{formatAmount(subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>VAT (25%):</span>
          <span>{formatAmount(vatAmount)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total (incl. VAT):</span>
          <span>{formatAmount(totalWithVAT)}</span>
        </div>
      </div>
    </div>
  );
}
