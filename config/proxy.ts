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
      // target: 'http://121.36.23.30:12461/portalbase',
      target: 'http://192.168.35.8:7050/portal',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/mock': {
      target: 'http://localhost:8001',
      changeOrigin: true,
      pathRewrite: { '': '' },
    },
  },
  test: {
    '/api/': {
      target: 'http://121.36.23.30:12461/portalbase',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'http://121.36.23.30:12461/portalbase',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
