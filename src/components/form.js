import './form.css';

function Form(props) {

    function locationChange() {
        let location = document.getElementById("location").value
        props.updateFormState("location", location)
    }

    function dateChange() {
        let date = document.getElementById("date").value
        props.updateFormState("date", date)
    }

    function temperatureChange() {
        let temperature = document.getElementById("temperature").checked
        props.updateFormState("temperature", temperature)
    }

    function windSpeedChange() {
        let windSpeed = document.getElementById("windSpeed").checked
        props.updateFormState("windSpeed", windSpeed)
    }

    function windDirectionChange() {
        let windDirection = document.getElementById("windDirection").checked
        props.updateFormState("windDirection", windDirection)
    }

    function apiMagic() {
        props.updateGraph()
    }

  return (
    <div>
    <div className="form">
        <div className="textFields">
            <h3>Select Location and Date:</h3>
            <div className="text-field-filled">
                <input id="location" type="text" onChange={locationChange} value={props.stateData.formData.location}/>
                <span>5 digit Zip Code</span>
            </div>

            <div className="text-field-filled">
                <input id="date" type="text" onChange={dateChange} value={props.stateData.formData.date}/>
                <span>yyyy-MM-dd</span>
            </div>
        </div>

        <div className="checkBoxes">
            <h3>Select Graph Data:</h3>
            <label className="dataFields">Temperature
                <input id="temperature" type="checkbox" onChange={temperatureChange} checked={props.stateData.formData.temperature}/>
                <span className="checkmark" />
            </label>

            <label className="dataFields">Wind Speed
                <input id="windSpeed" type="checkbox" onChange={windSpeedChange} checked={props.stateData.formData.windSpeed}/>
                <span className="checkmark" />
            </label>

            <label className="dataFields">Wind Direction
                <input id="windDirection" type="checkbox" onChange={windDirectionChange}/>
                <span className="checkmark" />
            </label>
        </div>
    </div>
    <div className='center'>
        <button onClick={apiMagic} className="button">Click to Update Graph</button>
    </div>
    <hr />
        
    </div>
  )
}

export default Form;
