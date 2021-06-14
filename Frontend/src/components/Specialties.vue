<template>
  <v-container fluid>
    <v-data-iterator
      :items="specialties"
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

          <v-toolbar-title>Lista de especialidades disponibles de los trabajadores</v-toolbar-title>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Nueva Especialidad</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="specialtyname" label="Nombre de la especialidad"></v-text-field>
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
                <h4>{{ item.specialtyName }}</h4>
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
                <h4>id: {{ item.specialtyId }}</h4>
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
            specialtyid: '',
            specialtyname:'',
            dialog: false,
            editedIndex: -1,
            specialties: [],
            headers: [
                { text: 'SpecialtyName', value: 'specialtyname', sortable: true },
                
            ]
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Agregar Especialidad': 'Editar Especialidad';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listSpecialties();
        },
        methods: {
            listSpecialties() {
                let me= this;
                axios.get('api/Specialty').then(function(response){
                    me.specialties = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.specialtyid = item.specialtyId;
                this.specialtyname = item.specialtyName;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar esta especialidad?'))
                    axios.delete('api/Specialty/' + item.specialtyId, {
                        'specialtyid': item.specialtyId
                    }).then(function(response){
                        console.log(item.SpecialtyId);
                        me.listSpecialties();
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
                this.specialtyid = "";
                this.specialtyname = "";
                this.editedIndex=-1;
            },
            save() {
                let me=this;
                if(this.editedIndex >- 1) {
                    axios.put('api/Specialty/PutSpecialty',{
                        'specialtyid': me.specialtyid,
                        'specialtyname': me.specialtyname
                    }).then(function(response){
                        me.close();
                        me.listSpecialties();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                else {
                    axios.post('api/Specialty', {
                        'specialtyname': me.specialtyname
                    }).then(function(response){
                        me.close();
                        me.listSpecialties();
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