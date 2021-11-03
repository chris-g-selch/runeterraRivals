import React, {useEffect} from "react";
import Chart from "chart.js/auto";
import {colorFactionMapper, factionLabelTextMapper, buildManaCurveData} from "./randomExports";

const ManaChart = ({dispatch, chartData}) => {
    
    useEffect(() =>{
        const chartElement = document.getElementById("manaChart");
        

        let datasets = []
        for(let factionKey in chartData){
            datasets.push({
                type: "bar",
                label: factionLabelTextMapper[factionKey],
                data: Object.values(chartData[factionKey].manaCost),
                backgroundColor: colorFactionMapper[factionKey]
            })
        }

        let data = {
            labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11+"],
            datasets: datasets
        }

        const manaChart = new Chart(chartElement, {
            data: data
        })

        return () => {
            manaChart.destroy();
        }

    }, [chartData])
    
    return (
        <div style={{width:400, height:200}}>
            <canvas id="manaChart"></canvas>
        </div>
    )
}

export default ManaChart;