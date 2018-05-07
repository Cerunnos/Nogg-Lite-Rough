import parseCoordinates from './parseCoordinates'

function determineLoS(terrainLocations,coordinates){
  let cardinals={
    north:[],
    east:[],
    south:[],
    west:[],
    northEast:[],
    southEast:[],
    southWest:[],
    northWest:[]
  }
  let currentCoordinates=parseCoordinates(coordinates)
  let currentX=currentCoordinates[0]
  let currentY=currentCoordinates[1]
  terrainLocations.forEach((location)=>{
    let locationCoordinates=parseCoordinates(location)
    let locationX=locationCoordinates[0]
    let locationY=locationCoordinates[1]

    let currentLocationDistanceX=Math.pow((locationX-currentX),2)
    let currentLocationDistanceY=Math.pow((locationY-currentY),2)
    let currentLocationDistanceXY=currentLocationDistanceX+currentLocationDistanceY
    let totalCurrentLocationDistance=Math.sqrt(currentLocationDistanceXY) //Final

    if (locationX===currentX && locationY<currentY){ //North
      if (cardinals.north.length<1){
        cardinals.north=locationCoordinates
      }else{
        let currentNorthDistanceX=Math.pow((cardinals.north[0]-currentX),2)
        let currentNorthDistanceY=Math.pow((cardinals.north[1]-currentY),2)
        let currentNorthDistanceXY=currentNorthDistanceX+currentNorthDistanceY
        let totalCurrentNorthDistance=Math.sqrt(currentNorthDistanceXY) //Final

        if (totalCurrentLocationDistance<totalCurrentNorthDistance){
          cardinals.north=locationCoordinates
        }
      }
    }
    else if (locationX>currentX && locationY<currentY && (Math.abs(locationX-currentX)===Math.abs(locationY-currentY))){ //Northeast
      // console.log(locationX,locationY)
      if (cardinals.northEast.length<1){
        cardinals.northEast=locationCoordinates
      }else{
        let currentNorthEastDistanceX=Math.pow((cardinals.northEast[0]-currentX),2)
        let currentNorthEastDistanceY=Math.pow((cardinals.northEast[1]-currentY),2)
        let currentNorthEastDistanceXY=currentNorthEastDistanceX+currentNorthEastDistanceY
        let totalCurrentNorthEastDistance=Math.sqrt(currentNorthEastDistanceXY) //Final

        if (totalCurrentLocationDistance<totalCurrentNorthEastDistance){
          cardinals.northEast=locationCoordinates
        }
      }
    }
    else if (locationX>currentX && locationY===currentY){ //East
      if (cardinals.east.length<1){
        cardinals.east=locationCoordinates
      }else{
        let currentEastDistanceX=Math.pow((cardinals.east[0]-currentX),2)
        let currentEastDistanceY=Math.pow((cardinals.east[1]-currentY),2)
        let currentEastDistanceXY=currentEastDistanceX+currentEastDistanceY
        let totalCurrentEastDistance=Math.sqrt(currentEastDistanceXY) //Final

        if (totalCurrentLocationDistance<totalCurrentEastDistance){
          cardinals.east=locationCoordinates
        }
      }
    }
    else if (locationX>currentX && locationY>currentY && (Math.abs(locationX-currentX)===Math.abs(locationY-currentY))){ //Southeast
      if (cardinals.southEast.length<1){
        cardinals.southEast=locationCoordinates
      }else{
        let currentSouthEastDistanceX=Math.pow((cardinals.southEast[0]-currentX),2)
        let currentSouthEastDistanceY=Math.pow((cardinals.southEast[1]-currentY),2)
        let currentSouthEastDistanceXY=currentSouthEastDistanceX+currentSouthEastDistanceY
        let totalCurrentSouthEastDistance=Math.sqrt(currentSouthEastDistanceXY) //Final
        if (totalCurrentLocationDistance<totalCurrentSouthEastDistance){
          cardinals.southEast=locationCoordinates
          // console.log(cardinals.southEast=locationCoordinates)
        }
      }
    }
    else if (locationX===currentX && locationY>currentY){ //South
      if (cardinals.south.length<1){
        cardinals.south=locationCoordinates
      }else{
        let currentSouthDistanceX=Math.pow((cardinals.south[0]-currentX),2)
        let currentSouthDistanceY=Math.pow((cardinals.south[1]-currentY),2)
        let currentSouthDistanceXY=currentSouthDistanceX+currentSouthDistanceY
        let totalCurrentSouthDistance=Math.sqrt(currentSouthDistanceXY) //Final

        if (totalCurrentLocationDistance<totalCurrentSouthDistance){
          cardinals.south=locationCoordinates
        }
      }
    }
    else if (locationX<currentX && locationY>currentY && (Math.abs(locationX-currentX)===Math.abs(locationY-currentY))){ //Southwest
      if (cardinals.southWest.length<1){
        cardinals.southWest=locationCoordinates
      }else{
        let currentSouthWestDistanceX=Math.pow((cardinals.southWest[0]-currentX),2)
        let currentSouthWestDistanceY=Math.pow((cardinals.southWest[1]-currentY),2)
        let currentSouthWestDistanceXY=currentSouthWestDistanceX+currentSouthWestDistanceY
        let totalCurrentSouthWestDistance=Math.sqrt(currentSouthWestDistanceXY) //Final
        if (totalCurrentLocationDistance<totalCurrentSouthWestDistance){
          cardinals.southWest=locationCoordinates
        }
      }
    }
    else if (locationX<currentX && locationY===currentY){ //West
      if (cardinals.west.length<1){
        cardinals.west=locationCoordinates
      }else{
        let currentWestDistanceX=Math.pow((cardinals.west[0]-currentX),2)
        let currentWestDistanceY=Math.pow((cardinals.west[1]-currentY),2)
        let currentWestDistanceXY=currentWestDistanceX+currentWestDistanceY
        let totalCurrentWestDistance=Math.sqrt(currentWestDistanceXY) //Final

        if (totalCurrentLocationDistance<totalCurrentWestDistance){
          cardinals.west=locationCoordinates
        }
      }
    }
    else if (locationX<currentX && locationY<currentY && (Math.abs(locationX-currentX)===Math.abs(locationY-currentY))){ //Northwest
      if (cardinals.northWest.length<1){
        cardinals.northWest=locationCoordinates
      }else{
        let currentNorthWestDistanceX=Math.pow((cardinals.northWest[0]-currentX),2)
        let currentNorthWestDistanceY=Math.pow((cardinals.northWest[1]-currentY),2)
        let currentNorthWestDistanceXY=currentNorthWestDistanceX+currentNorthWestDistanceY
        let totalCurrentNorthWestDistance=Math.sqrt(currentNorthWestDistanceXY) //Final

        if (totalCurrentLocationDistance<totalCurrentNorthWestDistance){
          cardinals.northWest=locationCoordinates
        }
      }
    }
  })
  return cardinals
}

export default (determineLoS);
