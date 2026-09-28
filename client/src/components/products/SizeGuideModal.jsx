// client/src/components/products/SizeGuideModal.jsx
import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'

  if (!isOpen) return null;

  const sizeData = [
    { size: 'XS', bustIn: '32 - 34', waistIn: '26 - 28', hipIn: '36 - 38', lengthIn: '44', bustCm: '81 - 86', waistCm: '66 - 71', hipCm: '91 - 96', lengthCm: '112' },
    { size: 'S',  bustIn: '36',      waistIn: '30',      hipIn: '40',      lengthIn: '44', bustCm: '91',      waistCm: '76',      hipCm: '101',     lengthCm: '112' },
    { size: 'M',  bustIn: '38',      waistIn: '32',      hipIn: '42',      lengthIn: '45', bustCm: '96',      waistCm: '81',      hipCm: '106',     lengthCm: '114' },
    { size: 'L',  bustIn: '40',      waistIn: '34',      hipIn: '44',      lengthIn: '45', bustCm: '101',     waistCm: '86',      hipCm: '112',     lengthCm: '114' },
    { size: 'XL', bustIn: '42',      waistIn: '36',      hipIn: '46',      lengthIn: '46', bustCm: '106',     waistCm: '91',      hipCm: '117',     lengthCm: '117' },
    { size: 'XXL',bustIn: '44',      waistIn: '38',      hipIn: '48',      lengthIn: '46', bustCm: '112',     waistCm: '96',      hipCm: '122',     lengthCm: '117' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-regal-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-sand-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-regal-900">
                Inthugil Standard Size Chart
              </h3>
              <p className="text-xs text-sand-500">
                Tailored for effortless everyday comfort across Indian fits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-sand-400 hover:text-regal-900 rounded-full hover:bg-sand-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between mt-5 mb-4">
          <span className="text-xs font-semibold text-sand-600">Body Measurements</span>
          <div className="flex bg-sand-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded-lg transition ${
                unit === 'in' ? 'bg-white text-regal-900 shadow-sm font-bold' : 'text-sand-500'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-lg transition ${
                unit === 'cm' ? 'bg-white text-regal-900 shadow-sm font-bold' : 'text-sand-500'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-sand-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-sand-50 text-regal-900 font-semibold border-b border-sand-200">
              <tr>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Bust ({unit})</th>
                <th className="py-2.5 px-3">Waist ({unit})</th>
                <th className="py-2.5 px-3">Hip ({unit})</th>
                <th className="py-2.5 px-3">Length ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {sizeData.map((row) => (
                <tr key={row.size} className="hover:bg-sand-50/50">
                  <td className="py-2.5 px-3 font-bold text-brand-700">{row.size}</td>
                  <td className="py-2.5 px-3 text-sand-600">{unit === 'in' ? row.bustIn : row.bustCm}</td>
                  <td className="py-2.5 px-3 text-sand-600">{unit === 'in' ? row.waistIn : row.waistCm}</td>
                  <td className="py-2.5 px-3 text-sand-600">{unit === 'in' ? row.hipIn : row.hipCm}</td>
                  <td className="py-2.5 px-3 text-sand-600">{unit === 'in' ? row.lengthIn : row.lengthCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Tip */}
        <div className="mt-5 p-3.5 bg-brand-50 rounded-xl border border-brand-100 text-xs text-brand-900 leading-relaxed">
          <strong className="font-semibold text-brand-950">Stylist Sizing Tip:</strong> If your measurements fall between two sizes, we recommend ordering the larger size for relaxed everyday comfort, especially for pure cotton garments.
        </div>

      </div>
    </div>
  );
};
