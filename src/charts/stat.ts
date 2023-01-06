import {OOEvent} from '../csv_parser/csv_parser';
import { SirValue } from './sir';

export interface Stat {
  startTime: number
  endTime: number
  interval: number
  events: {
    all: OOEvent[]
    infections: OOEvent[]
    contacts: OOEvent[]
    sir: OOEvent[]
  }
  labels: string[]
  range: {start:number, end: number}
}

export interface Processed {
  infections: number[]
  contacts: number[]
  sir: SirValue[]
}

export interface ChartData<T>{
  labels: string[]
  data: T[]
}
