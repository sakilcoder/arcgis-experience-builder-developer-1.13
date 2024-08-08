import {  type ImmutableObject, type ImmutableArray } from 'jimu-core'

export interface chartParameterConfig {
  name: string
  reduxName: string
  column: string
  unit: string
  chartSeriesName: string
  chartType: string
  chartMode: string
  chartMarkerColor: string

}

export interface Config {
  exampleConfigProperty: string
  chartParameters: ImmutableArray<chartParameterConfig>
}

export type IMConfig = ImmutableObject<Config>
