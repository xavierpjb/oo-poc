import React, {useState} from "react";
import {CSVReader, CsvResult, OOEvent, Participant} from "./csv_parser/csv_parser";

function App() {
  const [events, setEvents] = useState<OOEvent[]>();
  const [participants, setParticipants] = useState<Participant[]>();

  return (
    <>
      Events
      <CSVReader onUploadAccepted={(result: CsvResult<OOEvent>) => {
        setEvents(result.data)
      }}></CSVReader>
      Participants
      <CSVReader onUploadAccepted={(result: CsvResult<Participant>) => {
        setParticipants(result.data)
      }}></CSVReader>
    </>
  );
}

export default App;
