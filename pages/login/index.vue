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
                  <v-btn color="primary" @click="loginUser">Login</v-btn>
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

<script>
  export default {
    data: () => ({
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be greater than 5 characters',
      ],
      email: '',
      loginError: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),

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
      loginUser () {
        this.loginError = false
        this.$axios.$post('http://localhost:8080/auth', {
          email: this.email,
          senha: this.password
        })
          .then( resp => {
            window.localStorage.setItem('userToken', resp.string + ': ' + resp.token)
            this.$router.push('/user')
          }).catch( error => {
            this.loginError = true
            console.log('Login Error: ' + error.message)
          }
          )
        
      }
    },
  }
</script>