import React from 'react';
import {Line} from 'react-chartjs-2';
import {CategoryScale, LinearScale, LineElement, PointElement, Chart} from "chart.js";
import {Stat} from './stat'

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);


/**
 * This takes in infection stats with the precondition that
 * The array of infections is sorted
 * We interate through the array and populate the intervals by keeping a count
 * of the number of infections before we encounter a time outside the intervals
 * we're searching for.
 */
export function Infections(props: {infectionStats: Stat}) {
  // Tiime intervals
  const interval = props.infectionStats.interval
  const {start, end} = props.infectionStats.range

  // Create a copy of infection event so we can remove the events already seen
  const infectionEvents = [...props.infectionStats.events.infections]
  const data = {
    labels:props.infectionStats.labels.slice(start,end),
    datasets: [
      {
        label: 'Number of infections',
        data: props.infectionStats.labels.map(label => {
          const currInterval = parseInt(label)
          let numInf = 0
          while (infectionEvents.length > 0 && parseInt(infectionEvents[0].time) < currInterval + interval) {
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
    <Line data={data}> </Line>
  </>);
}
