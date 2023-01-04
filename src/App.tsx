import React, {useState} from "react";
import {CSVReader, CsvResult, OOEvent, Participant} from "./csv_parser/csv_parser";
import { Infections, InfectionStats } from "./charts/infections";
import {Contacts, ContactStats} from "./charts/contacts";
import {Sir, SirStats } from "./charts/sir";

function App() {
  const [events, setEvents] = useState<OOEvent[]>();
  const [participants, setParticipants] = useState<Participant[]>();
  const [infectionsStats, setInfectionsStats] = useState<InfectionStats>();
  const [contactStats, setContactStats] = useState<ContactStats>();
  const [sirStats, setSirStats] = useState<SirStats>();

  return (
    <>
      Events
      <CSVReader onUploadAccepted={(result: CsvResult<OOEvent>) => {
        const timeSortedEvents = [...result.data].sort((e1, e2) => {
          return e1.time.localeCompare(e2.time)
        })

        const infectionStats: InfectionStats = {
          startTime: parseInt(timeSortedEvents[0].time),
          endTime: parseInt(timeSortedEvents[timeSortedEvents.length-1].time),
          infections: []
        }
        const contactStats: ContactStats = {
          startTime: parseInt(timeSortedEvents[0].time),
          endTime: parseInt(timeSortedEvents[timeSortedEvents.length-1].time),
          contacts: []

        }
        const sirStats: SirStats = {
          startTime: parseInt(timeSortedEvents[0].time),
          endTime: parseInt(timeSortedEvents[timeSortedEvents.length-1].time),
          sir: []

        }
        timeSortedEvents.forEach(event =>{
          if (event.type === "infection"){
            infectionStats.infections.push(event);
            sirStats.sir.push(event)
          }

          if (event.type === "contact"){
            contactStats.contacts.push(event);
          }

          if (event.type === "join") {
            sirStats.sir.push(event)
          }

          if (event.type === "outcome") {
            sirStats.sir.push(event)
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
