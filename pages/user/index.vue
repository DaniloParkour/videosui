<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <b>Videos Management</b>
      </v-col>
    </v-row>
    <v-row align="center" justify="left">
      <v-col v-for="item in videoList" :key="item.title" cols="3">
        <VideoCard :videoList="item" actionsButtons/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ListVideosItemDTO from '~/models/ListVideosItemDTO'

  export default Vue.extend({
    data () {
      return {
        videoList: [] as Array<ListVideosItemDTO>
      }
    },
    mounted() {
      console.log('Creates BASE_URL, and a DTOs_CONVERTER')
      this.$axios.$get('http://localhost:8080/videos?page=0&size=10')
      .then( resp => {
        this.videoList = [] as Array<ListVideosItemDTO>
        resp.list.forEach((e: any) => {
          this.videoList.push({
            categoryId: e.categoriaId,
            description: e.descricao,
            title: e.titulo,
            url: e.url
          } as ListVideosItemDTO)
        })
      }).catch( error => {
        console.log('List Videos Error: ' + error.message)
      }
      )
    }
  })
</script>
