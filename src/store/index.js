import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      localization: "ru_RU"
    },
    localization: {
      ru_RU: {
        marker: "Маркер",
        list_title: "Список маркеров"
      }
    },
    yamapSettings: {
      apiKey: '8ad9575f-e3db-444a-afed-bb7b83a5329a',
      coordorder: 'latlong',
      version: '2.1',
    },
    mapCenter: [55.76, 37.64],
    placemarks: [],
    selectPlacemark: []
  },
  getters: {
    YAMAP_SETTINGS: state => {
      let settings = state.yamapSettings
      settings.lang = state.settings.localization
      return settings
    },
    MAP_CENTER: state => state.mapCenter,
    PLACEMARKS: state => state.placemarks,
    SELECTED_PLACEMARK: state => state.selectPlacemark,
    LOCALIZATION: state => state.localization[state.settings.localization]
  },
  mutations: {
    SET_PLACEMARK: (state, coordinates) => {
      state.placemarks.push({
        coordinates
      })
    },
    SELECT_PLACEMARK: (state, coordinates) => {
      state.selectPlacemark = coordinates
    }
  },
  actions: {
  },
  modules: {
  }
})
