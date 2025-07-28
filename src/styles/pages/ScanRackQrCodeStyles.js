
export const ScanRackQrCodeContainer = 'h-full flex flex-col overflow-hidden overflow-y-auto pb-[15px]';
export const ScanRackQrCodeScanBlock = 'flex flex-col grow h-max p-[10px] my-[10px]'
export const ScanRackQrWarning = 'text-[#ff0000] w-full text-[14px] h-[14px] m-0 p-0'
export const ScanRackQrCodeResultOfScan = 'bg-[#f5f5f5] my-[10px] grow text-[14px] rounded-lg border-1 border-gray-300 p-2'
export const ScanRackQrCodeResultOfScanInfo = 'grid grid-cols-2 grid-cols-[56%_auto] gap-x-1 [&_p:nth-child(odd)]:font-bold text-gray-700 rounded-lg [&_p]:mb-2'
export const ScanRackQrCodeButtonsBlock = 'h-max flex flex-col  items-center justify-around'
export const ScanRackQrCodeButton = ''

export const qrScanContainer = 'w-full h-[200px] flex items-center justify-center mb-[10px] border-[2px] border-dashed border-[#8fa2b6]'
export const qrScanOverlay = 'w-full h-full flex items-center justify-center bg-[#ffffff]'
export const qrScanImg = 'w-[170px] h-[170px] opacity-50'
export const qrScanVideo = ''

export const textPX = 'text-[16px]'
const baseRackStatus = `${textPX} font-bold`
const emptyRackStatus = `${baseRackStatus} text-[#1bc51b]`
const fullRackStatus = `${baseRackStatus} text-[#ff6c00]`
const partiallyRackStatus = `${baseRackStatus} text-[#1bc51b]`
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
