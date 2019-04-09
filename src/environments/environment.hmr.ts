// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serverHost: 'http://localhost:8089', // 服务器路径
  hmr: true, // 是否开启模块热更新（针对开发）
  withBackEnd: false,
  title: 'Angular Start', // 系统名称（请根据实际项目进行修改）
  domain: '', // 请求的域名（请根据实际项目进行修改）
  mockDomain: '', // 模拟请求的域名（请根据实际项目进行修改）
  tokenName: '', // 令牌名称（请根据实际项目进行修改）
  appDownloadUrl: '' // app下载路径
};
