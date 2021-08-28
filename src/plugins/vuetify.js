import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                color1: '#e4a216',
                color_up: '#219653',
                color_down: '#EB5757',
            },
        },
    },
});
