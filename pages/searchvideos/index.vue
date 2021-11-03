<template>
  <v-container>
      <v-layout align-center justify-center>
        <v-flex xs 12>
          <v-card class="elevation-8">
            <v-card-title>Search Videos</v-card-title>
            <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="searchVideoForm.title"
                  label="Title"
                  required
                  outlined
                />
              </v-col>
            </v-row>
            <v-layout align-end justify-end>
              <v-btn color="primary" @click="searchVideos">Search</v-btn>
            </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-data-table
        :headers="headers"
        :items="tableItems"
        :items-per-page="5"
        class="elevation-1 mt-6"
      >
        <template #[`item.categoriaId`]="{ item }">
          <v-icon>
            {{getIcon(item.categoriaId)}}
          </v-icon>
        </template>

        <template #[`item.url`]="{ item }">
          <a :href="item.url" target="_blank">{{item.url}}</a>
        </template>

      </v-data-table>
  </v-container>
</template>

<script lang="ts">

  import Vue from 'vue'
  import ListVideosItemDTO from '~/models/ListVideosItemDTO'

  export default Vue.extend({
  data () {
    return {
      searchVideoForm: {
        title: ''
      },
      videos: {} as Array<ListVideosItemDTO>,
      headers: [
          { text: 'ID', align: 'start', value: 'id' },
          { text: 'Category', align: 'start', value: 'categoriaId' },
          { text: 'Title', align: 'start', value: 'titulo' },
          { text: 'URL', align: 'start', sortable: false, value: 'url' }
        ],
        tableItems: []
    }
  },
  methods: {
    searchVideos() {
      const token = window.localStorage.getItem('Authorization')
      this.$axios.defaults.headers.common['Authorization'] = token
      this.$axios.$get('http://localhost:8080/videos/?page=0&search=' + this.searchVideoForm.title)
        .then( resp => {
          if (resp.status === 'SUCCESS')
            this.tableItems = resp.list
          else
            console.log('Search Video Error!')
        }).catch( error => {
          console.log('Search Video Error: ' + error.message)
        }
      )
    },
    getIcon(id: Number) {
      if(id === 1)
        return 'mdi-unicorn-variant'
      if(id === 2)
        return 'mdi-nature'
      if(id === 3)
        return 'mdi-hiking'
      if(id === 4)
        return 'mdi-pistol'
      if(id === 5)
        return 'mdi-weight-lifter'
      if(id === 6)
        return 'mdi-school'
      
      return 'mdi-checkbox-blank-circle'
    }
  },
})
</script>
