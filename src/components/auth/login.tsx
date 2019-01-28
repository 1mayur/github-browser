import React from 'react';
import { Keys, lsSet, lsGet } from '../utils/localstorage';
import { Endpoints } from '../utils/request';
import Title1 from '../atoms/title1';
import styled from 'styled-components';
import Button from '../atoms/button';

class Login extends React.Component<any, {}>{
  componentWillMount() {
    lsSet(Keys.CLIENT_ID, '054db84472ce27357c56')
  }
  getGithubLoginUrl = (redirectUrl: string) => {
    return `https://github.com/login/oauth/authorize?client_id=${lsGet(Keys.CLIENT_ID)}&scope=user%20repo&redirect_uri=${redirectUrl}`
  }
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div className="login-container">
          <Title1>Login via GitHub</Title1>
          <Button href={this.getGithubLoginUrl(Endpoints.REDIRECT_URI)}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default styled(Login)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  background: rgb(255,255,255); /* Old browsers */
  background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(229,229,229,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e5e5e5',GradientType=0 ); /* IE6-9 */

  .login-container {
    display: flex;
    flex-flow: column;
    a {
      margin-top: 1rem;
    }
  }
`;
