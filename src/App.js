import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Multistep from 'react-multistep';
import { HuePicker, AlphaPicker} from 'react-color';

import {
  Button,
  Checkbox,
  ColorInput,
  DateTime,
  DropDown,
  EmailInput,
  Fieldset,
  Form,
  Option,
  OptionGroup,
  RadioGroup,
  Range,
  Row,
  Telephone,
  TextBox,
  UrlInput,
} from 'react-form-elements';

const moods = ["Happy", "Sad", "Angry", "Anxious", "Safe", "Confident", "Sceptical", "Excited", "Impatient"];



function StepOne(props) {

  let moodsPicked = props.moodsPicked;

  const checkboxes = moods.map((item) => {
    return <div className="checkbox-row"><label for="moods">{item}</label>
      <input type="checkbox"
      name="moods"
      value={item}
      onChange={(e) => {props.handleMoods(moodsPicked.concat(e.target.value)); console.log(moodsPicked);}}
    />
    </div>
  });

  return (
    <div>
      <p>Which moods from the below describe you best *at this moment* ?</p>
      {checkboxes}
    </div>
  )
}

function StepTwo(props) {

  console.log(props.moods);

  const moodsRanges = props.moods.map((item) => {
    return <Range initialValue={5} label={item} name={item + "_intensity"} min={1} max={10} step={1} />
  })

  return (
    <div>
      <p>How strongly do you feel those emotions at the moment?</p>
      {moodsRanges}
    </div>
  )
}

function StepThree(props) {

  return (
    <div>
      <p>Please choose a color which you like the most right now.</p>
      <div style={{width: 200, height: 200, margin: "auto", background: props.color && props.color.hex}}/>
      <HuePicker name="hue" style={{margin: "2em auto"}} color={ props.color }
        onChange={ props.handleColor }/>
    </div>
  )
}

function StepFour(props) {

  return (
    <div>
      <p>Please choose a saturation which you like the most right now.</p>
      <div style={{width: 200, height: 200, margin: "auto", background: "hsl(" + props.color.hsl.h + "deg," + (props.saturation * 100) + "%," + (props.color.hsl.l  * 100) + "%)" }}/>
      <input type="range" onChange={(e) => { props.handleColor(e);}} value={props.saturation} name="saturation" min={0} max={1} step={0.01} />
    </div>
  )
}

function StepFive(props) {

  return (
    <div>
      <p>Please choose a lightness which you like the most right now.</p>
      <div style={{width: 200, height: 200, margin: "auto", background: "hsl(" + props.color.hsl.h + "deg," + (props.color.hsl.s  * 100) + "%," + (props.lightness  * 100) + "%)" }}/>
      <input type="range" onChange={(e) => { props.handleColor(e);}} value={props.lightness} name="lightness" min={0} max={1} step={0.01} />
    </div>
  )
}


function StepSix(props) {

  return (
    <div>
      <select name="gender" style={{width: 200, padding: 10, marginBottom: 20}}>
        <option value="trans">Astrogender</option>
        <option value="trans">Cloudgender</option>
        <option disabled value="male">Male</option>
      </select>
    </div>
  )
}

function App() {

  const [moodsPicked, setMoodsPicked] = useState([]);
  const [color, setColorPicked] = useState();
  const [saturation, setSaturation] = useState(1);
  const [lightness, setLightness] = useState(0.5);

  const handleColorChange = (color) => {
    setColorPicked(color);
    console.log(color);
  }

  const handleSaturationChange = (e) => {
    let prevColor = color;
    prevColor.hsl.s = +e.target.value;
    setColorPicked(prevColor);
    setSaturation(+e.target.value);
  }


  const handleLightnessChange = (e) => {
    let prevColor = color;
    prevColor.hsl.l = +e.target.value;
    setColorPicked(prevColor);
    setLightness(+e.target.value);
    console.log(color);
  }

  const steps = [
    {name: 'StepOne', component: <StepOne handleMoods={setMoodsPicked} moodsPicked={moodsPicked}/>},
    {name: 'StepTwo', component: <StepTwo moods={moodsPicked}/>},
    {name: 'StepThree', component: <StepThree color={color} handleColor={handleColorChange}/>},
    {name: 'StepFour', component: <StepFour color={color} saturation={saturation} handleColor={handleSaturationChange}/>},
    {name: 'StepFive', component: <StepFive color={color} lightness={lightness} handleColor={handleLightnessChange}/>},
    {name: 'StepSix', component: <StepSix/>}

  ];


  const prevStyle = {'background': '#33c3f0', 'border-width': '2px'}
  const nextStyle = {'background': '#33c3f0',  'border-width': '2px'}

  return (
    <div className="App">
      <form
        name="testForm"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e)
          // data.myTextBox
          // data.<Name of Element>
        }}
      >
      <Multistep prevStyle={prevStyle} nextStyle={nextStyle} showNavigation={true} steps={steps}/>
      </form>
    </div>
  );
}

export default App;
