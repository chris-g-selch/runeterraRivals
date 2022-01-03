import react, {useEffect} from "react";
import Chart from "chart.js/auto";
import {keywordColorMapper} from "../../testDump/randomExports";

const KeywordsChart = ({chartData, dispatch}) =>{

    useEffect(() => {
        const canvasElement = document.getElementById("keywordsChart");
        
         //Rebuild chart data
        
        let keywordData = {};
        let keywordColors = []
        for(let factionRef in chartData){
            for(let key in chartData[factionRef].keywords){
                
                if(keywordData[key] === undefined){
                    keywordData[key] = 0;
                    keywordColors.push(keywordColorMapper[key])
                }

                keywordData[key] += chartData[factionRef].keywords[key];
            }            
        }

        const data = {
            labels: Object.keys(keywordData),
            datasets:[{
                data: Object.values(keywordData),
                backgroundColor: keywordColors
            }]
        }

        const keywordsChart = new Chart(canvasElement, {
            type: "polarArea",
            data: data
        })

        keywordsChart.options.onClick = (e) => {
            const points = keywordsChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);

            if (points.length) {
                const firstPoint = points[0];
                const label = keywordsChart.data.labels[firstPoint.index];
                const value = keywordsChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                console.log(label);
                dispatch({type:"filter-by-keywords", payload: label});
            }
        }

        return ()=>{    
            keywordsChart.destroy();
        }
    })

    return(
        <div id="keywordsChartHolder">
            <canvas id="keywordsChart"></canvas>
        </div>
    )
} 
export default KeywordsChart;