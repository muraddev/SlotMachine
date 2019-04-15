import React from 'react'

class SlotElement extends React.Component {

  constructor(props) {
    super(props)
    
    //Initial value
    const current = props.elements[Math.floor(props.elements.length * Math.random())]

    //set Initial value
    this.state = { 
      current
    }
  }


  componentWillReceiveProps(nextProps){
    //Start and Stop when it is needed
    if(nextProps.start){
      this.updateImage = setInterval(()=>{
        this.setState( { 
          current:nextProps.elements[Math.floor(nextProps.elements.length * Math.random())]
        })
      },50)
    }
    else{
      clearInterval(this.updateImage)
      if(this.props.start!=false)
        this.props.insertValue(this.state.current,this.props.slot)
    }
  }

  render(){
    return (
      <div><img src={this.state.current} /></div>
    )
  }
}

export default SlotElement