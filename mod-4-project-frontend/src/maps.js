// const maps={
//   original: (this.props.x<17 && this.props.y>10) || (this.props.x>5 && this.props.y<3)
// }

function maps(name,x,y){
  if(name==="original"){
    return (x<17 && y>10) || (x>5 && y<3)
  }
  else if(name==="empty"){
    return (false)
  }
  else if (name==="eight"){
    return ((x>15 && y>12 && x<21 && y<18) ||
    (x>15 && y>4 && x<21 && y<10) ||
    (x>23 && y>4 && x<29 && y<10) ||
    (x>23 && y>12 && x<29 && y<18)) ||
    (x>8 && y>4 && x<13 && y<18) ||
    (x>31 && y>4 && x<36 && y<18) ||
    (x>8 && y>=0 && x<36 && y<3) ||
    (x>8 && y>19 && x<36)
  }
}

export default maps
