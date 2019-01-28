import React from 'react';
import styled from 'styled-components';
import Colors from './colors';

interface IProps {
  className?: string;
  user: any;
  onSignOut?: () => void;
}

export class GithubUserBadge extends React.Component<IProps, {}> {
  render() {
    const { user, className, onSignOut } = this.props;

    return (
      <div className={`github-user-info ${className}`}>
        <div className="avatar-image">
          <img src={user.avatar_url} />
        </div>
        <div className="user-info">
          <div className="user-name">{user.login}</div>
          <div className="user-signout" onClick={onSignOut}>{'Sign out'}</div>
        </div>
      </div>
    );
  }
}

export default styled(GithubUserBadge)`
  display: flex;
  width: 13rem;
  color: ${Colors.white};
  .avatar-image {
    img {
      height: 3rem;
      border-radius: 50%;
    }
  }
  .user-info {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .user-name,
    .user-signout {
      width: 9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .user-signout {
    text-decoration: underline;
    color: ${Colors.green400};
    font-style: italic;
    cursor: pointer;
  }
`;
