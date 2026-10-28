// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: [
    // Базовые стили v-md-editor: каркас редактора (toolbar, TOC, textarea, иконки)
    '@kangc/v-md-editor/lib/style/base-editor.css',
    // Стили preвью (iframe/v-md-preview)
    '@kangc/v-md-editor/lib/style/preview.css',
    // Тема оформления контента
    '@kangc/v-md-editor/lib/theme/style/github.css',
    'prismjs/themes/prism.css',
    '~/assets/css/main.css',
    // Фикс-файл подключается ПОСЛЕДНИМ, чтобы перекрывать стили темы и Tailwind preflight
    '~/assets/css/v-md-fix.css'
  ],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})

