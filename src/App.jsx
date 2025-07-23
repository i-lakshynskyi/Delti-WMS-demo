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
import JobSummary from "./pages/jobSummary/Job Summary.jsx";
import CompletedJob from "./pages/completedJob/CompletedJob.jsx";
import TestFetchComponent from "./components/TestFetchComponent.jsx";
import CombinedRackArticleSummary from "./components/CombinedRackArticleSummary.jsx";
import Spinner from "./components/Spinner.jsx";

function App() {
    const isLoggedIn = useStore((state) => state.isLoggedIn);
    const currentPage = useStore(state => state.currentPage);
    const isShowSpinner = useStore(state => state.isShowSpinner);
    // const store = useStore((state) => state);
    // console.log("STORE: ", store);

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
                return <CombinedRackArticleSummary/>
            case 'scanArticle':
                return <ScanArticle/>
            case 'articleSummary':
                return <CombinedRackArticleSummary/>
            case 'jobSummary':
                return <JobSummary/>
            case 'completedJob':
                return <CompletedJob/>
            case 'testFetchComponent':
                return <TestFetchComponent/>
            default:
                return <div className="text-center p-4">Page not found</div>
        }
    }


// RENDER
    return (
        <>
            {isShowSpinner && <Spinner/>}
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
        </>
    );
}

export default App;