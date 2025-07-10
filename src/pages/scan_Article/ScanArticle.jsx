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
    scanArticleSRButtons,
    scanArticleSResultArticleDetails,
    scanArticleSResultBlock,
    scanArticleSResultForm,
    scanArticleSResultFormWarning,
    scanArticleSResultScannedRacks,
    scanArticleWrap
} from "../../styles/pages/ScanArticleStyle.js";
import useStore from "../../store/useStore.js";
import {orangeButton} from "../../styles/components/reusableСomponentsStyle.js";
import PrimeInput from "../../components/PrimeInput.jsx";


function ScanArticle() {
    const [eanInputValue, setEanInputValue] = useState("");
    const [currentEAN, setCurrentEAN] = useState("");
    const [quantityInputValue, setQuantityInputValue] = useState('60');
    const [dateInputValue, setDateInputValue] = useState("");
    const [inputValueWarning, setInputValueWarning] = useState("");
    const [isValidQuantityAndDate, setIsValidQuantityAndDate] = useState(false);


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

    const currentRackSummary = useStore((state) => state.rackSummary)
    const setRackSummary = useStore((state) => state.setRackSummary)

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    const handleBarResult = (data) => {
        if (!currentJob || !Array.isArray(currentJob.skuTires)) {
            return null;
        }
        const currentArticle = currentJob.skuTires.find(tire => tire.ean === data) || {};
        setCurrentArticle(currentArticle);
        setDateInputValue(currentArticle.dot);
        setCurrentEAN(data);
        handleDateInput(currentArticle.dot);
    };

    const handleScanStart = () => {
        setCurrentArticle({});
        startRef.current?.();
    };

    const handleEanInput = (value) => {
        setEanInputValue(value)
    }
    const handleNumberInput = (value) => {
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            setQuantityInputValue('');
        } else if (val >= 0 && val <= 1000) {
            setQuantityInputValue(String(val));
        }
    }
    ///////////////////////////// handleDateInput //////////////////////////////////////
    const handleDateInput = (value) => {
        if (!/^\d{0,4}$/.test(value)) {
            setInputValueWarning("Only digits are allowed");
            return;
        }

        if (value.length < 4) {
            setIsValidQuantityAndDate(false);
        }

        // Check WW
        const week1 = parseInt(value[0], 10);
        if (week1 < 0 || week1 > 5) {
            setInputValueWarning("The first digit of the week must be between 0 and 5");
            return;
        } else {
            setInputValueWarning('');
        }

        const fullWeek = parseInt(value.slice(0, 2), 10);
        if (fullWeek < 0 || fullWeek > 53) {
            setInputValueWarning("Week must be between 01 and 53");
            return;
        } else {
            setInputValueWarning('');
        }

        // Check YY
        const currentShortYear = parseInt(new Date().getFullYear().toString().slice(2));
        if (value.length >= 3) {
            const thirdDigit = parseInt(value[2], 10);
            const currentThird = parseInt(currentShortYear.toString()[0]);
            if (thirdDigit > currentThird) {
                setInputValueWarning(`The year cannot start with a number greater than ${currentThird}`);
                return;
            } else {
                setInputValueWarning('');
            }
        }

        if (value.length === 4) {
            const shortYear = parseInt(value.slice(2), 10);
            if (shortYear > currentShortYear) {
                setInputValueWarning(`The year cannot be greater than ${currentShortYear}`);
                return;
            } else {
                setInputValueWarning('');
                isValidDot(value);
            }
        }

        setDateInputValue(value);
    }

    function isValidDot(dot) {
        const value = parseInt(dot, 10);
        const week = Math.floor(value / 100);
        const shortYear = value % 100;
        const fullYear = 2000 + shortYear;

        function getWeeksInYear(year) {
            const d = new Date(year, 11, 31);
            const day = d.getDay();
            const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
            return (day === 4 || (isLeap && day === 3)) ? 53 : 52;
        }

        const weeksInYear = getWeeksInYear(fullYear);

        if (week <= weeksInYear) {
            setIsValidQuantityAndDate(true);
        }else {
            setInputValueWarning(`Year ${fullYear} cannot have ${week} weeks — maximum is ${weeksInYear}`
            )
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////

    function getScanButtonLabel(renderScanProps, eanInputValue) {
        if (eanInputValue) {
            return "Add EAN";
        }
        return !renderScanProps.isScanning ? "Scan" : "Stop";
    }

    function handleScanButtonClick() {
        if (eanInputValue) {
            handleBarResult(eanInputValue);
        } else if (!renderScanProps.isScanning) {
            handleScanStart();
        } else {
            stopRef.current?.();
        }
    }

    function handleGetNewRack() {
        handleGoTo("scanRackQR");
        setCurrentArticle({});
        setRackSummary({
            totalItems: currentRackSummary.totalItems + parseInt(quantityInputValue, 10),
            SKUs: [...currentRackSummary.SKUs, currentArticle]
        });
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
                    {
                        currentEAN ? <span className={"font-bold"}>EAN: {currentEAN}</span>
                            :
                            <PrimeInput value={eanInputValue} placeholder={"EAN"} onChange={handleEanInput}
                                        idInput={"EAN"} min={0} max={1000} onFocus={() => stopRef.current?.()}/>
                    }
                    <PrimeButton className={scanArticleInputButton}
                                 onClick={handleScanButtonClick}>
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

                            <p>DOT:</p>
                            <p>{currentArticle ? currentArticle.dot : ""}</p>

                            <p>Quantity:</p>
                            <p>{currentArticle ? currentArticle.quantity : ""} (Racks: {currentArticle ? currentArticle.racks : ""})</p>
                        </div>
                    </div>
                    <div className={scanArticleSResultForm}>
                        <div>
                            <PrimeInput className={'w-50'} labelText={"Quantity"} idInput={'Quantity'} type={"number"}
                                        value={quantityInputValue} onChange={handleNumberInput} placeholderText={"60"}/>
                        </div>
                        <div>
                            <PrimeInput labelText={"DOT (WWYY)"} idInput={'DOT(WWYY)'} value={dateInputValue}
                                        onChange={handleDateInput}
                                        inputMode="numeric" maxLength={4} placeholderText={"WWYY"}/>
                        </div>
                    </div>
                    <div className={scanArticleSResultFormWarning}>{inputValueWarning}</div>
                    <div className={scanArticleSResultScannedRacks}>{`Scanned Racks (1/${currentArticle.racks ? currentArticle.racks : ""})`}</div>
                </div>
            </div>

            <div className={scanArticleSRButtons}>
                <PrimeButton onClick={handleGetNewRack}
                             disabled={!(quantityInputValue && isValidQuantityAndDate)}>New Rack</PrimeButton>
                <PrimeButton disabled={true}>Complete Job</PrimeButton>
                <PrimeButton className={orangeButton} onClick={() => handleGoTo("rackSummary")}>Rack
                    Summary</PrimeButton>
            </div>
        </div>
    );
}

export default ScanArticle;