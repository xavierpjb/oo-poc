import React, {useState} from "react";
import {CSVReader, CsvResult, OOEvent, Participant} from "./csv_parser/csv_parser";
import {Infections} from "./charts/infections";
import {Contacts} from "./charts/contacts";
import {Sir} from "./charts/sir";
import {Processed, Stat} from "./charts/stat";
import ReactSlider from "react-slider";
import {ContactProcessor} from "./charts/contacts.processor";
import {SirProcessor} from "./charts/sir.processor";
import {InfectionsProcessor} from "./charts/infections.processor";

function App() {
  const [participants, setParticipants] = useState<Participant[]>();
  const [stat, setStat] = useState<Stat>();
  const [processed, setProcessed] = useState<Processed>();

  return (
    <>
      Events
      <CSVReader onUploadAccepted={(result: CsvResult<OOEvent>) => {
        const timeSortedEvents = [...result.data].sort((e1, e2) => {
          return e1.time.localeCompare(e2.time)
        })
        const interval = 60 * 60;
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
          labels,
          range: {
            start: 0,
            end: labels.length
          }
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
        setProcessed({
          contacts: ContactProcessor.run(stat),
          sir: SirProcessor.run(stat),
          infections:InfectionsProcessor.run(stat)
        })

      }}></CSVReader>

      Participants
      <CSVReader onUploadAccepted={(result: CsvResult<Participant>) => {
        setParticipants(result.data)
      }}></CSVReader>

      {stat && <Infections chartData={{
        labels: stat.labels.slice(stat.range.start, stat.range.end),
        data: processed!.infections.slice(stat.range.start, stat.range.end)
      }}></Infections>}

      {stat && <Contacts chartData={{
        labels: stat.labels.slice(stat.range.start, stat.range.end),
        data: processed!.contacts.slice(stat.range.start, stat.range.end)
        }}></Contacts>}

      {stat && <Sir chartData={{
        labels: stat.labels.slice(stat.range.start, stat.range.end),
        data: processed!.sir.slice(stat.range.start, stat.range.end)
      }}></Sir>}

      {stat && <ReactSlider
        className="horizonal-slider"
        marks
        min={0}
        max={stat.labels.length}
        defaultValue={stat.labels.length}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        onChange={(value) => {
          setStat({...stat, range:{start:0, end: value}})
        }}
      ></ReactSlider>}
    </>
  );
  // Create a slider which ranges between interval of #labels
}

export default App;
