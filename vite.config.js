import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@views': path.resolve(__dirname, './src/views'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@config': path.resolve(__dirname, './src/config'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server:{
    host:'0.0.0.0',
    port: 5177,
  },
  plugins: [vue(),
    AutoImport({
      imports: [
        'vue', // 自动导入 vue 相关的 API
        'vue-router', // 自动导入 vue-router 相关的 API
        '@vueuse/core', // 如果使用 VueUse
      ],
      dts: 'src/auto-imports.d.ts', // 生成全局声明文件
    }),
    Components({
      resolvers: [
        // 自动导入 VueUse 组件
        VueUseComponentsResolver(),
      ],
      dirs: ['src/components', 'src/views'],
      dts: 'src/components.d.ts', // 生成组件声明文件
    }),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  
})
