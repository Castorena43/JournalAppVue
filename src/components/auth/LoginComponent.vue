<template>
  <div class="auth__main">
    <div class="auth__box-container">
      <h3 class='auth__title'>Login</h3>
      <form class='animate__animated animate__fadeIn animate__fast' @submit.prevent="login">
        <div v-if="getError" class='auth__alert-error'>{{getError}}</div>
        <input 
          type="text"
          placeholder='Email'
          name='email'
          class='auth__input'
          autocomplete='off'
          v-model="form.email"
        />

        <input 
          type="password"
          placeholder='Password'
          name='password'
          class='auth__input'
          autocomplete='off'
          v-model="form.password"
        />

        <button
          type='submit'
          class='btn btn-primary btn-block'
        >
          LogIn
        </button>

        <hr />
        <!-- <div class='auth__social-networks'>
          <p>Login with social networks</p>
          <div class="google-btn" onClick={handleLoginGoogle}>
            <div class="google-icon-wrapper">
                <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p class="btn-text">
                <b>Sign in with google</b>
            </p>
          </div>
        </div> -->


        <router-link to='/register' class='link'>
          Create new account
        </router-link>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import validator from 'validator'

export default defineComponent({
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getError'])
  },
  methods: {
    ...mapActions(['startLogin']),
    ...mapMutations(['setError', 'removeError']),
    login () {
      if (this.isValid()) {
        this.startLogin({
          email: this.form.email,
          password: this.form.password
        })
      }
    },
    isValid () {
      if (!validator.isEmail(this.form.email)) {
        this.setError('Email is invalid')
        return false
      } else if (validator.isEmpty(this.form.password)) {
        this.setError('Password is invalid')
        return false
      }
      this.removeError()
      return true
    }
  }
})

</script>