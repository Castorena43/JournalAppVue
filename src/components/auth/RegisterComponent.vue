<template>
  <div class="auth__main">
    <div class="auth__box-container">
      <h3 className='auth__title'>Register</h3>
      <form class='animate__animated animate__fadeIn animate__fast' @submit.prevent="register">

        <div v-if="getError" class='auth__alert-error'>{{getError}}</div>

        <input 
          type="text"
          placeholder='Name'
          name='name'
          class='auth__input'
          v-model="form.name"
        />

        <input 
          type="text"
          placeholder='Email'
          name='email'
          class='auth__input'
          v-model="form.email"
        />

        <input 
          type="password"
          placeholder='Password'
          name='password'
          class='auth__input'
          v-model="form.password"
        />

        <input 
          type="password"
          placeholder='Confirm password'
          name='password2'
          class='auth__input'
          v-model="form.password2"
        />

        <button
          type='submit'
          class='btn btn-primary btn-block mb-5'
        >
          Register
        </button>

        <router-link to='/login' class='link'>
          Already registered
        </router-link>

      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import validator from 'validator';
import { mapActions, mapGetters, mapMutations } from "vuex";

export default defineComponent({
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        password2: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getError'])
  },
  methods: {
    ...mapActions(['startRegister']),
    ...mapMutations(['setError', 'removeError']),
    
    async register () {
      if (this.isValid()) {
        await this.startRegister(this.form)
      }
      
    },
    isValid () {
      if (!validator.isEmail(this.form.email)) {
        this.setError('Email is invalid')
        return false
      } else if (validator.isEmpty(this.form.name)) {
        this.setError('Name is required')
        return false
      } else if (validator.isEmpty(this.form.password) 
        || validator.isEmpty(this.form.password2) 
        || this.form.password !== this.form.password2
      ) {
        this.setError('Password is invalid')
        return false
      }
      this.removeError()
      return true
    }
  }
})

</script>
