import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Multistep from 'react-multistep';
import { HuePicker, AlphaPicker} from 'react-color';
import Dropdown from 'react-dropdown';
import Select from 'react-select'
import {
  Button,
  Checkbox,
  ColorInput,
  DateTime,
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

function StepMinusOne (props) {

  return (
    <div>
      <p>Hi! Welcome to our questionnaire. Thank you for being here! </p>
      <p> This should take aprox 2 - 5 minutes. </p>
      <p> Please state your answers regarding your state at the moment, not in general. </p>
      <p>Your data will be kept anonymous - you may leave your email at the end to be updated about our progress.</p>
      </div>
  )
}

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
      <p> <strong>Which moods from the below describe you best *at this moment* ?</strong> </p>
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
      <p><strong> How strongly do you feel those emotions at the moment?</strong></p>
      {moodsRanges}
    </div>
  )
}


function StepThree(props) {

  return (
    <div>
      <p> <strong>Please choose a color which you like the most right now.</strong></p>
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
      <div style={{width: 200, height: 200, margin: "auto", background: "hsl(" + props.color.hsl.h + "deg," + (props.saturation * 100) + "%," + (props.color.hsl.l  * 100) + "%)" }}/>
      <input type="range" onChange={(e) => { props.handleColor(e);}} value={props.saturation} name="saturation" min={0} max={1} step={0.01} />
    </div>
  )
}


function StepFive(props) {

  return (
    <div>
      <p>Please choose a brightness which you like the most right now.</p>
      <div style={{width: 200, height: 200, margin: "auto", background: "hsl(" + props.color.hsl.h + "deg," + (props.color.hsl.s  * 100) + "%," + (props.lightness  * 100) + "%)" }}/>
      <input type="range" onChange={(e) => { props.handleColor(e);}} value={props.lightness} name="lightness" min={0} max={1} step={0.01} />
    </div>
  )
}


function StepSix (props) {
  const defaultOption = countries[0];
  return (
    <div>
      <p><strong>How old are you?</strong></p>
      <input
      type='text'
      name='age'
      onChange={ props.handleChange } />
      <p><strong>What is your country of origin?</strong> </p>
      <Dropdown  options={countries}  value={defaultOption} placeholder="Select an option" 
        onChange={ props.handleCountriesOrigin} />
      <p><strong>What is your country of residence? </strong></p>
      <Dropdown options={countries2}  value={defaultOption} placeholder="Select an option" 
        onChange={ props.handleCountriesResidence} />
     </div>
  )
}


function StepSeven (props) {

  let sexPicked = props.sexPicked;
  let transsexualPicked = props.transsexualPicked;
  let genderPicked = props.genderPicked;

  const checkboxes2 = sex.map((item) => {
    return <div className="checkbox-row"><label for="sex">{item}</label>
      <input type="checkbox"
      name="sex"
      value={item}
      onChange={(e) => {props.handleSex(sexPicked.concat(e.target.value)); console.log(sexPicked);}}
    />
    </div>
  });
  const checkboxes3 = gender.map((item) => {
    return <div className="checkbox-row"><label for="gender">{item}</label>
      <input type="checkbox"
      name="gender"
      value={item}
      onChange={(e) => {props.handleGender(genderPicked.concat(e.target.value)); console.log(genderPicked);}}
    />
    </div>
  });
  const checkboxes4 = transsexual.map((item) => {
    return <div className="checkbox-row"><label for="transsexual">{item}</label>
      <input type="checkbox"
      name="transsexual"
      value={item}
      onChange={(e) => {props.handleTranssexual(transsexualPicked.concat(e.target.value)); console.log(transsexualPicked);}}
    />

    </div>
  });
  return (
    <div>
      <p><strong>What is your birth sex?</strong></p>
      {checkboxes2}
      <p><strong>What is your gender?</strong></p>
      {checkboxes3}
      <p><strong>Are you Transsexual?</strong></p>
      {checkboxes4}
    </div>
 )
}

function StepEight (props) {
  let YesNoPicked = props.YesNoPicked;
  const checkboxes5 = yesno.map((item) => {
    return <div className="checkbox-row"><label for="yesno">{item}</label>
      <input type="checkbox"
      name="yesno"
      value={item}
      onChange={(e) => {props.handleYesNo(YesNoPicked.concat(e.target.value)); console.log(YesNoPicked);}}
    />
    </div>
  });
  return (
    <div>
      <p><strong>Have you ever taken part in any of our previous research?</strong></p>
      {checkboxes5}
      </div>
 )
}

function StepNine (props) {
  return (
    <div>
      <p><strong>Would you like to leave your email, so that you can be updated about our development? </strong> </p>
      <p> If not, please type in a "no"</p>
      <input
      type='text'
      name='age'
      onChange={ props.handleChange2 } />
    </div>
  )
}

function App() {

  const [moodsPicked, setMoodsPicked] = useState([]);
  const [color, setColorPicked] = useState();
  const [saturation, setSaturation] = useState(1);
  const [lightness, setLightness] = useState(0.5);
  const [sexPicked, setSexPicked] = useState([]);
  const [genderPicked, setGenderPicked] = useState([]);
  const [transsexualPicked, setTranssexualPicked] = useState([]);
  const [countries,  setCountryPickedOrigin] = useState ([])
  const [countries2,  setCountryPickedResidence] = useState ([])
  const [YesNoPicked,  setYesNoPicked] = useState ([])

  
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
    this.setState({val});
  }

  const handleCountriesOriginChange =(countries)=>{
    setCountryPickedOrigin (countries)
    console.log(countries);
  }
  const handleCountriesResidenceChange =(countries)=>{
    setCountryPickedResidence (countries)
    console.log(countries);
  }
  const myChangeHandler2 = (event) => {
    let val = event.target.value;
    this.setState({val});
  }

  const steps = [
    {name: 'StepMinusOne', component: <StepMinusOne/>},
    {name: 'StepOne', component: <StepOne handleMoods={setMoodsPicked} moodsPicked={moodsPicked}/>},
    {name: 'StepTwo', component: <StepTwo moods={moodsPicked}/>},
    {name: 'StepThree', component: <StepThree color={color} handleColor={handleColorChange}/>},
    {name: 'StepFour', component: <StepFour color={color} saturation={saturation} handleColor={handleSaturationChange}/>},
    {name: 'StepFive', component: <StepFive color={color} lightness={lightness} handleColor={handleLightnessChange}/>},
    {name: 'StepSix', component: <StepSix handleChange = {myChangeHandler} countries = {countries} countries2 = {countries2} handleCountriesOrigin = {handleCountriesOriginChange} handleCountriesResidence = {handleCountriesResidenceChange}/>}, 
    {name: 'StepSeven', component: <StepSeven handleSex={setSexPicked} sexPicked={sexPicked} handleGender={setGenderPicked} genderPicked ={genderPicked} handleTranssexual ={setTranssexualPicked} transsexualPicked ={transsexualPicked} />},
    {name: 'StepEight', component: <StepEight handleYesNo={setYesNoPicked} YesNoPicked={YesNoPicked}/>},
    {name: 'StepNine', component: <StepNine handleChange2 = {myChangeHandler2}/>},
  ];

  const prevStyle = {'background': '#33c3f0', 'border-width': '2px'}
  const nextStyle = {'background': '#33c3f0',  'border-width': '2px'}

return (
  <div className="App">
    <form
      name="testForm"
      onSubmit={data => {
        console.log(data)
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