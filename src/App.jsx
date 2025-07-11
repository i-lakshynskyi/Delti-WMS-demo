import Header from './components/Header'
import Footer from './components/Footer.jsx'
import Login from './pages/login/Login.jsx'
import GoodsReceivingJobs from "./pages/goodsReceivingJobs/GoodsReceivingJobs.jsx";
import {
    appContainer, headerStyle,
    mainStyle, appContainerOneRow
} from "./styles/components/appStyles.js"
import useStore from "./store/useStore.js";
import JobOverview from "./pages/jobOverview/JobOverview.jsx";
import Scan_Rack_QR_Code from "./pages/scan_Rack_QR _Code/Scan_Rack_QR _Code.jsx";
import ScanArticle from "./pages/scan_Article/ScanArticle.jsx";
import RackSummary from "./pages/rackSummary/RackSummary.jsx";
import ArticleSummary from "./pages/articleSummary/ArticleSummary.jsx";

function App() {
    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const currentPage = useStore(state => state.currentPage);
    const store = useStore((state) => state);
    console.log("STORE: ", store);

    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <Login/>
            case 'jobs':
                return <GoodsReceivingJobs/>
            case 'overview':
                return <JobOverview/>
            case 'scanRackQR':
                return <Scan_Rack_QR_Code/>
            case 'rackSummary':
                return <RackSummary/>
            case 'articleSummary':
                return <ArticleSummary/>
            case 'scanArticle':
                return <ScanArticle/>
            default:
                return <div className="text-center p-4">Page not found</div>
        }
    }


// RENDER
    return (
        <div className={isLoggedIn ? appContainer : appContainerOneRow}>
            {isLoggedIn && (
                <header className={headerStyle}>
                    <Header />
                </header>
            )}

            <main className={mainStyle}>
                {renderPage()}
            </main>

            {isLoggedIn && (
                <footer>
                    <Footer />
                </footer>
            )}
        </div>
    );
}

export default App;
