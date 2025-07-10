import React, {useRef, useState} from "react";
import {
    ScanRackQrCodeButton,
    ScanRackQrCodeButtonsBlock,
    ScanRackQrCodeContainer, ScanRackQrCodeResultOfScan,
    ScanRackQrCodeScanBlock, qrScanContainer, qrScanOverlay, qrScanImg, qrScanVideo
} from "../../styles/pages/ScanRackQrCodeStyles.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import useStore from "../../store/useStore.js";
import ZxingQrEanScanner from "../../utils/zxingQrEanScanner/ZxingQrEanScanner.jsx";
import {orangeButton} from "../../styles/components/reusableСomponentsStyle.js";

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
    const currentRackSummary = useStore((state) => state.rackSummary)
    const setRackSummary = useStore((state) => state.setRackSummary)

    const startRef = useRef(null);
    const stopRef = useRef(null);

    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    const handleQRResult = (data) => {
        setRackSummary({id: data});
    };

    const handleScanStart = () => {
        setRackSummary({id: null});
        startRef.current?.();
    };

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
                <div className={ScanRackQrCodeResultOfScan}>
                    <h3>RACK ID:</h3>
                    <span>{currentRackSummary.id ? currentRackSummary.id : "..."}</span>
                </div>
            </div>
            <div className={ScanRackQrCodeButtonsBlock}>
                <PrimeButton className={ScanRackQrCodeButton}
                             onClick={!renderScanProps.isScanning ? handleScanStart : () => stopRef.current?.()}>{!renderScanProps.isScanning ? "Scan Rack" : "Stop Scan"}</PrimeButton>
                <PrimeButton className={ScanRackQrCodeButton} disabled={!currentRackSummary.id} onClick={() => handleGoTo('scanArticle')}>Add Article</PrimeButton>
                <PrimeButton className={orangeButton} onClick={() => handleGoTo('rackSummary')}>Rack Summary</PrimeButton>
            </div>
        </div>
    );
}

export default ScanRackQrCode;