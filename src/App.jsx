import Header from './components/Header'
import Footer from './components/Footer.jsx'
import Login from './pages/Login'
import './styles/global.css'


function App() {
    return (
        <div className="app-container">
            <header className="header-style">
                <Header />
            </header>

            <main className="main-style">
                <Login />
            </main>

            <footer className="footer-style">
                <Footer />
            </footer>
        </div>
    )
}

export default App
