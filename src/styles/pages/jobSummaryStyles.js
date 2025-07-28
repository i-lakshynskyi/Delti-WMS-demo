
export const jobSummaryContainer = `h-full flex flex-col`;

export const jobSummaryBlocksWrap = 'flex flex-col h-full overflow-hidden overflow-y-auto';
export const jobOSummarySKUs = `min-h-[200px] grow-[3] overflow-x-hidden overflow-y-auto rounded-lg mx-[10px] mt-[6px]`
export const jobSummarySKUsTitle = `flex items-center justify-between mx-[10px]`
export const jobSummaryButtons = `my-[10px]`
export const jobSummaryH1 = 'sticky top-0 text-[#1f456e] bg-[#ffffff] font-bold text-[16px]'


// Info Card
export const jobOSummaryInfoCard = `grid grid-cols-2 grid-cols-[60%_auto] gap-1 bg-[#f5f5f5] m-[10px] rounded-lg p-[10px] text-[14px]
                                           [&>*:nth-child(-n+2)]:font-bold text-gray-700
                                           [&>*:nth-child(2)]:text-[#1bc51b] [&>*:nth-child(-n+2)]:text-[16px] 
                                           border border-gray-300`

// Article Card
export const JobSummaryArticleCardContainer = 'mt-[10px] bg-[#f5f5f5] text-gray-700 border border-gray-300 rounded-t-lg text-[14px]'
export const JobSummaryArticleCardTitle = 'font-bold text-[18px] pl-3 pt-[5px]'
export const JobSummaryArticleCardTitle2 = 'text-[14px] pl-3'
export const JobSummaryArticleCardWrap = 'grid-cols-2 grid-cols-[40%_auto] gap rounded-lg grid p-2 ' +
            '[&_span:nth-of-type(odd)]:font-bold [&_span]:p-1'
export const JobSummaryArticleCardButtonBlock = 'w-full mb-[10px]'
export const JobSummaryArticleCardButton = 'block h-[40px] min-h-[40px] w-full bg-[#ff6c00] text-white text-[18px] active:bg-[#f16600]' +
                                                    ' flex justify-center items-center rounded-bl-md rounded-br-md'
export const roundedBottom = 'rounded-b-lg'

export const titleWrapBase = 'border-b-[2px] border-dashed rounded-t-lg pb-[5px]'
export const titleWrapOK = `${titleWrapBase} border-[#1bc51b]`
export const titleWrapNotOK = `${titleWrapBase} border-[#ff6c00]`
export const getBorderByStatus = (status) => {
    switch (status) {
        case 'OK':
            return titleWrapOK;
        default:
            return titleWrapNotOK;
    }
};



const baseArticleStatus = 'font-bold text-[14px]'
const ok = `${baseArticleStatus} text-[#1bc51b]`
const notOK = `${baseArticleStatus} text-[#ff6c00]`
export const getStatusArticle = (status) => {
    switch (status) {
        case 'OK':
            return ok;
        default:
            return notOK;
    }
};