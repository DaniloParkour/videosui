<template>
  <v-card>
    <v-card-title>
      {{videoList.title}}
    </v-card-title>
    <v-card-text>
      <v-card>
        <a :href="videoList.url" target="_blank">
          Link Video
        </a>
        <p>
          Categoria {{videoList.categoryId}}
        </p>
      </v-card>
    </v-card-text>
    <v-card-actions v-if="footerButtons.length > 0" class="justify-end">
       <v-tooltip top max-width="60%">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
          >mdi-eye</v-icon>
        </template>
        <span>{{videoList.description}}</span>
      </v-tooltip>
      <v-icon
        v-for="item in footerButtons"
        :key="item.icon"
        :color="item.color"
        @click="item.action(videoList.id)"
        class="ml-4"
      >
        {{item.icon}}
      </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

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
      showDescription: false
    }
  },
  methods: {
    mouseOver () {
      this.showDescription = !this.showDescription
    }
  }
})
</script>
