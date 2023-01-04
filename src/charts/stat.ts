import {OOEvent} from '../csv_parser/csv_parser';

export interface Stat {
  startTime: number
  endTime: number
  interval: number
  events: OOEvent[]
}
