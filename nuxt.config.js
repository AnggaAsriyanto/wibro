export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'wibro',
    htmlAttrs: {
      lang: 'id',
      prefix: "og: http://ogp.me/ns#"
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Berita dan Info terbaru Anime di Indonesia' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'author', content: 'Angga Asriyanto'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/wibro.svg' },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css", integrity: "sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==", crossorigin: "anonymous", referrerpolicy: "no-referrer" },
    ]
  },

  loading: {
    color: '#4CF4FF',
    height: '5px'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main'],

  router: {
    middleware: 'getPosts',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-fragment', { src: '~/plugins/quill', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/image',
    'nuxt-compress',
  ],

  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    },
    providers: {
      customProvider: {
        provider: '~/providers/custom',
        options: {}
      }
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp'
        }
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["vue2-editor/nuxt", "vue-social-sharing/nuxt", "@nuxtjs/robots",  "@nuxtjs/sitemap", "nuxt-compress", 
  "@nuxtjs/google-fonts", [
    '@nuxtjs/firebase',
    {
      config: {
        apiKey: "AIzaSyD76vH0TxiQ09o0h9gLNmrrUgi2h5XmJoc",
        authDomain: "wibro-3ebed.firebaseapp.com",
        projectId: "wibro-3ebed",
        storageBucket: "wibro-3ebed.appspot.com",
        messagingSenderId: "814738579367",
        appId: "1:814738579367:web:d931e13a060290a9cca082",
        measurementId: "G-B4R4NNYEC0"
      },
      services: {
        auth: {
          persistence: 'local',
          initialize: {
            onAuthStateChangedAction: 'onAuthStateChangedAction',
            subscribeManually: false
          },
          ssr: true,
          emulatorHost: 'http://localhost',
        },
        firestore: true,
        functions: true,
        storage: true,
        database: true,
        messaging: true,
        performance: true,
        analytics: true,
        remoteConfig: true
      }
    }], [
      '@nuxtjs/pwa', {
        meta: false,
        icon: false,
        workbox: {
          importScripts: [
            '/firebase-auth-sw.js'
          ],
          dev: process.env.NODE_ENV === 'development',
        }
      }
    ]
  ],

  robots: {
    UserAgent: '*',
    Disallow: '/admin',
  },

  sitemap: {
    hostname: 'https://wibro.herokuapp.com/',
    gzip: true,
    exclude: ['/admin'],
    routes: [
      'posts/DQGsQDE8orJKZYHZUS1C/bocoran-manga-attack-on-titans-terbaru!',
    ]
  },

  "nuxt-compress": {
    gzip: {
      threshold: 8192,
    },
    brotli: {
      threshold: 8192,
    }
  },

  googleFonts: {
    families: {
      Poppins: [400, 700, 800],
      'Open+Sans': [400, 500, 700],
    },
    display: 'fallback',
    preload: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
