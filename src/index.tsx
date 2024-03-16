import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App';
import './index.css';

const rootEl = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(rootEl).render(<App />);
