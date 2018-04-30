
const defaultState = {
  units:[],
  builds:[],
  map:"eight",
  buildList:[],
  currentlySelected:null,
  player1Army:[],
  player2Army:[],
  player1List:[],
  player2List:[],
  player1Pieces:[],
  player2Pieces:[],
  round:1,
  activations:0,
  activationsPerRound:0,
  playerTurn:1
}

const rootReducer=(state=defaultState,action)=>{
  switch(action.type){
    case 'ADD_UNITS':
      return {...state,units:action.units}
    case 'ADD_BUILDS':
      return {...state,builds:action.builds}
    case 'SET_CURRENTLY_SELECTED':
      return {...state,currentlySelected:action.unit}
    case 'SET_ARMY_1':
      return {...state,player1Army:[...state.player1Army,action.unit]}
    case 'SET_ARMY_2':
      return {...state,player2Army:[...state.player2Army,action.unit]}
    case 'FILTER_ARMY_1':
      return {...state,player1Army:action.filteredArmy}
    case 'FILTER_ARMY_2':
      return {...state,player2Army:action.filteredArmy}
    case 'ADD_ACTIVATION':
      return {...state,activations:state.activations+1}
    case 'SUBTRACT_ACTIVATION':
      return {...state,activations:state.activations-action.num}
    case 'NEXT_ROUND':
      return {...state,round:state.round+1}
    case 'SET_TOTAL_ACTIVATIONS':
      return {...state,activationsPerRound:state.activations}
    case 'RESET_ACTIVATIONS':
      return {...state,activations:state.activationsPerRound}
    case 'SWITCH_TURN':
      return {...state,playerTurn:action.playerNum}
    case 'REDUCE_TOTAL_ACTIVATIONS':
      return {...state,activationsPerRound:state.activationsPerRound-1}
    case 'ADD_TO_PLAYER_1_LIST':
      return {...state,player1List:[...state.player1List,action.unit]}
    case 'ADD_TO_PLAYER_2_LIST':
      return {...state,player2List:[...state.player2List,action.unit]}
    case 'REMOVE_FROM_PLAYER_1_LIST':
      return {...state,player1List:action.filteredList}
    case 'REMOVE_FROM_PLAYER_2_LIST':
      return {...state,player2List:action.filteredList}
    case 'ADD_TO_BUILD_LIST':
      return {...state,buildList:[...state.buildList,action.unit]}
    case 'CLEAR_BUILD_LIST':
      return {...state,buildList:[]}
    case 'SET_PLAYER_1_PIECES':
      return {...state,player1Pieces:[...state.player1Pieces,action.unit]}
    case 'SET_PLAYER_2_PIECES':
      return {...state,player2Pieces:[...state.player2Pieces,action.unit]}
    case 'SET_NEW_PIECES_1':
      return {...state,player1Pieces:action.list}
    case 'SET_NEW_PIECES_2':
      return {...state,player2Pieces:action.list}
    default:
      return state
  }
}

export default rootReducer
