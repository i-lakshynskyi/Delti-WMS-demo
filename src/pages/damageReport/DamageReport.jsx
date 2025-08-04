import useStore from "../../store/useStore.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import ResponsiveCamera from "../../components/ResponsiveCamera .jsx";
import {damageReportContainer, damageReportCreatePhotoWrap} from "../../styles/pages/DamageReportStyles.js";
import PrimeButton from "../../components/PrimeButton.jsx";
import {useEffect, useRef, useState} from "react";

function DamageReport() {
    const setCurrentPage = useStore((state) => state.setCurrentPage);
    const [addPhoto, setAddPhoto] = useState(false);
    const [galleryList, setGalleryList] = useState([]);
    console.log('gallery: ', galleryList);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [tempPhoto, setTempPhoto] = useState(null);
    const [stream, setStream] = useState(null);
    const [isUserCamera, setIsUserCamera] = useState(false);



    const startCamera = async (facingMode = "environment") => {
        try {
            setAddPhoto(true);

            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }

            const constraints = {
                video: {
                    facingMode: { exact: facingMode },
                },
                audio: false,
            };

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
            }

            setStream(mediaStream);
            setIsUserCamera(facingMode === "user");
        } catch (error) {
            console.warn("Failed to start with facingMode, fallback on deviceId", error);

            const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.play();
            setStream(fallbackStream);
        }
    };


    const switchToNextCamera = () => {
        const nextMode = isUserCamera ? "environment" : "user";
        startCamera(nextMode).then();
    };




    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
        setAddPhoto(false);
    };

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const dataUrl = canvas.toDataURL("image/png");
        setTempPhoto(dataUrl);
        setGalleryList((prev) => [...prev, dataUrl]);
    };


    function handleGoTo(page) {
        setCurrentPage(page);
    }

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className={damageReportContainer}>
            <StickyTitle title1={'Image Report'} title2={'Create Image Report'}/>
            {addPhoto &&
                <div className={damageReportCreatePhotoWrap}>
                    <ResponsiveCamera onStopCamera={stopCamera} onTakePhoto={takePhoto} videoRef={videoRef} canvasRef={canvasRef} onSwitchCamera={switchToNextCamera}/>
                </div>
            }
            <div>
                {galleryList.map((photo, index) => (
                    <img key={index} src={`${photo}`} alt={`${index}-photo`}/>
                ))
                }
            </div>
            <div>
                <PrimeButton onClick={() => startCamera()}>Take Photo</PrimeButton>
                <PrimeButton onClick={() => handleGoTo('scanArticle')}>Add Article</PrimeButton>
            </div>
        </div>
    );
}

export default DamageReport;