import React from 'react';
import logo from './logo.svg';
import './App.css';
import Multistep from 'react-multistep';

function App() {


  const steps = [
    {name: 'StepOne', component: <p>StepOne</p>},
    {name: 'StepTwo', component: <p>StepTwo</p>},
    {name: 'StepThree', component: <p>StepThree</p>},
    {name: 'StepFour', component: <p>StepFour</p>}
  ];

  return (
    <div className="App">
      <Multistep showNavigation={true} steps={steps}/>
    </div>
  );
}

export default App;
