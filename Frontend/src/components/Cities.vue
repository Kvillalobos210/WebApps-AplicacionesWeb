<template>
  <v-container fluid>
    <v-data-iterator
      :items="cities"
      item-key="name"
      :items-per-page="100"
      hide-default-footer
    >
        <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="indigo darken-5"
          dark
          flat
        >

          <v-toolbar-title>Lista de departamentos disponibles del Perú</v-toolbar-title>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Departamento</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="cityname" label="Nombre del departamento"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>

                        </v-card-text>
                    </v-card>
        </v-dialog>
        <!--<v-btn color="primary" dark class="mb-2" v-on="on">New City</v-btn>-->
      </template>
      <template v-slot:default="{ items }" >
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title>
                <h4>{{ item.cityName }}</h4>
            <v-btn
              color="accent"
              fab
              small
              dark
              class="mx-16"
            >
              <td>
                    <v-icon @click="editItem(item)">edit</v-icon>
              </td>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
              <td class="justify-center layout px-0">
                <h4>id: {{ item.cityId }}</h4>
              </td>
              
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>

    import axios from 'axios'
    
    export default {
        data:() => ({
            search: '',
            cityid: '',
            cityname:'',
            dialog: false,
            editedIndex: -1,
            cities: [],
            headers: [
                { text: 'CityName', value: 'cityname', sortable: true },
                
            ]
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Agregar Departamento' : 'Editar Departamento';
            },
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        created() {
            this.listCities();
        },
        methods: {
            listCities() {
                let me = this;
                axios.get('api/City')
                .then(function(response){
                    me.cities = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.cityid = item.cityId;
                this.cityname = item.cityName;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar esta ciudad?'))
                    axios.delete('api/City/' + item.cityId, {
                        'cityid': item.cityId
                    }).then(function(response){
                        console.log(item.CityId);
                        me.listCities();
                        me.close();
                        me.clean();
                    }).catch(function(error){
                        console.log(error);
                    })
            },
            close() {
                this.dialog = false;
                this.editedIndex=-1;
                this.clean();
            },
            clean() {
                this.cityid="";
                this.cityname="";
                this.editedIndex=-1;
            },
            save() {
                let me = this;
                if(this.editedIndex > -1) {
                    axios.put('api/City/PutCity',{
                        'cityid': me.cityid,
                        'cityname': me.cityname
                    }).then(function(response){
                        me.close();
                        me.listCities();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                    //me.clean();
                }
                else {
                    axios.post('api/City', {
                        'cityname': me.cityname
                    }).then(function(response){
                        me.close();
                        me.listCities();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                this.close();
            },
        },
    }
</script>
