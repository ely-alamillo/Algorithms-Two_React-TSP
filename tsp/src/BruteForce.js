import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

import P5Wrap from './react-p5-wrapper-custom';
import sketch from './sketchTwo'
import blankSketch from './blankSketch'

class BruteForce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotation: 150,
      blankSketch: blankSketch,
      renderBlank: true,
      sketchState: sketch,
      startSketch: null,
      numberCities: 5,
    }
    this.handleStart = this.handleStart.bind(this)
    this.handleCities = this.handleCities.bind(this)
    this.handleCitiesSumbit = this.handleCitiesSumbit.bind(this)
  }

  handleStart() {
    console.log('button clicked');
    console.log('cities: ', this.state.numberCities);
    this.setState({
      renderBlank: !this.state.renderBlank,
    });
  }

  handleCities(event) {
    let cities = event.target.value
    console.log(cities);
    this.setState({
      numberCities: cities,
    })
  }

  handleCitiesSumbit(event) {
    event.preventDefault()
    console.log('number of cities submitted: ', this.state.numberCities);
  }

  render() {
    return (
      <div>
        {this.state.renderBlank ?
          <P5Wrap sketch={this.state.blankSketch}/> :
          <P5Wrap sketch={this.state.sketchState} numberCities={this.state.numberCities}/>}

        <form onSubmit={this.handleCitiesSumbit}>
          <FormGroup>
            <ControlLabel>Nuumber of cities</ControlLabel>
            <FormControl
              type='text'
              placeholder='# number of cities'
              value={this.state.numberCities}
              onChange={this.handleCities}
            />
            <button className='btn btn-primary' type='submit'> Submit Cities </button>
          </FormGroup>
        </form>

        <button className='btn btn-success' onClick={this.handleStart}> {this.state.renderBlank ? 'start' : 'stop'} </button>
      </div>
    )
  }
}

export default BruteForce;
