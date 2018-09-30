import React, {Component} from 'react'
import {Image} from 'semantic-ui-react'
import logo from './images/logo.png'

export default class Logo extends Component {
  render() {
    return (
      <Image src={logo} wrapped verticalAlign={'middle'} size={'small'}/>
    )
  }
}
