import { useEffect, useRef, useState } from 'react';
import BreakLength from "./component/BreakLength"
import SessionLength from "./component/SessionLength"
import TimeLeft from "./component/TimeLeft"
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format';
import './App.scss';
import { FaPlayCircle, FaStopCircle } from "react-icons/fa"

momentDurationFormatSetup(moment)

function App() {
  const audioElement = useRef(null)
  const [breakTime, setBreakTime] = useState(5)
  const [sessionTime, setSessionTime] = useState(25)
  const [timeLeft, setTimeLeft] = useState(5 * 60)
  const [intervalId, setIntervalId] = useState(null)
  const [startOrStop, setStartOrStop] = useState(<FaPlayCircle />)
  const [currentSessionType, setCurrentSessionType] = useState("Session")
  const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false })

  // change timeleft whenever sessionlength changes
  useEffect(() => {
    setTimeLeft(sessionTime * 60)
  }, [sessionTime]
  )

  const startClock = () => {
    if (intervalId) {
      // if we are in started mode:
      // we want to stop the timer
      // clearInterval
      clearInterval(intervalId)
      setStartOrStop(<FaPlayCircle />)
      setIntervalId(null)
    } else {
      // if we are in stopped mode:
      // decrement timeLeft by one every second (1000 ms)
      // to do this we'll use setInterval
      setStartOrStop(<FaStopCircle />)
      const newIntervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft >= 1) {
            return prevTimeLeft - 1;
          }
          // time left is less than 1
          audioElement.current.play();
          // if session:
          let currentSession = document.getElementById("timer-label").innerHTML
          if (currentSession === 'Session') {
            // switch to break
            setCurrentSessionType('Break');
            // setTimeLeft to breakLength
            return breakTime * 60;
          }
          // if break:
          else if (currentSession === 'Break') {
            // switch to session
            setCurrentSessionType('Session');
            // setTimeLeft to sessionLength
            return sessionTime * 60;
          }
        })
      }, 1000); // TODO: turn back into 1000
      setIntervalId(newIntervalId);
    }
  };

  const decrementBreak = () => {
    setBreakTime(prevValue => prevValue > 1 ? prevValue - 1 : prevValue)
  }
  const incrementBreak = () => {
    setBreakTime(prevValue => prevValue <= 59 ? prevValue += 1 : prevValue)
  }
  const decrementSession = () => {
    setSessionTime(prevValue => prevValue > 1 ? prevValue - 1 : prevValue)
  }
  const incrementSession = () => {
    setSessionTime(prevValue => prevValue <= 59 ? prevValue += 1 : prevValue)
  }
  const handleReset = () => {
    // reset the audio
    audioElement.current.load()
    // clear the timeout interval

    // set the sessiontype to "Session"
    setCurrentSessionType("Session")
    setBreakTime(5)
    clearInterval(intervalId)
    setIntervalId(null)
    setSessionTime(25)
    setTimeLeft(60 * 25)
    setStartOrStop(<FaPlayCircle />)
  }

  return (
    <div className='app'>
      <h1>25+5 Clock</h1>
      <div className="settings">
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
        startOrStop={startOrStop}
        timeleft={formattedTimeLeft}
        handleStart={startClock}
        handleReset={handleReset}
      />
      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
