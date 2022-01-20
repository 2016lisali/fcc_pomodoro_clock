import { GrPowerReset } from "react-icons/gr"
const TimeLeft = ({ sessionName, timeleft, handleStart, startOrStop, handleReset }) => {
  return (
    <div className="mainSection">
      <h3 id="timer-label">{sessionName}</h3>
      <p id="time-left">{timeleft}</p>
      <span id="start_stop" onClick={handleStart}>{startOrStop}</span>
      <span id="reset" onClick={handleReset}><GrPowerReset /></span>
    </div>
  )
}

export default TimeLeft;