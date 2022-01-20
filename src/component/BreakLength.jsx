import {BsArrowDownCircleFill, BsArrowUpCircleFill} from "react-icons/bs"
const BreakLength = ({
  decrementBreak,
  breaktime,
  incrementBreak
}) => {
  return (
    <div className="breakLength">
      <h2 id="break-label">Break Length</h2>
      <div className="length-control">
        <span id="break-decrement" onClick={decrementBreak}>
          <BsArrowDownCircleFill />
        </span>
        <p id="break-length">{breaktime}</p>
        <span id="break-increment" onClick={incrementBreak}>
          <BsArrowUpCircleFill />
        </span>
      </div>
    </div>
  )
}

export default BreakLength;