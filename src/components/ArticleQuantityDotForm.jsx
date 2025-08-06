import {forwardRef, useImperativeHandle} from "react";
import PrimeInput from "./PrimeInput.jsx";
import {
    scanArticleSResultForm,
    scanArticleSResultFormWarning
} from "../styles/components/ArticleQuantityDotFormStyles.js";
import {useTranslation} from "react-i18next";

const ArticleQuantityDotForm = forwardRef(({
                                               objSummary,
                                               tireQuantity,
                                               quantityInputValue,
                                               dateInputValue,
                                               setIsValidQuantityAndDate,
                                               setQuantityInputValue,
                                               setDateInputValue,
                                               setDateInputWarning,
                                               dateInputWarning
                                           }, ref) => {

    // Translations
    const { t: scanArticleT } = useTranslation("scanArticle");


    const handleNumberInput = (value) => {
        const numeric = value.replace(/\D/g, '');
        const val = parseInt(numeric, 10);
        const maxQty = tireQuantity || 0;

        if (isNaN(val)) {
            setQuantityInputValue('');
        } else if (val >= 0 && val <= 1000 && val <= maxQty) {
            setQuantityInputValue(String(val));
        } else if (val > maxQty) {
            setQuantityInputValue(String(maxQty));
        }
    };

    const handleDateInput = (value) => {
        if (!/^\d{0,4}$/.test(value)) {
            setDateInputWarning(scanArticleT("warnings.onlyDigits"));
            return;
        }

        if (value.length < 4) {
            setIsValidQuantityAndDate(false);
        }

        // Check WW
        const week1 = parseInt(value[0], 10);
        if (week1 < 0 || week1 > 5) {
            setDateInputWarning(scanArticleT("warnings.week1"));
            return;
        } else {
            setDateInputWarning('');
        }

        const fullWeek = parseInt(value.slice(0, 2), 10);
        if (fullWeek < 0 || fullWeek > 53) {
            setDateInputWarning(scanArticleT("warnings.week2"));
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
                setDateInputWarning(`${scanArticleT("warnings.year1")} ${currentThird}`);
                return;
            } else {
                setDateInputWarning('');
            }
        }

        if (value.length === 4) {
            const shortYear = parseInt(value.slice(2), 10);
            if (shortYear > currentShortYear) {
                setDateInputWarning(`${scanArticleT("warnings.year2")} ${currentShortYear}`);
                return;
            } else {
                setDateInputWarning('');
                isValidDot(value);
            }
        }

        setDateInputValue(value);
    }

    useImperativeHandle(ref, () => ({
        handleDateInput
    }));

    function isValidDot(dot) {
        const value = parseInt(dot, 10);
        const week = Math.floor(value / 100);

        if (week < 1 || week > 53) {
            setDateInputWarning(scanArticleT("warnings.week2"));
            return;
        }

        setIsValidQuantityAndDate(true);
        setDateInputWarning('');
    }


    return (
        <>
            <div className={scanArticleSResultForm}>
                <div>
                    <PrimeInput labelText={scanArticleT("inputs.quantity")} idInput={'Quantity'}
                                value={quantityInputValue} onChange={handleNumberInput} placeholderText={scanArticleT("inputs.quantity")}/>
                </div>
                <div>
                    <PrimeInput labelText={`${scanArticleT("inputs.dot")} (WWYY)`} idInput={'DOT(WWYY)'} value={dateInputValue}
                                onChange={handleDateInput} maxLength={4} placeholderText={"WWYY"}/>
                </div>
            </div>
            <div className={scanArticleSResultFormWarning}>{dateInputWarning}</div>
        </>
    );
});

export default ArticleQuantityDotForm;
