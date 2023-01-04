import React, {useState} from "react";
import {CSVReader, CsvResult, OOEvent, Participant} from "./csv_parser/csv_parser";
import {Infections} from "./charts/infections";
import {Contacts} from "./charts/contacts";
import {Sir} from "./charts/sir";
import {Stat} from "./charts/stat";

function App() {
  const [events, setEvents] = useState<OOEvent[]>();
  const [participants, setParticipants] = useState<Participant[]>();
  const [infectionsStats, setInfectionsStats] = useState<Stat>();
  const [contactStats, setContactStats] = useState<Stat>();
  const [sirStats, setSirStats] = useState<Stat>();

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

        const baseStat: Stat = {
          startTime,
          endTime,
          events: [],
          interval,
          labels
        }

        const infectionStats = {...baseStat};
        infectionStats.events = []
        const contactStats = {...baseStat};
        contactStats.events = []
        const sirStats = {...baseStat};
        sirStats.events = []

        timeSortedEvents.forEach(event => {
          if (event.type === "infection") {
            infectionStats.events.push(event);
            sirStats.events.push(event)
          }

          if (event.type === "contact") {
            contactStats.events.push(event);
          }

          if (event.type === "join") {
            sirStats.events.push(event)
          }

          if (event.type === "outcome") {
            sirStats.events.push(event)
          }
        })

        setInfectionsStats(infectionStats);
        setContactStats(contactStats)
        setEvents(timeSortedEvents);
        setSirStats(sirStats);

      }}></CSVReader>

      Participants
      <CSVReader onUploadAccepted={(result: CsvResult<Participant>) => {
        setParticipants(result.data)
      }}></CSVReader>

      {infectionsStats && <Infections infectionStats={infectionsStats}></Infections>}
      {contactStats && <Contacts contactStats={contactStats}></Contacts>}
      {sirStats && <Sir sirStats={sirStats}></Sir>}


    </>
  );
}

export default App;
