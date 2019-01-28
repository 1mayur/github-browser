import { Keys, lsGet } from '../utils/localstorage';

export const Endpoints = {
  GetUserInfo: 'https://api.github.com/user',
  CodeToToken: '//localhost:3010/github/auth',
  REDIRECT_URI: "http://localhost:3000/auth",
  GetOrgRepos: 'https://api.github.com/orgs',
  GetRepoUrl: 'https://api.github.com/repos'
}

const FetchRequest = (url: string, config: any, auth: boolean = false): Promise<any> => {
  const opts: any = {
    method: config.method,
    headers: {},
    body: {},
  };
  const token = lsGet(Keys.TOKEN);
  opts.headers = {
    ...config.headers,
    ...(auth && token && { Authorization: `Bearer ${token}` }),
  };
  opts.body = config.body && JSON.stringify(config.body);

  return window.fetch(url, opts)
  .then((response: any) => {
    if (response.status < 200 || response.status >= 300) {
      return {
        error: true,
        data: response.text()
      }
    }
    return response.text();
  });
};

export default FetchRequest;
