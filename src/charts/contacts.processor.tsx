import PriorityQueue from 'priority-queue-typescript';
import {Stat} from './stat'
import {OOEvent} from '../csv_parser/csv_parser';
/**
 * Process a list of contact OOEvents and return the number of contacts over
 * a specified interval
 *
 * We use
 * 1 priority queue (pq) priortized on smallest end time
 * 1 sorted array of events, (sorted on start time)
 *
 * We iterate through time intervals until contactStats.endTime
 *
 * At each iteration
 * we remove all events that have endTime <= interval.startTime
 * we add all events with startTime < interval.endTime
 * get a count of the size of the pq(this is the number of contacts)
 *
 */
export class ContactProcessor {
  public static run(contactStats: Stat) {
    const interval = contactStats.interval;

    const pq = new PriorityQueue<OOEvent>(undefined,
      (e1: OOEvent, e2: OOEvent) =>
        parseInt(e1.time) - parseInt(e2.time)
    )

    const startTimeSortedEvents =
      this.generateStartTimeSortedEvents(contactStats.events)

    let x = 0;
    const contacts: number[] = []
    while (x * interval + contactStats.startTime <= contactStats.endTime) {
      // Remove all elements with end time  not in start of interval
      while (pq.size() > 0
        && parseInt(pq.peek()!.time) <= x * interval + contactStats.startTime) {
        pq.poll();
      }

      // Add all events that have a start time < current interval
      // This to to not double count events that have an endtime = interval start time
      while (startTimeSortedEvents.length > 0
        && this.calcStartTime(startTimeSortedEvents[0]) < (x + 1) * interval + contactStats.startTime) {
        pq.add(startTimeSortedEvents.shift()!)
      }

      // All elements in our pq belong to the interval we're looking at
      contacts.push(pq.size())

      // move to next interval
      x += 1
    }

    return contacts;
  }

  static generateStartTimeSortedEvents(events: OOEvent[]) {
    const startTimeSortedEvents = [...events]
    startTimeSortedEvents.sort(
      (e1, e2) => this.calcStartTime(e1) - this.calcStartTime(e2)
    )
    return startTimeSortedEvents;

  }

  static calcStartTime(event: OOEvent) {
    return parseInt(event.time) - parseInt(event.contact_length);

  }
}
