<template>
  <v-container fluid>
    <v-data-iterator
      :items="employees"
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

          <v-toolbar-title>Lista de trabajadores</v-toolbar-title>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Trabajador</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="firstname" label="Nombre del trabajador"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="lastname" label="Apellido del trabajador"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="dni" label="DNI del trabajador"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="districtid" label="id del distrito"></v-text-field>
                                    </v-col>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="specialtyid" label="id de la especialidad"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="email" label="Email del trabajador"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="cellphone" label="Teléfono del trabajador"></v-text-field>
                                    </v-col>
                                     <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="description" label="Ingrese una descripción"></v-text-field>
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
                <h4>DNI: {{ item.dni }}</h4>
              </td>
              <v-divider></v-divider>
              <td class="justify-center layout px-0">
                <h4>id de Especialidad: {{ item.specialtyId }}</h4>
              </td>
              <v-divider></v-divider>
              <td class="justify-center layout px-0">
                <h4>id de Distrito: {{ item.districtId }}</h4>
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
            employeeid: '',
            firstname: '',
            lastname: '',
            dni: '',
            districtid: '',
            specialtyid: '',
            email: '',
            cellphone: '',
            description: '',
            dialog: false,
            editedIndex: -1,
            employees: [],
            districts: [],
            headers: [
                { text: 'FirstName', value: 'firstname', sortable: true },
                { text: 'LastName', value: 'lastname', sortable: true },
            ],
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Agregar Trabajador': 'Editar Trabajador';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listEmployees();
        },

        methods: {
            listEmployees() {
                let me= this;
                axios.get('api/Employee')
                .then(function(response){
                    me.employees = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.employeeid = item.employeeId;
                this.firstname = item.firstname;
                this.lastname = item.lastname;
                this.dni = item.dni;
                this.districtid = item.districtId;
                this.specialtyid = item.specialtyId;
                this.email = item.email;
                this.cellphone = item.cellphone;
                this.description = item.description;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar este trabajador?'))
                    axios.delete('api/Employee/' + item.employeeId, {
                        'employeeid': item.employeeId
                    }).then(function(response){
                        console.log(item.employeeId);
                        me.listEmployees();
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
                this.employeeid = "";
                this.firstname = "";
                this.lastname = "";
                this.dni = "";
                this.districtid = "";
                 this.specialtyid = "";
                this.email = "";
                this.cellphone = "";
                this.description = "";
                this.editedIndex=-1;
            },
            save() {
                let me=this;
                if(this.editedIndex > -1) {
                    axios.put('api/Employee/PutEmployee',{
                        'employeeid': me.employeeid,
                        'firstname': me.firstname,
                        'lastname': me.lastname,
                        'dni': me.dni,
                        'districtid': me.districtid,
                        'specialtyid': me.specialtyid,
                        'email': me.email,
                        'cellphone': me.cellphone,
                        'description': me.description
                    }).then(function(response){
                        me.close();
                        me.listEmployees();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                else {
                    axios.post('api/Employee', {
                        'firstname': me.firstname,
                        'lastname': me.lastname,
                        'dni': me.dni,
                        'districtid': me.districtid,
                        'specialtyid': me.specialtyid,
                        'email': me.email,
                        'cellphone': me.cellphone,
                        'description': me.description
                    }).then(function(response){
                        me.close();
                        me.listEmployees();
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

