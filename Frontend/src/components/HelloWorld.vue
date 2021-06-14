<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="300"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Bienvenidos a D-Home Technical
        </h1>
        <p class="subheading font-weight-regular">
          Selecciona una opción para registrarse 
          
        </p>
        <v-btn
      class="ma-2"
      :loading="loading1"
      :disabled="loading1"
      color="success"
      @click="loader = 'loading1'"
    >
      Cliente
      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>

    <v-btn
      class="ma-2"
      :loading="loading2"
      :disabled="loading2"
      color="success"
      @click="loader = 'loading2'"
    >
      Trabajador
      <template v-slot:loader>
        <span>Loading...</span>
      </template>
    </v-btn>

        
      </v-col>


    
    </v-row>
  </v-container>
</template>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  </style>


<script>
  export default {
    name: 'HelloWorld',
       data () {
      return {
        loader: null,
        loading1: false,
        loading2: false,
     
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },

  }
</script>
