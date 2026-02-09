import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const logStatus = (msg: string) => {
  const log = document.getElementById('status-log');
  if (log) {
    const time = new Date().toLocaleTimeString();
    log.innerHTML += `<div>[${time}] ${msg}</div>`;
  }
  console.log(msg);
};

logStatus('Module index.tsx loaded');

const rootElement = document.getElementById('root');

if (!rootElement) {
  logStatus('Critical: Root element not found');
} else {
  try {
    logStatus('Attempting to create root...');
    const root = createRoot(rootElement);
    logStatus('Root created, rendering...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    logStatus('Render command sent');
    
    // 如果渲染成功，5秒后自动隐藏调试层
    setTimeout(() => {
       const overlay = document.getElementById('status-overlay');
       if (overlay) overlay.style.opacity = '0.3';
    }, 5000);

  } catch (err: any) {
    logStatus(`Mount Error: ${err.message}`);
    console.error(err);
  }
}