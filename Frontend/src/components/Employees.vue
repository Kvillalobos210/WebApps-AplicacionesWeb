<template>
    <v-data-table 
        :headers="headers"
        :items="employees"
        :search="search"
        sort-by="name"
        class="elevation-1" style="width:800px"><!-- Se agrego el style -->
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>CRUD Categories</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-spacer></v-spacer>
                <v-text-field label="Search Category" append-icon="search"
                class="text-xs-center" v-model="search" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator=" { on } ">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Category</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="name" label="Name"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field v-model="description" label="Description"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" v-show="isValidName">
                                        <div class="red--text" v-for="v in validMessage" :key="v" v-text="v" />
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
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
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
            <v-btn color="primary" @click="listCategories">Reset</v-btn>
        </template>
    </v-data-table>
</template>