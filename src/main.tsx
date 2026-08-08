import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 应用启动时在控制台打印版本号（构建时从 package.json 注入）
console.log(`GAMSTEK H5 v${__APP_VERSION__}`);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
