export const damageReportContainer = 'relative h-full flex flex-col overflow-hidden overflow-y-auto'
export const damageReportCreatePhotoWrap = 'fixed z-20 top-0 left-0 flex flex-col items-center justify-center ' +
    'h-[100vh] w-full border-2 border-[#1f456e] overflow-hidden bg-[#ffffff]'

// Photo Processing
export const responsiveCameraContainer = 'relative w-full h-full'
export const videoContainer = 'w-full h-full object-cover'
export const gridWrap = 'absolute top-0 left-0 w-full h-full pointer-events-none z-20 grid grid-rows-3 grid-cols-3'
export const gridItem = (i) => {
    const classes = [];
    if ((i + 1) % 3 !== 0) classes.push("border-r border-dashed");
    if (i < 6) classes.push("border-b border-dashed");
    classes.push("border-[#ff6c00]");
    return classes.join(" ");
};

export const buttonsBlock = 'absolute bottom-0 left-0 flex items-center justify-around min-h-[60px] py-10 w-full bg-[#000000d4] z-[21]'
export const btnBase = 'w-[24px] h-[24px]'
export const imgBlockWrap = "w-[33%] flex items-center"
export const imgJustifyCenter = `${imgBlockWrap} justify-center`
export const imgJustifyAround = `${imgBlockWrap} justify-around`
export const btnTakePhotoIMG = 'h-[80px] w-[80px] active:bg-[#f16600] active:rounded-[50%]'
