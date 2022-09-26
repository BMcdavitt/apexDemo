import React from "react";
import ApexCharts from 'apexcharts'

function graph(dayGraphData, formData) {

        function dayTemperatureArray(graphData) {
            return graphData.map(x => x.temperature)
        }
        
        function dayHourArray(graphData) {
            return graphData.map(x => x.time)
        }
        
        function dayWindSpeedArray(graphData) {
            return graphData.map(x => x.windSpeed)
        }

        if(dayGraphData.graphData.graphStateData) {

  
            var options = {
            chart: {
                type: 'bar',
            
            },
            series: getSeriesData(dayGraphData.graphData.graphStateData, dayGraphData.graphData.formData),
            xaxis: {
                categories: dayHourArray(dayGraphData.graphData.graphStateData)
            },
            dataLabels: {
                enabled: false
            }
            }
            
            var chart = new ApexCharts(document.querySelector("#chart"), options);
            
            // First time if I call destroy I crash.  This should be updated to track if it's already rendered once, and only then destory.
            // should also only render once, ever.  
            chart.render();
            chart.destroy();
            chart = new ApexCharts(document.querySelector("#chart"), options)
            chart.render();
    
        }

        function getSeriesData(graphStateData, formData) {

            let x = 0;
            let newArray = []
            if(formData.temperature) {
                newArray[x] = {
                    name: 'temperature', 
                    data: dayTemperatureArray(graphStateData),
                }
                x++
            }
            if(formData.windSpeed) {
                newArray[x] = {
                    name: 'windSpeed',
                    data: dayWindSpeedArray(graphStateData)
                }
                x++
            }
        
            return(newArray)
        }

    return(
        <div id="chart">

        </div>
    )
}

export default React.memo(graph)