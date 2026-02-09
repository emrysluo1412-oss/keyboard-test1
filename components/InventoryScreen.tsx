import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Wifi, BatteryMedium, MoreVertical, ChevronDown, ScanLine } from 'lucide-react';

const InventoryScreen: React.FC = () => {
  const [quantity, setQuantity] = useState<string>('1');
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to log events for debugging on device
  const log = (msg: string) => {
    setDebugLog(prev => [msg, ...prev].slice(0, 5));
    console.log(msg);
  };

  const handleFocus = () => {
    log('Input Focused');
  };

  const handleClick = () => {
    log('Input Clicked');
    // Force focus logic sometimes helps on buggy WebViews
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 font-sans select-none">
      {/* Status Bar Replica (Visual only) */}
      <div className="bg-slate-50 px-4 py-1 flex justify-between items-center text-xs text-gray-500">
        <span>13:22 ⚙️</span>
        <div className="flex items-center gap-1">
          <Wifi size={14} />
          <BatteryMedium size={14} />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-2 py-3 bg-slate-50 relative border-b border-gray-100">
        <button className="p-2 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex space-x-6 text-sm font-medium uppercase absolute left-1/2 transform -translate-x-1/2">
          <span className="text-blue-500 border-b-2 border-blue-500 pb-1">SCAN</span>
          <span className="text-gray-400">Товары</span>
        </div>

        <button className="p-2 text-gray-600">
          <ScanLine size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
        {/* Product Title */}
        <h1 className="text-xl font-medium text-slate-700 leading-snug mb-6 uppercase">
          ВОДА ПИТЬЕВАЯ ШИШКИН<br />ЛЕС 5Л
        </h1>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-100 p-3 rounded-lg flex flex-col items-center justify-center">
            <span className="text-xs text-gray-400 mb-1">остаток</span>
            <span className="text-lg font-bold text-slate-700">13 шт.</span>
          </div>
          <div className="bg-slate-100 p-3 rounded-lg flex flex-col items-center justify-center">
            <span className="text-xs text-gray-400 mb-1">ср. вес шт.</span>
            <span className="text-lg font-bold text-slate-700">- шт.</span>
          </div>
        </div>

        {/* Section Header */}
        <h2 className="text-base font-semibold text-slate-500 mb-4">
          Выбор причины списания
        </h2>

        {/* Dropdowns Form */}
        <div className="space-y-4">
          {/* Field 1 */}
          <div>
            <label className="block text-xs text-gray-400 mb-1 pl-1">Статья</label>
            <div className="relative">
              <div className="w-full bg-blue-100/50 p-3 rounded-lg text-slate-700 text-sm flex justify-between items-center border border-blue-100">
                <span>116 - Срок годности</span>
                <ChevronDown size={18} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Field 2 */}
          <div>
            <label className="block text-xs text-gray-400 mb-1 pl-1">Причина</label>
            <div className="relative">
              <div className="w-full bg-blue-100/50 p-3 rounded-lg text-slate-700 text-sm flex justify-between items-center border border-blue-100">
                <span>141 - СГ</span>
                <ChevronDown size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer Area */}
      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 pb-4 pt-2">
        
        {/* Input Row */}
        <div className="flex gap-3 px-4 mb-3 items-stretch h-12">
          {/* 
            UPDATED:
            - pattern="\d*" forces numeric keyboard on iOS/Android
            - step="1" enforces integers (prevents decimal point in some keyboards)
            - min="0" enforces positive numbers
            - inputMode="numeric" is the standard modern trigger
          */}
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            pattern="\d*"
            step="1"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onFocus={handleFocus}
            onClick={handleClick}
            className="flex-1 text-center text-xl text-slate-700 border-2 border-indigo-400 rounded-md focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 transition-all"
          />
          
          <button 
            onClick={() => log(`Submitted: ${quantity}`)}
            className="px-6 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-medium rounded-md text-sm transition-colors shadow-sm"
          >
            Добавить в акт
          </button>
        </div>

        {/* Bottom Alert/Notification */}
        <div className="px-4">
          <div className="bg-green-100 text-green-700 text-xs py-2 px-3 rounded-md flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
            <span>Товары без ШК (Сегодня в 13:09)</span>
          </div>
        </div>

        {/* Debug Info (Hidden visually usually, but useful here) */}
        {debugLog.length > 0 && (
          <div className="bg-black text-green-400 text-[10px] p-1 font-mono mt-2 mx-4 rounded opacity-70 pointer-events-none">
            {debugLog.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryScreen;