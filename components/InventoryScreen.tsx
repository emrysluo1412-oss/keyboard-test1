import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Wifi, 
  BatteryMedium, 
  ChevronDown, 
  ScanLine,
  AlertCircle
} from 'lucide-react';

const InventoryScreen: React.FC = () => {
  const [quantity, setQuantity] = useState<string>('1');
  const [logs, setLogs] = useState<string[]>(['App started']);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 3));
  };

  const handleFocus = () => addLog('Input Focus Triggered');
  const handleBlur = () => addLog('Input Blur Triggered');
  const handleClick = () => {
    addLog('Manual Click Triggered');
    // 在某些 Bug WebView 中手动调用 focus 有助于弹出键盘
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800 overflow-hidden">
      {/* 模拟状态栏 */}
      <div className="bg-slate-100 px-4 py-1 flex justify-between items-center text-[10px] text-gray-500 font-bold">
        <span>15:45</span>
        <div className="flex items-center gap-1">
          <Wifi size={10} />
          <BatteryMedium size={10} />
        </div>
      </div>

      {/* 头部导航 */}
      <div className="flex items-center justify-between px-2 py-3 bg-white border-b border-gray-200">
        <ArrowLeft size={24} className="text-gray-600" />
        <div className="flex gap-4">
          <span className="text-blue-600 border-b-2 border-blue-600 font-bold text-xs pb-1">扫描</span>
          <span className="text-gray-400 font-bold text-xs pb-1">商品清单</span>
        </div>
        <ScanLine size={24} className="text-gray-600" />
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h1 className="text-lg font-bold text-slate-700 uppercase leading-tight">
            复现：键盘弹出问题测试
          </h1>
          <p className="text-xs text-gray-500 mt-1 text-red-500">点击下方输入框测试键盘是否弹出</p>
        </div>

        {/* 商品信息卡片 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-3 rounded border border-gray-200 shadow-sm text-center">
            <div className="text-[10px] text-gray-400 uppercase">当前库存</div>
            <div className="text-lg font-bold">13 件</div>
          </div>
          <div className="bg-white p-3 rounded border border-gray-200 shadow-sm text-center">
            <div className="text-[10px] text-gray-400 uppercase">平均重量</div>
            <div className="text-lg font-bold">-</div>
          </div>
        </div>

        {/* 下拉选择 */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">类别</label>
            <div className="w-full bg-blue-50 border border-blue-100 p-3 rounded flex justify-between items-center text-sm">
              <span>116 - 过期损耗</span>
              <ChevronDown size={16} />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">原因</label>
            <div className="w-full bg-blue-50 border border-blue-100 p-3 rounded flex justify-between items-center text-sm">
              <span>141 - 包装破损</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* 调试日志：帮助判断点击是否生效 */}
        <div className="bg-slate-900 text-green-400 p-2 rounded text-[10px] font-mono min-h-[60px]">
          <div className="text-white border-b border-slate-700 mb-1 pb-1 flex justify-between">
            <span>事件记录 (EVENT LOG)</span>
            <AlertCircle size={10} />
          </div>
          {logs.map((log, i) => <div key={i}>&gt; {log}</div>)}
        </div>
      </div>

      {/* 底部固定区域 */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-3">
        <div className="flex gap-2">
          {/* 
            关键输入框：
            使用多种属性尝试强制触发数字键盘
          */}
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            pattern="\d*"
            value={quantity}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-24 text-center text-2xl font-bold border-2 border-indigo-500 rounded-lg p-2 focus:ring-4 focus:ring-indigo-200 outline-none transition-all"
            placeholder="0"
          />
          <button 
            className="flex-1 bg-green-500 active:bg-green-600 text-white font-bold rounded-lg uppercase text-sm shadow-md"
            onClick={() => addLog(`确认数量: ${quantity}`)}
          >
            添加到清单
          </button>
        </div>
        
        <div className="bg-green-50 border border-green-100 p-2 rounded flex items-center justify-center gap-2 text-[10px] text-green-700">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           设备在线同步中: 13:09
        </div>
      </div>
    </div>
  );
};

export default InventoryScreen;