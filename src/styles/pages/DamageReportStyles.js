export const damageReportContainer = 'relative h-full flex flex-col overflow-hidden overflow-y-auto'
export const damageReportCreatePhotoWrap = 'fixed z-20 top-0 left-0 flex flex-col items-center justify-center ' +
    'h-[100vh] w-full overflow-hidden bg-[#0f2237]'

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

export const darkenOverlay = 'fixed inset-0 bg-[#0d1e31] opacity-0 pointer-events-none z-50 transition-opacity duration-300'

export const buttonsBlock = 'absolute bottom-0 left-0 flex items-center justify-around min-h-[60px] pb-8 pt-4 w-full bg-[#20456e70] z-[21]'
export const btnBase = 'h-[50px] w-[50px] m-3 flex items-center justify-center active:bg-[#f16600] active:rounded-[50%]'
export const btnImgBase = 'h-[26px] w-[26px]'
export const imgBlockWrap = "w-[33%] flex items-center"
export const imgJustifyCenter = `${imgBlockWrap} justify-center`
export const btnTakePhotoIMG = 'h-[80px] w-[80px] active:bg-[#f16600] active:rounded-[50%] flex items-center justify-center [&_img]:w-[70px] [&_img]:h-[70px]'
