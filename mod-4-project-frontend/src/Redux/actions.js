export const LOG = 'LOG'

export function addLog(text){
  return {type: LOG, text}
}

export function fetchUnitData(url){
  return(dispatch)=>{
    fetch(url)
      .then(res=>res.json())
      .then(json=>dispatch(addLog(json)))
  }
}
