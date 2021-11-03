<template>
  <v-container>
      <v-layout align-center justify-center>
        <v-flex xs 12>
          <v-card class="elevation-8">
            <v-card-title>Edit Video</v-card-title>
            <v-card-text>
            <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      v-model="videoEdit.titulo"
                      label="Title"
                      required
                      outlined
                    />
                  </v-col>
            </v-row>
            <v-row dense>
                  <v-col cols="12">
                    <v-text-field
                      v-model="videoEdit.url"
                      label="URL"
                      required
                      outlined
                    />
                  </v-col>
            </v-row>
            <v-row dense>
                  <v-col cols="12">
                    <v-textarea
                      v-model="videoEdit.descricao"
                      label="Description"
                      required
                      outlined
                    />
                  </v-col>
            </v-row>
            <v-row dense>
                  <v-col cols="3">
                    <v-select
                      v-model="videoEdit.categoriaId "
                      label="Category"
                      :items="categories"
                      item-text="titulo"
                      item-value="id"
                      required
                      outlined
                    />
                  </v-col>
                    <v-col cols="2">
                    <v-layout justify-end>
                      <v-checkbox
                        label="Public Video"
                      />
                    </v-layout>
                  </v-col>
            </v-row>
              <v-layout align-end justify-end>
                <v-btn color="primary" @click="updateVideo">Save</v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script lang="ts">

  import Vue from 'vue'
  import UpdateVideoDTO from '~/models/UpdateVideoDTO'

  export default Vue.extend({
  data () {
    return {
      videoEdit: {} as UpdateVideoDTO,
      categories: []
    }
  },
  mounted () {
    const token = window.localStorage.getItem('Authorization')
    const header = {
      headers: { Authorization: token }
    }
    this.$axios.defaults.headers.common['Authorization'] = token
    this.$axios.$get('http://localhost:8080/videos/'+this.$route.query.id)
      .then( resp => {

        if(resp.status === 'SUCCESS')
          this.videoEdit = {
            id: resp.data.id,
            titulo: resp.data.titulo,
            url: resp.data.url,
            descricao: resp.data.descricao,
            categoriaId: resp.data.categoriaId
          } as UpdateVideoDTO
      }).catch( error => {
        console.log('Get Video Error: ' + error.message)
      }
    )
    this.$axios.$get('http://localhost:8080/categorias')
      .then( resp => {
        if(resp.status === 'SUCCESS')
          this.categories = resp.list
        console.log(this.categories)
      })
      .catch( error => {
        console.log('Get Categories Error!')
      })
  },
  methods: {
    updateVideo() {
      const token = window.localStorage.getItem('Authorization')
      this.$axios.defaults.headers.common['Authorization'] = token
      this.$axios.$put('http://localhost:8080/videos', this.videoEdit)
        .then( resp => {
          console.log('Video Updated')
        }).catch( error => {
          console.log('Video Update Error: ' + error.message)
        }
      )
    }
  },
})
</script>
