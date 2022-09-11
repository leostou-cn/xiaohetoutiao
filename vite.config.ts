import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    open: false,
    host: "0.0.0.0",
    // proxy: {
    //   "/api": {
    //     target: "http://toutiao.itheima.net",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // }
  },
  plugins: [vue(), viteCommonjs(), eslintPlugin({
    include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
  }), Components({
    resolvers: [VantResolver()],
  }),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@axios': path.resolve(__dirname, './src/api/index'),
      '@components': path.resolve(__dirname, './src/components'),
    }
  },

  css: {
    postcss: { // 关键代码：自适应，px>rem转换
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    },
  }
})
