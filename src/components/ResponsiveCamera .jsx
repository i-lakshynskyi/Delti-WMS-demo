import {
    gridItem,
    gridWrap,
    responsiveCameraContainer,
    takePhotoBtnBase, takePhotoBtnImgBase, takePhotoBtnTakePhotoIMG,
    takePhotoButtonsBlock,
    takePhotoImgBlockWrap,
    takePhotoImgJustifyCenter,
    videoContainer
} from "../styles/pages/DamageReportStyles.js";
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
            <div className={takePhotoButtonsBlock}>
                <div className={`${takePhotoImgBlockWrap} ${takePhotoImgJustifyCenter}`}>
                    <button className={takePhotoBtnBase} onClick={onStopCamera}><img className={takePhotoBtnImgBase} src={`${stepBack}`} alt="stepBack"/></button>
                </div>
                <div className={`${takePhotoImgBlockWrap} ${takePhotoImgJustifyCenter}`}>
                    <button className={takePhotoBtnTakePhotoIMG} onClick={onTakePhoto}><img src={`${take_Photo}`} alt="takePhoto"/></button>
                </div>
                <div className={`${takePhotoImgBlockWrap} ${takePhotoImgJustifyCenter}`}>
                    <button className={takePhotoBtnBase} onClick={onSwitchCamera}><img className={takePhotoBtnImgBase} src={`${switchCamera}`} alt="switchCamera"/></button>
                </div>
            </div>
            <canvas ref={canvasRef} style={{display: "none"}}/>
        </div>
    );
}
