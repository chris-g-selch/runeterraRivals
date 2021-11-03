import react, {useEffect, useState} from "react";
import Chart from "chart.js/auto";
import {colorFactionMapper, factionLabelTextMapper, buildRegionSplitCardData, buildChartData} from "./randomExports";
import useDeckFilters from "../hooks/useDeckFilters";

const RegionChart = ({ dispatch, chartData}) => {
    const [regionChart, setRegionChart] = useState(null);
    

    const legendClickHandler = (e, legendItem, legend) => {
        dispatch({type:"filter-by-region", payload: legendItem.text}) 
    }

    useEffect(() => {
        const chartElement = document.getElementById("regionChart");


        const data = {
            labels: [],
            datasets: [{
              label: 'My First Dataset',
              data: [],
              
              hoverOffset: 4
            }]
          };

        const options = {
            plugins: {
                legend: {
                    onClick: legendClickHandler
                }
            }
        }
        setRegionChart(
            new Chart(chartElement, {
                type:"doughnut",
                data: data,
                options: options
            }) 
        );
        
        return () => {
            if(regionChart !== null)
                regionChart.destroy();
        }
    }, [])

    useEffect(()=> {
        const chartElement = document.getElementById("regionChart");

        //Rebuild chart data
        let colorArray = [];
        let labelArray = [];
        let dataArray = [];

        for(let factionName in chartData){
            colorArray.push(colorFactionMapper[factionName])
            labelArray.push(factionLabelTextMapper[factionName])
            dataArray.push(chartData[factionName].count);
        }

        const data = {
            labels: labelArray,
            datasets: [{
              label: 'Region Split',
              data: dataArray,
              backgroundColor: colorArray,
              hoverOffset: 4
            }]
          };
        console.log(regionChart);
        if(regionChart !== null){
            regionChart.data = data;
            regionChart.update();
        }

    },[chartData, regionChart])

    return(
        <>
            <div style={{height:400, width: 400}}>
                <canvas id="regionChart" width="400" height="400"></canvas>
            </div>
        </>
    )
}

export default RegionChart;