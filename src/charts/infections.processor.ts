import {Stat} from './stat'
export class InfectionsProcessor {
  public static run(infectionStats: Stat){
    const interval = infectionStats.interval;
    const infectionEvents = [...infectionStats.events.infections]

    return infectionStats.labels.map(label => {
      const currInterval = parseInt(label)
      let numInf = 0
      while (infectionEvents.length > 0 && parseInt(infectionEvents[0].time) < currInterval + interval) {
        numInf += 1
        infectionEvents.shift()
      }
      return numInf;
    })
  }
}
