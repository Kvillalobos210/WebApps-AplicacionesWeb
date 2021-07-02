<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        src="https://img.freepik.com/foto-gratis/carpintero-lijando-bloque-madera-manualmente_126745-1243.jpg?size=626&ext=jpg"
      ></v-img>

      <v-card-title>Contrata un Servicio</v-card-title>

      <v-card-text>
        <div>Separa tu cita de forma rapida, segura y facil. Además, puedes revisar a los trabajadores disponibles y los servicios ofrecidos</div>
      </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click=router-link to = appointments
      >
        Contratar
      </v-btn>

      <v-btn
        color="deep-purple lighten-2"
        text
        @click=router-link to = customers
      >
        Trabajadores
      </v-btn>

      <v-btn
        color="deep-purple lighten-2"
        text
        @click=router-link to = specialties
      >
        Servicios
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>