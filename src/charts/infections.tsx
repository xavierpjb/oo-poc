import React from 'react';
import {Line} from 'react-chartjs-2';
import {CategoryScale, LinearScale, LineElement, PointElement, Chart} from "chart.js";
import {ChartData} from './stat'

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);


/**
 * This takes in infection stats with the precondition that
 * The array of infections is sorted
 * We interate through the array and populate the intervals by keeping a count
 * of the number of infections before we encounter a time outside the intervals
 * we're searching for.
 */
export function Infections(props: {chartData: ChartData<number>}) {
  const {labels, data} = props.chartData

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Number of infections',
        data,
        backgroundColor: "#FF0000", // Red in Hex
        borderWidth: 1,
      }
    ]
  }
  return (<>
    Infections loaded
    <Line data={lineData}> </Line>
  </>);
}
