<template>
  <v-container fluid>
    <v-data-iterator
      :items="customers"
      item-key="name"
      :items-per-page="4"
      hide-default-footer
    >
        <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="indigo darken-5"
          dark
          flat
        >

          <v-toolbar-title>Lista de clientes</v-toolbar-title>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Cliente</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="firstName" label="Nombre del cliente"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="lastName" label="Apellido del cliente"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="dnI" label="DNI del cliente"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="districtId" label="Código del distrito"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="emaiL" label="Email del distrito"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="cellphonE" label="Teléfono del distrito"></v-text-field>
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
                <h4>{{ item.firstname + " " + item.lastname}}</h4>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                </td>
                </v-card-title>
                <v-divider></v-divider>
              <td>
                <h4>DNI: {{ item.dni }}</h4>
              </td>
              <v-spacer></v-spacer>
              <br>
              <td>
                <h4>código del distrito: {{ item.districtId }}</h4>
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
            dialog: false,
            search: '',
            customerid: '',
            firstname: '',
            lastname: '',
            dni: '',
            email: '',
            cellphone: '',
            districtid: '',
            editedIndex: -1,
            customers: [],
            headers: [
                { text: 'FirstName', value: 'firstname', sortable: true },
                { text: 'LastName', value: 'lastname', sortable: true },
                
            ]
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Agregar Cliente': 'Editar Cliente';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listCustomers();
        },
        methods: {
            listCustomers() {
                let me= this;
                axios.get('api/Customers').then(function(response){
                    me.customers = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.customerid = item.customerId;
                this.firstname = item.firstName;
                this.lastname = item.lastName;
                this.dni = item.dnI;
                //this.email = item.emaiL;
                //this.cellphone = cellphonE;
                this.districtid = item.districtId;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar esta ciudad?'))
                    axios.delete('api/Customers/' + item.customerId, {
                        'customerid': item.customerId
                    }).then(function(response){
                        console.log(item.CustomerId);
                        me.listCustomers();
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
                this.customerid = "";
                this.firstname = "";
                this.lastname = "";
                this.dni = "";
                this.email = "";
                this.districtid = "";
            },
            save() {
                let me=this;
                if(this.editedIndex >- 1) {
                    axios.put('api/Customers/PutCustomer',{
                        'customerid': me.customerid,
                        'firstname': me.firstname,
                        'lastname': me.lastname,
                        'dni': me.dni,
                        'districtid': me.districtid
                    }).then(function(response){
                        me.close();
                        me.listCustomers();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                else {
                    axios.post('api/Customers', {
                        'firstname': me.firstname,
                        'lastname': me.lastname,
                        'dni': me.dni,
                        'email': me.email,
                        'districtid': me.districtid
                    }).then(function(response){
                        me.close();
                        me.listCustomers();
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

