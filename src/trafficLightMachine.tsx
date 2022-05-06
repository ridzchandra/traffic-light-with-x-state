import { createMachine } from "xstate"

// createMachine takes 3 type params:
// 1. context - extra data in addition to state, basically values like input text and the results that we fetched from backend are stored in the context. In react without x-state, we'd directly use the useState hooks
// 2. Events - events are what trigger effects (one state to another) on the machine
// 3. States

// createMachine takes one param: the state machine

// We can implement complex state machines using hierarchical states

type TrafficLightEvents = { type: "NEXT" } | { type: "ON" } | { type: "OFF" }
type TrafficLightStates =
  | {
      value: { ON: "red" }
      context: undefined
    }
  | {
      value: { ON: "yellow" }
      context: undefined
    }
  | {
      value: { ON: "green" }
      context: undefined
    }
  | {
      value: "OFF"
      context: undefined
    }

export const trafficLightMachine = createMachine<
  undefined,
  TrafficLightEvents,
  TrafficLightStates
>({
  initial: "OFF",
  id: "traffic-light",
  states: {
    ON: {
      initial: "red",
      states: {
        green: {
          // for every state we can define the event -> next state mapping on 'on' property and delayed transitions on 'after' property. Below 'NEXT' is just an event name we used. It could have been any other string
          on: {
            NEXT: "yellow",
          },
          after: {
            1000: "yellow",
          },
        },
        yellow: {
          on: {
            NEXT: "red",
          },
          after: {
            1000: "red",
          },
        },
        red: {
          on: {
            NEXT: "green",
          },
          after: {
            1000: "green",
          },
        },
      },
      on: {
        OFF: "OFF",
      },
    },
    OFF: {
      on: {
        ON: "ON",
      },
    },
  },
})
