<template>
  <v-container fluid>
    <v-data-iterator
      :items="districts"
      item-key="name"
      :items-per-page="100"
      hide-default-footer
    >
        <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="indigo darken-5"
          text @click="cities"
          dark
          flat
        >
        <v-toolbar-title>Lista de distritos disponibles del Perú</v-toolbar-title>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Distrito</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="districtname" label="Nombre del distrito"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="cityid" label="id del Departamento"></v-text-field>
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
        <template v-slot:default="{ items }">
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
                <h4>{{ item.districtName }}</h4>
                <v-btn
              color="accent"
              fab
              small
              dark
              class="mx-16"
            >
              <td>
                    <v-icon @click="editItem(item)">edit</v-icon>
              </td></v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <td class="justify-center layout px-0">
                <h4>ID: {{ item.districtId }}</h4>
              </td>
              <v-divider></v-divider>
              <td class="justify-center layout px-0">
                <h4>ID de Departamento: {{ item.cityId }}</h4>
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
            districtid: '',
            districtname:'',
            cityid: '',
            cityname: '',
            dialog: false,
            editedIndex: -1,
            districts: [],
            cities: [],
            items: [
                { text: 'CityName', value: 'cityname', sortable: true }
            ]
            
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Agregar Distrito': 'Editar Distrito';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listDistricts();
        },

        methods: {
            listDistricts() {
                let me= this;
                axios.get('api/District').then(function(response){
                    me.districts = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.districtid = item.districtId;
                this.districtname = item.districtName;
                this.cityid = item.cityId;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar este distrito?'))
                    axios.delete('api/District/' + item.districtId, {
                        'districtid': item.districtId
                    }).then(function(response){
                        console.log(item.DistrictId);
                        me.listDistricts();
                        me.close();
                        me.clean();
                    }).catch(function(error){
                        console.log(error);
                    })
            },
            close() {
                this.dialog = false;
                this.clean();
            },
            clean() {
                this.districtid = "";
                this.districtname = "";
                this.cityid = "";
                this.editedIndex=-1;
            },
            save() {
                let me=this;
                if(this.editedIndex >- 1) {
                    axios.put('api/District/PutDistrict',{
                        'districtid': me.districtid,
                        'districtname': me.districtname,
                        'cityid': me.cityid

                    }).then(function(response){
                        me.close();
                        me.listDistricts();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                else {
                    axios.post('api/District', {
                        'districtname': me.districtname,
                        'cityid': me.cityid
                    }).then(function(response){
                        me.close();
                        me.listDistricts();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                this.close();
            }
        }
    }
</script>