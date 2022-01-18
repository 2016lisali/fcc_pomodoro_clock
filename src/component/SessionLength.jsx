function SessionLength({ decrementSession, sessionTime, incrementSession }) {
  
  return (
    <div className="sessionLength col px-5">
      <h3 id="session-label">Session Length</h3>
      <div className="row justify-content-center">
        <button 
          className="col-2"
          id="session-decrement"
          onClick={decrementSession}>
          -
        </button>
        <p className="col-2" id="session-length">{sessionTime}</p>
        <button 
          className="col-2" 
          id="session-increment"
          onClick={incrementSession}>
          +
        </button>
      </div>
    </div>
  )
}

export default SessionLength;