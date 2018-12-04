export const loadState = state => {
  try {
    const serializedState = localStorage.getItem('bitubi::state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('bitubi::state', serializedState)
  } catch (error) {
    console.log(error)
  }
}
