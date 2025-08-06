import {
    jobOverviewContainer, jobOverviewConveyor,
    jobOverviewConveyorBeltMode, jobOverviewBlocksWrap,
    jobOverviewSKUs, jobOverviewConveyorBeltModeRadio, jobOverviewH1, jobOverviewSKUsTitle, jobOverviewH2
} from "../../styles/pages/jobOverviewStyles.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import JobOverviewTyreCard from "./JobOverviewTyreCard.jsx";
import useStore from "../../store/useStore.js";
import JobOverviewInfoCard from "./jobOverviewInfoCard.jsx";
import {usePageTranslation} from "../../i18n/hooks/hooks.js";

function JobOverview() {
    // Translations
    const { t: overviewT } = usePageTranslation();

    const currentJob = useStore(state => state.jobSummary.currentJob);
    const {grID, skuTires} = currentJob;

    const totalRacks = skuTires.reduce((sum, item) => sum + (item.racks || 0), 0);


    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleStartScanRackQrCode() {
        setCurrentPage("scanRackQR");
    }

    return (
        <div className={jobOverviewContainer}>
            <StickyTitle title1={overviewT("stickyTitle.title1")} title2={`${overviewT("stickyTitle.title2")} ${grID}`}/>
            <div className={jobOverviewBlocksWrap}>
                <JobOverviewInfoCard currentJob={currentJob}/>
                <div className={jobOverviewSKUsTitle}>
                    <h1 className={jobOverviewH1}>{`${overviewT("jobOverviewSKUsTitle.jobOverviewH1")} ${currentJob?.skuTires.length || 0}`}</h1>
                    <h1 className={jobOverviewH2}>{`${overviewT("jobOverviewSKUsTitle.jobOverviewH2")} ${totalRacks || 0}`}</h1>
                </div>
                <div className={jobOverviewSKUs}>
                    {
                        skuTires.map((sku, i) => {
                            return (<JobOverviewTyreCard key={`${i}-${sku.ean}`} skuTires={sku}/>)
                        })
                    }
                </div>

                <div className={jobOverviewConveyor}>
                    <h1 className={jobOverviewH1}>{overviewT("overviewConveyor.title")}</h1>
                    <div className={jobOverviewConveyorBeltMode}>
                        <input className={jobOverviewConveyorBeltModeRadio} id={"beltMode"} type="radio"/>
                        <label htmlFor="beltMode">{overviewT("overviewConveyor.label")}</label>
                    </div>
                    <PrimeButton onClick={handleStartScanRackQrCode}>{overviewT("btns.addRack")}</PrimeButton>
                </div>
            </div>
        </div>
    )
}

export default JobOverview
