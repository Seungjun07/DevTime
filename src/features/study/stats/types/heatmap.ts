export interface HeatMap {
  date: string;
  studyTimerHours: number;
  colorLevel: number;
}

export interface HeatMapResponse {
  heatmap: HeatMap[];
}
