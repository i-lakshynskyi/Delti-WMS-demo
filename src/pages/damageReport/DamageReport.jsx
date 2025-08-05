import useStore from "../../store/useStore.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import ResponsiveCamera from "../../components/ResponsiveCamera .jsx";
import {
    damageReportButtonsBlock,
    damageReportCommentContainer, damageReportCommentTextArea, damageReportCommentTextAreaBtnBlock,
    damageReportContainer,
    damageReportCreatePhotoWrap, damageReportGalleryContainer, damageReportGalleryImg,
    damageReportGalleryImgBtnDelete, damageReportGalleryImgBtnDeleteIcon, damageReportGalleryImgContainer
} from "../../styles/pages/DamageReportStyles.js";
import PrimeButton from "../../components/PrimeButton.jsx";
import {useEffect, useRef, useState} from "react";
import cancel from '../../assets/icons/cancel.svg'

function DamageReport() {
    const setCurrentPage = useStore((state) => state.setCurrentPage);
    const [addPhoto, setAddPhoto] = useState(false);
    const [galleryList, setGalleryList] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [isUserCamera, setIsUserCamera] = useState(false);
    const [comment, setComment] = useState("");
    const fileInputRef = useRef(null);
    const setAddDamageReportToArticleSummary = useStore((state) => state.setAddDamageReportToArticleSummary);




    const handleAddPhoto = (e) => {
        /** @type {File[]} */
        const files = Array.from(e.target.files);

        const fileObjects = files.map((file) => ({
            type: "file",
            data: file,
            url: URL.createObjectURL(file),
        }));

        setGalleryList((prev) => [...prev, ...fileObjects]);
        e.target.value = null;
    };

    const removePhoto = (indexToRemove) => {
        const imgObj = galleryList[indexToRemove];
        if (imgObj.type === "file" && imgObj.url?.startsWith("blob:")) {
            URL.revokeObjectURL(imgObj.url);
        }
        setGalleryList(prev => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleAddComment = (e) => {
        const value = e.target.value;
        setComment(value);
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


    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const dataUrl = canvas.toDataURL("image/png");
        setGalleryList((prev) => [...prev, {type: "base64", data: dataUrl, url: dataUrl}]);
    };


    function handleGoTo(page) {
        setCurrentPage(page);
    }

    function onSubmitData(comment, galleryList) {
        setAddDamageReportToArticleSummary({comment, galleryList});
        setComment("");
        setGalleryList([]);
        handleGoTo('scanArticle');
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
            <div className={damageReportCommentContainer}>
                <textarea
                    className={damageReportCommentTextArea}
                    placeholder="Leave a comment..."
                    value={comment}
                    onChange={(e) => handleAddComment(e)}
                />
                <div className={damageReportCommentTextAreaBtnBlock}>
                    <>
                        <PrimeButton onClick={() => fileInputRef.current.click()} className="mr-[10px]">Download Photo</PrimeButton>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={handleAddPhoto} accept="image/*" multiple/>
                    </>
                    <PrimeButton onClick={() => startCamera()}>Take Photo</PrimeButton>
                </div>
            </div>
            <div className={damageReportGalleryContainer}>
                {galleryList.map(({url}, index) => (
                    <div key={index} className={damageReportGalleryImgContainer}>
                        <img
                            src={url}
                            alt={`photo-${index}`}
                            className={damageReportGalleryImg}
                        />
                        <button onClick={() => removePhoto(index)}
                            className={damageReportGalleryImgBtnDelete}
                            aria-label="delete photo">
                            <img className={damageReportGalleryImgBtnDeleteIcon} src={`${cancel}`} alt="delete photo"/>
                        </button>
                    </div>
                ))
                }
            </div>
            <div className={damageReportButtonsBlock}>
                <PrimeButton onClick={() => onSubmitData(comment, galleryList)} disabled={galleryList.length === 0 && comment.length === 0}>Save Report</PrimeButton>
                <PrimeButton onClick={() => handleGoTo('scanArticle')}>Add Article</PrimeButton>
            </div>
        </div>
    );
}

export default DamageReport;