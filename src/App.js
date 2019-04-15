import React, { Component } from 'react';
import './App.css';
import SlotElement from './SlotElement'

class App extends Component {

  // Images or elements
  elements = [
    'strawberry.jpg',
    'banana.jpg',
    'orange.jpg',
    'monkey.jpg'
  ]

  state = {
    firstAtempt: true,
    start: false,
    score: 0
  }

  slots = [];

  constructor() {
    super()
    this.insertValue = this.insertValue.bind(this);
  }


  componentDidMount() {
    //start machine if the user doesn't
    setTimeout(() => {
      if (this.state.firstAtempt)
        this.startMachine()
    }, 5000)
  }

  startMachine() {
    this.setState({ start: true, firstAtempt: false })
    this.stop = setTimeout(() => {
      this.stopMachine();
    }, 10000)
  }

  stopMachine() {
    clearTimeout(this.stop);
    this.setState({ start: false })
  }

  //slot's value after stop
  insertValue(value, slot) {
    this.slots = [...this.slots, { value, slot }]
    // console.log(this.slots)
    if (this.slots.length == 3) {
      this.slots = this.slots.sort((a, b) => a.slot - b.slot).map(a => a.value)

      let price = [this.slots[0] == this.slots[1], this.slots[1] == this.slots[2], this.slots[2] == this.slots[0]]

      this.slots = [];

      const score = price.filter(a => a).length == 3 ? 100 : price.filter(a => a).length == 0 ? 0 : price[2] ? 10 : 20;

       this.setState({ score:this.state.score+score });
      
    }

  }

  updateScore(score) {
    
  }

  render() {
    return (
      <div className="container">
        <h3>Score: {this.state.score}</h3>
        <div className="App">
          <SlotElement elements={this.elements} start={this.state.start} slot={1} insertValue={this.insertValue} />
          <SlotElement elements={this.elements} start={this.state.start} slot={2} insertValue={this.insertValue} />
          <SlotElement elements={this.elements} start={this.state.start} slot={3} insertValue={this.insertValue} />
        </div>

        <div>
          {this.state.slots}
          <button onClick={() => this.startMachine()} disabled={this.state.start}>Start</button>
          <button onClick={() => this.stopMachine()} disabled={!this.state.start}>Stop</button>
        </div>
      </div>

    );
  }
}

export default App;
