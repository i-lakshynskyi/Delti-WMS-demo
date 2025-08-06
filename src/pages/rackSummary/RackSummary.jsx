import PrimeButton from "../../components/PrimeButton.jsx";
import StickyTitle from "../../components/StickyTitle.jsx";
import useStore from "../../store/useStore.js";
import {
    rackSummaryButtonsBlock,
    rackSummaryConclusionBlock,
    rackSummaryContainer,
    rackSummaryRackCapacityBlock,
    rackSummarySKUsTable,
    rackSummarySKUsTableBody,
    rackSummarySKUsTableThead,
    rackSummarySKUsTableWrap
} from "../../styles/pages/rackSummaryStyles.js";
import CapacityInPercent from "../../components/CapacityInPercent.jsx";
import {getEarliestDot} from "../../utils/functions.js";
import {useTranslation} from "react-i18next";

function RackSummary() {
    // Translations
    const { t: comboSummaryT } = useTranslation('comboSummaries');

    const rackSummary = useStore((state) => state.rackSummary)
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    const articleSummary = useStore((state) => state.articleSummary);

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    function availableCapacity(maxCapacity, totalItems) {
        const max = Number(maxCapacity);
        const total = Number(totalItems);

        if (isNaN(max) || isNaN(total)) {
            return "0";
        }

        const result = max - total;

        if (isNaN(result) || result < 0) {
            return "0";
        }
        return result;
    }

    const availableCapacityRes = availableCapacity(rackSummary.maxCapacity, rackSummary.totalItems);

    return (
        <div className={rackSummaryContainer}>
            <StickyTitle title1={comboSummaryT("stickyTitle.racSumm.title1")} title2={`${comboSummaryT("stickyTitle.racSumm.title2")} ${rackSummary.rackID ? rackSummary.rackID : ''}`} />
            <div className={rackSummaryContainer}>
                <div className={rackSummaryRackCapacityBlock}>
                    <CapacityInPercent maxCapacity={rackSummary.maxCapacity} totalItems={rackSummary.totalItems}  title={comboSummaryT("capacity.rackTitle")} type={'Rack'}/>
                </div>
                <div className={rackSummarySKUsTableWrap}>
                    <table className={rackSummarySKUsTable}>
                        <thead className={rackSummarySKUsTableThead}>
                        <tr>
                            <th>{comboSummaryT("table.rack.theadSku")}</th>
                            <th>{comboSummaryT("table.rack.theadQuantity")}</th>
                            <th>{comboSummaryT("table.rack.theadDOT")}</th>
                        </tr>
                        </thead>
                        <tbody className={rackSummarySKUsTableBody}>
                        {rackSummary.SKUs.map((sku, index) => (
                            <tr key={`${sku.ean}-${index}`}>
                                <td>{sku.ean}</td>
                                <td>{sku.quantity}</td>
                                <td>{sku.dot}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={rackSummaryConclusionBlock}>
                    <p>{comboSummaryT("conclusion.rack.totalItems")}</p>  <p>{rackSummary.totalItems ? rackSummary.totalItems : "0"}</p>
                    <p>{comboSummaryT("conclusion.rack.availableCapacity")}</p>  <p>{availableCapacityRes}</p>
                    <p>{comboSummaryT("conclusion.rack.totalSKUs")}</p>   <p>{rackSummary?.SKUs?.length}</p>
                    <p>{comboSummaryT("conclusion.rack.earliestDOT")}</p> <p>{getEarliestDot(rackSummary.SKUs)}</p>
                </div>
                <div className={rackSummaryButtonsBlock}>
                    <PrimeButton onClick={() => handleGoTo("scanRackQR")}>{comboSummaryT("btns.rack.scanRack")}</PrimeButton>
                    <PrimeButton onClick={() => handleGoTo("scanArticle")} disabled={!availableCapacityRes || articleSummary?.quantity === 0}>{comboSummaryT("btns.rack.addArticle")}</PrimeButton>
                </div>
            </div>
        </div>

    );
}

export default RackSummary;