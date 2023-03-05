import React,{ useState, useRef } from 'react'
import uploadIcon from "../../Assets/Icons/arrowUp.svg"
import closeIcon from "../../Assets/Icons/closeIcon.svg"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../store"
import { useNavigate } from "react-router-dom"



function Onboarding() {

  const navigate = useNavigate()

  const [imageUrl, setimageUrl] = useState<string>("");
  const [showUploadImage, setshowUploadImage] = useState<boolean>(true);
  // const [showPreviewImage, setshowPreviewImage] = useState<boolean>();

  const imageRef: any = useRef(null)
  const nameRef: any = useRef(null)

const uploadImage = (e:React.ChangeEvent<HTMLInputElement>) => {
  let reader = new FileReader()
    reader.addEventListener("load", ()=>{
      if(typeof reader.result === "string"){
        setimageUrl(reader.result)
      }
        
    });
    if(e.target.files){
      reader.readAsDataURL(e.target.files[0])
    }
    imageRef.current.value = ""
    setshowUploadImage(false)
}

const dispatch = useDispatch()


async function updateName(submittedName: string){
 
}





  return (
    <div className='onbordingPage'>
      <section className='addName'>
        <p>Add username</p>
        <input type="text" />
      </section>
      <section className="addProfileImage">
        <p>Add profile picture</p>
        <div className="imageContentContainer">
          {/* {
            showUploadImage &&
            <div className="uploadImage">
            <input 
            ref={imageRef}
            onChange={(e)=>uploadImage(e)}
            type="file" />
            <div>
              <img src={uploadIcon} alt="" />
            </div>
            <p>UPLOAD</p>
          </div>} */}
          {/* {
            !showUploadImage &&
            <div className='previewUploadedImage'>
              <span><img src={closeIcon} 
                onClick={()=>{
                  setshowUploadImage(true)
                  setimageUrl("")
                }}
                className="largeIcon" alt="" />
              </span>
                <img src={imageUrl} alt="" />
            </div>
          } */}
        </div>
      </section>
      <footer>
        <button
        onClick={()=>{
        }}
        >Save</button>
      </footer>
    </div>
  )
}

export default Onboarding