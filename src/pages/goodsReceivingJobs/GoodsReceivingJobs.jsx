import {
    godsJobContainer,
    godsJobTitle1,
    godsJobTitle2
} from "../../styles/pages/goodsReceivingJobsStyles/goodsReceivingJobsStyles.js";
import {stickyBlock} from "../../styles/components/reusableСomponentsStyle.js";
import JobCard from "./JobCard.jsx";
import {goodsReceivingJobs} from "../../data/mock/mockData.js";
import {useState} from "react";
import ModalConfirmJob from "./ModalConfirmJob.jsx";
import useStore from "../../store/useStore.js";


function GoodsReceivingJobs() {
    const [selectedJob, setSelectedJob] = useState(null);
    const setCurrentJob = useStore((state) => state.setCurrentJob)


    const handleTakeJob = (job) => {
        setSelectedJob(job)
    }

    const handleConfirmJob = () => {
        setCurrentJob(selectedJob)
        setSelectedJob(null)
    }

    const handleCloseModal = () => {
        setSelectedJob(null)
    }


    return (
        <>
            {selectedJob && (
                <ModalConfirmJob job={selectedJob} onConfirm={handleConfirmJob} onClose={handleCloseModal}/>
            )}
            <div className={stickyBlock}>
                <h1 className={godsJobTitle1}>Goods Receiving Jobs</h1>
                <p className={godsJobTitle2}>Select a job to process</p>
            </div>

            <div className={godsJobContainer}>
                {goodsReceivingJobs.map(task => (<JobCard key={task.id} task={task} handleTakeJob={handleTakeJob}/>))}
            </div>
        </>
    );
}

export default GoodsReceivingJobs;