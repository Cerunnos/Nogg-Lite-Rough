function movement(movementRange, nextX , nextY, currentX, currentY){
  let xDifference=Math.abs(currentX-nextX)
  let yDifference=Math.abs(currentY-nextY)
  if ((xDifference<=movementRange) && (yDifference<=movementRange)){
    return true
  }else{
    return false
  }
}

export default movement
