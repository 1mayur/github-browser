import React from 'react';
import styled from 'styled-components';
import Colors from './colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCodeBranch,
  faEye,
  faInfoCircle,
  faFileCode,
} from '@fortawesome/free-solid-svg-icons';

import { faGithub } from '@fortawesome/free-brands-svg-icons'

interface IProps {
  className?: string;
  info: any;
  onTileClick: (repo: any) => void;
}

export class GithubRepoTile extends React.Component<IProps, {}> {
  handleOnClick = (e: any) => {
    const { onTileClick, info } = this.props;
    onTileClick && onTileClick(info);
  }
  render() {
    const { info, className } = this.props;

    return (
      <div className={`github-tile-info ${className}`} onClick={this.handleOnClick}>
        <div className="row repo-name"><span><FontAwesomeIcon icon={faGithub} /></span>{info.name}</div>
        <div className="row">
          {info.description && (
            info.description.length > 50 ? info.description.substring(0, 47) + '...' : info.description
          )}
        </div>
        <div className="top-right-float repo-language">
          <div><span><FontAwesomeIcon icon={faFileCode} /></span>{info.language}</div>
        </div>
        <div className="row repo-stats">
          <div><span><FontAwesomeIcon icon={faCodeBranch} /></span>{info.forks_count}</div>
          <div><span><FontAwesomeIcon icon={faEye} /></span>{info.watchers_count}</div>
          <div><span><FontAwesomeIcon icon={faInfoCircle} /></span>{info.open_issues_count}</div>
        </div>
      </div>
    );
  }
}

export default styled(GithubRepoTile)`
  display: flex;
  padding: 2rem;
  flex-flow: column;
  justify-self: stretch;
  align-self: stretch;
  align-items: center;
  position: relative;
  border: 1px solid ${Colors.grey500};
  border-radius: 0.5rem;
  margin: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;

  background: #ffffff; /* Old browsers */
  background: -moz-linear-gradient(top, #ffffff 0%, #f6f6f6 47%, #ededed 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #ffffff 0%,#f6f6f6 47%,#ededed 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed',GradientType=0 ); /* IE6-9 */


  .row {
    display: flex;
    flex-flow: row;
  }
  .commit-link {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .repo-name {
    margin-bottom: 1rem;
    font-weight: 600;
    span {
      margin-right: 0.25rem;
    }
  }
  .repo-language {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .repo-stats > div {
    margin: 0.5rem;
  }
  .repo-language, .repo-stats > div {
    span {
      margin-right: 0.25rem;
    }
  }
`;
