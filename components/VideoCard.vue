<template>
  <v-card>
    <v-card-title>
      {{videoList.title}}
    </v-card-title>
    <v-card-text>
      <v-card>
        <a :href="videoList.url">
          Video Panel
        </a>
      </v-card>
      <p>{{videoList.description}}</p>
      <p>
        Categoria {{videoList.categoryId}}
      </p>
    </v-card-text>
    <v-card-actions v-if="actionsButtons">
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
  props: {
    videoList: {
      type: Array,
      required: true
    },
    actionsButtons: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      // videoList: ListVideosItemDTO
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
