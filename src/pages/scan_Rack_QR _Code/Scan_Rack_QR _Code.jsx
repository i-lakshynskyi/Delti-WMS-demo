import {useRef, useState} from "react";
import {
    ScanRackQrCodeButton,
    ScanRackQrCodeButtonsBlock,
    ScanRackQrCodeContainer,
    ScanRackQrCodeResultOfScan,
    ScanRackQrCodeScanBlock,
    qrScanContainer,
    qrScanOverlay,
    qrScanImg,
    qrScanVideo,
    ScanRackQrCodeResultOfScanInfo,
    getStatusRack, ScanRackQrWarning, textPX
} from "../../styles/pages/ScanRackQrCodeStyles.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import useStore from "../../store/useStore.js";
import ZxingQrEanScanner from "../../utils/zxingQrEanScanner/ZxingQrEanScanner.jsx";
import {orangeButton} from "../../styles/components/reusableСomponentsStyle.js";
import {racksData} from "../../data/mock/mockData_Racks.js";

function ScanRackQrCode() {
   const [renderScanProps, setRenderScanProps] = useState({
        isScanning: false,
        pageName: 'QR',
        styleClassNameProps: {
            container: qrScanContainer,
            overlay: qrScanOverlay,
            img: qrScanImg,
            video: qrScanVideo
        }
    });
    const [qrScanWarning, setQrScanWarning] = useState("");

    const rackSummary = useStore((state) => state.rackSummary)
    const setRackSummary = useStore((state) => state.setRackSummary)

    const articleSummary = useStore((state) => state.articleSummary);

    const startRef = useRef(null);
    const stopRef = useRef(null);

    const setCurrentPage = useStore((state) => state.setCurrentPage)

    const jobSummary = useStore((state) => state.jobSummary)
    const setJobSummary = useStore((state) => state.setJobSummary)
    const scannedRacksHistory = useStore((state) => state.scannedRacksHistory);
    const setUpdateScannedRacksHistory = useStore((state) => state.setUpdateScannedRacksHistory);

    const isAddArticleDisableBtn = !rackSummary.rackID || rackSummary.statusOfFilling === "Full";

    /* GO to the next page*/
    function handleGoTo(page) {
        setCurrentPage(page);
    }
    /*//------------------------------//*/

     /*ScanProcess*/
    const handleQRResult = (data) => {
        const rackID = data.trim().toUpperCase();

        const fromHistory = scannedRacksHistory.find(r => String(r.rackID).toUpperCase() === rackID);
        if (fromHistory) return setRackSummary(fromHistory);

        const fromMock = racksData.find(r => String(r.rackID).toUpperCase() === rackID);
        if (fromMock) {
            setRackSummary(fromMock);
            setUpdateScannedRacksHistory(fromMock);
        } else {
            setQrScanWarning("Rack not Found!!!!");
        }
    };

    const handleScanStart = () => {
        setRackSummary('reset');
        setQrScanWarning('');
        startRef.current?.();
    };
    /*//------------------------------------//*/

    // Function to get start, finish, takeTime
    function getFormattedTime(date) {
        return `Today, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    function calculateTimeTaken(startDate, endDate) {
        if (!startDate || !endDate) return 'unknown';

        const diffMs = endDate - startDate;
        const diffMinutes = Math.floor(diffMs / 1000 / 60);
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;

        return `${hours} h ${minutes} min`;
    }


    const handleCompleteJob = () => {
        const now = new Date();
        const formattedCompleteTime = getFormattedTime(now);

        const start = jobSummary.startTimeJob ? new Date(jobSummary.startTimeJob) : null;
        const timeTaken = calculateTimeTaken(start, now);

        setJobSummary({
            ...jobSummary,
            completeTimeJob: formattedCompleteTime,
            timeTaken: timeTaken,
        });

        handleGoTo("jobSummary");
    };
    /*//--------------------------------------------------//*/

    return (
        <div className={ScanRackQrCodeContainer}>
            <StickyTitle title1={"Scan Rack QR Code"} title2={"Position the QR code within the scanner frame"}/>
            <div className={ScanRackQrCodeScanBlock}>
                <ZxingQrEanScanner
                    renderProps={renderScanProps}
                    setRenderScanProps={setRenderScanProps}
                    onResult={handleQRResult}
                    startScanProcess={(fn) => (startRef.current = fn)}
                    stopScanProcess={(fn) => (stopRef.current = fn)}
                />
                <div className={ScanRackQrWarning}>{qrScanWarning}</div>
                <div className={ScanRackQrCodeResultOfScan}>
                    <div className={ScanRackQrCodeResultOfScanInfo}>
                        <p className={textPX}>Rack Information:</p>
                        <p className={getStatusRack(rackSummary.statusOfFilling)}>{rackSummary.statusOfFilling}</p>

                        <p>Rack ID:</p>
                        <p>{rackSummary.rackID ? rackSummary.rackID : "..."}</p>

                        <p>Location:</p>
                        <p>{rackSummary.location ? rackSummary.location : "..."}</p>

                        <p>Type:</p>
                        <p>{rackSummary.typeRack ? rackSummary.typeRack : "..."}</p>

                    </div>
                </div>
            </div>
            <div className={ScanRackQrCodeButtonsBlock}>
                <PrimeButton className={ScanRackQrCodeButton}
                             onClick={!renderScanProps.isScanning ? handleScanStart : () => stopRef.current?.()}>{!renderScanProps.isScanning ? "Scan Rack" : "Stop Scan"}</PrimeButton>
                <PrimeButton className={ScanRackQrCodeButton} disabled={isAddArticleDisableBtn}
                             onClick={() => handleGoTo('scanArticle')}>{articleSummary?.quantity > 0 ? "Continue Add Article" : "Add New Article"}</PrimeButton>
                <PrimeButton className={orangeButton} onClick={() => handleGoTo('rackSummary')} disabled={!rackSummary.rackID}>Rack Summary</PrimeButton>
                <PrimeButton onClick={handleCompleteJob}>Complete Job</PrimeButton>
            </div>
        </div>
    );
}

export default ScanRackQrCode;