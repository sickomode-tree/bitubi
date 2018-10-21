import React, { Component } from 'react'
import { getUserType } from 'utils/auth'

export const Authorization = (WrappedComponent, allowedUserTypes) => {
  return class WithAuthorization extends Component {
    constructor (props) {
      super(props)

      this.state = {
        userType: getUserType()
      }
    }

    render () {
      const { userType } = this.state

      if (allowedUserTypes.includes(userType)) {
        return <WrappedComponent {...this.props} />
      } else {
        return <h1>404</h1>
      }
    }
  }
}
