import {
    godsJobContainer,
    godsJobTitle1,
    godsJobTitle2
} from "../../styles/pages/goodsReceivingJobsStyles.js";
import {stickyBlock} from "../../styles/components/reusableСomponentsStyle.js";
import JobCard from "./JobCard.jsx";
import {goodsReceivingJobs} from "../../data/mock/mockData.js";

function GoodsReceivingJobs() {
    return (
        <>
            <div className={stickyBlock}>
                <h1 className={godsJobTitle1}>Goods Receiving Jobs</h1>
                <p className={godsJobTitle2}>Select a job to process</p>
            </div>

            <div className={godsJobContainer}>
                {
                    goodsReceivingJobs.map(task => (<JobCard key={task.id} task={task} />))
                }
            </div>
        </>
    );
}

export default GoodsReceivingJobs;