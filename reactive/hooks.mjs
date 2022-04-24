export function createHooks(cb) {
  const Index = 0
  const Hook = {}
  function useState(initState) {
    if (!(Index in Hook)) Hook[Index] = initState

    function createUpdater(index) {
      return function updater(nextState) {
        const prevState = Hook[index]
        Hook[index] = nextState
        cb(prevState, nextState)
      }
    }

    const state = Hook[Index++]

    return [state]
  }
  return {
    useState,
  }
}
