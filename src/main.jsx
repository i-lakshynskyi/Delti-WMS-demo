import './i18n/i18n.js'
import {StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.jsx"
import "./styles/global.css"
import Spinner from "./components/Spinner.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Suspense fallback={<Spinner/>}>
            <App />
        </Suspense>
    </StrictMode>
);