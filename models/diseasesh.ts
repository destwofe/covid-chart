export interface HistoricalResponse {
  country: string
  province: string | undefined
  timeline: {
    cases: Record<string, number>,
    deaths: Record<string, number>,
    recovered: Record<string, number>,
  }
}

export interface HistoricalPerDay {
  date: string
  data: Array<{
    country: string
    cases: number
    // deaths: number
    // recovered: number
  }>
}
