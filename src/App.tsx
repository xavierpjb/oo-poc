import React, {useState} from "react";
import {CSVReader, CsvResult, OOEvent, Participant} from "./csv_parser/csv_parser";
import { Infections, InfectionStats } from "./charts/infections";
import {Contacts, ContactStats} from "./charts/contacts";

function App() {
  const [events, setEvents] = useState<OOEvent[]>();
  const [participants, setParticipants] = useState<Participant[]>();
  const [infectionsStats, setInfectionsStats] = useState<InfectionStats>();
  const [contactStats, setContactStats] = useState<ContactStats>();

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
        timeSortedEvents.forEach(event =>{
          if (event.type === "infection"){
            infectionStats.infections.push(event);
          }
          if (event.type === "contact"){
            contactStats.contacts.push(event);
          }
        })

        setInfectionsStats(infectionStats);
        setContactStats(contactStats)
        setEvents(timeSortedEvents);

      }}></CSVReader>

      Participants
      <CSVReader onUploadAccepted={(result: CsvResult<Participant>) => {
        setParticipants(result.data)
      }}></CSVReader>

      {infectionsStats && <Infections infectionStats={infectionsStats}></Infections>}
      {contactStats && <Contacts contactStats={contactStats}></Contacts>}


    </>
  );
}

export default App;
