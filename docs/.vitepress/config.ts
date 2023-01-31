import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Demi UI',
  description: 'Just simple docs site.',
  lastUpdated: true,
  srcDir: 'src',
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
    },
  },
})
