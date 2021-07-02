<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://cdn0.iconfinder.com/data/icons/avatars-105/377/Flat_Blue-27-02-512.png"
      height="350px"
      width="400px"
    ></v-img>

    <v-card-title>
      Registro de Clientes
    </v-card-title>

    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="firstname"
      :counter="30"
      :rules="firstnameRules"
      label="Firstname"
      required
    ></v-text-field>

    <v-text-field
      v-model="lastname"
      :counter="30"
      :rules="lastnameRules"
      label="Lastname"
      required
    ></v-text-field>

    <v-text-field
      v-model="dni"
      :counter="8"
      :rules="dniRules"
      label="Dni"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :counter="50"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="cellphone"
      :counter="9"
      :rules="cellphonedRules"
      label="Cellphone"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click=router-link to= HomeLogueado 
    >
      Registrarse
    </v-btn>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click=router-link to = registers
    >
      Regresar
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
      firstname: '',
      firstnameRules: [
        v => !!v || 'Firstname is required',
        v => (v && v.length <= 30) || 'Firstname must be less than 20 characters',
      ],
      lastname: '',
      lastnameRules: [
        v => !!v || 'Lastname is required',
        v => (v && v.length <= 30) || 'Lastname must be less than 20 characters',
      ],
      dni: '',
      dniRules: [
        v => !!v || 'Dni is required',
        v => (v && v.length <= 8) || 'Dni must be less than 8 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => (v && v.length <= 50) || 'Email must be less than 50 characters',
      ],
      cellphone: '',
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },
  }
</script>