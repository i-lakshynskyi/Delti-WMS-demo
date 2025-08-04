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
    const [stream, setStream] = useState(null);
    const [isUserCamera, setIsUserCamera] = useState(false);
    const [comment, setComment] = useState("");
    const fileInputRef = useRef(null);



    const handleAddPhoto = (e) => {
        /** @type {File[]} */
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setGalleryList((prev) => [...prev, ...imageUrls]);
        e.target.value = null;
    };

    const removePhoto = (indexToRemove) => {
        setGalleryList(prev => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleConfirm = () => {
        const data = {
            comment,
            galleryList,
        };
        // onSubmit(data);
        setComment("");
        setGalleryList([]);
    };


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

    const darkenScreen = () => {
        const overlay = document.getElementById('darken-overlay');
        if (!overlay) return;

        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');

        setTimeout(() => {
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0');
        }, 150);
    };


    const takePhoto = () => {
        darkenScreen();

        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const dataUrl = canvas.toDataURL("image/png");
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
            <div className="m-[10px]">
                <textarea
                    className="w-full h-[150px] border border-orange-500 rounded-xl p-2 text-base resize-none"
                    placeholder="Оставьте комментарий..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex items-center justify-around w-full">
                    <>
                        <PrimeButton onClick={() => fileInputRef.current.click()} className="mr-[10px]">Download Photo</PrimeButton>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleAddPhoto} accept="image/*" multiple/>
                    </>
                    <PrimeButton onClick={() => startCamera()}>Take Photo</PrimeButton>
                </div>
            </div>
            <div className="flex-1 border border-gray-300 rounded-lg m-[10px] overflow-hidden overflow-y-auto p-1">
                {galleryList.map((photo, index) => (
                    <div key={index} className='relative'>
                        <img
                            src={photo}
                            alt={`photo-${index}`}
                            className="mb-2 rounded-lg"
                        />
                        <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            aria-label="delete photo">×</button>
                    </div>
                ))
                }
            </div>
            <div className="mt-auto">
                <PrimeButton onClick={() => handleGoTo('scanArticle')}>Add Article</PrimeButton>
            </div>
        </div>
    );
}

export default DamageReport;