import {
    jobOverviewContainer, thirdBlock,
    jobOverviewConveyorBeltMode,
    jobOverviewInfoCard, jobOverviewBlocksWrap,
    jobOverviewSKUs, jobOverviewSKUsCards
} from "../../styles/pages/jobOverview.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";

function JobOverview() {
    return (
        <div className={jobOverviewContainer}>
            <StickyTitle title1={'Job Overview'} title2={'GR Job: GR-2025-061901'}/>
            <div className={jobOverviewBlocksWrap}>
                <div className={jobOverviewInfoCard}>Card Block</div>

                <div className={jobOverviewSKUs}>
                    <StickyTitle title1={"Tyre SKUs 3"}/>
                    <div className={jobOverviewSKUsCards}>SKUs block</div>
                    <div className={jobOverviewSKUsCards}>SKUs block</div>
                    <div className={jobOverviewSKUsCards}>SKUs block</div>
                    <div className={jobOverviewSKUsCards}>SKUs block</div>
                    <div className={jobOverviewSKUsCards}>SKUs block</div>
                    <div className={jobOverviewSKUsCards}>SKUs block</div>
                    <div className={jobOverviewSKUsCards}>SKUs block</div>
                    <div className={jobOverviewSKUsCards}>SKUs block</div>
                    <div className={jobOverviewSKUsCards}>SKUs block</div>
                </div>

                <div className={thirdBlock}>
                    <StickyTitle title1={"Conveyor Belt Mode"}/>
                    <div className={jobOverviewConveyorBeltMode}>
                        <input id={"beltMode"} type="radio"/>
                        <label htmlFor="beltMode">Conveyor Belt with Auto-Scanning</label>
                    </div>
                    <PrimeButton>Start Receiving</PrimeButton>
                </div>
            </div>
        </div>
    )
}

export default JobOverview
