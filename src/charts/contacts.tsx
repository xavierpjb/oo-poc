import React from 'react';
import {Line} from 'react-chartjs-2';
import {CategoryScale, LinearScale, LineElement, PointElement, Chart} from "chart.js";
import {Stat} from './stat'
import {ContactProcessor} from './contacts.processor';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

export function Contacts(props: {contactStats: Stat}) {
  const contacts = ContactProcessor.run(props.contactStats)
  const data = {
    labels:props.contactStats.labels,
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
