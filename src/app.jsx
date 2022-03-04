import React, { Component } from "react";

import "./styles/styles.css";

const data = [
  {letter: 'Q',
  id: 'Heater-1',
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  {letter: 'W',
  id: 'Heater-2',
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'}, 
  {letter: 'E',
  id: 'Heater-3',
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'}, 
  {letter: 'A',
  id: 'Heater-4',
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},
  {letter: 'S',
  id: 'Clap',
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'}, 
  {letter: 'D',
  id: 'Open-HH',
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
  {letter: 'Z',
  id: 'Kick-n-Hat',
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'}, 
  {letter: 'X',
  id: 'Kick',
  src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'}, 
  {letter: 'C',
  id: 'Closed-HH',
  src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'} 
]

const data2 = [
   {
    letter: "Q",
    id: "Chord-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    letter: "W",
    id: "Chord-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    letter: "E",
    id: "Chord-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    letter: "A",
    id: "Shaker",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    letter: "S",
    id: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    letter: "D",
    id: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    letter: "Z",
    id: "Punchy-Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    letter: "X",
    id: "Side-Stick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    letter: "C",
    id: "Snare",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
]

class DrumPad extends React.Component {
  
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeydown)
  }
  
  componentWillUnmount(){
    document.removeEventListener('keydown',this.handleKeydown)
  }
  
  handleKeydown = e => {
    if (this.props.power == true && e.keyCode === this.props.letter.charCodeAt()){
      this.audio.play()
      this.audio.currentTime = 0
      this.props.handleDisplay(this.props.id)
      window.focus
    }
  }
  
  handleClick = () => {
    if (this.props.power === true)
   {this.audio.play()
    this.audio.currentTime = 0
    this.props.handleDisplay(this.props.id)}
  }
  render(){
    return(
    <div
      className="drum-pad"
      id={this.props.id}
      onClick={this.handleClick}
      >
        <h1>{this.props.letter}</h1>
        
        <audio
          ref={ref=>this.audio =ref}
          className="clip"
          id={this.props.letter}
          src={this.props.src}
          volume={this.props.sliderVolume}
          ></audio>
    </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display: '',
      power: false,
      sliderVolume: 0.5,
      bank: data,
      bankId: "drum"
    }
  }
  
handleBank = (e) => {
    if (this.state.power == true){
      if (e.target.value == 0) {
    this.setState({bank: data2,
                   bankId: "piano",
                  display: "Bank 2" });
  } else if (e.target.value == 1) {
    this.setState({bank: data,
                   bankId: "drum",
                  display: "Bank 1"});
  } 
    }
}  
  
  
handleDisplay = display => this.setState({display})
handlePower = () => {
  const text = this.state.power ? '' : 'Press a key';
  this.setState({power: !this.state.power})
  this.setState({display: text})
}
  adjustVolume= (e) => {
    if (this.state.power == true) {
      this.setState({
        sliderVolume: e.target.value,
        display: "Volume " + Math.round(e.target.value * 100) 
      });
      setTimeout(() => this.resetDisplay(), 2000);
    }
  }
  
  resetDisplay = () => {
    this.setState({
      display: ""
    });
  }
  
  render(){
 
    {document.querySelectorAll('.clip').forEach(sound=> {
      sound.volume = this.state.sliderVolume
    });}
    
    
    return(
      
    <div id="drum-machine">
        <div className="top">
          <h1>Drum Machine</h1>
          
          <div className="bankSelect">
            <div
              className="bank"
              ><p>Bank</p>
                <input className= "bankSlider" type="range" min="0" max="1" onChange={this.handleBank}/>
              </div>
            
          </div>
            
          <div className="p">
          <div 
            className="power"
            onClick={this.handlePower}
            ><i class="fas fa-power-off"
               ></i></div>
          <div 
            className="powerIndic"
            style={this.state.power == true ? {backgroundColor: "#ff0000"} : {}}
            >
            </div>
          </div>
          </div>
        
        <div className="bottom">
        <div className="leftPad">
        <div id="display">{this.state.display}</div>
           
          <div className="volume"
            >
            <input type="range" min="0" max="1" step="0.01"
              className="slider"
              value={this.state.sliderVolume} onChange={this.adjustVolume}/>
            </div>
          
          <div className="speaker">
          <hr id="l1" className="lines"/>
          <hr id="l2" className="lines"/> 
          <hr id="l3" className="lines"/>
          <hr id="l4" className="lines"/>  
          <hr id="l5" className="lines"/>
          <hr id="l6" className="lines"/>  
          <hr id="l7" className="lines"/>
          <hr id="l7" className="lines"/>  
          <hr id="l6" className="lines"/>
          <hr id="l5" className="lines"/>  
          <hr id="l4" className="lines"/>
          <hr id="l3" className="lines"/>
          <hr id="l2" className="lines"/>
          <hr id="l1" className="lines"/>  
          </div>
        </div>
        
        <div id="pads">
        {this.state.bank.map(d =>(
        <DrumPad
          id={d.id}
          letter={d.letter}
          src={d.src}
          handleDisplay={this.handleDisplay}
          power={this.state.power}
          volume={this.state.sliderVolume}
          />
          
        ))}
        </div>
    </div>
        </div>
        
    )
  }
}

export default App;