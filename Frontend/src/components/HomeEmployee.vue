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
        src="https://cdn.shopify.com/s/files/1/1887/3939/articles/e889776724350072770501d91efc45cd.jpg?v=1541046456"
      ></v-img>

      <v-card-title>Revisa tus citas</v-card-title>

      <v-card-text>
        <div>Revisa tus citas rapidamente. Además puedes chequear a los clientes registrados.</div>
      </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click=router-link to = appointments
      >
        Citas
      </v-btn>

      <v-btn
        color="deep-purple lighten-2"
        text
        @click=router-link to = customers
      >
        Clientes
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