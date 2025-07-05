import {
    ScanRackQrCodeButton,
    ScanRackQrCodeButtonsBlock,
    ScanRackQrCodeContainer, ScanRackQrCodeResultOfScan,
    ScanRackQrCodeScanBlock
} from "../../styles/pages/ScanRackQrCodeStyles.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import QRScanner from "../../utils/QrcodeScanner/QrScanner.jsx";
import useStore from "../../store/useStore.js";
import {useState} from "react";


function ScanRackQrCode() {
    const [qrCodeScanRes, setQrCodeScanRes] = useState(null);
    const setCurrentRack = useStore((state) => state.setCurrentRack)

    const handleQRResult = (data) => {
        console.log("data from QR:", data);
        setCurrentRack(data);
        setQrCodeScanRes(data);
    };

    return (
        <div className={ScanRackQrCodeContainer}>
            <StickyTitle title1={"Scan Rack QR Code"} title2={"Position the QR code within the scanner frame"}/>
            <div className={ScanRackQrCodeScanBlock}>
                <QRScanner onResult={handleQRResult} />
                <div className={ScanRackQrCodeResultOfScan}>
                    <h3>{qrCodeScanRes}</h3>
                </div>
            </div>
            <div className={ScanRackQrCodeButtonsBlock}>
                <PrimeButton className={ScanRackQrCodeButton} disabled={true}>Rescan RACK</PrimeButton>
                <PrimeButton className={ScanRackQrCodeButton} disabled={true}>Scan Article</PrimeButton>
            </div>
        </div>
    );
}

export default ScanRackQrCode;