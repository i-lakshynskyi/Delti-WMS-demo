import React, {useRef, useState} from 'react';
import StickyTitle from "../../components/StickyTitle.jsx";
import ZxingQrEanScanner from "../../utils/zxingQrEanScanner/ZxingQrEanScanner.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import {
    barScanContainer,
    barScanImg,
    barScanOverlay,
    barScanVideo,
    scanArticleContainer,
    scanArticleInputButton,
    scanArticleScannerBlock,
    scanArticleSInputBlock,
    scanArticleSRButtons, scanArticleSResultArticleDetails,
    scanArticleSResultBlock, scanArticleSResultForm, scanArticleSResultScannedRacks, scanArticleWrap
} from "../../styles/pages/ScanArticleStyle.js";
import useStore from "../../store/useStore.js";
import {orangeButton} from "../../styles/components/reusableСomponentsStyle.js";
import PrimeInput from "../../components/PrimeInput.jsx";



function ScanArticle() {
    const [eanInputValue, setEanInputValue] = useState("");
    const [numberInputValue, setNumberInputValue] = useState('60');
    const [dateInputValue, setDateInputValue] = useState("12/09/2025");
    const [renderScanProps, setRenderScanProps] = useState({
        isScanning: false,
        pageName: 'BUR',
        styleClassNameProps: {
            container: barScanContainer,
            overlay: barScanOverlay,
            img: barScanImg,
            video: barScanVideo
        }
    });

    const startRef = useRef(null);
    const stopRef = useRef(null);

    const setCurrentPage = useStore((state) => state.setCurrentPage)
    const currentJob = useStore((state) => state.currentJob);
    const currentArticle = useStore((state) => state.currentArticle);

    const setCurrentArticle = useStore((state) => state.setCurrentArticle)

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    const handleBarResult = (data) => {
        if (!currentJob || !Array.isArray(currentJob.skuTires)) {
            return null;
        }
        const currentArticle = currentJob.skuTires.find(tire => tire.ean === data) || {};
        console.log("current article: ", currentArticle);
        setCurrentArticle(currentArticle);
    };

    const handleScanStart = () => {
        setCurrentArticle({});
        startRef.current?.();
    };

    const handleEanInput = (value) => {
        setEanInputValue(value)
    }
    const handleNumberInput = (value) => {
        setNumberInputValue(value)
    }
    const handleDateInput = (value) => {
        setDateInputValue(value)
    }

    function getScanButtonLabel(renderScanProps, eanInputValue) {
        if (eanInputValue) {
            return "Add EAN";
        }

        return !renderScanProps.isScanning ? "Scan" : "Stop";
    }


    return (
        <div className={scanArticleContainer}>
            <StickyTitle title1={"Scan Article"} title2={"Scan and add articles to the current rack"}/>
            <div className={scanArticleWrap}>
                <div className={scanArticleScannerBlock}>
                    <ZxingQrEanScanner
                        renderProps={renderScanProps}
                        setRenderScanProps={setRenderScanProps}
                        onResult={handleBarResult}
                        startScanProcess={(fn) => (startRef.current = fn)}
                        stopScanProcess={(fn) => (stopRef.current = fn)}
                    />
                </div>
                <div className={scanArticleSInputBlock}>
                    <PrimeInput value={eanInputValue} placeholder={"EAN"} onChange={handleEanInput} idInput={"EAN"}/>
                    <PrimeButton className={scanArticleInputButton}
                                 onClick={!renderScanProps.isScanning ? handleScanStart : () => stopRef.current?.()}>
                        {getScanButtonLabel(renderScanProps, eanInputValue)}
                    </PrimeButton>
                </div>
                <div className={scanArticleSResultBlock}>
                    <div>
                        <p>Article Details</p>
                        <div className={scanArticleSResultArticleDetails}>
                            <p>Brand:</p>
                            <span>
                                <p>{currentArticle ? currentArticle.name : ""}</p>
                                <p>{currentArticle ? currentArticle.size : ""}</p>
                            </span>

                            <p>EAN:</p>
                            <p>{currentArticle ? currentArticle.ean : ""}</p>

                            <p>DOT:</p>
                            <p>{currentArticle ? currentArticle.dot : ""}</p>

                            <p>Quantity:</p>
                            <p>{currentArticle ? currentArticle.quantity : ""}</p>
                        </div>
                    </div>
                    <div className={scanArticleSResultForm}>
                        <div className={'flex-1 max-w-full'}>
                            <PrimeInput labelText={"DOT (MMYY)"} idInput={'DOT(MMYY)'} type={"date"} value={dateInputValue} onChange={handleDateInput}/>
                        </div>
                        <div className={'flex-1 max-w-full'}>
                            <PrimeInput className={'w-50'} labelText={"Quantity"} idInput={'Quantity'} type={"number"} value={numberInputValue} onChange={handleNumberInput}/>
                        </div>
                    </div>
                    <div className={scanArticleSResultScannedRacks}>Scanned Racks (1/5)</div>
                </div>
            </div>

            <div className={scanArticleSRButtons}>
                <PrimeButton onClick={() => handleGoTo("scanRackQR")}>New Rack</PrimeButton>
                <PrimeButton disabled={true}>Complete Job</PrimeButton>
                <PrimeButton className={orangeButton} onClick={() => handleGoTo("rackSummary")}>Rack
                    Summary</PrimeButton>
            </div>
        </div>
    );
}

export default ScanArticle;