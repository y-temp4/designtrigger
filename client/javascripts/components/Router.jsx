import React from 'react'
import HelloWorld from './HelloWorld.jsx'
import UserCreate from './UserCreate.jsx'
import Top from './Top.jsx'

export default class Router extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      rootProps: this.props,
    };
  }

  getComponent() {
    switch (this.state.rootProps.actionPath) {
      case 'hello_world#index':
        return HelloWorld
      case 'tops#show':
        return Top
      case 'users#new':
        return UserCreate
      default:
        return HelloWorld
    }
  }

  render() {
    const Component = this.getComponent();
    return <Component {...this.state.rootProps} />
  }
}
