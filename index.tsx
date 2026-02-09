import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found</div>';
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error: any) {
  console.error("Application failed to mount:", error);
  document.body.innerHTML = `<div style="padding: 20px; color: red; word-break: break-all;">
    <h2>Application Error</h2>
    <pre>${error?.message || 'Unknown error'}</pre>
    <pre>${error?.stack || ''}</pre>
  </div>`;
}