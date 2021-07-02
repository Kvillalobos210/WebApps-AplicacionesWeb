<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://static.vecteezy.com/system/resources/previews/002/191/383/non_2x/chiang-mai-thailand-mar-21-2021-person-logging-into-linkedin-free-photo.jpg"
      height="200px"
      width="400px"
    ></v-img>

    <v-card-title>
      Inicia sesión 
    </v-card-title>

    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="username"
      :counter="10"
      :rules="usernameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>


    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click=router-link to = homeLogueado
    >
      Customer
    </v-btn>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click=router-link to= HomeEmployee
    >
      Employee
    </v-btn>
  </v-form>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 20) || 'Username must be less than 20 characters',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 20) || 'Password must be valid',
      ],
      select: null,
   
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },
  }
</script>