import react, {useEffect, useState} from "react";
import Chart from "chart.js/auto";
import {colorFactionMapper, factionLabelTextMapper} from "../../testDump/randomExports";
import useDeckFilters from "../../hooks/useDeckFilters";

const RegionChart = ({ dispatch, chartData}) => {
   
    const legendClickHandler = (e, legendItem, legend) => {
        dispatch({type:"filter-by-region", payload: legendItem.text}) 
    }

    useEffect(() => {
        const chartElement = document.getElementById("regionChart");

        //Rebuild chart data
        let colorArray = [];
        let labelArray = [];
        let dataArray = [];

        for(let factionName in chartData){
            colorArray.push(colorFactionMapper[factionName])
            labelArray.push(factionLabelTextMapper[factionName])
            dataArray.push({factionRef: factionName, count: chartData[factionName].count});
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

        const options = {
            parsing :{
                key: 'count'
            },
            onClick: (e) => {
            
                const points = regionChart.getElementsAtEventForMode(e, 'nearest', { intersect: true}, true);
                if(points.length){
                    const point = points[0];
                    //can do datasets too
                    const regionLabel = regionChart.data.datasets[point.datasetIndex].data[point.index];
                    
                    dispatch({ type:"filter-by-regionRef", payload: regionLabel.factionRef})

                }
            },

            plugins: {
                legend: {
                    onClick: legendClickHandler
                }
            }
        }
        
        const regionChart = new Chart(chartElement, {
                type:"doughnut",
                data: data,
                options: options
            }); 
        
        
        
        return () => {
            if(regionChart !== null)
                regionChart.destroy();
        }
    }, [chartData])

 
    return(
        <>
            <div style={{height:400, width: 400}}>
                <canvas id="regionChart" width="400" height="400"></canvas>
            </div>
        </>
    )
}

export default RegionChart;