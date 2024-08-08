/** @jsx jsx */

import { AllDataSourceTypes, type IMFieldSchema, Immutable, jsx, type UseDataSource } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { TextInput } from 'jimu-ui'
import { DataSourceSelector, FieldSelector } from 'jimu-ui/advanced/data-source-selector'

export default function (props: AllWidgetSettingProps<any>) {
  const supportedDsTypes = Immutable([AllDataSourceTypes.FeatureLayer])
  const onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if (!useDataSources) {
      return
    }
    props.onSettingChange({
      id: props.id,
      useDataSources: useDataSources
    })
  }

  const onxalueFieldChange = (allSelectedFields: IMFieldSchema[]) => {
    props.onSettingChange({
      id: props.id,
      config: props.config.set('xField', allSelectedFields.map(f => f.jimuName))
    })
  }

  const onyFieldChange = (allSelectedFields: IMFieldSchema[]) => {
    console.log(allSelectedFields)

    props.onSettingChange({
      id: props.id,
      config: props.config.set('yField', allSelectedFields.map(f => f.jimuName))
    })
  }

  const onyField2Change = (allSelectedFields: IMFieldSchema[]) => {
    console.log(allSelectedFields)

    props.onSettingChange({
      id: props.id,
      config: props.config.set('yField2', allSelectedFields.map(f => f.jimuName))
    })
  }

  return (
    <div>
      <div className="widget-setting-get-map-coordinates">
      <DataSourceSelector
          types={supportedDsTypes}
          useDataSourcesEnabled
          mustUseDataSource
          useDataSources={props.useDataSources}
          onChange={onDataSourceChange}
          widgetId={props.id}
          hideDataView={true}
        />
        {
          props.useDataSources && props.useDataSources.length > 0 &&
            <div className='mt-3 px-2'>
              <div className='my-2'>Please select x field.</div>
              <FieldSelector
                useDataSources={props.useDataSources}
                onChange={onxalueFieldChange}
                selectedFields={props.config.xField || Immutable([])}
                // selectedFields={props.useDataSources[0].fields || Immutable([])}
                useDropdown
                isDataSourceDropDownHidden
              />
              <div className='my-2'>Please select y1 field (Humidity).</div>
              <FieldSelector
                useDataSources={props.useDataSources}
                onChange={onyFieldChange}
                selectedFields={props.config.yField || Immutable([])}
                // selectedFields={props.useDataSources[0].fields || Immutable([])}
                useDropdown
                isDataSourceDropDownHidden
              />
              <div className='my-2'>Please select y2 field (Dew Point).</div>
              <FieldSelector
                useDataSources={props.useDataSources}
                onChange={onyField2Change}
                selectedFields={props.config.yField2 || Immutable([])}
                // selectedFields={props.useDataSources[0].fields || Immutable([])}
                useDropdown
                isDataSourceDropDownHidden
              />
            </div>
        }
        <div className='mt-3 px-2'>
          <div className='my-2'>Widget ID</div>
            <TextInput className="mb-4"
            value={props.id}
            allowClear
            disabled />
        </div>
      </div>
    </div>
  )
};
