import { useMachine } from "@xstate/react"
import React from "react"
import "./App.css"
import { trafficLightMachine } from "./trafficLightMachine"

function App() {
  const [current, send] = useMachine(trafficLightMachine)
  return (
    <div className="container">
      <div className="pole" />
      <div className="traffic-light">
        <button
          onClick={() => (current.matches("OFF") ? send("ON") : send("OFF"))}
        >
          (|)
        </button>
        <input
          type="radio"
          readOnly
          className="light red"
          checked={current.matches({ ON: "red" })}
        />
        <input
          type="radio"
          readOnly
          className="light yellow"
          checked={current.matches({ ON: "yellow" })}
        />
        <input
          type="radio"
          readOnly
          className="light green"
          checked={current.matches({ ON: "green" })}
        />
        <button onClick={() => send("NEXT")}>NEXT</button>
      </div>
    </div>
  )
}

export default App
