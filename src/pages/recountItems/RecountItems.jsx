import React, {useEffect, useRef, useState} from "react";
import {
    recountItemsArticleInfo,
    recountItemsButtonBlock,
    recountItemsContainer,
    recountItemsRacksList,
    recountItemsTableEditBlockIMG,
    title,
    recountItemsTableEditContainer,
    recountItemsTableEditButtonsWrap,
    boldText,
    editTitle,
    recountItemsTableRowHeader, recountItemsTableRow
} from "../../styles/pages/RecountItemsStyles.js";
import PrimeButton from "../../components/PrimeButton.jsx";
import useStore from "../../store/useStore.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import edit from "../../assets/icons/edit.svg";
import confirm from "../../assets/icons/confirm.svg";
import cancel from "../../assets/icons/cancel.svg";
import ArticleQuantityDotForm from "../../components/ArticleQuantityDotForm.jsx";
import JobSummaryArticleCard from "../jobSummary/JobSummaryArticleCard.jsx";
import {usePageTranslation} from "../../i18n/hooks/hooks.js";

function RecountItems() {
    // Translations
    const { t: recountT } = usePageTranslation();

    const [racksList, setRacksList] = useState(null);
    const [editingRack, setEditingRack] = useState(null);
    const [quantityInputValue, setQuantityInputValue] = useState('');
    const [dateInputValue, setDateInputValue] = useState("");
    const [isValidQuantityAndDate, setIsValidQuantityAndDate] = useState(false);
    const [dateInputWarning, setDateInputWarning] = useState("");
    const formRef = useRef(null);

    const currentPage = useStore((state) => state.currentPage);
    const setCurrentPage = useStore((state) => state.setCurrentPage);
    const scannedArticlesHistory = useStore((state) => state.scannedArticlesHistory);
    const setFixDotQuantityForArticle = useStore(state => state.setFixDotQuantityForArticle);
    const currentEditArticle = scannedArticlesHistory.find(article => article.ean === currentPage.params.ean);
    const {ean} = currentEditArticle;


    function handleGoTo(page) {
        setCurrentPage(page);
    }

    function getScannedArticleByEan(ean) {
        if (!Array.isArray(scannedArticlesHistory) || scannedArticlesHistory.length === 0) {
            return null;
        }

        return scannedArticlesHistory.find(article => article.ean === ean) || null;
    }


    function handleEditClick(rack) {
        setEditingRack(rack);
        setQuantityInputValue(String(rack.quantity));
        setDateInputValue(rack.dot);
    }

    function handleCancelEdit() {
        setEditingRack(null);
        setQuantityInputValue('');
        setDateInputValue('');
    }

    function handleSaveEdit() {
        // UPDATE ArticleHistory function
        setFixDotQuantityForArticle({
            rackID: editingRack.rackID,
            originalDot: editingRack.dot,
            newQuantity: quantityInputValue,
            newDot: dateInputValue,
            ean
        });

        handleCancelEdit();
    }


    useEffect(() => {
        const usedRacks = getScannedArticleByEan(ean)
        setRacksList(usedRacks);
    }, [scannedArticlesHistory]);

    useEffect(() => {
        if (editingRack?.dot) {
            formRef.current?.handleDateInput(editingRack.dot);
        }
    }, [editingRack]);


    return (
        <div className={recountItemsContainer}>
            <StickyTitle title1={recountT("stickyTitle.title1")} title2={`${recountT("stickyTitle.title2")} ${ean ? ean : ".."}`}/>

            <div className={recountItemsArticleInfo}>
                <JobSummaryArticleCard article={currentEditArticle} delBtn={true}/>
            </div>

            <p className={title}>{recountT("rackUsed")}</p>
            <div className={recountItemsRacksList}>
                <div className={recountItemsTableRowHeader}>
                    <span className={boldText}>{recountT("table.rack")}</span>
                    <span className={boldText}>{recountT("table.quantity")}</span>
                    <span className={boldText}>{recountT("table.dot")}</span>
                    <span className={boldText}>{recountT("table.edit")}</span>
                </div>
                {racksList?.racksUsed?.map((rack, index) => {
                    const isEditingThisRack =
                        editingRack?.rackID === rack.rackID && editingRack?.dot === rack.dot;

                    return (
                        <React.Fragment key={`${rack.rackID}-${rack.dot}-${index}`}>
                            <div className={recountItemsTableRow}>
                                <span>{rack.rackID}</span>
                                <span>{rack.quantity}</span>
                                <span>{rack.dot}</span>
                                <div>
                                    <button onClick={() => handleEditClick(rack)} disabled={!!editingRack}>
                                        <img className={recountItemsTableEditBlockIMG} src={`${edit}`} alt="edit"/>
                                    </button>
                                </div>
                            </div>
                            {isEditingThisRack && (
                                <div className={recountItemsTableEditContainer}>
                                    <h3 className={editTitle}>{`${recountT("editRack")} ${rack.rackID}`}</h3>
                                    <ArticleQuantityDotForm
                                        ref={formRef}
                                        objSummary={rack}
                                        tireQuantity={racksList.expectedQuantity}
                                        quantityInputValue={quantityInputValue}
                                        dateInputValue={dateInputValue}
                                        setQuantityInputValue={setQuantityInputValue}
                                        setDateInputValue={setDateInputValue}
                                        setIsValidQuantityAndDate={setIsValidQuantityAndDate}
                                        dateInputWarning={dateInputWarning}
                                        setDateInputWarning={setDateInputWarning}
                                    />
                                    <div className={recountItemsTableEditButtonsWrap}>
                                        <PrimeButton
                                            onClick={handleSaveEdit}
                                            disabled={!(Number(quantityInputValue) > 0 && isValidQuantityAndDate)}
                                        >
                                            <img className={recountItemsTableEditBlockIMG} src={`${confirm}`}
                                                 alt="confirm"/>
                                        </PrimeButton>
                                        <PrimeButton onClick={handleCancelEdit}>
                                            <img className={recountItemsTableEditBlockIMG} src={`${cancel}`}
                                                 alt="cancel"/>
                                        </PrimeButton>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}

            </div>

            <div className={recountItemsButtonBlock}>
                <PrimeButton onClick={() => handleGoTo("jobSummary")}
                             disabled={false}>{recountT("btns.confirm")}</PrimeButton>
            </div>
        </div>
    );
}

export default RecountItems
