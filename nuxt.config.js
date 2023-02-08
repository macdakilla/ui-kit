export default {
  ssr: false,
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    base: process.env.NODE_ENV === 'production' ? '/vue-common-components/' : '/'
  },
  loading: { color: '#fff' },
  styleResources: {
    scss: [
      '@/assets/scss/variables/_index.scss'
    ]
  },
  css: [
    '@/assets/scss/index.scss'
  ],
  plugins: [
    '@/lib'
  ],
  commonComponents: {
    // components: ['button', 'modal'],
    nameCasing: 'camelCase',
    modal: {
      icon: () => import('@/components/icons/cross')
    },
    checkbox: {
      icon: () => import('@/components/icons/check')
    }
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources'
  ],
  modules: [
  ]
}
