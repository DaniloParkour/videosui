<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <b>Videos Management</b>
      </v-col>
    </v-row>
    <v-row class="d-flex" align="center" justify="left">
      <v-col v-for="item in videoList" :key="item.title" cols="3">
        <VideoCard :videoList="item" :footerButtons="icons"/>
      </v-col>
      <v-col cols="3">
        <!-- ---------------------------------------------------------------- -->
        <v-dialog
          v-model="addDialog"
          persistent
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <!-- ---------------------------------------------------------------- -->
            <div 
                style="border: 2px dashed rgba(255, 255, 255, 0.4); background-color: rgba(255, 255, 255, 0.05);"
                class="pa-4"
            >
              <v-btn
                color="#373C51"
                dark
                block
                v-bind="attrs"
                v-on="on"
              >
                <v-icon class="mr-2">mdi-video</v-icon>
                Add Video
              </v-btn>
            </div>
            <!-- ---------------------------------------------------------------- -->
          </template>
          <v-card light>
            <v-card-text>
              <v-container>
                <v-row class="mt-2">
                  <v-col cols="12">
                    <v-text-field
                      label="Video Title*"
                      required
                      v-model="saveVideo.titulo"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Video URL*"
                      required
                      v-model="saveVideo.url"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      outlined
                      label="Description"
                      v-model="saveVideo.descricao"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="addDialog = false"
              >
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="sendSaveVideo"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- ---------------------------------------------------------------- -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ListVideosItemDTO from '~/models/ListVideosItemDTO'
  import SaveVideoDTO from '~/models/SaveVideoDTO'

  export default Vue.extend({
    data () {
      return {
        videoList: [] as Array<ListVideosItemDTO>,
        addDialog: false,
        saveVideo: {} as SaveVideoDTO,
        icons: [
          {
            icon: 'mdi-pencil',
            color: 'blue',
            action: () => {console.log('Click to Edit!')}
          },
          {
            icon: 'mdi-delete',
            color: 'red',
            action: () => {console.log('Click to Delete!')}
          }
        ]
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
    },
    methods: {
      sendSaveVideo() {
        const header = {
            headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2aWRlb2FwaSIsInN1YiI6IjEiLCJpYXQiOjE2MzUzNTc5MTYsImV4cCI6MTYzNTM2NTExNn0.lkzHi95P-fViYPMBGuVRTOek6dOEZcJLiIp-sSlChLc'}` }
        }
        this.$axios.$post(
                      'http://localhost:8080/videos',
                      this.saveVideo,
                      header
                    ).then(resp => {
          this.addDialog = false
        }).catch(error => {
          console.log('Save Video Error!')
        })
      }
    }
  })
</script>
