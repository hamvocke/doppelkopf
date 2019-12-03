import { configure } from '@storybook/vue';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module);
