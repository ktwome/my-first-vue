import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { aliases, mdi } from 'vuetify/iconsets/mdi'


// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes:{
      light:{
        dark: false,
        variables: {
          'font-family': "'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, " +
            "Roboto, sans-serif"
        }
      },
      dark:{
        dark: true,
        variables: {
          'font-family': "'Pretendard Variable', -apple-system, BlinkMacSystemFont, " +
            "system-ui, Roboto, sans-serif"

        },
        colors:{
        }
      }
    },
  },
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
