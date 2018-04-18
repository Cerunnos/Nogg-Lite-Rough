const rootReducer=(state={example:'HI THERE'},action)=>{
  switch(action.type){
    case 'LOG':
      return action.text
    default:
      return state
  }
}

export default rootReducer

//import {connect} from 'react-redux'
//export default connect()(*Component*)
