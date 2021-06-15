import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#FD9B07',
        secondary: '#344955',
        accent: '#82B1FF',
        top: '#344955',
        title: '#FFFFFF',
        menu: '#F3BA64',
        menuclick: '#4A6572',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
});
