import React, {useEffect, useRef} from "react";
import {BarcodeFormat, BrowserMultiFormatReader} from "@zxing/browser";
import * as ZXingBrowser from "@zxing/browser";
import {DecodeHintType} from "@zxing/library";
import {
    ZxingContainer,
    ZxingOverlay,
    ZxingImg,
    ZxingVideo
} from "./ZxingQrEanScannerStyles.js";
import QRCode from "../../assets/icons/qr-colored.svg";
import BarCode from "../../assets/icons/barcode.svg";

function ZxingQrEanScanner({renderProps, setRenderScanProps, onResult = (decodedData) => {}, startScanProcess = (fn) => {}, stopScanProcess = (fn) => {}}) {
    const videoRef = useRef(null);
    const controlsRef = useRef(null);

    const {isScanning, pageName, styleClassNameProps} = renderProps;

    const QR_FORMATS = [BarcodeFormat.QR_CODE];
    const BAR_FORMATS = [
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.CODE_128,
        BarcodeFormat.CODE_39,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E
    ];
    const selectedFormats = pageName === "QR" ? QR_FORMATS : BAR_FORMATS;
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, selectedFormats);

    const codeReaderRef = useRef(new BrowserMultiFormatReader(hints));

    const startScan = async () => {
        setRenderScanProps(prev => ({...prev, isScanning: true}) );
        try {
            const devices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
            if (!devices.length) return alert("😞 Camera not found");

            const selectedDeviceID = devices[0].deviceId;

            controlsRef.current = await codeReaderRef.current.decodeFromConstraints(
                {
                    video: {facingMode: "environment"},
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    advanced: [
                        { focusMode: 'continuous' }
                    ]
                },
                videoRef.current,
                (result, error, controls) => {
                    if (result) {
                        onResult(result.getText());
                        controls.stop();
                        setRenderScanProps(prev => ({...prev, isScanning: false}) );
                    }
                }
            );
        } catch (err) {
            console.error("🚫 Scanner start error:", err);
        }
    };

    function stopScan() {
        controlsRef.current?.stop();
        setRenderScanProps(prev => ({...prev, isScanning: false}) );
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
            <div className={`${ZxingContainer} ${styleClassNameProps.container}`}>
                {!isScanning && (
                    <div className={`${ZxingOverlay} ${styleClassNameProps.overlay}`}>
                        <img src={`${pageName === "QR" ? QRCode : BarCode}`} alt="qr-code"
                             className={`${ZxingImg} ${styleClassNameProps.img}`}/>
                    </div>
                )}
                <video id="qr-preview" ref={videoRef} className={ZxingVideo}/>
            </div>
        </>
    );
}

export default ZxingQrEanScanner;
