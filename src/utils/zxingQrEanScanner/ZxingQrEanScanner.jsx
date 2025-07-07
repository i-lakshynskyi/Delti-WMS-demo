import React, {useEffect, useRef, useState} from "react";
import {BrowserMultiFormatReader} from "@zxing/browser";
import {ZxingQrOverlay, ZxingQrOverlayImg, ZxingQRScannerContainer, ZxingQRScannerWrap} from "./ZxingQrEanScannerStyles.js";
import * as ZXingBrowser from "@zxing/browser";
import PrimeButton from "../../components/PrimeButton.jsx";
import QRCode from "../../assets/icons/qr-colored.svg";

function ZxingQrEanScanner({isScanning, setIsScanning, onResult = (decodedData) => {}, startScanProcess = (fn) => {}, stopScanProcess = (fn) => {}}) {
    const [isFirstScanning, setIsFirstScanning] = useState(true);
    const videoRef = useRef(null);
    const controlsRef = useRef(null);
    const codeReaderRef = useRef(new BrowserMultiFormatReader());

    {/*For test without parent's control U can Uncomment*/}
    /*async function getFirstCameraId() {
        const devices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
        if (devices.length > 0) {
            return devices[0].deviceId;
        } else {
            alert("No devices found.");
            return null;
        }
    }


    async function startScan() {
        setIsScanning(true);
        console.log('startScan started');

        let deviceId = '';
        if (!deviceId) {
            deviceId = await getFirstCameraId();
            if (!deviceId) return;
        }


        try {
            controlsRef.current = await codeReaderRef.current.decodeFromVideoDevice(
                deviceId,
                videoRef.current,
                (result, error, controls) => {
                    if (result) {
                        console.log("✅ QR код:", result.getText());
                        controls.stop();
                    }
                    if (error) {
                        console.warn("❗", error);
                    }
                }
            );
        } catch (err) {
            console.error("🚫 Не вдалося запустити сканер:", err);
        }

        console.log('startScan finished');
    }

    function stopScan() {
        controlsRef.current?.stop();
        setIsScanning(false);
        console.log('stopScan');
    }*/

    const startScan = async () => {
        setIsScanning(true);
        try {
            const devices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
            if (!devices.length) return alert("😞 Camera not found");

            const selectedDeviceID = devices[0].deviceId;

            controlsRef.current = await codeReaderRef.current.decodeFromConstraints(
                {
                    video: {facingMode: "environment"}
                },
                videoRef.current,
                (result, error, controls) => {
                    if (result) {
                        onResult(result.getText());
                        controls.stop();
                        setIsScanning(false);
                    }
                }
            );
        } catch (err) {
            console.error("🚫 Scanner start error:", err);
        }
    };

    function stopScan() {
        controlsRef.current?.stop();
        setIsScanning(false);
    }


    useEffect(() => {
        startScanProcess(startScan);
        stopScanProcess(stopScan);
    }, [startScanProcess]);

    useEffect(() => {
        return stopScan;
    }, []);

    return (
        <>
            <div className={ZxingQRScannerContainer}>
                {!isScanning && (
                    <div className={ZxingQrOverlay}>
                        <img src={`${QRCode}`} alt="qr-code" className={ZxingQrOverlayImg}/>
                    </div>
                )}
                <video id="qr-preview" ref={videoRef} className={ZxingQRScannerWrap}/>
            </div>
            {/*For test without parent's control U can Uncomment*/}
            {/*<PrimeButton onClick={startScan} disabled={isScanning}>Start Scan</PrimeButton>*/}
            {/*<PrimeButton onClick={stopScan} disabled={!isScanning}>Stop Scan</PrimeButton>*/}
        </>
    );
}

export default ZxingQrEanScanner;
