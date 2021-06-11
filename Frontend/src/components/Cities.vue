<template>
    <v-data-table 
    class="elevation-1"
    :headers="headers"
    :search="search"
    sort-by="cityname"
    :items="cities">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>CRUD Cities</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search City" append-icon="search" 
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New City</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="cityname" label="Nombre de la ciudad"></v-text-field>
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
                <td>{{ item.cityName }}</td>
                
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>
                </td>
            </tr>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="listCities">Reset</v-btn>
        </template>
    </v-data-table>
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
                return this.editedIndex === -1 ? 'New City': 'Edit City';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listCities();
        },
        methods: {
            listCities() {
                let me= this;
                axios.get('api/City').then(function(response){
                    me.cities = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.cityid = item.CityId;
                this.cityname = item.cityName;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar este User?'))
                    axios.delete('api/City/' + item.CityId, {
                        'cityid': item.CityId
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
            },
            clean() {
                this.cityid = "";
                this.cityname = "";
              
            },
            save() {
                let me=this;
                if(this.editedIndex >- 1) {
                    axios.put('api/City/',{
                        'cityid': me.cityid,
                        'cityname': me.cityname
                    }).then(function(response){
                        me.close();
                        me.listCities();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
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
            }
        }
    }
</script>