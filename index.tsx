import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const log = (msg: string, isError: boolean = false) => {
  const el = document.getElementById('status-log');
  if (el) {
    const time = new Date().toLocaleTimeString();
    el.innerHTML += `<div style="${isError ? 'color: #ff5555' : ''}">[${time}] ${msg}</div>`;
  }
};

try {
  log('Module index.tsx executing...');
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element #root missing');

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  (window as any).APP_STARTED = true;
  log('App rendered successfully');

  // 成功运行后 8 秒淡出调试条
  setTimeout(() => {
    const overlay = document.getElementById('status-overlay');
    if (overlay) overlay.style.opacity = '0.4';
  }, 8000);

} catch (err: any) {
  log(`Critical Error: ${err.message}`, true);
  console.error(err);
}