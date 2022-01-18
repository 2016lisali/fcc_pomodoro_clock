// rafce 
const BreakLength = ({
  decrementBreak,
  breaktime,
  incrementBreak
  }) => {
  return (
    <div className="breakLength col mx-5">
      <h3 id="break-label">Break Length</h3>
      <div className="row justify-content-center">
        <button className="col-2"
            id="break-decrement"
            onClick={decrementBreak}
        >
        -
        </button>
        <p className="col-2" id="break-length">{breaktime}</p>
        <button className="col-2" 
          id="break-increment"
          onClick={incrementBreak}>+</button>
      </div>
    </div>
  )
}

export default BreakLength;