<template>
  <v-container fluid>
    <v-data-iterator
      :items="appointments"
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

          <v-toolbar-title>Lista de Citas</v-toolbar-title>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="800px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">Nueva Cita</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="description" label="Ingrese una descripción de su cita"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="appointmentdate" label="Ingrese día de la cita"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="address" label="Ingrese su dirección"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="valorization" label="Añada una valorización"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="status" label="Status"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="customerid" label="Id del cliente"></v-text-field>
                                    </v-col>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="employeeid" label="Id del trabajador"></v-text-field>
                                    </v-col>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="paymentmethodid" label="Id del método de pago"></v-text-field>
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
                <h4>Cita {{ item.appointmentId }}</h4>
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
                <h4>ID de Cliente: {{ item.customerId }}</h4>
              </td>
              <v-divider></v-divider>
              <td class="justify-center layout px-0">
                <h4>ID de Trabajador: {{ item.employeeId }}</h4>
              </td>
              <v-divider></v-divider>
              <td class="justify-center layout px-0">
                <h4>Descripción: {{ item.description }}</h4>
              </td>
              <v-divider></v-divider>
              <td class="justify-center layout px-0">
                <h4>Método de pago: {{ item.paymentMethodId }}</h4>
              </td>
              <v-divider></v-divider>
              <td class="justify-center layout px-0">
                <h4>Status: {{ item.status }}</h4>
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
            appointmentid: '',
            description: '',
            appointmentdate: '',
            address: '',
            valorization: '',
            status: '',
            customerid: '',
            employeeid: '',
            paymentmethodid: '',
            dialog: false,
            editedIndex: -1,
            appointments: [],
            districts: [],
            paymentmethodid: [],
            headers: [
                { text: 'Appointment', value: 'appointmentid', sortable: true },
                
            ],
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Agregar cita': 'Editar cita';
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            }
        },
        created() {
            this.listAppointments();
        },

        methods: {
            listAppointments() {
                let me= this;
                axios.get('api/Appointment')
                .then(function(response){
                    me.appointments = response.data;
                }).catch(function(error){
                    console.log(error);
                })
            },
            editItem(item) {
                this.appointmentid = item.appointmentId;
                this.description = item.description;
                this.appointmentdate = item.appointmentDate;
                this.address= item.address;
                this.valorization = item.valorization;
                this.status = item.status;
                this.customerid = item.customerId;
                this.employeeid = item.employeeId;
                this.paymentmethodid = item.paymentMethodId;
                this.editedIndex = 1;
                this.dialog = true;
            },
            deleteItem(item) {
                let me = this;
                if(confirm('¿Estás seguro que quieres eliminar esta cita?'))
                    axios.delete('api/Appointment/' + item.appointmentId, {
                        'appointmentid': item.appointmentId
                    }).then(function(response){
                        console.log(item.appointmentId);
                        me.listAppointments();
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
                this.appointmentid = "";
                this.description = "";
                this.appointmentdate = "";
                this.address = "";
                this.valorization = "";
                this.status= "";
                this.customerid= "";
                this.employeeid= "";
                this.paymentmethodid= "";
                this.editedIndex=-1;
            },
            save() {
                let me=this;
                if(this.editedIndex > -1) {
                    axios.put('api/Appointment/PutAppointment',{
                        'appointmentid': me.appointmentid,
                        'description': me.description,
                        'appointmentdate': me.appointmentdate,
                        'address': me.address,
                        'valorization': me.valorization,
                        'status': me.status,
                        'customerid': me.customerid,
                        'employeeid': me.employeeid,
                        'paymentmethodid': me.paymentmethodid

                    }).then(function(response){
                        me.close();
                        me.listAppointments();
                        me.clean();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                else {
                    axios.post('api/Appointment', {
                        'description': me.description,
                        'appointmentdate': me.appointmentdate,
                        'address': me.address,
                        'valorization': me.valorization,
                        'status': me.status,
                        'customerid': me.customerid,
                        'employeeid': me.employeeid,
                        'paymentmethodid': me.paymentmethodid

                    }).then(function(response){
                        me.close();
                        me.listAppointments();
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