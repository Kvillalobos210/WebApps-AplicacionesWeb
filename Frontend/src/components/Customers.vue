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
//Usaremos el axios para que llame a los métodos del API
    import axios from 'axios'

    export default {
        data: () => ({
            //Aquí ponemos las variables que están en los v-model
            search:'',
            id:'', //Para eliminar y actualizar, necesitamos el id
            Firstname:'',
            Lastname:'',
            Dni:'',
            dialog: false, //Le pondremos que será falso por defecto
            editedIndex: -1,//Identificar si lo que tengo es una nueva categoría, o una para editar
            customers: [], //Para la lista de Categories
            headers: [ //para poner los nombres que estarán en la cabecera
                {text: 'Firstname', value: 'Firstname', sortable: true},
                {text: 'Lastname', value: 'Lastname', sortable: false},
                {text: 'Dni', value: 'Dni', sortable: false},
                {text: 'Condition', value: 'condition', sortable: false},
                {text: 'Actions', value:'action', sortable: false}
            ],
            valid: 0, //Nos sirve de bandera
            validMessage: [], //Verá si hay parámetros
            adModel: 0,
            adAction: 0,
            adName: '',
            adId: ''
        }),
        computed: { //Para editar el título del dialog, es propio del vuetify
            formTitle(){
                return this.editedIndex === -1 ? 'New Customer': 'Edit Customer'
            },
        },
        watch: {
            dialog (val){
                val || this.close()
            },
        },

        created(){
            this.list();
        },
        methods: {
                list(){ //Para listar cuando se guarde uno nuevo
                    let me = this;
                    axios.get('api/Customers') //Primero llama a los datos
                    .then(function(response){ //Hace una función responsive
                        me.customers = response.data;
                    }).catch(function(error){ //Por si hay un error
                        console.log(error);
                    });
                },
                editItem(item){
                    this.id = item.CustomerId; //Sebe estar con el mismo nombre (id) que en el Backend
                    this.Firstname = item.Firstname;
                    this.Lastname = item.Lastname;
                    this.editedIndex = 1;
                    this.dialog = true; //se habilita el cuadro de dialogo
                },
                deleteItem (item) {
                    let me = this;
                    if (confirm('¿Estás seguro que quiere eliminar este Customer?'))
                    axios.delete('api/Customers/'+item.CustomerId,{
                                'id': item.CustomerId
                    }).then(function(response){
                        console.log(item.id);
                        me.close();
                        me.list();
                        me.clean();
                    }).catch(function(error){
                        console.log(error);
                    });
                },
                //Aquí ponemos las variables que están en @click
                close(){
                    this.dialog = false
                },
                //Para limpiar lo que llenamos al ingresar datos nuevos
                clean(){
                    this.id="";
                    this.Firstname="";
                    this.Lastname="";
                    this.Dni="";
                    this.editedIndex=-1;
                },
                save(){
                    if (this.isValidName()) {
                        return;
                    }
                    let me= this;
                    if (this.editedIndex > -1) { //Editar Category
                        //Put = Actualizar
                        axios.put('api/Customers/PutCustomer', {
                            //Ponemos los campos que tiene (muestra) PutCategoryModel
                            'customerId': me.id,
                            'Firstname': me.Firstname,
                            'Lastname': me.Lastname,
                            'Dni': me.Dni
                        }).then(function(response){ //Esto se hace después de que se haga lo de arriba
                        me.close(); //Acá cierra el diálogo cuando le da a guardar
                        me.list(); //Para listar cuando se guarde uno nuevo
                        me.clean();
                        }).catch(function(error){
                            console.log(error);
                        });
                    } else{ 
                    //Post = Agregar
                        axios.post('api/Customers',{ //Sin el primer / porque de donde lo llamaremos lo pondrá
                                    'Firstname': me.Firstname,
                                    'Lastname': me.Lastname,
                                    'Dni': me.Dni
                        }).then(function(response){ //Esto se hace después de que se haga lo de arriba
                            me.close(); //Acá cierra el diálogo cuando le da a guardar
                            me.list(); //Para listar cuando se guarde uno nuevo
                            me.clean();
                        }).catch(function(error){
                            console.log(error);
                        });
                    }
                },

                isValidName(){
                    this.valid = 0;
                    this.validMessage = [];

                    if (this.Firstname.length < 3 || this.Firstname.length > 50) {
                        this.validMessage.push("El Name debe tener más de 3 caractéres y menos de 50 caractéres");
                    }
                    if (this.validMessage.length) {
                        this.valid = 1;
                    }
                    return this.valid;
                },

                activeDesactiveShow(action, item){
                    this.adModel = 1; //Le ponemos 1 por defecto
                    this.adName = item.Firstname;
                    this.adId = item.customerId;

                    if (action == 1) {
                        this.adAction=1;
                    } else if (action ==2) {
                        this.adAction=2;
                    }else{
                        this.adModel=0;
                    }
                },
                activeDesactiveClose(){
                    this.adModel=0;
                },

                activeDesactive(conditional){
                    let me = this;
                    //AXIOS para llamar a un servicio
                    axios.put('api/Customers/UpdateCondition/'+this.adId+'/'+conditional, {})
                    .then(function (response) {
                        me.adModel=0;
                        me.adAction=0;
                        me.adName="";
                        me.adId="";
                        me.list();
                    }).catch(function(error){
                        console.log(error);
                    })
                },
        },
    }
</script>
