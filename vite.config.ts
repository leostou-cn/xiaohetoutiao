import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'
import postCssPxToRem from 'postcss-pxtorem'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: false,
    host: "0.0.0.0",
  },
  plugins: [vue(), viteCommonjs(), VueSetupExtend(), eslintPlugin({
    include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
  }), Components({
    resolvers: [VantResolver()],
  }),],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@axios': resolve(__dirname, './src/api/index'),
      '@components': resolve(__dirname, './src/components'),
    }
  },
  base: './',
  css: {
    postcss: { // 关键代码：自适应，px>rem转换
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    },
  },
  define: {
    'process.env': {}
  },
  mode: 'development',
  build: {
    lib: {
      entry: resolve(__dirname, 'index.html'), // 设置入口文件
      name: 'nf-tool', // 起个名字，安装、引入用
      fileName: (format) => `nf-tool.${format}.js`// 打包后的文件名
    },
    sourcemap: true, // 输出.map文件
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
