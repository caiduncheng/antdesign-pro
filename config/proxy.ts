/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      target: 'http://121.36.23.30:12461/portalbase',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },      
    },
  },
  test: {
    '/api/': {
      target: 'https://192.168.35.175/npnserver',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'https://192.168.35.175/npnserver',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
