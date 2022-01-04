function TimeLeft(props) {
  return (
    <div className="mainSection my-5">
      <h3 id="timer-label">{props.sessionName}</h3>
      <p id="time-left">{props.timeleft}</p>
      <button id="start_stop" onClick={props.handleStart}>{props.playOrStop}</button>
      <button id="reset" onClick={props.handleReset}>Reset</button>
    </div>
  )
}

export default TimeLeft;