import {OOEvent} from '../csv_parser/csv_parser';
import {ContactProcessor} from './contacts.processor'

test('Contacts and overlaps are correctly calculated', () => {
  /**
   * t  0 1 2 3 4 5 6
   * u1 - -
   * u2   - - -
   * u3           -
   * #  1 2 1 1 0 1 0 < expected output
   */
  const events: OOEvent[] = [
    {
      id: "1",
      user_id: "1",
      time: "4",
      lat: "0",
      lng: "0",
      type: "contact",
      inf: "",
      falsePositive: "",
      out: "",
      sim_id: "1",
      peer_id: "1",
      contact_length: "3",
      quiz_id: "0",
      modifier: "",
      score: "0",
      max_strength: "-100",
    },
    {
      id: "2",
      user_id: "2",
      time: "2",
      lat: "0",
      lng: "0",
      type: "contact",
      inf: "",
      falsePositive: "",
      out: "",
      sim_id: "2",
      peer_id: "5410",
      contact_length: "2",
      quiz_id: "0",
      modifier: "",
      score: "0",
      max_strength: "-100",
    },
    {
      id: "3",
      user_id: "3",
      time: "6",
      lat: "0",
      lng: "0",
      type: "contact",
      inf: "",
      falsePositive: "",
      out: "",
      sim_id: "3",
      peer_id: "5410",
      contact_length: "1",
      quiz_id: "0",
      modifier: "",
      score: "0",
      max_strength: "-100",
    }
  ]

  const ans = ContactProcessor.run({
    startTime: 0,
    endTime: 6,
    events: {
      all: [],
      infections: [],
      contacts: events,
      sir: []
    },
    interval: 1,
    labels: []
  })
  expect(ans).toEqual([1, 2, 1, 1, 0, 1, 0])

})

