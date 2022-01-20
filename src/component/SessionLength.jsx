import {BsArrowDownCircleFill, BsArrowUpCircleFill} from "react-icons/bs"

function SessionLength({ decrementSession, sessionTime, incrementSession }) {

  return (
    <div className="sessionLength">
      <h2 id="session-label">Session Length</h2>
      <div className="length-control">
        <span
          id="session-decrement"
          onClick={decrementSession}>
          <BsArrowDownCircleFill />
        </span>
        <p id="session-length">{sessionTime}</p>
        <span
          id="session-increment"
          onClick={incrementSession}>
          <BsArrowUpCircleFill />
        </span>
      </div>
    </div>
  )
}

export default SessionLength;