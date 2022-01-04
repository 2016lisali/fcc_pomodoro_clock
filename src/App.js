import { useEffect, useState } from 'react';
import BreakLength from "./component/BreakLength"
import SessionLength from "./component/SessionLength"
import TimeLeft from "./component/TimeLeft"
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format';
import './App.css';

momentDurationFormatSetup(moment)

function App() {
  const [breakTime, setBreakTime] = useState(5)
  const [sessionTime, setSessionTime] = useState(25)
  const [timeLeft, setTimeLeft] = useState(sessionTime*60)
  const [intervalId, setIntervalId] = useState(null)
  const [playOrStop, setPlayOrStop] = useState("Start")
  const [currentSessionType, setCurrentSessionType] = useState("Session")
  const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false })
  
  // change timeleft whenever sessionlength changes
  useEffect(() => {
    setTimeLeft(sessionTime*60)}, [sessionTime]
  )
  
  const startClock = () => {
    if (intervalId != null) {
      // if intervalId != null means the clock is started
      // stop the timer, clearInterval
      clearInterval(intervalId)
      setIntervalId(null)
      setPlayOrStop("Start")
    } else {
      // if intervalId === null, which means not start, decrement timeleft by one every second
      const newIntervalId = setInterval(()=>{
        setTimeLeft(prevTimeLeft => {
          if(prevTimeLeft >=1) {
            return prevTimeLeft - 1
          }
          if (currentSessionType === "Session") {
            // switch to break
            setCurrentSessionType("Break")
            setTimeLeft(breakTime)
          }
          else if (currentSessionType === "Break") {
            setCurrentSessionType("Session")
            setTimeLeft(sessionTime)
          }
      }
      )}, 100)
      console.log(newIntervalId);
      setIntervalId(newIntervalId)
      setPlayOrStop("Stop")
    }

  }
  const decrementBreak = () => {
    setBreakTime(prevValue=>prevValue>=1 ? prevValue-1 :prevValue)
  }
  const incrementBreak = () => {
    setBreakTime(prevValue => prevValue<=59 ? prevValue +=1 : prevValue )
  }
  const decrementSession = () => {
    setSessionTime(prevValue=>prevValue>1 ? prevValue-1 :prevValue)
  }
  const incrementSession= () => {
    setSessionTime(prevValue => prevValue<=59 ? prevValue +=1 : prevValue )
  }  
  const handleReset = () => {
    // clear the timeout interval
    //set the intervalId null
    // set the sessiontype to "Session"
    setBreakTime(5)
    setSessionTime(25)
  }

  return (
    <div className='container my-5'>
      <h2>25+5 Clock</h2>
      <div className="row justify-content-between my-5">
        <BreakLength 
          breaktime={breakTime}
          decrementBreak={decrementBreak}
          incrementBreak={incrementBreak} />
        <SessionLength 
          sessionTime={sessionTime}
          decrementSession={decrementSession}
          incrementSession={incrementSession} />
      </div>
      <TimeLeft sessionName={currentSessionType}
          playOrStop={playOrStop}
          timeleft={formattedTimeLeft}
          handleStart={startClock} 
          handleReset={handleReset}
          />
    </div>
  );
}

export default App;
