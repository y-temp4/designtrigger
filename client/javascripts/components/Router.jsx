import React from 'react'
import HelloWorld from './HelloWorld.jsx'

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
      default:
        return HelloWorld
    }
  }

  render() {
    const Component = this.getComponent();
    return <Component {...this.state.rootProps} />
  }
}
