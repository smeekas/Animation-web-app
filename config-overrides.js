const NodePolyFillPlugin = require('node-polyfill-webpack-plugin')
module.exports = function override(config, env) {
  const fallback = config.resolve.fallback || {}
  fallback['stream'] = require.resolve('stream-browserify')
  fallback["buffer"] = require.resolve("buffer")
  config.resolve.fallback = fallback
  // config.plugins.push(new NodePolyFillPlugin())
  // config.resolve.fallback['stream'] = require.resolve('stream-browserify')
  return config;
}