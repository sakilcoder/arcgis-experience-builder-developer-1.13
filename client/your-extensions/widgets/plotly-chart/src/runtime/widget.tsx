import { type DataSource, DataSourceComponent, React, type AllWidgetProps, DataSourceManager, ReactRedux } from 'jimu-core'
import { type IMConfig } from '../config'
import Plot from 'react-plotly.js'
import { Loading } from 'jimu-ui'

interface State {
  xValues: any
  yValues: any
  y2Values: any
  loading: boolean
}

class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, State> {
  dataSourceManager: any

  constructor (props) {
    super(props)

    this.dataSourceManager = DataSourceManager.getInstance()

    this.state = {
      xValues: [],
      yValues: [],
      y2Values: [],
      loading: true,
    }
  }

  handleDataSourceReady = (dataSource: DataSource) => {
    const { config } = this.props
    const xField = config.xField && config.xField[0]
    const yField = config.yField && config.yField[0]
    const yField2 = config.yField2 && config.yField2[0]

    let sql = "last_updated >= DATE '2023-05-21' AND last_updated < DATE '2023-05-23' AND station_id = 90250.0"
    if (xField && yField) {
      Promise.all([this.fetchUniqueValues(dataSource, sql, xField, yField, yField2)])
        .then(() => {
          console.log('Data pulled successfully!!')
          this.setState({ loading: false })
        })
        .catch((error) => {
          console.error('Failed to fetch unique values', error)
          this.setState({ loading: false })
        })
    }
  }

  fetchUniqueValues = (dataSource: DataSource, where: string, value1: string, value2: string, value3: string) => {
    let outFields = [value1, value2, value3]

    return dataSource
      .query({
        where,
        outFields,
        orderByFields: [value1]
      })
      .then((response) => {
        console.log(response)

        const xValues = response.records.map((record) => {
          const timestamp = record.getFieldValue(value1)
          const date = new Date(timestamp)
          const month = String(date.getUTCMonth() + 1).padStart(2, '0')
          const day = String(date.getUTCDate()).padStart(2, '0')
          const hours = String(date.getUTCHours()).padStart(2, '0')
          const minutes = String(date.getUTCMinutes()).padStart(2, '0')
          // const seconds = String(date.getUTCSeconds()).padStart(2, '0')
          // return `${month}-${day} ${hours}:${minutes}`
          return `${hours}:${minutes}`
        })

        const yValues = response.records.map((record) => record.getFieldValue(value2))
        const y2Values = response.records.map((record) => record.getFieldValue(value3))
        console.log(y2Values)

        this.setState({ xValues, yValues, y2Values })
        return []
      })
  }

  render () {
    const { useDataSources } = this.props
    const { xValues, yValues, y2Values, loading } = this.state

    const tickvals = [
      "00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00",
      "14:00", "16:00", "18:00", "20:00", "22:00", "00:00"
    ];
    const ticktext = [
      "12:00 AM", "02:00 AM", "04:00 AM", "06:00 AM", "08:00 AM", "10:00 AM", "12:00 PM",
      "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM", "10:00 PM", "12:00 AM"
    ];

    return (
      <>
        <div className="widget-plotly-chart" style={{ width: '100%', height: '100%' }}>
          {loading
            ? (
                <Loading type="SECONDARY" />
              )
            : (
              <div>
                <Plot
                  data={[
                    {
                      x: xValues,
                      y: yValues,
                      type: 'scatter',
                      mode: 'lines',
                      marker: { color: '#BB6F1E' },
                      name: 'Humidity (%)',
                      hoverinfo: 'x+y+name',
                      yaxis: 'y1'
                    },
                    {
                      x: xValues,
                      y: y2Values,
                      type: 'scatter',
                      mode: 'lines',
                      marker: { color: '#1E90FF' },
                      name: 'Dew Point (°C)',
                      hoverinfo: 'x+y+name',
                      yaxis: 'y2'
                    }
                  ]}
                  layout={{ 
                    title: 'Weather Chart for Station: 90250.0',
                    hovermode: 'x unified', // x unified
                    paper_bgcolor: 'rgba(0, 0, 0, 0)',
                    plot_bgcolor: 'rgba(0, 0, 0, 0)',
                    hoverlabel: {
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      font: {
                        color: '#FFFFFF'
                      }
                    },
                    xaxis: {
                      tickvals: tickvals,
                      ticktext: ticktext,
                      title: 'Time'
                    },
                    yaxis: {
                      title: 'Humidity (%)',
                      titlefont: { color: '#BB6F1E' },
                      tickfont: { color: '#BB6F1E' },
                      showgrid: true,
                    },
                    yaxis2: {
                      title: 'Dew Point (°C)',
                      titlefont: { color: '#1E90FF' },
                      tickfont: { color: '#1E90FF' },
                      overlaying: 'y',
                      side: 'right',
                      showgrid: false
                    },
                    legend: {
                      orientation: 'h',
                      y: 1.1,
                      x: 0.5,
                      xanchor: 'center',
                      bgcolor: 'rgba(255, 255, 255, 0)'
                    }
                  }}
                  config={{
                    modeBarButtonsToRemove: ['toImage'],
                    displaylogo: false,
                  }}
                  style={{ width: '100%', height: '100%' }}
                  
                />
              </div>
               
              )}
        </div>
        {useDataSources && useDataSources.length > 0
          ? (
          <DataSourceComponent
            useDataSource={useDataSources[0]}
            onDataSourceCreated={this.handleDataSourceReady}
          />
            )
          : (
              <div>Please select a data source.</div>
            )}
      </>
    )
  }
}

export default Widget
