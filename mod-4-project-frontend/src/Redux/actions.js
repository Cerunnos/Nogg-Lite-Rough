export const ADD_UNITS = 'ADD_UNITS'
export const SET_CURRENTLY_SELECTED = 'SET_CURRENTLY_SELECTED'
export const SET_ARMY_1 = 'SET_ARMY_1'
export const SET_ARMY_2 = 'SET_ARMY_2'
export const FILTER_ARMY_1 = 'FILTER_ARMY_1'
export const FILTER_ARMY_2 = 'FILTER_ARMY_2'
export const ADD_ACTIVATION = 'ADD_ACTIVATION'
export const SUBTRACT_ACTIVATION = 'SUBTRACT_ACTIVATION'
export const NEXT_ROUND = 'NEXT_ROUND'
export const SET_TOTAL_ACTIVATIONS = 'SET_TOTAL_ACTIVATIONS'
export const RESET_ACTIVATIONS = 'RESET_ACTIVATIONS'
export const TESTING = 'TESTING'
export const SWITCH_TURN='SWITCH_TURN'
export const REDUCE_TOTAL_ACTIVATIONS='REDUCE_TOTAL_ACTIVATIONS'
export const ADD_TO_PLAYER_1_LIST = 'ADD_TO_PLAYER_1_LIST'
export const ADD_TO_PLAYER_2_LIST = 'ADD_TO_PLAYER_2_LIST'

export function addUnits(units){
  return {type: ADD_UNITS, units}
}

export function fetchUnitData(url){
  return(dispatch)=>{
    fetch(url)
      .then(res=>res.json())
      .then(json=>dispatch(addUnits(json)))
  }
}

export function setCurrentlySelected(unit){
  return {type: SET_CURRENTLY_SELECTED, unit}
}

export function addToPlayer1Army(unit){
  return {type:SET_ARMY_1, unit}
}

export function addToPlayer2Army(unit){
  return {type:SET_ARMY_2, unit}
}

export function filterArmy1(filteredArmy){
  return {type:FILTER_ARMY_1, filteredArmy}
}

export function filterArmy2(filteredArmy){
  return {type:FILTER_ARMY_2, filteredArmy}
}

export function tallyActivations(){
  return {type:ADD_ACTIVATION}
}

export function reduceActivations(num=1){
  return {type:SUBTRACT_ACTIVATION,num}
}

export function reduceTotalActivations(){
  return {type:REDUCE_TOTAL_ACTIVATIONS}
}

export function incrementRounds(){
  return {type:NEXT_ROUND}
}

export function setTotalActivations(){
  return {type:SET_TOTAL_ACTIVATIONS}
}

export function resetActivations(){
  return {type:RESET_ACTIVATIONS}
}

export function thunkTest(){
  return (dispatch)=>{
    dispatch(reduceActivations())
    return Promise.resolve()
  }
}

export function switchTurn(playerNum){
  return {type:SWITCH_TURN,playerNum}
}

export function addToPlayer1List(unit){
  return {type:ADD_TO_PLAYER_1_LIST,unit}
}

export function addToPlayer2List(unit){
  return {type:ADD_TO_PLAYER_2_LIST,unit}
}
