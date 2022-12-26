import React, {CSSProperties} from 'react';

import {useCSVReader} from 'react-papaparse';

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  } as CSSProperties,
};

export function CSVReader(props:{onUploadAccepted:Function}) {
  const {CSVReader} = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={(results: CsvResult<any>) => {
        props.onUploadAccepted(results);
      }}
      config={{header: true}}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style={styles.csvReader}>
            <button type='button' {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
  );
}

export interface CsvResult<T>{
  data: T[]
  errors: any[]
  meta: any[]
}

export interface OOEvent {
  id: string
  user_id: string
  time: string
  lat: string
  lng: string
  type: string
  inf: string
  falsePositive: string
  out: string
  sim_id: string
  peer_id: string
  contact_length: string
  quiz_id: string
  modifier: string
  score: string
  max_strength: string
}

export interface Participant {
  id: string
  p2p_id: string
  sim_id: string
  group: string
  random_id: string
}
