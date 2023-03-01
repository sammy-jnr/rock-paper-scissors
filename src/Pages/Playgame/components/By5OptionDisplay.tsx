import "./Components.css"
import paperIcon from "../../../Assets/Icons/icon-paper.svg"
import rockIcon from "../../../Assets/Icons/icon-rock.svg"
import scissorsIcon from "../../../Assets/Icons/icon-scissors.svg"
import lizardIcon from "../../../Assets/Icons/icon-lizard.svg"
import spockIcon from "../../../Assets/Icons/icon-spock.svg"
import { optionClicked } from "../../../utils/optionClicked"
import { RootState } from "../../../store"
import { useSelector, useDispatch } from "react-redux"
import { setGameState, setSelectedOption, setOpponentOption } from '../../../Features/MainSlice'


const By5OptionDisplay = () => {
  const RockIconSm = () => {
    return (
      <div className='objectsIconOuterSmall rockIcon'>
        <div className="objectsIconInnerSmall">
          <img src={rockIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  const PaperIconSm = () => {
    return (
      <div className='objectsIconOuterSmall paperIcon'
      >
        <div className="objectsIconInnerSmall">
          <img src={paperIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  const ScissorsIconSm = () => {
    return (
      <div className='objectsIconOuterSmall scissorsIcon'
      >
        <div className="objectsIconInnerSmall">
          <img src={scissorsIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  const LizardIconSm = () => {
    return (
      <div className='objectsIconOuterSmall lizardIcon'

      >
        <div className="objectsIconInnerSmall">
          <img src={lizardIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  const SpockIconSm = () => {
    return (
      <div className='objectsIconOuterSmall spockIcon'
      >
        <div className="objectsIconInnerSmall">
          <img src={spockIcon} alt="" className='smallImages' />
        </div>
      </div>
    )
  }
  return (
    <div id='by5container'>
      <div className="selectOption5First">
        <ScissorsIconSm />
      </div>
      <div className="selectOption5Second">
        <SpockIconSm />
        <PaperIconSm />
      </div>
      <div className="selectOption5Third">
        <LizardIconSm />
        <RockIconSm />
      </div>
    </div>
  )
}

export default By5OptionDisplay