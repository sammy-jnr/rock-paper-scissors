import React, { useState, useRef } from 'react'
import { updateProfilePicture } from '../../utils/axiosCalls';
import { useDispatch } from "react-redux"
import { sendNewNotification } from '../../Features/MainSlice'
import { setUrl } from '../../Features/OnlineSlice';
import { useNavigate } from 'react-router-dom';
import arrowLeft from "../../Assets/Icons/arrowLeft.svg";
import cancelIconRed from "../../Assets/Icons/cancelIconRed.svg";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";


function ImagePreview() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cropperRef = useRef<ReactCropperElement>(null);
  const fileRef: React.Ref<HTMLInputElement> = useRef(null)

  const [uploadedFile, setuploadedFile] = useState<File>();
  const [uploadedFileDataUrl, setuploadedFileDataUrl] = useState<string>();
  const [croppedImage, setcroppedImage] = useState<string>();

  const [isLoading, setisLoading] = useState<boolean>(false);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper && setcroppedImage(cropper.getCroppedCanvas().toDataURL())
  };


  const onNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files) {
      const file = files[0]
      setuploadedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof (e.target?.result) === "string") {
          setuploadedFileDataUrl(e.target?.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const submitFile = async () => {
    if (!croppedImage) return
    setisLoading(true)
    const blob = await (await fetch(croppedImage)).blob();
    const file = new File([blob], 'profile.jpg', { type: "image/jpeg" });
    const formData = new FormData()
    formData.append("profile", file)
    updateProfilePicture(formData)
      .then((res) => {
        setisLoading(false)
        dispatch(setUrl(res.data.url))
        dispatch(sendNewNotification({
          backgroundColor: "green",
          text: "Updated",
          fontSize: 16,
          status: true,
          time: 2000
        }))
        setuploadedFile(undefined)
        setuploadedFileDataUrl(undefined)
        setcroppedImage(undefined)
        if (fileRef.current)
          fileRef.current.value = ""
      })
      .catch(() => {
        setisLoading(false)
        dispatch(sendNewNotification({
          backgroundColor: "red",
          text: "An error occured",
          fontSize: 15,
          status: true,
          time: 2500
        }))
      })
  }


  return (
    <div className='imagePreviewContainer'>
      <img src={arrowLeft}
        alt=""
        className='extraLargeIcon ImagePreviewIcon'
        onClick={() => navigate("/settings")}
      />
      <div className="imagePreviewInner">
        <div className="uploadImgSection">
          {!uploadedFile ?
            <div className='noImgUploaded'>
              <input type="file"
                ref={fileRef}
                onChange={(e) => { onNewFile(e) }}
              />
              <p>Click to select file</p>
            </div>
            :
            <img src={cancelIconRed}
              alt=""
              id='uploadedImgCancelIcon'
              onClick={() => {
                setuploadedFile(undefined)
                setuploadedFileDataUrl(undefined)
                setcroppedImage(undefined)
                if (fileRef.current)
                  fileRef.current.value = ""
              }}
            />
          }
          {uploadedFile && <Cropper
            src={uploadedFileDataUrl}
            // style={{ width: "100%" }}
            initialAspectRatio={1 / 1}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
            className="imagePreview"
          />}
        </div>
        <div className="ImgPreviewSection">
          {croppedImage && <img src={croppedImage} alt="" id='croppedImage' />}
        </div>
      </div>
      <button className='imagePreviewSubmitBtn'
        onClick={submitFile}
      >
        {isLoading ? <span className='generalLoadingIcon'></span> : "Upload"}
      </button>
    </div>
  )
}

export default ImagePreview