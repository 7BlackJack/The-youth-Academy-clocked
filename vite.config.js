// vite.config.js
const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const path = require('path')
const Components = require('unplugin-vue-components/vite')
const { AntDesignVueResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
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
