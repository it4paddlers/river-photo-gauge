export interface Raw {
  [timestamp: string]: string;
}

export interface Photo {
  date: Date;
  url: string;
}

export interface Calibration {
  min: string;
  med: string;
  max: string;
}
