import React from 'react';
import { parse } from 'query-string';
import { Redirect, Link } from 'react-router-dom';
import FetchRequest, { Endpoints } from '../utils/request';
import { Keys, lsSet, lsGet } from '../utils/localstorage';
import Title1 from '../atoms/title1';
import styled from 'styled-components';

class Auth extends React.Component<any, {}>{
  state = {
    codeRecieved: false,
    tokenRecieved: false,
    errorRecieved: false,
  };
  getBearerToken() {
    const params = {
      client_id: lsGet(Keys.CLIENT_ID),
      code: lsGet(Keys.CODE),
    };
    const config = {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    FetchRequest(Endpoints.CodeToToken, config)
    .then(data => {
      const responseData = parse(data);
      if(responseData.access_token) {
        lsSet(Keys.TOKEN, responseData.access_token)
        this.setState({
          tokenRecieved: true,
        });
      } else {
        this.setState({
          errorRecieved: true,
        });
      }
    })
    .catch((error: any) => {
      this.setState({
        errorRecieved: true,
      });
    });

  }
  componentDidMount() {
    const { code } = parse(location.search);
    if(code) {
      lsSet(Keys.CODE, code);
      this.setState({ codeRecieved: true });
    }
  }
  render() {
    const { className } = this.props;
    const { codeRecieved, tokenRecieved, errorRecieved } = this.state;
    if(!codeRecieved && !tokenRecieved) {
      return (<div className={className}><Title1>Please Wait...</Title1></div>);
    }
    if(codeRecieved && !tokenRecieved && !errorRecieved) {
      this.getBearerToken()
      return (<div className={className}><Title1>Hold on, Getting Info.</Title1></div>);
    }
    if(codeRecieved && tokenRecieved) {
      return <Redirect from="/auth" to="/" />
    }
    if (errorRecieved) {
      return (
        <div className={className}>
          <Title1>Some error came up. Team has been notified</Title1>
          <Link to="/login">Go back to Login</Link>
        </div>
      );
    }
    return <div className={className}><Title1>Please Wait...</Title1></div>;
  }
}

export default styled(Auth)`
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
`;
