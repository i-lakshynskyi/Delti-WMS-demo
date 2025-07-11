import {
    jobOverviewContainer, jobOverviewConveyor,
    jobOverviewConveyorBeltMode, jobOverviewBlocksWrap,
    jobOverviewSKUs, jobOverviewConveyorBeltModeRadio, jobOverviewH1
} from "../../styles/pages/jobOverviewStyles.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import JobOverviewTyreCard from "./JobOverviewTyreCard.jsx";
import useStore from "../../store/useStore.js";
import JobOverviewInfoCard from "./jobOverviewInfoCard.jsx";

function JobOverview() {
    const currentJob = useStore(state => state.jobSummary.currentJob);
    const {skuTires} = currentJob;

    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleStartScanRackQrCode() {
        setCurrentPage("scanRackQR");
    }

    return (
        <div className={jobOverviewContainer}>
            <StickyTitle title1={'Job Overview'} title2={'GR Job: GR-2025-061901'}/>
            <div className={jobOverviewBlocksWrap}>
                <JobOverviewInfoCard currentJob={currentJob}/>
                <div className={jobOverviewSKUs}>
                    <h1 className={jobOverviewH1}>{`Tyre SKUs : ${currentJob?.skuTires.length || 0}`}</h1>
                    {
                        skuTires.map((sku, i) => {
                            return (<JobOverviewTyreCard key={`${i}-${sku.ean}`} skuTires={sku}/>)
                        })
                    }
                </div>

                <div className={jobOverviewConveyor}>
                    <h1 className={jobOverviewH1}>{"Conveyor Belt Mode"}</h1>
                    <div className={jobOverviewConveyorBeltMode}>
                        <input className={jobOverviewConveyorBeltModeRadio} id={"beltMode"} type="radio"/>
                        <label htmlFor="beltMode">Conveyor Belt with Auto-Scanning</label>
                    </div>
                    <PrimeButton onClick={handleStartScanRackQrCode}>Add Rack</PrimeButton>
                </div>
            </div>
        </div>
    )
}

export default JobOverview
