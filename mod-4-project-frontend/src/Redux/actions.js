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
export const REMOVE_FROM_PLAYER_1_LIST = 'REMOVE_FROM_PLAYER_1_LIST'
export const REMOVE_FROM_PLAYER_2_LIST = 'REMOVE_FROM_PLAYER_2_LIST'
export const ADD_TO_BUILD_LIST = 'ADD_TO_BUILD_LIST'
export const ADD_BUILDS = 'ADD_BUILDS'
export const CLEAR_BUILD_LIST = 'CLEAR_BUILD_LIST'
export const SET_PLAYER_1_PIECES = 'SET_PLAYER_1_PIECES'
export const SET_PLAYER_2_PIECES = 'SET_PLAYER_2_PIECES'
export const SET_NEW_PIECES_1 = 'SET_NEW_PIECES_1'
export const SET_NEW_PIECES_2 = 'SET_NEW_PIECES_2'
export const SET_MAP = 'SET_MAP'
export const SET_TERRAIN_LOCATIONS = 'SET_TERRAIN_LOCATIONS'
export const SET_CARDINALS = 'SET_CARDINALS'
export const CLEAR_ARMY_1 = 'CLEAR_ARMY_1'
export const CLEAR_ARMY_2 = 'CLEAR_ARMY_2'
export const CLEAR_PLAYER_1_LIST = 'CLEAR_PLAYER_1_LIST'
export const CLEAR_PLAYER_2_LIST = 'CLEAR_PLAYER_2_LIST'
export const TOGGLE_INFO = 'TOGGLE_INFO'
export const INCREMENT_BOARD_RENDERS = 'INCREMENT_BOARD_RENDERS'
export const SEND_TO_LOG = 'SEND_TO_LOG'

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

export function fetchBuildData(url){
  return(dispatch)=>{
    fetch(url)
      .then(res=>res.json())
      .then(json=>dispatch(addBuilds(json)))
  }
}

export function addBuilds(builds){
  return {type:ADD_BUILDS,builds}
}

export function setCurrentlySelected(unit){
  return {type: SET_CURRENTLY_SELECTED, unit}
}

export function addToPlayer1Army(unit){
  return {type:SET_ARMY_1, unit}
}

export function clearPlayer1Army(){
  return {type:CLEAR_ARMY_1}
}

export function addToPlayer2Army(unit){
  return {type:SET_ARMY_2, unit}
}

export function clearPlayer2Army(){
  return {type:CLEAR_ARMY_2}
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

export function clearPlayer1List(){
  return {type:CLEAR_PLAYER_1_LIST}
}

export function addToPlayer2List(unit){
  return {type:ADD_TO_PLAYER_2_LIST,unit}
}

export function clearPlayer2List(){
  return {type:CLEAR_PLAYER_2_LIST}
}

export function removeFromPlayer1List(filteredList){
  return {type:REMOVE_FROM_PLAYER_1_LIST,filteredList}
}

export function removeFromPlayer2List(filteredList){
  return {type:REMOVE_FROM_PLAYER_2_LIST,filteredList}
}

export function addToBuildList(unit){
  return {type:ADD_TO_BUILD_LIST,unit}
}

export function clearBuildList(){
  return {type:CLEAR_BUILD_LIST}
}

export function setPlayer1Pieces(unit){
  return {type:SET_PLAYER_1_PIECES,unit}
}

export function setPlayer2Pieces(unit){
  return {type:SET_PLAYER_2_PIECES,unit}
}

export function setNewPieces1(list){
  return {type:SET_NEW_PIECES_1,list}
}

export function setNewPieces2(list){
  return {type:SET_NEW_PIECES_2,list}
}

export function setMap(map){
  return {type:SET_MAP,map}
}

export function setTerrainLocations(coordinates){
  return {type:SET_TERRAIN_LOCATIONS,coordinates}
}

export function setCardinals(coordinates){
  return {type:SET_CARDINALS,coordinates}
}

export function toggleInfo(){
  return {type:TOGGLE_INFO}
}

export function incrementBoardRenders(){
  return {type:INCREMENT_BOARD_RENDERS}
}

export function sendToLog(string){
  return {type:SEND_TO_LOG,string}
}
