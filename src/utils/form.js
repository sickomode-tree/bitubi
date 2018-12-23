import React from 'react'
import moment from 'moment'
import {Button, Checkbox, Form, Input, Menu, TextArea} from 'semantic-ui-react'
import {getObjectValue} from './array'
import DatePicker from 'react-datepicker'
import InputMask from 'react-input-mask'

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

  switch (config.tag) {
    case 'textarea':
      formFieldComponent = (
        <Form.Field
          control={TextArea}
          name={config.name}
          label={config.title}
          placeholder={config.title}
          required={config.required || false}
          disabled={config.disabled || false}
          defaultValue={config.value || null}
          width={16}
          autoHeight
        />
      )
      break
    case 'select':
      formFieldComponent = (
        <div style={{width: '100%'}}>
          <input
            type='hidden'
            name={config.name}
            defaultValue={config.value || null}
          />
          <Form.Select
            name={config.name}
            label={config.title}
            placeholder={config.title}
            search={config.search || true}
            required={config.required || false}
            disabled={config.disabled || _.isEmpty(config.options) || false}
            defaultValue={config.value || null}
            multiple={config.multiple || false}
            options={config.options}
            onChange={config.onChange}
          />
        </div>
      )
      break
    case 'datepicker':
      formFieldComponent = (
        <Form.Field required={config.required} width={16}>
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
        </Form.Field>
      )
      break
    case 'input':
      switch (config.type) {
        case 'tel':
          formFieldComponent = (
            <Form.Input
              label={config.title}
              width={16}
              required={config.required}
              children={
                <InputMask
                  type={config.type}
                  name={config.name}
                  mask='+7 (999) 999-99-99'
                  placeholder='+7 (999) 999-99-99'
                  defaultValue={config.value || (config.path ? getObjectValue(data, config.path, config.type) : '')}
                />
              }
            />
          )
          break
        case 'email':
          formFieldComponent = (
            <Form.Input
              type={config.type}
              label={config.title}
              name={config.name}
              width={16}
              required={config.required}
              placeholder={config.title || config.placeholder}
              defaultValue={config.value || (config.path ? getObjectValue(data, config.path, config.type) : '')}
              pattern={'[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'}
            />
          )
          break
        case 'url':
          formFieldComponent = (
            <Form.Input
              type={config.type}
              label={config.title}
              name={config.name}
              width={16}
              required={config.required}
              placeholder={'https://example.com'}
              defaultValue={config.value || (config.path ? getObjectValue(data, config.path, config.type) : '')}
            />
          )
          break
        default:
          formFieldComponent = (
            <Form.Input
              type={config.type || 'text'}
              name={config.name}
              label={config.title}
              width={16}
              placeholder={config.title || config.placeholder}
              required={config.required || false}
              defaultValue={config.value || (config.path ? getObjectValue(data, config.path, config.type) : '')}
            />
          )
      }
      break
    case 'button':
      formFieldComponent = (
        <Button
          icon={config.icon}
          style={{position: 'absolute', bottom: 9}}
          onClick={config.onClick}
          formNoValidate
        />
      )
      break
    case 'menu':
      formFieldComponent = (
        <Menu fluid size='tiny' widths={config.options.length}>
          {
            config.options.map(option => (
              <Menu.Item
                key={option.code}
                value={option.code}
                name={option.name}
                active={config.selected === option.code}
                onClick={config.onClick}
              />
            ))
          }
          <input
            type='hidden'
            name={config.name}
            defaultValue={config.selected}/>
        </Menu>
      )
      break
    case 'checkbox':
      formFieldComponent = (
        <Form.Checkbox
          name={config.name}
          label={config.title}
          required={config.required || false}
          defaultValue={config.path ? getObjectValue(data, config.path, config.type) : ''}
        />
      )
      break
    default:
      formFieldComponent = (
        <Form.Input
          type={config.type || 'text'}
          name={config.name}
          label={config.title}
          placeholder={config.title}
          required={config.required || false}
          defaultValue={config.path ? getObjectValue(data, config.path, config.type) : ''}
        />
      )
  }

  return formFieldComponent
}
