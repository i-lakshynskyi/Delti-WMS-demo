export const damageReportContainer = 'relative h-full flex flex-col overflow-hidden overflow-y-auto'
export const damageReportCreatePhotoWrap = 'fixed z-20 top-0 left-0 flex flex-col items-center justify-center ' +
    'h-[100vh] w-full overflow-hidden bg-[#0f2237]'

export const damageReportCommentContainer = 'm-[10px]'
export const damageReportCommentTextArea = 'w-full h-[100px] border border-[#ff6c00] rounded-lg p-2 text-base resize-none'
export const damageReportCommentTextAreaBtnBlock = 'flex items-center justify-around w-full'
export const damageReportGalleryContainer = 'flex-1 border border-gray-300 rounded-lg m-[10px] overflow-hidden overflow-y-auto p-1'
export const damageReportGalleryImgContainer = 'relative'
export const damageReportGalleryImg = 'mb-2 rounded-lg'
export const damageReportGalleryImgBtnDelete = 'absolute -top-1 -right-1 rounded-full w-[40px] h-[40px] flex items-center justify-center'
export const damageReportGalleryImgBtnDeleteIcon = 'w-[30px] h-[30px]'
export const damageReportButtonsBlock = 'mt-auto'

// Photo Processing
export const responsiveCameraContainer = 'relative w-full h-full'
export const videoContainer = 'w-full h-full object-cover'
export const gridWrap = 'absolute top-0 left-0 pointer-events-none z-20 grid grid-rows-3 grid-cols-3 w-screen h-screen'
export const gridItem = (i) => {
    const classes = [];
    if ((i + 1) % 3 !== 0) classes.push("border-r border-dashed");
    if (i < 6) classes.push("border-b border-dashed");
    classes.push("border-[#ff6c00]");
    return classes.join(" ");
};


// ResponsiveCamera page
export const takePhotoButtonsBlock = 'absolute bottom-0 left-0 flex items-center justify-around min-h-[60px] pb-8 pt-4 w-full bg-[#20456e70] z-[21]'
export const takePhotoBtnBase = 'h-[50px] w-[50px] m-3 flex items-center justify-center active:bg-[#f16600] active:rounded-[50%]'
export const takePhotoBtnImgBase = 'h-[26px] w-[26px]'
export const takePhotoImgBlockWrap = "w-[33%] flex items-center"
export const takePhotoImgJustifyCenter = `${takePhotoImgBlockWrap} justify-center`
export const takePhotoBtnTakePhotoIMG = 'h-[80px] w-[80px] active:bg-[#f16600] active:rounded-[50%] flex items-center justify-center [&_img]:w-[70px] [&_img]:h-[70px]'
