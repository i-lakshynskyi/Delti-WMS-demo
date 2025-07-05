import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {QRScannerContainer, QRScannerWrap} from "./QRScannerStyles.js";
import PrimeButton from "../../components/PrimeButton.jsx";

function QRScanner({ onResult = (decodedText) => {} }) {
    const [isScanning, setIsScanning] = useState(false);
    const html5QrCodeRef = useRef(null);
    const cameraIdRef = useRef(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        Html5Qrcode.getCameras()
            .then((devices) => {
                if (devices && devices.length > 0) {
                    cameraIdRef.current = devices[0].id;
                } else {
                    alert("Камери не знайдено.");
                }
            })
            .catch((err) => {
                console.error("Помилка доступу до камери:", err);
            });
    }, []);

    const startScanner = async () => {
        if (!cameraIdRef.current) return;

        html5QrCodeRef.current = new Html5Qrcode(scannerRef.current.id);

        try {
            await html5QrCodeRef.current.start(
                // cameraIdRef.current,
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 200, height: 200 } },
                (decodedText) => {
                    onResult(decodedText);
                    stopScanner();
                }
            );
            setIsScanning(true);
        } catch (err) {
            console.error("Не вдалося запустити сканер:", err);
        }
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current) {
            await html5QrCodeRef.current.stop();
            await html5QrCodeRef.current.clear();
            html5QrCodeRef.current = null;
            setIsScanning(false);
        }
    };

    return (
        <div className={QRScannerContainer}>
            <div id="qr-reader" ref={scannerRef} className={QRScannerWrap} />
            <PrimeButton onClick={isScanning ? stopScanner : startScanner}>
                {isScanning ? "Stop Scanning" : "Start Scanning"}
            </PrimeButton>
        </div>
    );
}

export default QRScanner;
