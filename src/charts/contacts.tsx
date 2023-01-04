import React from 'react';
import {OOEvent} from '../csv_parser/csv_parser';
import {Line} from 'react-chartjs-2';
import {CategoryScale, LinearScale, LineElement, PointElement, Chart} from "chart.js";
import {ContactProcessor} from './contacts.processor';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

export function Contacts(props: {contactStats: ContactStats}) {
  const interval = 60 * 60 // 60seconds * 60minutes = 1 hour in secs
  const labels: string[] = [];
  let x = 0;
  while (x * interval + props.contactStats.startTime <= props.contactStats.endTime) {
    labels.push((x * interval + props.contactStats.startTime).toString())
    x += 1
  }
  const contacts = ContactProcessor.run(props.contactStats, interval)
  console.log(props.contactStats.contacts[0])
  console.log(props.contactStats.startTime)
  const data = {
    labels,
    datasets: [
      {
        label: 'Contacts',
        data: contacts,
        backgroundColor: "#4682B4",
      }
    ]
  }

  return (
    <>
      Contacts
      <Line data={data}></Line>
    </>
  )
}


export interface ContactStats {
  startTime: number
  endTime: number
  contacts: OOEvent[]
}
