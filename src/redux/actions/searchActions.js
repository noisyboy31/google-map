export const RECEIVED_DATA = 'RECEIVED_DATA'
export const GET_DATA = 'GET_DATA'
export const CLEAR_DATA = 'CLEAR_DATA'
export const CLEAR_BY_DATA = 'CLEAR_BY_DATA'

export function updateHistory(results) {
  return { 
    type: RECEIVED_DATA, payload: results
  }
}

export function clearByData(val) {
  return { 
    type: CLEAR_BY_DATA, value: val
  }
}

export function clearHistory() {
  return { 
    type: CLEAR_DATA
  }
}