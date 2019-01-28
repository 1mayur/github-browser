import React from 'react';
import styled from 'styled-components';
import FetchRequest, { Endpoints } from '../utils/request';
import { CircleLoader } from 'react-spinners';
import buildUrl from 'build-url';
import Colors from '../atoms/colors';

interface CommitHistoryProps {
  className?: string;
  owner: string;
  repoName: string;
}

class CommitHistory extends React.Component<any, {}>{
  state= {
    commitHistory: [],
    isLoading: false,
    errorOccured: false,
  }
  componentDidMount() {
    const { owner, repoName } = this.props;

    if (!owner || !repoName) return;

    this.setState({
      isLoading: true,
      commitHistory: [],
    });
    const commitHistoryUrl = buildUrl(Endpoints.GetRepoUrl, {
      path: owner + '/' + repoName + '/commits'
    });
    FetchRequest(commitHistoryUrl, {
      method: 'GET'
    }, true).then(data => {
      if(data.error) {
        this.setState({
          isLoading: false,
          errorOccured: true,
        })
      } else {
        this.setState({
          commitHistory: JSON.parse(data),
          isLoading: false,
          errorOccured: false,
        });
      }
    })
  }
  render() {
    const { className } = this.props;
    const { isLoading, errorOccured, commitHistory } = this.state;
    return (
      <div className={className}>
        {isLoading &&
          <div className="spinner-container">
            <CircleLoader
              sizeUnit={"rem"}
              size={7}
              color={Colors.red}
              loading={true}
            />
          </div>
        }
        {commitHistory && (
          <div className="commit-table">
            <div className="sha-table-head">
              <div className="sha-header-row row-15">Sha</div>
              <div className="sha-header-row row-70">Commit Message</div>
              <div className="sha-header-row row-15">Author</div>
            </div>
            {commitHistory.map((commit: any, index) => (
              <div className="sha-row" key={index}>
                <div className="sha-cell ellipsis"><a href={commit.html_url} target={'_blank'}>{commit.sha}</a></div>
                <div className="message-cell ellipsis">{commit.commit.message}</div>
                <div className="author-cell ellipsis"><a href={commit.author && commit.author.html_url} target={'_blank'}>{commit.author && commit.author.login || 'Unknown'}</a></div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default styled(CommitHistory)`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: calc(100vh);
  padding: 2rem;
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .commit-table {
    .row-15 {
      width: 15%;
    }
    .row-70 {
      width: 70%;
    }
    .sha-table-head {
      display: flex;
      flex-flow: row;
      border-bottom: 3px solid ${Colors.black400};
      margin-bottom: 3px;
      .sha-header-row {
        justify-content: center;
        align-items: center;
        display: flex;
      }
    }
  }
  .sha-row {
    display: flex;
    flex-flow: row;
    padding: 5px;
    border-bottom: 1px solid ${Colors.grey300};

    .sha-cell, .author-cell {
      width: 15%;
      margin-right: 1rem;
    }
    .message-cell {
      width: 70%;
    }
  }
`;
