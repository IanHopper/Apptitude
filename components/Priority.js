

const Priority = ({priority}) => {
  if (priority == 1){
    return (
      <span style={{color:'red'}}>Vital</span>
    )
  }
  if (priority == 2){
    return (
      <span style={{color:'orange'}}>Important</span>
    )
  }
  if (priority == 3){
    return (
      <span style={{color:'blue'}}>Urgent</span>
    )
  }
  if (priority == 4){
    return (
      <span style={{color:'grey'}}>Trivial</span>
    )
  }
}

export default Priority;