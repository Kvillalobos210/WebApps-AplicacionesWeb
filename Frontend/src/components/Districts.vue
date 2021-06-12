<template>
    <v-data-table 
    class="elevation-1"
    :headers="headers"
    :search="search"
    sort-by="districtname"
    :items="districts">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Listado de distritos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search District" append-icon="search" 
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New District</v-btn>
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
                                        <v-text-field v-model="cityid" label="Id de la ciudad"></v-text-field>
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
                <td>{{ item.districtName }}</td>
                <td>{{ item.cityId }}</td>
                
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>
                </td>
            </tr>
        </template>

        <template v-slot:no-data>
            <v-btn color="primary" @click="listDistricts">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>

    import axios from 'axios'
    
    export default {
        data:() => ({
            search: '',
            districtid: '',
            districtname:'',
            cityid: '',
            dialog: false,
            editedIndex: -1,
            districts: [],
            headers: [
                { text: 'DistrictName', value: 'districtname', sortable: true },
                { text: 'CityId', value: 'cityid', sortable: true }
                
            ]
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New District': 'Edit District';
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
            },
            clean() {
                this.districtid = "";
                this.districtname = "";
                this.cityid = "";
              
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