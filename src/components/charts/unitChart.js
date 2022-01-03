import react, { useEffect } from "react";
import  Chart  from "chart.js/auto";

const UnitChart = ({ chartData, dispatch}) => {

    useEffect(() => {
        const canvasElement = document.querySelector("#unitChart");

        let unitData = { }

        for( let factionRef in chartData ) {
           for(let type in chartData[factionRef].units.types){
                if( unitData[type] === undefined )
                    unitData[type] = 0;

                unitData[type] += chartData[factionRef].units.types[type];
           }
        }

        let data = {
            labels: Object.keys(unitData),
            datasets:[{
                label: "units",
                data: Object.values(unitData)
            }]
            
        }

        const unitChart = new Chart(canvasElement, {
            type: "pie",
            data: data
        });

        unitChart.options.onClick = (e) => {
            const points = unitChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);

            if (points.length) {
                const firstPoint = points[0];
                const label = unitChart.data.labels[firstPoint.index];
                //const value = unitChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

                if(label === "normal"){
                    dispatch({type:"filter-by-subtype", payload: ""});
                } else {
                    dispatch({type:"filter-by-subtype", payload: label});
                }
            }
        }

        return () => {
            if(unitChart !== null){
                unitChart.destroy();
            }
        }

    }, [chartData])

    return (
        <div id="unitChartHolder">
            <canvas id="unitChart"></canvas>
        </div>
    )
}

export default UnitChart;