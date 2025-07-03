
export const goodsJobContainer = 'h-full flex flex-col'
export const goodsJobListContainer = 'text-base overflow-y-auto overflow-x-hidden'

export const jobCardContainer = `text-[16px] rounded-[10px] bg-[#f5f5f5] p-[10px] border border-gray-300 shadow-sm my-[10px] grid grid-cols-2 gap-y-[6px] gap-x-[10px]`
export const jobID = `text-[18px] text-[#1f456e] font-semibold`
export const statusBase = 'text-lg font-semibold text-right';
export const statusPending = `${statusBase} text-[#ffa500]`;
export const statusScheduled = `${statusBase} text-[#9f92ef]`;
export const getStatusClass = (status) => {
    switch (status) {
        case 'Pending':
            return statusPending;
        case 'Scheduled':
            return statusScheduled;
        default:
            return statusBase;
    }
};

export const jodCardSquare = 'bg-[#e5e5e5] flex flex-col w-full px-[5px] rounded-[5px]';
export const jodCardSquareSmallText = 'text-[14px]'
export const jodCardSquareBoldText = 'font-bold'

export const jobCardGate = 'flex items-center justify-start'
export const jobCardGateImg = 'h-[24px] mr-[5px]'


