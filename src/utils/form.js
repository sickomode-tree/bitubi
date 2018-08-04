import React from 'react'
import moment from 'moment'
import {Form, Input, TextArea} from 'semantic-ui-react'
import {getObjectValue} from './array'
import DatePicker from 'react-datepicker'
import MaskedInput from 'react-text-mask'

export const getFormattedValue = (value, type) => {
  let formattedValue

  switch (type) {
    case 'number':
      formattedValue = _.toNumber(value)
      break
    default:
      formattedValue = value
  }

  return formattedValue
}

export const getFormFieldComponent = (config, data) => {
  let formFieldComponent = null

  if (_.isNil(config.visible) || config.visible === true) {
    switch (config.tag) {
      case 'textarea':
        formFieldComponent = (
          <Form.Field
            key={config.name}
            control={TextArea}
            name={config.name}
            label={config.title}
            placeholder={config.title}
            required={config.required || false}
            disabled={config.disabled || false}
            defaultValue={config.value || null}
            width={config.width || 16}
            autoHeight
          />
        )
        break
      case 'select':
        formFieldComponent = (
          <div key={config.name}>
            <Form.Select
              name={config.name}
              label={config.title}
              placeholder={config.title}
              required={config.required || false}
              disabled={config.disabled || false}
              defaultValue={config.value || null}
              width={config.width || 16}
              options={config.options}
              onChange={config.onChange}
            />
            <input
              type='hidden'
              name={config.name}
              defaultValue={config.value || null}
            />
          </div>
        )
        break
      case 'datepicker':
        formFieldComponent = (
          <div className='eight wide field' key={config.name}>
            <label>{config.title}</label>
            <DatePicker
              minDate={moment()}
              maxDate={moment().add(365, 'days')}
              locale='ru'
              customInput={
                <Input fluid>
                  <input
                    placeholder={config.title}
                    name={config.name}
                  />
                </Input>
              }
              selected={!_.isNil(config.value) ? moment(config.value) : null}
              onChange={config.onChange}
            />
          </div>
        )
        break
      case 'input':
        switch (config.type) {
          case 'tel':
            formFieldComponent = (
              <Form.Input
                label={config.title}
                required={config.required}
                children={
                  <MaskedInput
                    name={config.name}
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    placeholder='(999) 999-99-99'
                    defaultValue={getObjectValue(data, config.path, config.type)}
                  />
                }
              />
            )
            break
          default:
            formFieldComponent = (
              <Form.Input
                key={config.name}
                type={config.type || 'text'}
                name={config.name}
                label={config.title}
                placeholder={config.title}
                required={config.required || false}
                defaultValue={getObjectValue(data, config.path, config.type)}
                width={config.width || 16}
              />
            )
        }
        break
      default:
        formFieldComponent = (
          <Form.Input
            key={config.name}
            type={config.type || 'text'}
            name={config.name}
            label={config.title}
            placeholder={config.title}
            required={config.required || false}
            defaultValue={getObjectValue(data, config.path, config.type)}
            width={config.width || 16}
          />
        )
    }
  }

  return formFieldComponent
}
