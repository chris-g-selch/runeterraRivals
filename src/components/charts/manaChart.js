import React, {useEffect} from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from 'chart.js/helpers';
import {colorFactionMapper, factionLabelTextMapper} from "../../testDump/randomExports";

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

        let options = {
            onClick: (e) => {
            
                //const canvasPosition = getRelativePosition(e, manaChart);
                const points = manaChart.getElementsAtEventForMode(e, 'nearest', { intersect: true}, true);
                if(points.length){
                    const point = points[0];
                    //can do datasets too

                    const manaCost = manaChart.data.labels[point.index];
                    console.log(manaCost);
                    dispatch({ type:"filter-by-cost", payload: manaCost})

                }

            }
        }
        const manaChart = new Chart(chartElement, {
            data: data,
            options: options
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