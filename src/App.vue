<template>
  <div id="app">
    <yandex-map
      :settings="yamapSettings"
      :coords="mapCenter"
      ymap-class="map"
      :controls="[]"
      :placemarks="placemarks"
      @click="onMapClick"
    >

      <ymap-marker
        :key="index"
        v-for="(item, index) in placemarks"
        :coords="item.coordinates"
        :marker-id="index"
        :callbacks="{
          click: onMarkerClick
        }"
      />

    </yandex-map>

    <div class="placemarks">
      <div class="placemarks__title">
        <h2>{{localization.list_title}}</h2>
      </div>
      <ul class="placemarks__list">
        <li
          v-for="(item, index) in placemarks"
          :key="index"
          :class="{active: isActivePlacemark(item)}"
          @click="selectPlacemark(item.coordinates)"
          class="placemarks__item"
        >
          <h6 class="item__title">{{localization.marker}} {{index}}</h6>
          <span class="item__subtitle">[{{item.coordinates[0]}}, {{item.coordinates[1]}}]</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  name: 'app',
  components: {
    yandexMap,
    ymapMarker
  },
  data() {
    return {
      yamapSettings: this.$store.getters.YAMAP_SETTINGS,
      mapCenter: this.$store.getters.MAP_CENTER,
      localization: this.$store.getters.LOCALIZATION
    }
  },
  computed: {
    placemarks() {
      return this.$store.getters.PLACEMARKS
    },
    selectedPlacemark() {
      return this.$store.getters.SELECTED_PLACEMARK
    }
  },
  methods: {
    addPlacemark(coordinates) {
      this.$store.commit('SET_PLACEMARK', coordinates)
    },
    selectPlacemark(coordinates) {
      this.mapCenter = coordinates
      this.$store.commit('SELECT_PLACEMARK', coordinates)
    },
    onMapClick(e) {
      this.addPlacemark(e.get('coords'))
    },
    onMarkerClick(e) {
      const target = e.get('target')
      this.selectPlacemark(target.geometry._coordinates)
    },
    isActivePlacemark(item){
      if(item.coordinates[0] === this.selectedPlacemark[0]){
        if(item.coordinates[1] === this.selectedPlacemark[1]){
          return true;
        }
      }
      return false;
    }
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
.map{
  width: 100%;
  height: 100vh;
}
.placemarks{
  position: fixed;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  top: 30px;
  left: 30px;
  min-width: 300px;
  max-height: calc(100vh - 60px);
}
.placemarks__list{
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  padding: 0;

  li{
    list-style: none;
    padding: 10px;

    &:hover, &.active{
      background-color: #eee;
    }
  }
  h6{
    font-size: .8rem;
    margin-top: 15px;
    margin-bottom: 5px;
  }
  span{
    font-size: .7rem;
    color: #ccc;
  }
}
.placemarks__title{
    background-color: #4f88c4;
    width: calc(100% - 30px);
    padding: 15px;
    border-radius: 8px 8px 0 0;

  h2{
    color: #fff;
    margin: 0;
  }
}
</style>
