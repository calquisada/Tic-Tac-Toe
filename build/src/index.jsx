"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("react-dom/client"));
const App_jsx_1 = __importDefault(require("./App.jsx"));
require("./index.css");
const rootEl = document.getElementById('root');
client_1.default.createRoot(rootEl).render(<App_jsx_1.default />);
