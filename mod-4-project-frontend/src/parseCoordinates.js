function parseCoordinates(coordinates){
  let coordArray=coordinates.split(",")
  let parsedArray=coordArray.map((element)=>{
    return parseInt(element,10)
  })
  let x=parsedArray[0]
  let y=parsedArray[1]
  let parsedCoordinates=[x,y]
  return parsedCoordinates
}
export default parseCoordinates
