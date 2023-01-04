import {SirValue} from "./sir";
import {Stat} from './stat'

export class SirProcessor {
  public static run(sirStats: Stat, interval: number) {
    const susceptible = new Set();
    const infected = new Set();
    const recovered = new Set();
    const vaccinated = new Set();
    const dead = new Set();

    const sirValues: SirValue[] = [];
    const timeSortedEvents = [...sirStats.events]

    let x = 0
    while (x * interval + sirStats.startTime <= sirStats.endTime) {
      while (timeSortedEvents.length > 0
        && parseInt(timeSortedEvents[0].time) < x * interval + sirStats.startTime) {
        let event = timeSortedEvents.shift()!
        switch (event.type) {
          case "join":
            susceptible.add(event.user_id);
            break;

          case "infection":
            susceptible.delete(event.user_id);
            infected.add(event.user_id)
            break;

          case "outcome":
            switch (event.out) {
              case "RECOVERED":
                infected.delete(event.user_id)
                recovered.add(event.user_id)
                break

              case "VACCINATED":
                vaccinated.add(event.user_id)
                break;

              case "DEAD":
                infected.delete(event.user_id)
                dead.add(event.user_id)
                break;
            }
        }
      }
      sirValues.push({
        susceptible: susceptible.size,
        infected: infected.size,
        recovered: recovered.size,
        vaccinated: vaccinated.size,
        dead: dead.size,
      });

      x += 1
    }

    return sirValues;
  }
}
