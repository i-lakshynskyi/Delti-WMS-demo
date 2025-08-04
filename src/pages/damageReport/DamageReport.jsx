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
    const [devices, setDevices] = useState([]);
    const [currentDeviceId, setCurrentDeviceId] = useState(null);




    /*const startCamera = async () => {
        setAddPhoto(true);
        if (stream) return;
        const mediaStream = await navigator.mediaDevices.getUserMedia({video: true});
        if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
            setStream(mediaStream);
        }
    };*/

    const startCamera = async (deviceId = null) => {
        try {
            setAddPhoto(true);

            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            const allDevices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = allDevices.filter(device => device.kind === "videoinput");
            setDevices(videoDevices);

            let targetDeviceId = deviceId;
            if (!deviceId) {
                const environmentCam = videoDevices.find(device =>
                    device.label.toLowerCase().includes("back") ||
                    device.label.toLowerCase().includes("environment")
                );
                targetDeviceId = environmentCam
                    ? environmentCam.deviceId
                    : videoDevices[0]?.deviceId;
            }

            setCurrentDeviceId(targetDeviceId);

            const constraints = {
                video: { deviceId: { exact: targetDeviceId } },
                audio: false
            };

            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
            }

            setStream(mediaStream);
        } catch (err) {
            console.error("Camera launch failed:", err);
        }
    };

    const switchToNextCamera = () => {
        if (devices.length < 2) return;

        const currentIndex = devices.findIndex(d => d.deviceId === currentDeviceId);
        const nextIndex = (currentIndex + 1) % devices.length;
        const nextDeviceId = devices[nextIndex].deviceId;

        startCamera(nextDeviceId).then();
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