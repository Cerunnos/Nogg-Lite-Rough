function movement(m,nX,nY,cX,cY){
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
    (nX===cX-2 && nY===cY-2) ||
    (nX===cX && nY===cY-2) ||
    (nX===cX-2 && nY===cY) ||
    (nX===cX-1 && nY===cY-2) ||
    (nX===cX-2 && nY===cY-1) ||
    (nX===cX-2 && nY===cY+1) ||
    (nX===cX+1 && nY===cY-2)
  )
//24 moves
  let moves3=(
    (nX===cX+3 && nY===cY+3) ||
    (nX===cX+3 && nY===cY+2) ||
    (nX===cX+3 && nY===cY+1) ||
    (nX===cX+3 && nY===cY) ||
    (nX===cX+2 && nY===cY+3) ||
    (nX===cX+1 && nY===cY+3) ||
    (nX===cX && nY===cY+3) ||
    (nX===cX-3 && nY===cY-3) ||

    (nX===cX-3 && nY===cY-2) ||
    (nX===cX-3 && nY===cY-1) ||
    (nX===cX-3 && nY===cY) ||
    (nX===cX-2 && nY===cY-3) ||
    (nX===cX-1 && nY===cY-3) ||
    (nX===cX && nY===cY-3) ||
    (nX===cX && nY===cY) ||
    (nX===cX+3 && nY===cY-1) ||

    (nX===cX+3 && nY===cY-2) ||
    (nX===cX+3 && nY===cY-3) ||
    (nX===cX+2 && nY===cY-3) ||
    (nX===cX+1 && nY===cY-3) ||
    (nX===cX-3 && nY===cY+1) ||
    (nX===cX-3 && nY===cY+2) ||
    (nX===cX-3 && nY===cY+3) ||
    (nX===cX-2 && nY===cY+3) ||
    (nX===cX-1 && nY===cY+3)

  )
//32 moves
  let moves4=(
    (nX===cX+4 && nY===cY+4) ||
    (nX===cX+4 && nY===cY+3) ||
    (nX===cX+4 && nY===cY+2) ||
    (nX===cX+4 && nY===cY+1) ||
    (nX===cX+4 && nY===cY) ||
    (nX===cX+4 && nY===cY-1) ||
    (nX===cX+4 && nY===cY-2) ||
    (nX===cX+4 && nY===cY-3) ||

    (nX===cX+4 && nY===cY-4) ||
    (nX===cX+3 && nY===cY-4) ||
    (nX===cX+2 && nY===cY-4) ||
    (nX===cX+1 && nY===cY-4) ||
    (nX===cX && nY===cY-4) ||
    (nX===cX-1 && nY===cY-4) ||
    (nX===cX-2 && nY===cY-4) ||
    (nX===cX-3 && nY===cY-4) ||

    (nX===cX-4 && nY===cY-4) ||
    (nX===cX-4 && nY===cY-3) ||
    (nX===cX-4 && nY===cY-2) ||
    (nX===cX-4 && nY===cY-1) ||
    (nX===cX-4 && nY===cY) ||
    (nX===cX-4 && nY===cY+1) ||
    (nX===cX-4 && nY===cY+2) ||
    (nX===cX-4 && nY===cY+3) ||

    (nX===cX-4 && nY===cY+4) ||
    (nX===cX-3 && nY===cY+4) ||
    (nX===cX-2 && nY===cY+4) ||
    (nX===cX-1 && nY===cY+4) ||
    (nX===cX && nY===cY+4) ||
    (nX===cX+1 && nY===cY+4) ||
    (nX===cX+2 && nY===cY+4) ||
    (nX===cX+3 && nY===cY+4)
  )
//40 moves
  let moves5=(
    (nX===cX+5 && nY===cY+5) ||
    (nX===cX+5 && nY===cY+4) ||
    (nX===cX+5 && nY===cY+3) ||
    (nX===cX+5 && nY===cY+2) ||
    (nX===cX+5 && nY===cY+1) ||
    (nX===cX+5 && nY===cY) ||
    (nX===cX+5 && nY===cY-1) ||
    (nX===cX+5 && nY===cY-2) ||

    (nX===cX+5 && nY===cY-3) ||
    (nX===cX+5 && nY===cY-4) ||
    (nX===cX+5 && nY===cY-5) ||
    (nX===cX+4 && nY===cY-5) ||
    (nX===cX+3 && nY===cY-5) ||
    (nX===cX+2 && nY===cY-5) ||
    (nX===cX+1 && nY===cY-5) ||
    (nX===cX && nY===cY-5) ||

    (nX===cX-1 && nY===cY-5) ||
    (nX===cX-2 && nY===cY-5) ||
    (nX===cX-3 && nY===cY-5) ||
    (nX===cX-4 && nY===cY-5) ||
    (nX===cX-5 && nY===cY-5) ||
    (nX===cX-5 && nY===cY-4) ||
    (nX===cX-5 && nY===cY-3) ||
    (nX===cX-5 && nY===cY-2) ||

    (nX===cX-5 && nY===cY-1) ||
    (nX===cX-5 && nY===cY) ||
    (nX===cX-5 && nY===cY+1) ||
    (nX===cX-5 && nY===cY+2) ||
    (nX===cX-5 && nY===cY+3) ||
    (nX===cX-5 && nY===cY+4) ||
    (nX===cX-5 && nY===cY+5) ||
    (nX===cX-4 && nY===cY+5) ||

    (nX===cX-3 && nY===cY+5) ||
    (nX===cX-2 && nY===cY+5) ||
    (nX===cX-1 && nY===cY+5) ||
    (nX===cX && nY===cY+5) ||
    (nX===cX+1 && nY===cY+5) ||
    (nX===cX+2 && nY===cY+5) ||
    (nX===cX+3 && nY===cY+5) ||
    (nX===cX+4 && nY===cY+5)

  )
//48 moves
  let moves6=(
    (nX===cX+6 && nY===cY+6) ||
    (nX===cX+6 && nY===cY+5) ||
    (nX===cX+6 && nY===cY+4) ||
    (nX===cX+6 && nY===cY+3) ||
    (nX===cX+6 && nY===cY+2) ||
    (nX===cX+6 && nY===cY+1) ||
    (nX===cX+6 && nY===cY) ||
    (nX===cX+6 && nY===cY-1) ||

    (nX===cX+6 && nY===cY-2) ||
    (nX===cX+6 && nY===cY-3) ||
    (nX===cX+6 && nY===cY-4) ||
    (nX===cX+6 && nY===cY-5) ||
    (nX===cX+6 && nY===cY-6) ||
    (nX===cX+5 && nY===cY-6) ||
    (nX===cX+4 && nY===cY-6) ||
    (nX===cX+3 && nY===cY-6) ||

    (nX===cX+2 && nY===cY-6) ||
    (nX===cX+1 && nY===cY-6) ||
    (nX===cX && nY===cY-6) ||
    (nX===cX-1 && nY===cY-6) ||
    (nX===cX-2 && nY===cY-6) ||
    (nX===cX-3 && nY===cY-6) ||
    (nX===cX-4 && nY===cY-6) ||
    (nX===cX-5 && nY===cY-6) ||

    (nX===cX-6 && nY===cY-6) ||
    (nX===cX-6 && nY===cY-5) ||
    (nX===cX-6 && nY===cY-4) ||
    (nX===cX-6 && nY===cY-3) ||
    (nX===cX-6 && nY===cY-2) ||
    (nX===cX-6 && nY===cY-1) ||
    (nX===cX-6 && nY===cY) ||
    (nX===cX-6 && nY===cY+1) ||

    (nX===cX-6 && nY===cY+2) ||
    (nX===cX-6 && nY===cY+3) ||
    (nX===cX-6 && nY===cY+4) ||
    (nX===cX-6 && nY===cY+5) ||
    (nX===cX-6 && nY===cY+6) ||
    (nX===cX-5 && nY===cY+6) ||
    (nX===cX-4 && nY===cY+6) ||
    (nX===cX-3 && nY===cY+6) ||

    (nX===cX-2 && nY===cY+6) ||
    (nX===cX-1 && nY===cY+6) ||
    (nX===cX && nY===cY+6) ||
    (nX===cX+1 && nY===cY+6) ||
    (nX===cX+2 && nY===cY+6) ||
    (nX===cX+3 && nY===cY+6) ||
    (nX===cX+4 && nY===cY+6) ||
    (nX===cX+5 && nY===cY+6)
  )

  let moveset1=(moves1);
  let moveset2=(moves1 || moves2);
  let moveset3=(moves1 || moves2 || moves3);
  let moveset4=(moves1 || moves2 || moves3 || moves4);
  let moveset5=(moves1 || moves2 || moves3 || moves4 || moves5);
  let moveset6=(moves1 || moves2 || moves3 || moves4 || moves5 || moves6);

    if (m===1){
      return moveset1
    }
    else if (m===2){
      return moveset2
    }
    else if (m===3){
      return moveset3
    }
    else if (m===4){
      return moveset4
    }
    else if (m===5){
      return moveset5
    }
    else if (m===6){
      return moveset6
    }
}

export default movement
