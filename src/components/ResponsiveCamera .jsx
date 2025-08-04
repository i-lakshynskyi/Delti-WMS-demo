import {
    btnBase, btnImgBase,
    btnTakePhotoIMG,
    buttonsBlock,
    gridItem,
    gridWrap, imgBlockWrap, imgJustifyCenter,
    responsiveCameraContainer,
    videoContainer
} from "../styles/pages/DamageReportStyles.js";
// import flash from "../assets/icons/flash.svg";
import switchCamera from "../assets/icons/switch-camera.svg"
import take_Photo from "../assets/icons/take-photo.svg"
import stepBack from "../assets/icons/arrows-back.svg"

export default function ResponsiveCamera({canvasRef, videoRef, onStopCamera, onTakePhoto, onSwitchCamera}) {

    return (
        <div className={responsiveCameraContainer}>
            <video className={videoContainer} ref={videoRef} autoPlay playsInline/>
            {/*Grid*/}
            <div className={gridWrap}>
                {[...Array(9)].map((_, i) => (<div key={i} className={gridItem(i)}/>))}
            </div>
            {/*//////////////////////////////*/}
            <div className={buttonsBlock}>
                <div className={`${imgBlockWrap} ${imgJustifyCenter}`}>
                    <button className={btnBase} onClick={onStopCamera}><img className={btnImgBase} src={`${stepBack}`} alt="stepBack"/></button>
                </div>
                <div className={`${imgBlockWrap} ${imgJustifyCenter}`}>
                    <button className={btnTakePhotoIMG} onClick={onTakePhoto}><img src={`${take_Photo}`} alt="takePhoto"/></button>
                </div>
                <div className={`${imgBlockWrap} ${imgJustifyCenter}`}>
                    {/*<button className={btnBase}><img src={`${flash}`} alt="flash"/></button>*/}
                    <button className={btnBase} onClick={onSwitchCamera}><img className={btnImgBase} src={`${switchCamera}`} alt="switchCamera"/></button>
                </div>
            </div>
            <canvas ref={canvasRef} style={{display: "none"}}/>
        </div>
    );
}
