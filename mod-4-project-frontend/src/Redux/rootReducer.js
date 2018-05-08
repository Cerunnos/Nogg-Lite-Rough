
const defaultState = {
  units:[],
  builds:[],
  map:"eight",
  buildList:[],
  currentlySelected:null,
  terrainLocations:[],
  player1Army:[],
  player2Army:[],
  player1List:[],
  player2List:[],
  player1Pieces:[],
  player2Pieces:[],
  round:1,
  activations:0,
  activationsPerRound:0,
  playerTurn:1,
  cardinals:{},
  infoToggle:true,
  boardRenders:0,
  log:[]
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
    case 'CLEAR_ARMY_1':
      return {...state,player1Army:[]}
    case 'SET_ARMY_2':
      return {...state,player2Army:[...state.player2Army,action.unit]}
    case 'CLEAR_ARMY_2':
      return {...state,player2Army:[]}
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
    case 'CLEAR_PLAYER_1_LIST':
      return {...state,player1List:[]}
    case 'ADD_TO_PLAYER_2_LIST':
      return {...state,player2List:[...state.player2List,action.unit]}
    case 'CLEAR_PLAYER_2_LIST':
      return {...state,player2List:[]}
    case 'REMOVE_FROM_PLAYER_1_LIST':
      return {...state,player1List:action.filteredList}
    case 'REMOVE_FROM_PLAYER_2_LIST':
      return {...state,player2List:action.filteredList}
    case 'ADD_TO_BUILD_LIST':
      console.log(action.unit)
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
    case 'SET_MAP':
      return {...state,map:action.map}
    case 'SET_TERRAIN_LOCATIONS':
      return {...state,terrainLocations:[...state.terrainLocations,action.coordinates]}
    case 'SET_CARDINALS':
      return {...state,cardinals:action.coordinates}
    case 'TOGGLE_INFO':
      return {...state,infoToggle:!(state.infoToggle)}
    case 'INCREMENT_BOARD_RENDERS':
      return {...state,boardRenders:state.boardRenders+1}
    case 'SEND_TO_LOG':
      return {...state,log:[...state.log,action.string]}
    case 'END_ACTIVATIONS':
      return {...state,activations:0}
    default:
      return state
  }
}

export default rootReducer
