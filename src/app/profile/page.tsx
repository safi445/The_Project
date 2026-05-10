'use client';

import { User, Settings, Bell, CreditCard, Shield } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-500">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Guest Barber</h2>
          <p className="text-slate-500 text-sm">Free Tier</p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { icon: Settings, label: 'Shop Settings' },
          { icon: Bell, label: 'Notifications' },
          { icon: CreditCard, label: 'Subscription' },
          { icon: Shield, label: 'Privacy & Security' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <item.icon className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-700">{item.label}</span>
            </div>
            <div className="w-6 h-6 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300">
              <Settings className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-indigo-600 p-6 rounded-3xl text-white">
        <h4 className="font-bold text-lg mb-2">Upgrade to Pro</h4>
        <p className="text-indigo-100 text-sm mb-4">Get unlimited scans, custom branding, and WhatsApp automation.</p>
        <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm">
          Rs 2000/month
        </button>
      </div>
    </div>
  );
}
