var path = require('path');

module.exports = {
  entry: {
    main: ['./src/main.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: ['/node_modules'],
      },
      {
        test: /\.js$/,
        //include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        //include: path.resolve(__dirname, './src/css'),
        loader: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [],
  devServer: {
    contentBase: './public',
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
  },
};
