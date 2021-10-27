<template>
  <v-container>
      <v-layout align-center justify-center>
        <v-flex xs 12 sm8 md6>
          <v-card class="elevation-8">
            <v-card-title class="ml-8">Login Form</v-card-title>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  prepend-inner-icon="mdi-mail"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  outlined
                />
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  v-model="password"
                  :rules="passwordRules"
                  type="password"
                  label="Password"
                  required
                  outlined
                />

                <v-layout align-end justify-end>
                  <v-btn color="primary" @click="login" :loading="loginRequest">Login</v-btn>
                </v-layout>
              </v-form>
              <b
                v-show="loginError"
                style="color: red"
              >Login Error - Check Email And Password</b>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script lang="ts">

  import Vue from 'vue'
  import { mapActions, mapGetters } from 'vuex'
  import AuthenticateFormDTO from '~/models/AuthenticateFormDTO'

  export default Vue.extend({
  data () {
    return {
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be greater than 5 characters',
      ],
      email: '',
      loginError: false,
      loginRequest: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
    mounted() {
      this.loginError = false
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      ...mapActions('user', ['loginUser']),
      login () {
        this.loginError = false
        this.loginRequest = true
        this.loginUser({
          email: this.email,
          password: this.password
        } as AuthenticateFormDTO).then(resp => {
          this.$router.push('/user')
        }).catch(error => {
          console.log(error)
          this.loginError = true
        }).finally(() => this.loginRequest = false)
      }
    },
  })
</script>
