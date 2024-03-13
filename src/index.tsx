import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

const rootEl = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(rootEl).render(<App />);
