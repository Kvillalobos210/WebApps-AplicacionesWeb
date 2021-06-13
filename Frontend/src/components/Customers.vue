<template>
  <v-container fluid>
    <v-data-iterator
      :items="customers"
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
                                        <v-text-field v-model="firstname" label="Nombre del cliente"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="lastname" label="Apellido del cliente"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="dni" label="DNI del cliente"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="districtid" label="Código del distrito"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="email" label="Email del cliente"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="cellphone" label="Teléfono del cliente"></v-text-field>
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
                <h4>{{ item.firstname + " " + item.lastname }}</h4>
                <td class="justify-center layout px-0">
                    <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                </td>
                </v-card-title>
                <v-divider></v-divider>
              <td>
                <h4>DNI: {{ item.dni }}</h4>
              </td>
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
            search: '',
            customerid: '',
            firstname: '',
            lastname: '',
            dni: '',
            districtid: '',
            email: '',
            cellphone: '',
            dialog: false,
            editedIndex: -1,
            customers: [],
            districts: [],
            headers: [
                { text: 'FirstName', value: 'firstname', sortable: true },
                { text: 'LastName', value: 'lastname', sortable: true },
            ],
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
                axios.get('api/Customers')
                .then(function(response){
                    me.customers = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.customerid = item.customerId;
                this.firstname = item.firstname;
                this.lastname = item.lastname;
                this.dni = item.dni;
                this.districtid = item.districtId;
                this.email = item.email;
                this.cellphone = item.cellphone;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar esta ciudad?'))
                    axios.delete('api/Customers/' + item.customerId, {
                        'customerid': item.customerId
                    }).then(function(response){
                        console.log(item.customerId);
                        me.listCustomers();
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
                this.customerid = "";
                this.firstname = "";
                this.lastname = "";
                this.dni = "";
                this.districtid = "";
                this.email = "";
                this.cellphone = "";
                this.editedIndex=-1;
            },
            save() {
                let me=this;
                if(this.editedIndex > -1) {
                    axios.put('api/Customers/PutCustomer',{
                        'customerid': me.customerid,
                        'firstname': me.firstname,
                        'lastname': me.lastname,
                        'dni': me.dni,
                        'districtid': me.districtid,
                        'email': me.email,
                        'cellphone': me.cellphone
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
                        'districtid': me.districtid,
                        'email': me.email,
                        'cellphone': me.cellphone
                    }).then(function(response){
                        me.close();
                        me.listCustomers();
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

