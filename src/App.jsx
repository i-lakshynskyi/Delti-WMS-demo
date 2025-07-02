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
import useStore from "./store/useStore.js";

function App() {
    const isLoggedIn = useStore((state) => state.isLoggedIn);

    const store = useStore((state) => state);
    console.log("STORE: ", store);

    return !isLoggedIn ? (
        <div className={mainStyle}>
            <Login />
        </div>
    ) : (
        <div className={appContainer}>
            <header className={headerStyle}>
                <Header />
            </header>

            <main className={mainStyle}>
                <GoodsReceivingJobs />
            </main>

            <footer className={footerStyle}>
                <Footer />
            </footer>
        </div>
    )
}

export default App
