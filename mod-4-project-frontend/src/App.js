import React, { Component } from 'react';
import Page from './components/Page'
// import {connect} from 'react-redux'
import MenuContainer from './components/Page'
import Setup from './components/Setup'

import {Route} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Page/>
      </div>
    );
  }
}

export default App;
// const mapStateToProps=state=>{
//   return {
//     store: state
//   };
// };
//
// export default connect(mapStateToProps)(App);

// <Route exact path="/" render={() => <MenuContainer/>}/>
// <Route exact path="/setup" render={()=><Setup/>}/>
