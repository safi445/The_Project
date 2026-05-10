import React from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';

interface ProductRecommendationsProps {
  products: string[];
}

export default function ProductRecommendations({ products }: ProductRecommendationsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-indigo-600" />
        Recommended Products
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold">
                {product[0]}
              </div>
              <span className="font-medium text-slate-700">{product}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] text-slate-400 text-center italic">
        Barber commission: 15% on each purchase through this link
      </p>
    </div>
  );
}
