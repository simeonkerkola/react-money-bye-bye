import { createStore } from 'redux'

const incrementCount = ({ incrementBy = 1} = {}) => ({ // If no args given, empty object as default, and incrementBy defaults 1
  type: 'INCREMENT',
  // if payload argument given, check the type and add, or else default 1
  incrementBy,
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
})

const resetCount = () => ({
  type: 'RESET',
})

const setCount = ({ count }) => ({ // no default values, forces user to provide count
  type: 'SET',
  count,
})

// basically same as:
// this.setState((prevState) => {
//  return prevState
// })
const store = createStore((state = { count: 0 }, action) => {
  // if (action.type === 'INCREMENT')
  switch (action.type) {
    case 'INCREMENT':
    return {
      count: state.count + action.incrementBy
    }
    case 'DECREMENT':
    return {
      count: state.count - action.decrementBy
    }
    case 'RESET':
    return {
      count: 0
    }
    case 'SET':
    return {
      count: action.count
    }
    default:
      return state
  }
})

// Gets called every time the store changes
// return value of subscribe is a function which unsubscribes
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
})

// store.dispatch({ // send the object to redux
//   type: 'INCREMENT',
//   incrementBy: 5,
// })

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount())

// unsubscribe()

store.dispatch(resetCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount({ count: 666 }))
