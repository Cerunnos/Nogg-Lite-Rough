calculateDamage=(piece1,piece2)=>{
  // console.log("Hit1")
  const roll1=(1+Math.floor(Math.random()*6))
  const roll2=(1+Math.floor(Math.random()*6))
  const statline1=piece1.state.unit
  const statline2=piece2.state.unit
  const as=statline1.as
  const ar=statline2.armor
  console.log("Attack Roll",roll1)
  if (roll1>=as){
    console.log("Defense Roll",roll2)
    if(roll2<ar){
      piece2.applyWounds()
    }
  }
}

//Start Setup Armies 1 and 2
reduceList1=()=>{
  // console.log(this.state.player1List[0].props.unit.name)
  let counter=0
  let filteredList=[]
  let filterName=this.state.player1List[0].props.unit.name
  let filterList=this.state.player1List.map((unit)=>{
    if (unit.props.unit.name===filterName && counter==0){
      counter++
    }else{
      filteredList.push(unit)
    }
  })
  console.log(filteredList)
  this.setState({
    player1List:filteredList,
    turns:this.state.turns+1
  },()=>console.log(this.state.turns))
}

reduceList2=()=>{

  let counter=0
  let filteredList=[]
  let filterName=this.state.player2List[0].props.unit.name
  let filterList=this.state.player2List.map((unit)=>{
    if (unit.props.unit.name===filterName && counter==0){
      counter++
    }else{
      filteredList.push(unit)
    }
  })
  console.log(filteredList)
  this.setState({
    player2List:filteredList,
    turns:this.state.turns+1
  },()=>console.log(this.state.turns))
}


setToNull1=()=>{
  if (this.state.player1List.length>0)
    this.setState({
      currPiece:null
    })
}

setToNull2=()=>{
  if (this.state.player2List.length>0)
    this.setState({
      currPiece:null
    })
}
//End Setup Armies 1 and 2

// Block 1-Logic
handleLogic = (nextPiece) => {
  let nCoords=nextPiece.props.coordinates
  let nSplit=nCoords.split(',')
  let nX=parseInt(nSplit[0])
  let nY=parseInt(nSplit[1])
  let nNum=[nX,nY]
  let cCoords=[]
  let cSplit=''
  let cX=''
  let cY=''
  let cNum=[cX,cY]

  //Select Logic
  if(nextPiece.state.active===true && nextPiece.state.selected===false){
    nextPiece.select()
  }
  else if(nextPiece.state.active===true && nextPiece.state.selected===true){
    nextPiece.deselect()
  }
  //Selecte Logic End


  //Setup Pieces
  if (this.state.currPiece===null && this.state.player1List.length>0){
    this.setState({
      currPiece:nextPiece
    },()=>
      this.state.currPiece.enable(this.state.player1List[0],
      this.state.currPiece.setArmyNumber(1),
      this.reduceList1(),
      this.setToNull1()
      )
    )
  }
  else if(this.state.currPiece===null && this.state.player2List.length>0){
    this.setState({
      currPiece:nextPiece
    },()=>
      this.state.currPiece.enable(this.state.player2List[0],
      this.state.currPiece.setArmyNumber(2),
      this.reduceList2(),
      this.setToNull2()
      )
    )
  }
  //Setup Pieces End

  //If there is a Current Piece
  else if(this.state.currPiece && this.state.currPiece.state.active===true && this.state.currPiece.state.activated===false){
    cCoords.push(this.state.currPiece.props.coordinates)
    cSplit=cCoords[0].split(',')
    cX=parseInt(cSplit[0])
    cY=parseInt(cSplit[1])
    cNum=[cX,cY]

//8 moves
    let moves1=(
      (nX===cX+1 && nY===cY+1) ||
      (nX===cX+1 && nY===cY-1) ||
      (nX===cX-1 && nY===cY+1) ||
      (nX===cX-1 && nY===cY-1) ||
      (nX===cX+1 && nY===cY) ||
      (nX===cX-1 && nY===cY) ||
      (nX===cX && nY===cY+1) ||
      (nX===cX && nY===cY-1)
    )
//16 moves
    let moves2=(
      (nX===cX+2 && nY===cY+2) ||
      (nX===cX+2 && nY===cY+1) ||
      (nX===cX+2 && nY===cY) ||
      (nX===cX+2 && nY===cY-1) ||
      (nX===cX+2 && nY===cY-2) ||
      (nX===cX+1 && nY===cY+2) ||
      (nX===cX && nY===cY+2) ||
      (nX===cX-1 && nY===cY+2) ||

      (nX===cX-2 && nY===cY+2) ||
      (nX===cX-2 && nY==cY-2) ||
      (nX===cX && nY==cY-2) ||
      (nX===cX-2 && nY==cY) ||
      (nX===cX-1 && nY==cY-2) ||
      (nX===cX-2 && nY==cY-1) ||
      (nX===cX-2 && nY==cY+1) ||
      (nX===cX+1 && nY==cY-2)
    )
//24 moves
    let moves3=(
      (nX===cX+3 && nY==cY+3) ||
      (nX===cX+3 && nY==cY+2) ||
      (nX===cX+3 && nY==cY+1) ||
      (nX===cX+3 && nY==cY) ||
      (nX===cX+2 && nY==cY+3) ||
      (nX===cX+1 && nY==cY+3) ||
      (nX===cX && nY==cY+3) ||
      (nX===cX-3 && nY==cY-3) ||

      (nX===cX-3 && nY==cY-2) ||
      (nX===cX-3 && nY==cY-1) ||
      (nX===cX-3 && nY==cY) ||
      (nX===cX-2 && nY==cY-3) ||
      (nX===cX-1 && nY==cY-3) ||
      (nX===cX && nY==cY-3) ||
      (nX===cX && nY==cY) ||
      (nX===cX+3 && nY==cY-1) ||

      (nX===cX+3 && nY==cY-2) ||
      (nX===cX+3 && nY==cY-3) ||
      (nX===cX+2 && nY==cY-3) ||
      (nX===cX+1 && nY==cY-3) ||
      (nX===cX-3 && nY==cY+1) ||
      (nX===cX-3 && nY==cY+2) ||
      (nX===cX-3 && nY==cY+3) ||
      (nX===cX-1 && nY===cY+3)
    )
//32 moves
    let moves4=(
      (nX===cX+4 && nY==cY+4) ||
      (nX===cX+4 && nY==cY+3) ||
      (nX===cX+4 && nY==cY+2) ||
      (nX===cX+4 && nY==cY+1) ||
      (nX===cX+4 && nY==cY) ||
      (nX===cX+4 && nY==cY-1) ||
      (nX===cX+4 && nY==cY-2) ||
      (nX===cX+4 && nY==cY-3) ||

      (nX===cX+4 && nY==cY-4) ||
      (nX===cX+3 && nY==cY-4) ||
      (nX===cX+2 && nY==cY-4) ||
      (nX===cX+1 && nY==cY-4) ||
      (nX===cX && nY==cY-4) ||
      (nX===cX-1 && nY==cY-4) ||
      (nX===cX-2 && nY==cY-4) ||
      (nX===cX-3 && nY==cY-4) ||

      (nX===cX-4 && nY==cY-4) ||
      (nX===cX-4 && nY==cY-3) ||
      (nX===cX-4 && nY==cY-2) ||
      (nX===cX-4 && nY==cY-1) ||
      (nX===cX-4 && nY==cY) ||
      (nX===cX-4 && nY==cY+1) ||
      (nX===cX-4 && nY==cY+2) ||
      (nX===cX-4 && nY==cY+3) ||

      (nX===cX-4 && nY==cY+4) ||
      (nX===cX-3 && nY==cY+4) ||
      (nX===cX-2 && nY==cY+4) ||
      (nX===cX-1 && nY==cY+4) ||
      (nX===cX && nY==cY+4) ||
      (nX===cX+1 && nY==cY+4) ||
      (nX===cX+2 && nY==cY+4) ||
      (nX===cX+3 && nY==cY+4)
    )
//40 moves
    let moves5=(
      (nX===cX+5 && nY==cY+5) ||
      (nX===cX+5 && nY==cY+4) ||
      (nX===cX+5 && nY==cY+3) ||
      (nX===cX+5 && nY==cY+2) ||
      (nX===cX+5 && nY==cY+1) ||
      (nX===cX+5 && nY==cY) ||
      (nX===cX+5 && nY==cY-1) ||
      (nX===cX+5 && nY==cY-2) ||

      (nX===cX+5 && nY==cY-3) ||
      (nX===cX+5 && nY==cY-4) ||
      (nX===cX+5 && nY==cY-5) ||
      (nX===cX+4 && nY==cY-5) ||
      (nX===cX+3 && nY==cY-5) ||
      (nX===cX+2 && nY==cY-5) ||
      (nX===cX+1 && nY==cY-5) ||
      (nX===cX && nY==cY-5) ||

      (nX===cX-1 && nY==cY-5) ||
      (nX===cX-2 && nY==cY-5) ||
      (nX===cX-3 && nY==cY-5) ||
      (nX===cX-4 && nY==cY-5) ||
      (nX===cX-5 && nY==cY-5) ||
      (nX===cX-5 && nY==cY-4) ||
      (nX===cX-5 && nY==cY-3) ||
      (nX===cX-5 && nY==cY-2) ||

      (nX===cX-5 && nY==cY-1) ||
      (nX===cX-5 && nY==cY) ||
      (nX===cX-5 && nY==cY+1) ||
      (nX===cX-5 && nY==cY+2) ||
      (nX===cX-5 && nY==cY+3) ||
      (nX===cX-5 && nY==cY+4) ||
      (nX===cX-5 && nY==cY+5) ||
      (nX===cX-4 && nY==cY+5) ||

      (nX===cX-3 && nY==cY+5) ||
      (nX===cX-2 && nY==cY+5) ||
      (nX===cX-1 && nY==cY+5) ||
      (nX===cX && nY==cY+5) ||
      (nX===cX+1 && nY==cY+5) ||
      (nX===cX+2 && nY==cY+5) ||
      (nX===cX+3 && nY==cY+5) ||
      (nX===cX+4 && nY==cY+5)

    )
//48 moves
    let moves6=(
      (nX===cX+6 && nY==cY+6) ||
      (nX===cX+6 && nY==cY+5) ||
      (nX===cX+6 && nY==cY+4) ||
      (nX===cX+6 && nY==cY+3) ||
      (nX===cX+6 && nY==cY+2) ||
      (nX===cX+6 && nY==cY+1) ||
      (nX===cX+6 && nY==cY) ||
      (nX===cX+6 && nY==cY-1) ||

      (nX===cX+6 && nY==cY-2) ||
      (nX===cX+6 && nY==cY-3) ||
      (nX===cX+6 && nY==cY-4) ||
      (nX===cX+6 && nY==cY-5) ||
      (nX===cX+6 && nY==cY-6) ||
      (nX===cX+5 && nY==cY-6) ||
      (nX===cX+4 && nY==cY-6) ||
      (nX===cX+3 && nY==cY-6) ||

      (nX===cX+2 && nY==cY-6) ||
      (nX===cX+1 && nY==cY-6) ||
      (nX===cX && nY==cY-6) ||
      (nX===cX-1 && nY==cY-6) ||
      (nX===cX-2 && nY==cY-6) ||
      (nX===cX-3 && nY==cY-6) ||
      (nX===cX-4 && nY==cY-6) ||
      (nX===cX-5 && nY==cY-6) ||

      (nX===cX-6 && nY==cY-6) ||
      (nX===cX-6 && nY==cY-5) ||
      (nX===cX-6 && nY==cY-4) ||
      (nX===cX-6 && nY==cY-3) ||
      (nX===cX-6 && nY==cY-2) ||
      (nX===cX-6 && nY==cY-1) ||
      (nX===cX-6 && nY==cY) ||
      (nX===cX-6 && nY==cY+1) ||

      (nX===cX-6 && nY==cY+2) ||
      (nX===cX-6 && nY==cY+3) ||
      (nX===cX-6 && nY==cY+4) ||
      (nX===cX-6 && nY==cY+5) ||
      (nX===cX-6 && nY==cY+6) ||
      (nX===cX-5 && nY==cY+6) ||
      (nX===cX-4 && nY==cY+6) ||
      (nX===cX-3 && nY==cY+6) ||

      (nX===cX-2 && nY==cY+6) ||
      (nX===cX-1 && nY==cY+6) ||
      (nX===cX && nY==cY+6) ||
      (nX===cX+1 && nY==cY+6) ||
      (nX===cX+2 && nY==cY+6) ||
      (nX===cX+3 && nY==cY+6) ||
      (nX===cX+4 && nY==cY+6) ||
      (nX===cX+5 && nY==cY+6)
    )

    let moveset1=(moves1)
    let moveset2=(moves1 || moves2)
    let moveset3=(moves1 || moves2 || moves3)
    let moveset4=(moves1 || moves2 || moves3 || moves4)
    let moveset5=(moves1 || moves2 || moves3 || moves4 || moves5)
    let moveset6=(moves1 || moves2 || moves3 || moves4 || moves5 || moves6)

    //reset on select
    let currentMoveset=moveset3

    if (this.state.currPiece.state.unit.movement===1){
      currentMoveset=moveset1
    }
    else if (this.state.currPiece.state.unit.movement===2){
      currentMoveset=moveset2
    }else if (this.state.currPiece.state.unit.movement===3){
      currentMoveset=moveset3
    }else if (this.state.currPiece.state.unit.movement===4){
      currentMoveset=moveset4
    }else if (this.state.currPiece.state.unit.movement===5){
      currentMoveset=moveset5
    }else if (this.state.currPiece.state.unit.movement===6){
      currentMoveset=moveset6
    }

    if (this.state.currPiece.state.selected && nextPiece.state.active && nextPiece !== this.state.currPiece){
      if (moveset1 && nextPiece.state.armyNumber !== this.state.currPiece.state.armyNumber && this.state.currPiece.state.attackPhase===1){
        nextPiece.deselect()
        this.calculateDamage(this.state.currPiece,nextPiece)
        this.state.currPiece.useAttackPhase()
        this.state.currPiece.deselect()
      }else{
        this.state.currPiece.deselect()
      }
    }

    if (nextPiece.state.active===true){
      this.setState({
        currPiece:nextPiece
      })
    }
    else if (nextPiece === this.state.currPiece) {
      return
    }
    else if (this.state.currentlySelected && currentMoveset && this.state.currPiece.state.movementPhase===1) {
      this.state.currPiece.disable()
      nextPiece.enable(this.state.currentlySelected)
      nextPiece.useMovementPhase()

      this.setState({currPiece: nextPiece})
    }

    if (this.state.turns===0){
      console.log("Hit")
    }
  }
  //If there is a Current Piece End

  //If there is no Current Piece
  else{
    this.setState({
      currPiece: nextPiece
    })
  }
  //If threre is no Current Piece End
}
//Block1 end
