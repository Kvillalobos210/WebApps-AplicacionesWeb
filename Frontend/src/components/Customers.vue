<template>
    <v-data-table 
        :headers="headers"
        :items="customers"
        :search="search"
        sort-by="customers"
        class="elevation-1" style="width:800px"><!-- Se agrego el style -->
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>CRUD Customers</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search Customer" append-icon="search"
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator=" { on } ">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Customer</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="Firstname" label="Firstname"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="Lastname" label="Lastname"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="Dni" label="Dni"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="DistrictId" label="DistrictId"></v-text-field>
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

                <v-dialog v-model="adModel" max-width="300">
                    <v-card>
                        <v-card-title class="headline" v-if="adAction==1">¿Activar item?</v-card-title>
                        <v-card-title class="headline" v-if="adAction==2">¿Desactivar item?</v-card-title>
                        <v-card-text>
                            Estás a punto de 
                            <span v-if="adAction==1">Activar</span>
                            <span v-if="adAction==2">Desactivar</span>
                            el item {{ adName }}
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat="flat" @click="activeDeactiveClose">
                                Cancel
                            </v-btn>
                            <v-btn v-if="adAction==1" color="orange darken-4" flat="flat" @click="activeDeactive(true)">
                                Active
                            </v-btn>
                            <v-btn v-if="adAction==2" color="orange darken-4" flat="flat" @click="activeDeactive(false)">
                                Deactive
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        
        <template v-slot:item=" { item } ">
            <tr>
                <td>{{ item.Firstname }}</td>
                <td>{{ item.Lastname }}</td>
                <td>{{ item.Dni }}</td>
                <td>{{ item.DistrictId }}</td>
                <td>
                    <div v-if="item.condition">
                        <span class="blue--text">Activo</span>
                    </div>
                    <div v-else>
                        <span class="red--text">Inactivo</span>
                    </div>
                </td>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                    <!--<v-icon small class="mr-2" @click="deleteItem(item)">delete</v-icon>-->
                    <template v-if="item.condition">
                        <v-icon small @click="activeDeactiveShow(2, item)">block</v-icon>
                    </template>
                    <template v-else>
                        <v-icon small @click="activeDeactiveShow(1, item)">check</v-icon>
                    </template>
                </td>
            </tr>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="listCustomers">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>

import axios from 'axios'

export default {
    data: () => ({
        dialog: false,
        headers: [
            { text: 'Firstname', value: 'Firstname', sortable: true },
            { text: 'Lastname', value: 'Lastname', sortable: false },
            { text: 'Dni', value: 'Dni', sortable: false },
            { text: 'DistrictId', value: 'DistrictId', sortable: false },
            { text: 'Condition', value: 'condition', sortable: false },
            { text: 'Actions', value: 'action', sortable: false }
        ],
        search: '',
        id: '',
        Firstname: '',
        Lastname: '',
        Dni: '',
        DistrictId: '',
        customers: [],
        editedIndex: -1,
        valid: 0,
        validMessage: [],
        adModel: 0,
        adAction: 0,
        adName: '',
        adId: ''
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Customer' : 'Edit Customer';
        }
    },
    watch: {
        dialog (val){
            val || this.close()
        }
    },
    created() {
        this.listCustomers();
    },
    methods: {
        listCustomers() {
            let me = this;
            axios.get('api/Customers')
            .then(function(response){
                console.log(response)
                me.customers = response.data;
            }).catch(function(error){
                console.log(error);
            });
        },
        
        editItem(item) {
            this.id = item.CustomerId;
            this.Firstname = item.Firstname;
            this.Lastname = item.Lastname;
            this.Dni = item.Dni;
            this.DistrictId = item.DistrictId;
            this.editedIndex = 1;
            this.dialog = true;
        },

        deleteItem(item) {
            let me = this;
                
            if(confirm('¿Estas seguro que quiere eliminar este Category?'))
                axios.delete('api/Customers/' + item.CustomerId,{
                'id': item.CustomerId
            }).then(function(response){
                console.log(item.id);
                me.close();
                me.listCustomers();
                me.clean();
            }).catch(function(error){
                console.log(error);
            })
        },
        
        close() {
            this.dialog = false;
        },
    
        clean() {
            this.id = "";
            this.Firstname = "";
            this.Lastname = "";
            this.Dni = "";
            this.DistrictId = "";
            this.editedIndex = -1;
        },
    
        save() {
            if(this.isValidName()) {
                return;
            }

            let me = this;
            
            if(this.editedIndex > -1) { //Editar Category
                axios.put('api/Customers/PutCustomer',{
                    'CustomerId': me.id,
                    'Firstname': me.Firstname,
                    'Lastname': me.Lastname,
                    'Dni': me.Dni,
                    'DistrictId': me.DistrictId
                }).then(function(response){
                  me.close();
                  me.listCustomers();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
            }
            else{
                axios.post('api/Customer',{ // Nuevo Category
                    'Firstname': me.Firstname,
                    'Lastname': me.Lastname,
                    'Dni': me.Dni,
                    'District': me.DistrictId
                }).then(function(response){
                  me.close();
                  me.listCustomers();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
            }
        },
        isValidName() {
            this.valid = 0;
            this.validMessage = [];

            if (this.Firstname.length < 3 || this.Firstname.length > 50) {
                this.validMessage.push("El Name debe tener mas de 3 caracteres y menos de 50 caracteres");
            }

            if (this.validMessage.length) {
                this.valid = 1;
            }
            return this.valid;
        },
        activeDeactiveShow(action, item) {
            this.adModel = 1;
            this.adName = item.name;
            this.adId = item.categoryId;

            if(action == 1) {
                this.adAction = 1;
            }
            else if(action == 2) {
                this.adAction = 2;
            }
            else {
                this.adModel = 0;
            }
        },
        activeDeactiveClose() {
            this.adModel = 0;
        },
        activeDeactive(conditional) {
            let me = this;

            axios.put('api/Categories/UpdateCondition/' + this.adId + '/' + conditional, {})
            .then(function(response){
                me.adModel = 0;
                me.adAction = 0;
                me.adName = "";
                me.adId = "";
                me.listCategories();
            }).catch(function(error) {
                console.log(error);
            });
        },
        
    }
}
</script>

