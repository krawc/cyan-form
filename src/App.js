import React, {useEffect, useState, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Multistep from 'react-multistep';
import { HuePicker, AlphaPicker} from 'react-color';
import Dropdown from 'react-dropdown';
import Slider from '@material-ui/core/Slider';

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
const sex = ["Female","Male", "Other", "Rather not say"]
const gender  = ["Female","Male", "Other", "Rather not say"]
const transsexual = ["Yes", "No", "Rather not say"]
const countries = ["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"]
const yesno = ["Yes", "No", "Not Sure"]
const countries2 = ["United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"]



function StepOne(props) {

  let moodsPicked = props.moodsPicked;

  const handleCheck = (e) => {
    var index = moodsPicked.indexOf(e.target.value);
    console.log(e.target.value, index, moodsPicked);
    if (!e.target.checked) {
      moodsPicked.splice(index, 1);
    } else {
      moodsPicked.push(e.target.value);
    }
  }

  const checkboxes = moods.map((item) => {
    return <div className="checkbox-row"><label for="moods">{item}</label>
      <input type="checkbox"
      name="moods"
      value={item}
      onChange={(e) => {handleCheck(e); console.log(moodsPicked);}}
    />
    </div>
  });

  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p>Which moods from the below describe you best *at this moment* ?</p>
      {checkboxes}
    </div>
  )
}

function StepTwo(props) {

  console.log(props.moods);

  const moodsRanges = props.moods.map((item) => {
    return (
    <div className="slider-field">
      <label for={item + "_intensity"}>{item}</label>
      <Slider defaultValue={5} valueLabelDisplay="on" label={item} name={item + "_intensity"} min={1} max={10} step={1} />
    </div>
    )
  })

  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p>How strongly do you feel those emotions at the moment?</p>
      {moodsRanges}
    </div>
  )
}

function StepThree(props) {

  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p>Please choose a color which you like the most right now.</p>
      <div style={{width: 200, height: 200, margin: "auto", background: props.color && props.color.hex}}/>
      <input type="hidden" name="hue" value={props.color && props.color.hsl.h}></input>
      <HuePicker name="hue" style={{margin: "2em auto"}} 
        onChange={ props.handleColor }/>
    </div>
  )
}

function StepFour(props) {

  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p>Please choose a saturation which you like the most right now.</p>
      <div style={{width: 200, height: 200, margin: "auto", background: props.color && "hsl(" + props.color.hsl.h + "deg," + (props.saturation * 100) + "%," + (props.color.hsl.l  * 100) + "%)" }}/>
      <input type="range" onChange={(e) => { props.handleColor(e);}} value={props.saturation} name="saturation" min={0} max={1} step={0.01} />
    </div>
  )
}

function StepFive(props) {

  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p>Please choose a lightness which you like the most right now.</p>
      <div style={{width: 200, height: 200, margin: "auto", background: props.color && "hsl(" + props.color.hsl.h + "deg," + (props.color.hsl.s  * 100) + "%," + (props.lightness  * 100) + "%)" }}/>
      <input type="range" onChange={(e) => { props.handleColor(e);}} value={props.lightness} name="lightness" min={0} max={1} step={0.01} />
    </div>
  )
}


function StepSix (props) {
  const defaultOption = countries[0];
  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p><strong>How old are you?</strong></p>
      <input
      value={props.age}
      type='text'
      name='age'
      onChange={ props.handleChange } />
      <p><strong>What is your country of origin?</strong> </p>
      <input type="hidden" name="country_origin" value={props.countryPickedOrigin}/>
      <Dropdown name="country_origin" options={countries}  value={props.countryPickedOrigin} placeholder="Select an option" 
        onChange={ (e) => props.handleCountriesOrigin(e)} />
      <p><strong>What is your country of residence? </strong></p>
      <input type="hidden" name="country_residence" value={props.countryPickedResidence}/>
      <Dropdown name="country_residence" options={countries2}  value={props.countryPickedResidence} placeholder="Select an option" 
        onChange={ (e) => props.handleCountriesResidence(e)} />
     </div>
  )
}

function StepSeven (props) {

  let sexPicked = props.sexPicked;
  let transsexualPicked = props.transsexualPicked;
  let genderPicked = props.genderPicked;

  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p><strong>What is your birth sex?</strong></p>
      <input type="hidden" name="sex" value={props.sexPicked}/>
      <Dropdown name="sex" options={sex}  value={props.sexPicked} placeholder="Select an option" 
        onChange={ (e) => props.handleSex(e)} />
      <p><strong>What is your gender?</strong></p>
      <input type="hidden" name="gender" value={props.genderPicked}/>
      <Dropdown name="gender" options={gender}  value={props.genderPicked} placeholder="Select an option" 
        onChange={ (e) => props.handleGender(e)} />
    </div>
 )
}

function StepEight (props) {
  let YesNoPicked = props.YesNoPicked;
  const checkboxes5 = yesno.map((item) => {
    return <div className="checkbox-row"><label for="yesno">{item}</label>
      <input type="radio"
      name="yesno"
      value={item}
      onChange={(e) => {props.handleYesNo(e.target.value); console.log(e.target.value);}}
    />
    </div>
  });
  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p><strong>Have you ever taken part in any of our previous research?</strong></p>
      {checkboxes5}
      </div>
 )
}

function StepNine (props) {
  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p><strong>Would you like to leave your email, so that you can be updated about our development? </strong> </p>
      <p> If not, please type in a "no"</p>
      <input
      type='text'
      name='age'
      value={props.email}
      onChange={ props.handleEmail } />
      <input type="hidden" name="submit" value="true"/>
    </div>
  )
}


function StepTen (props) {
  return (
    <div style={{display: !props.show ? 'none' : 'block'}}>
      <p><strong>Thank you for your time! </strong> </p>
    </div>
  )
}

function App() {

  const [step, setStep] = useState(1);

  const [moodsPicked, setMoodsPicked] = useState([]);
  const [color, setColorPicked] = useState(null);
  const [saturation, setSaturation] = useState(1);
  const [lightness, setLightness] = useState(0.5);
  const [sexPicked, setSexPicked] = useState("");
  const [genderPicked, setGenderPicked] = useState("");
  const [transsexualPicked, setTranssexualPicked] = useState("");
  const [age, setAge] = useState(18);
  const [countryPickedOrigin,  setCountryPickedOrigin] = useState ("United States")
  const [countryPickedResidence,  setCountryPickedResidence] = useState ("United States")
  const [email,  setEmail] = useState ("");
  const [YesNoPicked,  setYesNoPicked] = useState ([])
  const [complete,  setComplete] = useState (true);

  const formInput = useRef(null);

  const handleSubmitForm = (e) => {
    // const data = new FormData();
    // data.append("moods", moodsPicked);
    // data.append("color", color);
    // console.log();
  }


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

  const myChangeHandler = (event) => {
    let val = event.target.value;
    setAge(val);
  }

  const handleCountriesOriginChange = (e)=>{
    setCountryPickedOrigin(e.value);
  }

  const handleCountriesResidenceChange = (e)=>{
    setCountryPickedResidence (e.value);
  }

  const handleChangeEmail = (event) => {
    let val = event.target.value;
    setEmail(val);
  }

  const moveForward = () => { 
    const currStep = step;
    setStep(currStep + 1);
  }

  const moveBack = () => { 
    const currStep = step;
    setStep(currStep - 1);
  }

  const prevStyle = {'background': '#33c3f0', 'border-width': '2px', 'margin-top': 20}
  const nextStyle = {'background': '#33c3f0',  'border-width': '2px', 'margin-top': 20}

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let foo = params.get('submit');
    if (foo) {
      setStep(10);
    }
  }, []);


  return (
    <div className="App">
      <ul className="steps-numbers">
        <li className={"steps-number " + (step === 1 && "active")}>1</li>
        <li className={"steps-number " + (step === 2 && "active")}>2</li>
        <li className={"steps-number " + (step === 3 && "active")}>3</li>
        <li className={"steps-number " + (step === 4 && "active")}>4</li>
        <li className={"steps-number " + (step === 5 && "active")}>5</li>
        <li className={"steps-number " + (step === 6 && "active")}>6</li>
        <li className={"steps-number " + (step === 7 && "active")}>7</li>
        <li className={"steps-number " + (step === 8 && "active")}>8</li>
        <li className={"steps-number " + (step === 9 && "active")}>9</li>
      </ul>
      <form
        ref={formInput}
        name="testForm"
        onSubmit={(e) => {
          moveForward();
        }}
      >
        <StepOne show={(step === 1)} handleMoods={setMoodsPicked} moodsPicked={moodsPicked}/>
        <StepTwo show={(step === 2)} moods={moodsPicked}/>
        <StepThree show={(step === 3)} color={color} handleColor={handleColorChange}/>
        <StepFour show={(step === 4)} color={color} saturation={saturation} handleColor={handleSaturationChange}/>
        <StepFive show={(step === 5)} color={color} lightness={lightness} handleColor={handleLightnessChange}/>
        <StepSix show={(step === 6)} handleChange = {myChangeHandler} countries = {countries} countries2 = {countries2} age={age} countryPickedOrigin={countryPickedOrigin} countryPickedResidence={countryPickedResidence} handleCountriesOrigin = {handleCountriesOriginChange} handleCountriesResidence = {handleCountriesResidenceChange}/>
        <StepSeven show={(step === 7)} handleSex={setSexPicked} sexPicked={sexPicked} handleGender={setGenderPicked} genderPicked ={genderPicked} />
        <StepEight show={(step === 8)} handleYesNo={setYesNoPicked} YesNoPicked={YesNoPicked}/>
        <StepNine show={(step === 9)} email={email} handleSubmitForm={handleSubmitForm} handleEmail={handleChangeEmail}/>
        <StepTen show={(step === 10)}/>

      <div className="steps-nav">
        {(step > 1 && step < 10) && <button type="button" onClick={moveBack}>BACK</button>}
        {step < 9 && <button type="button" onClick={moveForward}>FORWARD</button>}
        {step === 9 && <button type="submit">SUBMIT</button>}
      </div>
      </form>
    </div>
  );
}

export default App;
