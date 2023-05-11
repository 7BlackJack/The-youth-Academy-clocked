// vite.config.js
const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const path = require('path')
const Components = require('unplugin-vue-components/vite')
const { AntDesignVueResolver } = require('unplugin-vue-components/resolvers')
const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://young.i286.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
