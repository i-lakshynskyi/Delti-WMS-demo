import React, {useRef, useState} from "react";
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
    ScanRackStatusRack, getStatusRack, ScanRackQrWarning
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

    const startRef = useRef(null);
    const stopRef = useRef(null);

    const setCurrentPage = useStore((state) => state.setCurrentPage)
    const jobSummary = useStore((state) => state.jobSummary)
    const setJobSummary = useStore((state) => state.setJobSummary)

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    const handleQRResult = (data) => {
        const currentRack = racksData.find(rack => String(rack.rackID).toUpperCase() === data.trim().toUpperCase());
        if (currentRack) {
            setRackSummary(currentRack);
            setJobSummary({scannedRacks: [...jobSummary.scannedRacks, currentRack]});
        }else {
            setQrScanWarning("Rack not Found!!!!");
        }
    };

    const handleScanStart = () => {
        setRackSummary('reset');
        setQrScanWarning('');
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
                <div className={ScanRackQrWarning}>{qrScanWarning}</div>
                <div className={ScanRackQrCodeResultOfScan}>
                    <div className={ScanRackStatusRack}>
                        <p>Rack Information:</p>
                        <p className={getStatusRack(rackSummary.statusOfFilling)}>{rackSummary.statusOfFilling}</p>
                    </div>
                    <div className={ScanRackQrCodeResultOfScanInfo}>
                        <p className='font-bold text-[16px]'>Rack ID:</p>
                        <p className='font-bold text-[16px]'>{rackSummary.rackID ? rackSummary.rackID : "..."}</p>

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
                <PrimeButton className={ScanRackQrCodeButton} disabled={!rackSummary.rackID}
                             onClick={() => handleGoTo('scanArticle')}>Add Article</PrimeButton>
                <PrimeButton className={orangeButton} onClick={() => handleGoTo('rackSummary')} disabled={!rackSummary.rackID}>Rack
                    Summary</PrimeButton>
            </div>
        </div>
    );
}

export default ScanRackQrCode;