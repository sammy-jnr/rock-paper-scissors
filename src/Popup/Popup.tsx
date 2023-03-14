import { useEffect } from 'react'
import "./Popup.css"
import { RootState } from "../store"
import { useSelector, useDispatch } from "react-redux"
import { sendNewNotification } from '../Features/MainSlice'


const Popup = () => {

  const dispatch = useDispatch()
  const store = useSelector((store: RootState) => store)
  const notificationObj = store.main.notificationObj

  
  useEffect(() => {
    if (!notificationObj?.status) return
    let notificationTimeout: NodeJS.Timeout
    notificationTimeout = setTimeout(() => {
      dispatch(sendNewNotification({
        backgroundColor: "",
        text: "",
        status: false,
        time: 0,
        fontSize: 0
      }))
      
    }, notificationObj.time)
    return () => {
      clearTimeout(notificationTimeout)
    }
  }, [notificationObj])
  return (
    <>
      {notificationObj &&
        <div className='popupContainer'
          style={{
            backgroundColor: notificationObj?.backgroundColor,
            fontSize: notificationObj?.fontSize,
            padding: notificationObj?.fontSize < 16 ? 10 : ""
          }}
        >
          {notificationObj?.text}
        </div>
      }
    </>
  )
}

export default Popup