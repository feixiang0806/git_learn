// import Path from 'path';
import PxToRem from 'postcss-pxtorem';
//import PxToViewport from 'postcss-px-to-viewport';

export default {
  hash: true,
  entry: 'src/index.js',
  disableCSSModules: false,
  ignoreMomentLocale: true,
  autoprefixer: {
    browsers: [
      'iOS >= 8',
      'Android >= 4'
    ]
  },
  define: {
    'process.env.NODE_ENV': (process.env.NODE_ENV === 'production') ? 'production' : 'development'
  },
  theme: {
    '@hd': '2px'
  },
  extraPostCSSPlugins: [
   PxToRem({ rootValue: 36, propWhiteList: [], })
  //  PxToViewport({
  //    viewportWidth:750,
  //    viewportHeight:1334,
  //    unitPrecision: 5,
  //    viewportUnit: 'vw',
  //    selectorBlackList: [],
  //    minPixelValue: 1,
  //    mediaQuery: false
  //  })
  ],
  extraBabelPlugins: [
    'transform-runtime',
    "transform-decorators-legacy",
    "transform-class-properties",
    ['import', {
      libraryName: 'antd-mobile',
      style: true
    }]
  ],
  env: {
    production: {
      multipage: true,
      publicPath: '/',
      extraBabelPlugins: [
      ]
    },
    development: {
      multipage: false,
      publicPath: '/',
      extraBabelPlugins: [
        'dva-hmr'
      ]
    }
  }
};
