import React from 'react';
import styled from 'styled-components';
import ControlBar from '../atoms/control-bar';
import { CircleLoader } from 'react-spinners';
import Colors from '../atoms/colors';
import FetchRequest, { Endpoints } from '../utils/request';
import { Keys, lsSet, lsGet, clearUser } from '../utils/localstorage';
import GithubUserBadge from '../atoms/github-user-badge';
import SearchInput from '../atoms/search-input';
import buildUrl from 'build-url';
import GitHubRepoTile from '../atoms/github-repo-tile';
import Title1 from '../atoms/title1';
import Title2 from '../atoms/title2';
import CommitHistory from './commit-history';
import Modal from '../atoms/modal';

class Home extends React.Component<any, {}>{
  public state = {
    isLoading: false,
    user: lsGet(Keys.USER) || null,
    repos: [],
    searchTerm: '',
    owner: null,
    repo: null,
    modalOpen: false
  }

  loadingData = (status: boolean) => {
    this.setState({
      isLoading: status
    })
  }

  sortResult = (repoData: any) => {
    return repoData.sort(
      (a: any, b: any) => (a.forks_count < b.forks_count) ? 1 : ((b.forks_count < a.forks_count) ? -1 : 0)
    )
  }

  componentDidMount() {
    if (!this.state.user) {
      this.loadingData(true);
      FetchRequest(Endpoints.GetUserInfo, {
        method: 'GET'
      }, true).then(data => {
        const userData = JSON.parse(data);
        FetchRequest(userData.organizations_url, {
          method: 'GET'
        }, true).then(orgRepo => {
          const userInfo = {
            ...userData,
            organizations_repo: this.sortResult(JSON.parse(orgRepo))
          };
          lsSet(Keys.USER, userInfo);
          this.setState({
            user: userData,
            isLoading: false,
          });
        })
      });
    }
  }

  handleSearchInputChange = (e: any) => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  handleSignOut = () => {
    clearUser();
    document.location.replace('/login');
  }

  handleRepoClick = (repo: any) => {
    this.setState({
      owner: repo.owner.login,
      repo: repo.name,
      modalOpen: true,
    });
  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false
    });
  }

  handleSearchSubmit = (e: any) => {
    const { searchTerm } = this.state;
    if (searchTerm) {
      const searchOrgRepoUrl = buildUrl(Endpoints.GetOrgRepos, {
        path: searchTerm + '/repos'
      });
      this.loadingData(true);
      FetchRequest(searchOrgRepoUrl, {
        method: 'GET'
      }, true).then(data => {
        if (data.error) {
          this.setState({
            repos: [],
            isLoading: false,
          })
        } else {
          this.setState({
            repos: this.sortResult(JSON.parse(data)),
            isLoading: false,
          })
        }
      });
    }
  };

  render() {
    const { className } = this.props;
    const {
      isLoading,
      user,
      searchTerm,
      repos,
      owner,
      repo,
      modalOpen
    } = this.state;
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
        {!isLoading && user && (
          <div className="home-container">
            <div>
              <ControlBar>
                <SearchInput
                  className="search-bar"
                  value={searchTerm}
                  onChange={this.handleSearchInputChange}
                  onEnterKeyPress={this.handleSearchSubmit}
                />
                <GithubUserBadge user={user} onSignOut={this.handleSignOut} />
              </ControlBar>
            </div>
            {repos.length > 0 && (
              <div className="results-container">
                {repos.map((repo, index) => {
                  return <GitHubRepoTile key={index} info={repo} onTileClick={this.handleRepoClick} />;
                })}
              </div>
            )}
            {owner && repo && modalOpen && (
              <Modal showModal={true} onClose={this.handleModalClose}>
                <CommitHistory owner={this.state.owner} repoName={this.state.repo} />
              </Modal>
            )}
            {repos.length === 0 && (
              <div className="no-results">
                <Title1>No repositories found.</Title1>
                <Title2>Please enter the seach term and press enter.</Title2>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default styled(Home)`
  display: flex;
  width: 100%;
  height: calc(100vh);
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .no-results{
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  .home-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    .search-bar {
      width: 30%;
      position: absolute;
      left: 1rem;
    }
    .github-user-info {
      right: 0;
      position: absolute;
    }
    .results-container {
      display: grid;
      grid-template-columns: 20% 20% 20% 20% 20%;
    }
  }
`;
