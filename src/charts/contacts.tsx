import React from 'react';
import {Line} from 'react-chartjs-2';
import {CategoryScale, LinearScale, LineElement, PointElement, Chart} from "chart.js";
import {ChartData, Stat} from './stat'

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

export function Contacts(props: {chartData: ChartData<number>}) {
  const {labels, data} = props.chartData
  const lineData = {
    labels,
    datasets: [
      {
        label: 'Contacts',
        data,
        backgroundColor: "#4682B4",
      }
    ]
  }

  return (
    <>
      Contacts
      <Line data={lineData}></Line>
    </>
  )
}
