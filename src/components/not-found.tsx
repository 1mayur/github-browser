import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title1 from './atoms/title1';
import Title2 from './atoms/title2';

class NotFound extends React.Component<any, any> {
  render() {
    const { className } = this.props;

    return (
      <div className={`not-found ${className}`}>
        <Title1>404</Title1>
        <Title2>{'Looks like we took a wrong turn'}</Title2>
        <Link to="/">{'Back to Home'}</Link>
      </div>
    );
  }
}

export default styled(NotFound)`
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgb(242,245,246); /* Old browsers */
  background: -moz-linear-gradient(top, rgba(242,245,246,1) 0%, rgba(227,234,237,1) 37%, rgba(200,215,220,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(242,245,246,1) 0%,rgba(227,234,237,1) 37%,rgba(200,215,220,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(242,245,246,1) 0%,rgba(227,234,237,1) 37%,rgba(200,215,220,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2f5f6', endColorstr='#c8d7dc',GradientType=0 ); /* IE6-9 */
`;
