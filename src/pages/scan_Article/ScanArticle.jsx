import {useEffect, useRef, useState} from 'react';
import StickyTitle from "../../components/StickyTitle.jsx";
import ZxingQrEanScanner from "../../utils/zxingQrEanScanner/ZxingQrEanScanner.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import {
    barScanContainer,
    barScanImg,
    barScanOverlay,
    barScanVideo,
    scanArticleContainer, scanArticleDamageBtn, scanArticleDamageBtnDisabled,
    scanArticleDamageBtnImg, scanArticleEAN, scanArticleEanInputWarning, scanArticleFormBlock,
    scanArticleInputButton,
    scanArticleScannerBlock,
    scanArticleSInputBlock,
    scanArticleSRButtons,
    scanArticleSResultArticleDetails,
    scanArticleSResultBlock,
    scanArticleWrap
} from "../../styles/pages/ScanArticleStyle.js";
import useStore from "../../store/useStore.js";
import {orangeButton} from "../../styles/components/reusableСomponentsStyle.js";
import PrimeInput from "../../components/PrimeInput.jsx";
import ArticleQuantityDotForm from "../../components/ArticleQuantityDotForm.jsx";
import warming from "../../assets/icons/warning.svg";
import {usePageTranslation} from "../../i18n/hooks/hooks.js";


function ScanArticle() {
    // Translations
    const { t: scanArticleT } = usePageTranslation();

    const [eanInputValue, setEanInputValue] = useState("");
    const [eanInputWarning, setEanInputWarning] = useState("");
    const [quantityInputValue, setQuantityInputValue] = useState('');
    const [dateInputValue, setDateInputValue] = useState("");
    const [isValidQuantityAndDate, setIsValidQuantityAndDate] = useState(false);
    const [dateInputWarning, setDateInputWarning] = useState("");


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
    const formRef = useRef();

    const setCurrentPage = useStore((state) => state.setCurrentPage)
    const currentJob = useStore((state) => state.jobSummary.currentJob);

    const articleSummary = useStore((state) => state.articleSummary);
    const setArticleSummary = useStore((state) => state.setArticleSummary);

    const currentRackSummary = useStore((state) => state.rackSummary)
    const setRackSummary = useStore((state) => state.setRackSummary)

    const setUpdateScannedRacksHistory = useStore((state) => state.setUpdateScannedRacksHistory)
    const setUpdateScannedArticlesHistory = useStore((state) => state.setUpdateScannedArticlesHistory);

    const isArticleSummaryExist = Boolean(Object.keys(articleSummary).length);


    function resetArticle() {
        setEanInputValue('');
        setEanInputWarning('');
        setQuantityInputValue('');
        setDateInputValue('');
        setDateInputWarning('');
        setIsValidQuantityAndDate(false);
        setArticleSummary({});
    }


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
            setArticleSummary(currentArticle);
            setDateInputValue(currentArticle.dot);
            formRef.current?.handleDateInput(currentArticle.dot);
            setEanInputValue('');
        } else {
            setEanInputWarning(scanArticleT("warnings.eanInCorrect"));
        }
    };

    const handleScanStart = () => {
        resetArticle();
        startRef.current?.();
    };

    const handleEanInput = (value) => {
        if (eanInputWarning) {
            setEanInputWarning('');
        }
        setEanInputValue(value);
    }

    function getScanButtonLabel(renderScanProps, eanInputValue) {
        if (eanInputValue) {
            return scanArticleT("btns.addEan");
        }
        return !renderScanProps.isScanning ? scanArticleT("btns.scan") : scanArticleT("btns.stop");
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
                {...article, quantity: qtyToAdd}
            ];
        }

        setRackSummary({
            totalItems: currentRackSummary.totalItems + qtyToAdd,
            SKUs: updatedSKUs
        });

        setUpdateScannedRacksHistory({
            rackID: currentRackSummary.rackID,
            totalItems: currentRackSummary.totalItems + qtyToAdd,
            SKUs: updatedSKUs
        });

    }

    function updateUsedRacksForArticle(article, rackID, quantityToAdd) {
        const dot = article.dot;
        const existingUsedRacks = article.racksUsed ?? [];

        const rackIndex = existingUsedRacks.findIndex(r => r.rackID === rackID && r.dot === dot);

        let updatedRacksUsed;
        if (rackIndex !== -1) {
            updatedRacksUsed = [...existingUsedRacks];
            updatedRacksUsed[rackIndex] = {
                ...updatedRacksUsed[rackIndex],
                quantity: updatedRacksUsed[rackIndex].quantity + quantityToAdd,
                dot
            };
        } else {
            updatedRacksUsed = [
                ...existingUsedRacks,
                {
                    rackID,
                    quantity: quantityToAdd,
                    dot
                }
            ];
        }

        return {
            ...article,
            quantity: article.quantity - quantityToAdd,
            racksUsed: updatedRacksUsed
        };
    }


    function handleConfirmQuantity() {
        const inputQty = parseInt(quantityInputValue, 10);
        if (!inputQty || inputQty <= 0) return;

        const updatedSummary = {
            ...articleSummary,
            dot: dateInputValue
        };

        const updatedArticle = updateUsedRacksForArticle(updatedSummary, currentRackSummary.rackID, inputQty);
        setArticleSummary(updatedArticle);

        setRackSummaryWithMerge(updatedSummary, inputQty);
        setUpdateScannedArticlesHistory(updatedSummary, inputQty, currentRackSummary);

        handleGoTo("scanRackQR");
    }


    useEffect(() => {
        if (articleSummary.quantity === 0) {
            resetArticle();
            return;
        }
        if (articleSummary.dot && articleSummary.quantity > 0) {
            setDateInputValue(articleSummary.dot);
            formRef.current?.handleDateInput(articleSummary.dot);
        }
    }, []);


    return (
        <div className={scanArticleContainer}>
            <StickyTitle title1={scanArticleT("stickyTitle.title1")} title2={scanArticleT("stickyTitle.title2")}/>
            <button className={isArticleSummaryExist ? scanArticleDamageBtn : scanArticleDamageBtnDisabled}
                    disabled={!isArticleSummaryExist}
            onClick={() => handleGoTo("damageReport")}>
                <img className={scanArticleDamageBtnImg} src={`${warming}`} alt="warning"/>
            </button>
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
                <PrimeInput value={eanInputValue} placeholder={scanArticleT("inputs.ean")} onChange={handleEanInput}
                            idInput={"EAN"} onFocus={() => stopRef.current?.()} type={'number'}/>
                <PrimeButton className={scanArticleInputButton}
                             onClick={handleScanButtonClick}>
                    {getScanButtonLabel(renderScanProps, eanInputValue)}
                </PrimeButton>
                <div className={scanArticleEanInputWarning}>{eanInputWarning}</div>
            </div>
            <div className={scanArticleWrap}>
                <div className={scanArticleSResultBlock}>
                    <div className={scanArticleSResultArticleDetails}>
                        <p className={scanArticleEAN}>{scanArticleT("artInfo.ean")}</p>
                        <p className={scanArticleEAN}>{articleSummary.ean ? articleSummary.ean : ".."}</p>
                        <p>{scanArticleT("artInfo.brand")}</p>
                        <p>{articleSummary.name ? articleSummary.name : ".."}</p>
                        <p>{scanArticleT("artInfo.size")}</p>
                        <p>{articleSummary.size ? articleSummary.size : ".."}</p>
                        <p>{scanArticleT("artInfo.dot")}</p>
                        <p>{articleSummary.dot ? articleSummary.dot : ".."}</p>

                        <p>{scanArticleT("artInfo.unplacedQuantity")}</p>
                        <p>{articleSummary.quantity ? articleSummary.quantity : ".."}</p>
                    </div>
                </div>
            </div>

            <div className={scanArticleFormBlock}>
                <ArticleQuantityDotForm objSummary={articleSummary} quantityInputValue={quantityInputValue} tireQuantity={articleSummary.quantity}
                                        dateInputValue={dateInputValue} setIsValidQuantityAndDate={setIsValidQuantityAndDate}
                                        setQuantityInputValue={setQuantityInputValue} setDateInputValue={setDateInputValue} ref={formRef}
                                        setDateInputWarning={setDateInputWarning} dateInputWarning={dateInputWarning}/>
            </div>
            <div className={scanArticleSRButtons}>
                <PrimeButton onClick={handleConfirmQuantity}
                             disabled={!(Number(quantityInputValue) > 0 && isValidQuantityAndDate && articleSummary.ean)}>{scanArticleT("btns.confirmQtty")}</PrimeButton>
                <PrimeButton className={orangeButton} onClick={() => handleGoTo("articleSummary")}
                             disabled={!isArticleSummaryExist}>{scanArticleT("btns.articleSummary")}</PrimeButton>
                <PrimeButton onClick={() => handleGoTo("scanRackQR")}>{scanArticleT("btns.addRack")}</PrimeButton>
            </div>
        </div>
    );
}

export default ScanArticle;