import React from 'react';
import {CategoryScale, LinearScale, LineElement, PointElement, Chart, Legend} from "chart.js";
import {ChartData} from './stat'
import {Line} from 'react-chartjs-2';
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Legend);

export function Sir(props: {chartData: ChartData<SirValue>}) {
  const {labels, data} = props.chartData
  const lineData = {
    labels,
    datasets: [
      {
        label: 'Susceptible',
        data: data.map(val => val.susceptible),
        backgroundColor: "#4682B4", // Blue
      },
      {
        label: 'Infected',
        data: data.map(val => val.infected),
        backgroundColor: "#FF0000", // Red
      },
      {
        label: 'Recovered',
        data: data.map(val => val.recovered),
        backgroundColor: "#2E8B57", // Green
      },
      {
        label: 'Vaccinated',
        data: data.map(val => val.vaccinated),
        backgroundColor: "#9932CC", // Purple
      },
      {
        label: 'Dead',
        data: data.map(val => val.dead),
        backgroundColor: "#808080", // Grey
      }

    ]
  }
  return (
    <>
      SIR
      <Line data={lineData} options={
        {
          plugins: {
            legend: {
              display: true,
              position: "right",
              align: "start",
              labels: {
                usePointStyle: true,
              },
            },
          },
        }
      }></Line>
    </>
  )
}

export interface SirValue {
  susceptible: number
  infected: number
  recovered: number
  vaccinated: number
  dead: number
}
