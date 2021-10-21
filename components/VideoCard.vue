<template>
  <v-card>
    <v-card-title class="te">
      {{videoList.titulo}}
    </v-card-title>
    <v-card-text>
      <v-card>
        <a :href="videoList.url">
          Video Panel
        </a>
      </v-card>
      <p>{{videoList.descricao}}</p>
      <p>
        Categoria {{videoList.categoriaId}}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-icon
        color="primary"
        to="/login"
      >
        mdi-pencil
      </v-icon>
      <div class="mx-2" />
      <v-icon
        color="error"
        to="/login"
      >
        mdi-delete
      </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import ListVideosItemDTO from '~/models/ListVideosItemDTO'
// import { mapActions, mapGetters } from 'vuex'
// import { Ajuda, Breadcum } from '~/components/Pagina.vue'

export default Vue.extend({
  data () {
    return {
      // videoList: ListVideosItemDTO
      videoList: {
        descricao: 'Video Description Example. Video Description Example. Video Description Example.',
        titulo: 'Video Title',
        url: 'https://youtube.com',
        categoriaId: null
      }
    }
  },
  computed: {
    // ...mapGetters('veiculos', ['veiculo']),
  },
  methods: {
    // ...mapActions('notify', ['errorNotify']),
  }
})
</script>
