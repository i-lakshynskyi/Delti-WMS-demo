import React, {useEffect, useRef, useState} from 'react';
import StickyTitle from "../../components/StickyTitle.jsx";
import ZxingQrEanScanner from "../../utils/zxingQrEanScanner/ZxingQrEanScanner.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import {
    barScanContainer,
    barScanImg,
    barScanOverlay,
    barScanVideo,
    scanArticleContainer, scanArticleEanInputWarning,
    scanArticleInputButton,
    scanArticleScannerBlock,
    scanArticleSInputBlock,
    scanArticleSRButtons,
    scanArticleSResultArticleDetails,
    scanArticleSResultBlock,
    scanArticleSResultForm,
    scanArticleSResultFormWarning,
    scanArticleWrap
} from "../../styles/pages/ScanArticleStyle.js";
import useStore from "../../store/useStore.js";
import {orangeButton} from "../../styles/components/reusableСomponentsStyle.js";
import PrimeInput from "../../components/PrimeInput.jsx";


function ScanArticle() {
    const [eanInputValue, setEanInputValue] = useState("");
    const [eanInputWarning, setEanInputWarning] = useState("");
    const [quantityInputValue, setQuantityInputValue] = useState('');
    const [dateInputValue, setDateInputValue] = useState("");
    const [dateInputWarning, setDateInputWarning] = useState("");
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
    const currentJob = useStore((state) => state.jobSummary.currentJob);

    const currentArticle = useStore((state) => state.currentArticle);
    const setCurrentArticle = useStore((state) => state.setCurrentArticle)

    const currentRackSummary = useStore((state) => state.rackSummary)
    const setRackSummary = useStore((state) => state.setRackSummary)

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    // On RESULT
    const handleBarResult = (data) => {
        if (!currentJob || !Array.isArray(currentJob.skuTires)) {
            return null;
        }
        const currentArticle = currentJob.skuTires.find(tire => tire.ean === data) || {};
        if (Object.keys(currentArticle).length > 0) {
            setCurrentArticle(currentArticle);
            setDateInputValue(currentArticle.dot);
            handleDateInput(currentArticle.dot);
            setEanInputValue('');
        }else {
            setEanInputWarning("EAN is not correct")
        }
    };

    const handleScanStart = () => {
        setCurrentArticle({});
        setDateInputValue('');
        setEanInputWarning('');
        setEanInputValue('');
        startRef.current?.();
    };

    const handleEanInput = (value) => {
        if (eanInputWarning) {
            setEanInputWarning('');
        }
        setEanInputValue(value);
    }
    const handleNumberInput = (value) => {
        const val = parseInt(value, 10);
        const maxQty = currentArticle?.quantity || 0;

        if (isNaN(val)) {
            setQuantityInputValue('');
        } else if (val >= 0 && val <= 1000 && val <= maxQty) {
            setQuantityInputValue(String(val));
        } else if (val > maxQty) {
            setQuantityInputValue(String(maxQty));
        }
    };

    ///////////////////////////// handleDateInput //////////////////////////////////////
    const handleDateInput = (value) => {
        if (!/^\d{0,4}$/.test(value)) {
            setDateInputWarning("Only digits are allowed");
            return;
        }

        if (value.length < 4) {
            setIsValidQuantityAndDate(false);
        }

        // Check WW
        const week1 = parseInt(value[0], 10);
        if (week1 < 0 || week1 > 5) {
            setDateInputWarning("The first digit of the week must be between 0 and 5");
            return;
        } else {
            setDateInputWarning('');
        }

        const fullWeek = parseInt(value.slice(0, 2), 10);
        if (fullWeek < 0 || fullWeek > 53) {
            setDateInputWarning("Week must be between 01 and 53");
            return;
        } else {
            setDateInputWarning('');
        }

        // Check YY
        const currentShortYear = parseInt(new Date().getFullYear().toString().slice(2));
        if (value.length >= 3) {
            const thirdDigit = parseInt(value[2], 10);
            const currentThird = parseInt(currentShortYear.toString()[0]);
            if (thirdDigit > currentThird) {
                setDateInputWarning(`The year cannot start with a number greater than ${currentThird}`);
                return;
            } else {
                setDateInputWarning('');
            }
        }

        if (value.length === 4) {
            const shortYear = parseInt(value.slice(2), 10);
            if (shortYear > currentShortYear) {
                setDateInputWarning(`The year cannot be greater than ${currentShortYear}`);
                return;
            } else {
                setDateInputWarning('');
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
            setDateInputWarning(`Year ${fullYear} cannot have ${week} weeks — maximum is ${weeksInYear}`
            )
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////

    function getScanButtonLabel(renderScanProps, eanInputValue) {
        if (eanInputValue) {
            return "Add Ean";
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

    function setRackSummaryWithMerge(article, qtyToAdd) {
        const existingIndex = currentRackSummary.SKUs.findIndex(
            sku => sku.ean === article.ean && sku.dot === article.dot
        );

        let updatedSKUs;
        if (existingIndex !== -1) {
            updatedSKUs = [...currentRackSummary.SKUs];
            updatedSKUs[existingIndex] = {
                ...updatedSKUs[existingIndex],
                quantity: updatedSKUs[existingIndex].quantity + qtyToAdd
            };
        } else {
            updatedSKUs = [
                ...currentRackSummary.SKUs,
                { ...article, quantity: qtyToAdd }
            ];
        }

        setRackSummary({
            totalItems: currentRackSummary.totalItems + qtyToAdd,
            SKUs: updatedSKUs
        });
    }


    function handleGetNewRack() {
        const inputQty = parseInt(quantityInputValue, 10);
        if (!inputQty || inputQty <= 0) return;

        const articleForRack = {
            ...currentArticle,
            quantity: inputQty
        };

        const remainingQty = currentArticle.quantity - inputQty;
        setCurrentArticle({
            ...currentArticle,
            quantity: remainingQty
        });

        setRackSummaryWithMerge(currentArticle, inputQty);

        handleGoTo("scanRackQR");
    }

    useEffect(() => {
        if(currentArticle.dot){
            setDateInputValue(currentArticle.dot);
            handleDateInput(currentArticle.dot);
        }
    }, []);


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
                        currentArticle.ean ? <span className={"font-bold"}>EAN: {currentArticle.ean}</span>
                            :
                            <>
                                <PrimeInput value={eanInputValue} placeholder={"EAN"} onChange={handleEanInput}
                                            idInput={"EAN"} onFocus={() => stopRef.current?.()} type={'number'}/>
                                <div className={scanArticleEanInputWarning}>{eanInputWarning}</div>
                            </>
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
                            <p>{currentArticle.quantity ? currentArticle.quantity : "0"}</p>
                        </div>
                    </div>
                    <div className={scanArticleSResultForm}>
                        <div>
                            <PrimeInput labelText={"Quantity"} idInput={'Quantity'} type={"number"}
                                        value={quantityInputValue} onChange={handleNumberInput}/>
                        </div>
                        <div>
                            <PrimeInput labelText={"DOT (WWYY)"} idInput={'DOT(WWYY)'} value={dateInputValue}
                                        onChange={handleDateInput}
                                        inputMode="numeric" maxLength={4} placeholderText={"WWYY"}/>
                        </div>
                    </div>
                    <div className={scanArticleSResultFormWarning}>{dateInputWarning}</div>
                </div>
            </div>

            <div className={scanArticleSRButtons}>
                <PrimeButton onClick={handleGetNewRack}
                             disabled={!(Number(quantityInputValue) > 0 && isValidQuantityAndDate && currentArticle.ean)}>New Rack</PrimeButton>
                <PrimeButton disabled={true}>Complete Job</PrimeButton>
                <PrimeButton className={orangeButton} onClick={() => handleGoTo("articleSummary")} disabled={!(Object.keys(currentArticle).length)}>Article Summary</PrimeButton>
            </div>
        </div>
    );
}

export default ScanArticle;