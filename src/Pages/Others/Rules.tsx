import "./Others.css"
import arrowLeft from "../../Assets/Icons/arrowLeft.svg"
import imageRules from "../../Assets/Images/image-rules.svg"
import imageRules2 from "../../Assets/Images/image-rules-bonus.svg"
import { useNavigate } from "react-router-dom"

function Rules() {

  const navigate = useNavigate()


  return (
    <div className='rulesPage'>
      <header>
      <img src={arrowLeft} 
        onClick={()=>{
          navigate("/")
        }}
        className="largeIcon" alt="" />
        <h2>Rules</h2>
      </header>
      <section className="rulesPageInner">
        <section>
          This is a simple game where you choose between possible options depending on the mode.
          <br /> There are two modes RPS(Rock, Paper, Scissors) and RPSLS(Rock, Paper, Scissors, Lizard, Spock)
          <br /> You choose an option and your opponent chooses an option as well, check the pictures below to see more about the rules and who wins
        </section>
        <div>
          <img src={imageRules} alt="" />
          <img src={imageRules2} alt="" />
        </div>
      </section>
    </div>
  )
}

export default Rules