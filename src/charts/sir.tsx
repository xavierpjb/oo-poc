import React from 'react';
import {SirProcessor} from './sir.processor';
import {CategoryScale, LinearScale, LineElement, PointElement, Chart, Legend} from "chart.js";
import {Stat} from './stat'
import {Line} from 'react-chartjs-2';
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Legend);

export function Sir(props: {sirStats: Stat}) {
  const interval = props.sirStats.interval
  const labels: string[] = [];
  let x = 0;
  while (x * interval + props.sirStats.startTime <= props.sirStats.endTime) {
    labels.push((x * interval + props.sirStats.startTime).toString())
    x += 1
  }

  const sirValues = SirProcessor.run(props.sirStats, interval)
  const data = {
    labels,
    datasets: [
      {
        label: 'Susceptible',
        data: sirValues.map(val => val.susceptible),
        backgroundColor: "#4682B4", // Blue
      },
      {
        label: 'Infected',
        data: sirValues.map(val => val.infected),
        backgroundColor: "#FF0000", // Red
      },
      {
        label: 'Recovered',
        data: sirValues.map(val => val.recovered),
        backgroundColor: "#2E8B57", // Green
      },
      {
        label: 'Vaccinated',
        data: sirValues.map(val => val.vaccinated),
        backgroundColor: "#9932CC", // Purple
      },
      {
        label: 'Dead',
        data: sirValues.map(val => val.dead),
        backgroundColor: "#808080", // Grey
      }

    ]
  }
  return (
    <>
      SIR
      <Line data={data} options={
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
