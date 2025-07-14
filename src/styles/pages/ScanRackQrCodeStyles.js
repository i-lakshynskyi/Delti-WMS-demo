
export const ScanRackQrCodeContainer = 'h-full flex flex-col overflow-hidden overflow-y-auto pb-[15px]';
export const ScanRackQrCodeScanBlock = 'flex flex-col grow h-max p-[10px] my-[10px]'
export const ScanRackQrWarning = 'text-[#ff0000] w-full text-[14px] h-[14px] m-0 p-0'
export const ScanRackQrCodeResultOfScan = 'bg-[#f5f5f5] my-[10px] grow p-[5px] text-[14px]'
export const ScanRackStatusRack = 'w-full flex justify-between items-center pr-[10px] font-[500]'
export const ScanRackQrCodeResultOfScanInfo = 'bg-[#ffffff] grid grid-cols-2 gap-x-4 p-[5px] [&_p:nth-child(odd)]:font-bold text-gray-700'
export const ScanRackQrCodeButtonsBlock = 'h-max flex flex-col  items-center justify-around'
export const ScanRackQrCodeButton = ''

export const qrScanContainer = 'w-full h-[200px] flex items-center justify-center mb-[10px] border-[2px] border-dashed border-[#8fa2b6]'
export const qrScanOverlay = 'w-full h-full flex items-center justify-center bg-[#ffffff]'
export const qrScanImg = 'w-[170px] h-[170px] opacity-50'
export const qrScanVideo = ''


const baseRackStatus = 'font-bold text-[18px]'
const emptyRackStatus = `${baseRackStatus} text-[#7acc7a]`
const fullRackStatus = `${baseRackStatus} text-[#ff0000]`
const partiallyRackStatus = `${baseRackStatus} text-[#9f92ef]`
export const getStatusRack = (status) => {
    switch (status) {
        case 'Empty':
            return emptyRackStatus;
        case 'Partially':
            return partiallyRackStatus;
        case 'Full':
            return fullRackStatus;
        default:
            return baseRackStatus;
    }
};


/*
main blue color: #1f456e active: #142c4f hover: #17355a disabled: #8ea1b5
main gray color: #f5f5f5
orange: #ffa500
*/
