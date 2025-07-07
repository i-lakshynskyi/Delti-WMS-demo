import {
    ScanRackQrCodeButton,
    ScanRackQrCodeButtonsBlock,
    ScanRackQrCodeContainer, ScanRackQrCodeResultOfScan,
    ScanRackQrCodeScanBlock
} from "../../styles/pages/ScanRackQrCodeStyles.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import useStore from "../../store/useStore.js";
import {useRef, useState} from "react";
import ZxingQrEanScanner from "../../utils/zxingQrEanScanner/ZxingQrEanScanner.jsx";


function ScanRackQrCode() {
    const [qrCodeScanRes, setQrCodeScanRes] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const setCurrentRack = useStore((state) => state.setCurrentRack);

    const startRef = useRef(null);
    const stopRef = useRef(null);

    const handleQRResult = (data) => {
        console.log("data from QR:", data);
        setCurrentRack(data);
        setQrCodeScanRes(data);
    };

    const handleScanStart = () => {
        setQrCodeScanRes(null);
        startRef.current?.();
    };

    return (
        <div className={ScanRackQrCodeContainer}>
            <StickyTitle title1={"Scan Rack QR Code"} title2={"Position the QR code within the scanner frame"}/>
            <div className={ScanRackQrCodeScanBlock}>
                <ZxingQrEanScanner
                    isScanning={isScanning}
                    setIsScanning={setIsScanning}
                    onResult={handleQRResult}
                    startScanProcess={(fn) => (startRef.current = fn)}
                    stopScanProcess={(fn) => (stopRef.current = fn)}
                />
                <div className={ScanRackQrCodeResultOfScan}>
                    <h3>{qrCodeScanRes}</h3>
                </div>
            </div>
            <div className={ScanRackQrCodeButtonsBlock}>
                <PrimeButton className={ScanRackQrCodeButton}
                             onClick={!isScanning ? handleScanStart : () => stopRef.current?.()}>{!isScanning ? "Scan RACK" : "Stop scan"}</PrimeButton>
                <PrimeButton className={ScanRackQrCodeButton} disabled={true}>Scan Article</PrimeButton>
            </div>
        </div>
    );
}

export default ScanRackQrCode;