import React, {useState} from 'react';
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
      <HuePicker style={{margin: "2em auto"}} color={ props.color }
        onChange={ props.handleColor }/>
    </div>
  )
}

function StepFour(props) {

  return (
    <div>
      <p>Please choose a saturation which you like the most right now.</p>
      <div style={{width: 200, height: 200, margin: "auto", background: props.color && "rgba(" + props.color.rgb.r + "," + props.color.rgb.g + "," + props.color.rgb.b + "," + props.color.rgb.a + ")" }}/>
      <AlphaPicker style={{margin: "2em auto"}} color={props.color}
        onChange={ props.handleColor }/>
    </div>
  )
}

function App() {

  const [moodsPicked, setMoodsPicked] = useState([]);
  const [color, setColorPicked] = useState();
  const [alpha, setAlphaPicked] = useState();

  const handleColorChange = (color) => {
    setColorPicked(color);
    console.log(color);
  }

  const handleAlphaChange = (color) => {
    setAlphaPicked(color);
    console.log(color);
  }

  const steps = [
    {name: 'StepOne', component: <StepOne handleMoods={setMoodsPicked} moodsPicked={moodsPicked}/>},
    {name: 'StepTwo', component: <StepTwo moods={moodsPicked}/>},
    {name: 'StepThree', component: <StepThree color={color} handleColor={handleColorChange}/>},
    {name: 'StepFour', component: <StepFour color={alpha} handleColor={handleAlphaChange}/>}
  ];

  return (
    <div className="App">
      <Form
        name="testForm"
        onSubmit={data => {
          console.log(data)
          // data.myTextBox
          // data.<Name of Element>
        }}
      >
      <Multistep showNavigation={true} steps={steps}/>
      </Form>
    </div>
  );
}

export default App;
