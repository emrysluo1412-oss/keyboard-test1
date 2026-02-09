import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Wifi, 
  BatteryMedium, 
  ChevronDown, 
  ScanLine,
  Activity
} from 'lucide-react';

const InventoryScreen: React.FC = () => {
  const [quantity, setQuantity] = useState<string>('1');
  const [logs, setLogs] = useState<string[]>(['Interface initialized']);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 3));
  };

  const handleBoxClick = () => {
    addLog('Click detected - Forcing focus');
    // 在一些特殊WebView中，手动focus能大幅提高键盘弹出率
    inputRef.current?.focus();
    // 甚至可以在延迟后再次尝试，以应对软键盘被其他逻辑阻断
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">
      {/* 设备状态栏模拟 */}
      <div className="bg-gray-200 px-3 py-1 flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-wider">
        <span>Device: HW-PDA-01</span>
        <div className="flex items-center gap-2">
          <Wifi size={10} />
          <BatteryMedium size={10} />
          <span>100%</span>
        </div>
      </div>

      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between px-3 py-4 bg-white shadow-sm">
        <ArrowLeft size={22} className="text-gray-700" />
        <h2 className="font-extrabold text-sm tracking-tighter">库存录入 (REPRO)</h2>
        <ScanLine size={22} className="text-blue-600" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 指示说明 */}
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-black leading-tight">键盘复现测试</h3>
          <p className="text-[11px] opacity-90 mt-1">
            针对无法弹出键盘的问题，请点击下方的白色数值框。
          </p>
        </div>

        {/* 核心输入区域 */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
                录入数量 (点击下方)
              </label>
              <div 
                className="relative group"
                onClick={handleBoxClick}
              >
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  onFocus={() => addLog('Event: Input Focused')}
                  onBlur={() => addLog('Event: Input Blurred')}
                  className="w-full text-center text-5xl font-black py-4 border-2 border-blue-500 rounded-xl bg-blue-50 text-blue-700 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <Activity size={20} className="text-blue-300 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                className="bg-gray-100 py-3 rounded-lg font-bold text-xs active:scale-95 transition-transform"
                onClick={() => setQuantity('1')}
              >
                重置
              </button>
              <button 
                className="bg-blue-600 text-white py-3 rounded-lg font-bold text-xs shadow-lg active:scale-95 transition-transform"
                onClick={() => addLog(`Submitted: ${quantity}`)}
              >
                确认保存
              </button>
            </div>
          </div>

          {/* 事件日志显示 */}
          <div className="bg-gray-800 rounded-lg p-3 text-[10px] font-mono shadow-inner border border-gray-700">
             <div className="flex justify-between text-gray-500 border-b border-gray-700 mb-2 pb-1">
               <span>RUNTIME LOGS</span>
               <span className="text-blue-400">LIVE</span>
             </div>
             {logs.map((msg, i) => (
               <div key={i} className="text-green-400 mb-0.5">
                 <span className="text-gray-600">{'>'}</span> {msg}
               </div>
             ))}
          </div>
        </div>

        {/* 备选表单项 (确保视觉效果一致) */}
        <div className="space-y-3 opacity-60">
           <div className="p-3 bg-white rounded border border-gray-100 flex justify-between items-center text-xs">
              <span className="text-gray-400">分类</span>
              <span className="font-bold text-gray-700">常规商品 <ChevronDown size={14} className="inline ml-1" /></span>
           </div>
           <div className="p-3 bg-white rounded border border-gray-100 flex justify-between items-center text-xs">
              <span className="text-gray-400">货架号</span>
              <span className="font-bold text-gray-700">A-12-04 <ChevronDown size={14} className="inline ml-1" /></span>
           </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-center gap-2">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
        <span className="text-[10px] text-gray-400 font-bold uppercase">SDK Version: 4.1.2-Stable</span>
      </div>
    </div>
  );
};

export default InventoryScreen;