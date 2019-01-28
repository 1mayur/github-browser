import React, { Component } from 'react';
import Routes from './routes';
import styled from 'styled-components';

class App extends Component<any, any> {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Routes />
      </div>
    );
  }
}

export default styled(App)`
  display: flex;
  font-size: 16px;
`;
