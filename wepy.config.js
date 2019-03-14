// import configJson from './src/config/webpack_config'
const path = require('path')
// 项目配置
let configProject = {
  dev: {  // 开发环境
    httpUrl: 'https://api.dlds.laoganbu.cn',
    imgHttpUrl: 'http://static.laoganbu.cn/',
    otherData: {}
  },
  gem: { // 其他环境
    http: 'www,gem.com',
    imgHttp: 'www.gem.com',
    otherData: {}
  },
  yangmi: { // 其他环境
    http: 'www,yangmi.com',
    imgHttp: 'www.yangmi.com',
    otherData: {}
  }
}
var prod = process.env.NODE_ENV === 'production'// 是否生产环境
module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    // less: {
    //   compress: prod
    // },
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    configData: configProject[process.env.NODE_ENV]// 参数传递
  }
}

if (prod) {
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
