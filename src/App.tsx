import React, {useState} from "react";
import {CSVReader, CsvResult, OOEvent, Participant} from "./csv_parser/csv_parser";
import {Infections} from "./charts/infections";
import {Contacts} from "./charts/contacts";
import {Sir} from "./charts/sir";
import {Stat} from "./charts/stat";

function App() {
  const [participants, setParticipants] = useState<Participant[]>();
  const [stat, setStat] = useState<Stat>();

  return (
    <>
      Events
      <CSVReader onUploadAccepted={(result: CsvResult<OOEvent>) => {
        const timeSortedEvents = [...result.data].sort((e1, e2) => {
          return e1.time.localeCompare(e2.time)
        })
        const interval = 60*60;
        const startTime = parseInt(timeSortedEvents[0].time)
        const endTime = parseInt(timeSortedEvents[timeSortedEvents.length - 1].time)
        const labels: string[] = [];
        let x = 0;
        while (x * interval + startTime <= endTime) {
          labels.push((x * interval + startTime).toString())
          x += 1
        }

        const stat: Stat = {
          startTime,
          endTime,
          events: {
            all: timeSortedEvents,
            infections: [],
            contacts: [],
            sir: [],
          },
          interval,
          labels
        }

        timeSortedEvents.forEach(event => {
          if (event.type === "infection") {
            stat.events.infections.push(event)
            stat.events.sir.push(event)
          }

          if (event.type === "contact") {
            stat.events.contacts.push(event)
          }

          if (event.type === "join") {
            stat.events.sir.push(event)
          }

          if (event.type === "outcome") {
            stat.events.sir.push(event)
          }
        })

        setStat(stat)

      }}></CSVReader>

      Participants
      <CSVReader onUploadAccepted={(result: CsvResult<Participant>) => {
        setParticipants(result.data)
      }}></CSVReader>

      {stat && <Infections infectionStats={stat}></Infections>}
      {stat && <Contacts contactStats={stat}></Contacts>}
      {stat && <Sir sirStats={stat}></Sir>}


    </>
  );
}

export default App;
