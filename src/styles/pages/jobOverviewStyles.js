
export const jobOverviewContainer = `h-full flex flex-col`;

export const jobOverviewBlocksWrap = 'flex flex-col h-full overflow-hidden overflow-y-auto';
export const jobOverviewSKUs = `min-h-[200px] grow-[3] mb-[10px] overflow-x-hidden overflow-y-auto rounded-lg`
export const jobOverviewSKUsTitle = `flex items-center justify-between mt-[10px]`
export const jobOverviewConveyor = 'mt-[5px] h-max flex flex-col items-start justify-between mb-[15px]'

// Info Card
export const jobOverviewInfoCard = `
grid grid-cols-2 gap-1
bg-[#f5f5f5] mb-[5px] rounded-lg p-[10px]
[&_p]:text-[14px] [&_p]:text-gray-600 [&_span]:font-bold
`

// SKU_CARD
export const jobOverviewSKUsCardsContainer = 'mb-[5px] bg-[#f5f5f5] border border-gray-300 rounded-xl px-[10px] text-[14px]'
export const jobOverviewSKUsCardsWrap = 'flex items-center'
export const jobOverviewSKUsCardInfo = `flex-1 flex flex-col grid grid-cols-2 px-[10px]
                                               [&>*:nth-child(odd)]:font-bold`
export const jobOverviewSKUsCardsIMGWrap = `w-[72px] h-[72px] mb-[5px]`
export const jobOverviewSKUsCardsIMG = `w-full h-full object-contain`
export const jobOverviewSKUsCardsName = `text-[16px] font-[700] mt-[5px]`
export const jobOverviewSKUsCardsRacks = `text-[16px] text-[#ff6c00] font-[700]`

// ConveyorBeltMode
export const jobOverviewConveyorBeltMode = `w-full h-max flex items-center border border-gray-300 rounded-lg mb-[15px] bg-[#f5f5f5]`
export const jobOverviewConveyorBeltModeRadio = `mx-[10px]`

export const jobOverviewH1 = 'sticky top-0 text-[#1f456e] bg-[#ffffff] font-bold text-[16px]'
export const jobOverviewH2 = `${jobOverviewH1} text-[#ff6c00]`