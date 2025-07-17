import {goodsJobContainer, goodsJobListContainer} from "../../styles/pages/goodsReceivingJobsStyles.js";
import JobCard from "./JobCard.jsx";
import {goodsReceivingJobs} from "../../data/mock/mockData_goodsReceivingJobs.js";
import {useState} from "react";
import ModalConfirmJob from "./ModalConfirmJob.jsx";
import useStore from "../../store/useStore.js";
import StickyTitle from "../../components/StickyTitle.jsx";


function GoodsReceivingJobs() {
    const [selectedJob, setSelectedJob] = useState(null);
    const jobSummary = useStore(state => state.jobSummary);
    const setCurrentPage = useStore((state) => state.setCurrentPage)
    const setJobSummary = useStore((state) => state.setJobSummary)


    const handleTakeJob = (job) => {
        setSelectedJob(job)
    }

    const handleConfirmJob = () => {
        const now = new Date().toISOString();
        setJobSummary({
            ...jobSummary,
            currentJob: selectedJob,
            startTimeJob: now,
        });
        setCurrentPage("overview");
        setSelectedJob(null);
    }

    const handleCloseModal = () => {
        setSelectedJob(null)
    }


    return (
        <div className={goodsJobContainer}>
            {selectedJob && (
                <ModalConfirmJob job={selectedJob} onConfirm={handleConfirmJob} onClose={handleCloseModal}/>
            )}

            <StickyTitle title1={'Goods Receiving Jobs'} title2={"Select a job to process"}/>

            <div className={goodsJobListContainer}>
                {goodsReceivingJobs.map(task => (<JobCard key={task.poId} task={task} handleTakeJob={handleTakeJob}/>))}
            </div>
        </div>
    );
}

export default GoodsReceivingJobs;