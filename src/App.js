import React from "react";

import ApexCharts from 'apexcharts'

import './App.css';
import Form from './components/form'
import Graph from './components/graph'



function App() {

  const [weatherStateData, updateWeatherStateData] = React.useState({
    formData:{
      location:"02760",
      date:setDate(),
      temperature:true,
      windSpeed:false,
      windDirection:false},
    updateCount:0})

  const [graphState, updateGraphState] = React.useState({
    formData:{temperature:true,
              windSpeed:false}})

  function setDate() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    return(yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate())

  }

  function updateFormState(formField, formValue) {

    
    updateWeatherStateData(priorWeatherStateData => {
      if(formField === "location") {
        return ({...priorWeatherStateData, 
                  formData:{...priorWeatherStateData.formData, location:formValue}
                })
      } else if(formField === "date") {
        return ({...priorWeatherStateData, 
                  formData:{...priorWeatherStateData.formData, date:formValue}
                })
      } else if(formField === "temperature") {
        return ({...priorWeatherStateData, 
                  formData:{...priorWeatherStateData.formData, temperature:formValue}
                })
      } else if(formField === "windSpeed") {
        return ({...priorWeatherStateData, 
                  formData:{...priorWeatherStateData.formData, windSpeed:formValue}
                })
      } else if(formField === "windDirection") {
        return ({...priorWeatherStateData, 
                  formData:{...priorWeatherStateData.formData, windDirection:formValue}
                })
      }   else {
        return priorWeatherStateData
      }
    })

    updateGraphState(priorGraphStateData => {
      if(formField === "temperature") {
        return ({...priorGraphStateData, 
                  formData:{...priorGraphStateData.formData, temperature:formValue}
                })
      } else if(formField === "windSpeed") {
        return ({...priorGraphStateData, 
                  formData:{...priorGraphStateData.formData, windSpeed:formValue}
                })} else {
                  return priorGraphStateData
                }
    })
  }

  function updateGraph() {
    updateWeatherStateData(priorWeatherStateData => (
      {...priorWeatherStateData, 
        updateCount:  priorWeatherStateData.updateCount + 1}
    ))
  }

  React.useEffect(() => {

    let apiString = "https://api.weatherapi.com/v1/history.json?key=7671f4bb7a7d4707810215759220806"
    apiString += ("&q=" + weatherStateData.formData.location)
    apiString += ("&aqi=no")
    apiString += ("&dt=" + weatherStateData.formData.date)

    fetch(apiString)
    .then(res => res.json())
    .then(data => getHourlyData(data))

  },[weatherStateData.updateCount])

  function dayTemperatureArray(graphData) {
    return graphData.map(x => x.temperature)
  }

  function dayHourArray(graphData) {
    return graphData.map(x => x.time)
  }

  function dayWindSpeedArray(graphData) {
    return graphData.map(x => x.windSpeed)
  }

  function getHourlyData(forcast) {

    let hourArray = forcast.forecast.forecastday[0].hour

    let graphData = []

    for(let i = 0; i < hourArray.length; i++)
    {
      graphData[i] = {time: hourArray[i].time,
                      temperature: hourArray[i].temp_f,
                      windSpeed: hourArray[i].wind_mph,
                      windDirection: hourArray[i].wind_dir}
    }
    
    // save as state, but pass argument for now

    updateGraphState(priorGraphStateData => (
      {...priorGraphStateData, 
        graphStateData:  graphData}
    ))

    // renderGraph(graphData)


  }

  function displayTemperature() {

    let temperature = ""
    let windSpeed = ""
    let windDirection = ""

    if(weatherStateData.formData.temperature) {
      temperature = "Temp On"
    }

    if(weatherStateData.formData.windSpeed) {
      windSpeed = "Wind Speed On"
    }

    if(weatherStateData.formData.windDirection) {
      windDirection = "Wind Direction On"
    }
    return (
      <div>
        {weatherStateData.formData.location}
        <br />
        {weatherStateData.formData.date}
        <br />
        {temperature}
        <br />
        {windSpeed}
        <br />
        {windDirection}
      </div>
    )
  }

  

  return (
    <div className="App">
      <Form updateFormState={updateFormState} stateData={weatherStateData} updateGraph={updateGraph}/>
      <Graph graphData={graphState}></Graph>
      <div id="chart"></div>
    </div>
  );
}

export default App;
  