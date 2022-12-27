import React from 'react';
import {OOEvent} from '../csv_parser/csv_parser';
import {Bar} from 'react-chartjs-2';
import {CategoryScale, LinearScale, BarElement, Chart} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);


/**
 * This takes in infection stats with the precondition that
 * The array of infections is sorted
 * We interate through the array and populate the intervals by keeping a count
 * of the number of infections before we encounter a time outside the intervals
 * we're searching for.
 */
export function Infections(props: {infectionStats: InfectionStats}) {
  // Tiime intervals
  const interval = 100000

  // generate labels of said time intervals
  const labels = [props.infectionStats.startTime.toString()];
  let x = 1;
  while (x * interval + props.infectionStats.startTime <= props.infectionStats.endTime) {
    labels.push((x * interval + props.infectionStats.startTime).toString())
    x += 1
  }

  // Create a copy of infection event so we can remove the events already seen
  const infectionEvents = [...props.infectionStats.infections]
  const data = {
    labels,
    datasets: [
      {
        label: 'Number of infections',
        data: labels.map(label => {
          const currInterval = parseInt(label)
          let numInf = 0
          while (infectionEvents.length > 0 && parseInt(infectionEvents[0].time) <= currInterval + interval) {
            numInf += 1
            infectionEvents.shift()
          }
          return numInf;
        }),
        backgroundColor: "#FF0000", // Red in Hex
        borderWidth: 1,
      }
    ]
  }
  return (<>
    Infections loaded
    <Bar data={data}> </Bar>
  </>);

}


export interface InfectionStats {
  startTime: number
  endTime: number
  infections: OOEvent[]
}

