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
    <v-card-actions v-if="footerButtons.length > 0" class="justify-end">
      <v-icon
        v-for="item in footerButtons"
        :key="item.icon"
        :color="item.color"
        @click="item.action"
        class="ml-4"
      >
        {{item.icon}}
      </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import ListVideosItemDTO from '~/models/ListVideosItemDTO'
// import { mapActions, mapGetters } from 'vuex'
// import { Ajuda, Breadcum } from '~/components/Pagina.vue'

class FooterIcon {
  icon: string = 'mdi-pencil'
  color: string = 'blue'
  action = () => {console.log('Click!')}
}

export default Vue.extend({
  props: {
    videoList: {
      type: Array,
      required: true
    },
    footerButtons: {
      default: [] as Array<FooterIcon>
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
