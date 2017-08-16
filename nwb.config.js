module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactHotkeys',
      externals: {
        react: 'React'
      }
    }
  }
}
