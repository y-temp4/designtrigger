import React from 'react'
import PropTypes from 'prop-types'
import NProgress from 'nprogress';
import HelloWorld from './HelloWorld.jsx'
import UserCreate from './UserCreate.jsx'
import Top from './Top.jsx'
import { sendGet } from '../libs/client-methods.js';

export default class Router extends React.Component {
  static childContextTypes = {
    onLinkClick: PropTypes.func,
    rootProps: PropTypes.any,
  }

  constructor(...args) {
    super(...args);
    this.state = {
      rootProps: this.props,
    };
  }

  getChildContext() {
    return {
      onLinkClick: this.onLinkClick.bind(this),
      rootProps: this.state.rootProps,
    };
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      this.transitTo(document.location.href, { pushState: false })
    })
  }

  onLinkClick(event) {
    if (!event.metaKey) {
      event.preventDefault();
      const anchorElement = event.currentTarget.pathname ? event.currentTarget : event.currentTarget.querySelector('a');
      this.transitTo(anchorElement.href, { pushState: true });
    }
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

  transitTo(url, { pushState }) {
    NProgress.start();
    sendGet(url).then((rootProps) => {
      if (pushState) {
        history.pushState({}, '', url);
      }
      this.setState({ rootProps });
    }).then(() => {
      window.scrollTo(0, 0);
      NProgress.done();
    }).catch(() => {
      NProgress.done();
    });
  }

  render() {
    const Component = this.getComponent();
    return <Component {...this.state.rootProps} />
  }
}
