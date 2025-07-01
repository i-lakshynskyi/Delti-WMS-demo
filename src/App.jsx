import Header from './components/Header'
import Footer from './components/Footer.jsx'
import Login from './pages/login/Login.jsx'
import GoodsReceivingJobs from "./pages/goodsReceivingJobs/GoodsReceivingJobs.jsx";
import {
    appContainer,
    headerStyle,
    mainStyle,
    footerStyle
} from "./styles/components/appStyles.js"

function App() {
    return (
        <div className={appContainer}>
            <header className={headerStyle}>
                <Header />
            </header>

            <main className={mainStyle}>
                {/*<Login />*/}
                <GoodsReceivingJobs/>
            </main>

            <footer className={footerStyle}>
                <Footer />
            </footer>
        </div>
    )
}

export default App
