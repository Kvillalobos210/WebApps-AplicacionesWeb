<template>
    <v-data-table 
    class="elevation-1"
    :headers="headers"
    :search="search"
    sort-by="specialtyname"
    :items="specialties">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Listado de especialidades</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search Specialty" append-icon="search" 
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Specialty</v-btn>
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
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item="{ item }">
            <tr>
                <td>{{ item.specialtyName }}</td>
                
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>
                </td>
            </tr>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="listSpecialties">Reset</v-btn>
        </template>
    </v-data-table>
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
                return this.editedIndex === -1 ? 'New Specialty': 'Edit Specialty';
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
            },
            clean() {
                this.specialtyid = "";
                this.specialtyname = "";
              
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