import React from 'react'
import PropTypes from 'prop-types'
import NProgress from 'nprogress';
import Post from './Post.jsx'
import PostEdit from './PostEdit.jsx'
import Posts from './Posts.jsx'
import PostCreate from './PostCreate.jsx'
import User from './User.jsx'
import UserCreate from './UserCreate.jsx'
import UserSessionCreate from './UserSessionCreate.jsx'
import SettingsAccount from './SettingsAccount.jsx'
import SettingsPassword from './SettingsPassword.jsx'
import SettingsProfile from './SettingsProfile.jsx'
import UserFollowees from './UserFollowees.jsx'
import UserFollowers from './UserFollowers.jsx'
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
      case 'tops#show':
        return Top
      case 'posts#new':
        return PostCreate
      case 'posts#index':
        return Posts
      case 'posts#show':
        return Post
      case 'posts#edit':
        return PostEdit
      case 'users#show':
        return User
      case 'users#new':
        return UserCreate
      case 'user_sessions#new':
        return UserSessionCreate
      case 'settings_accounts#show':
        return SettingsAccount
      case 'settings_passwords#show':
        return SettingsPassword
      case 'settings_profiles#show':
        return SettingsProfile
      case 'user_followees#index':
        return UserFollowees
      case 'user_followers#index':
        return UserFollowers
      default:
        return Top
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
