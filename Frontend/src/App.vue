<template>
  <v-app>
    <v-toolbar 
    color="top" style="height:1px" 
    class="font-weight-black"
    >
        <v-app-bar-nav-icon @click="drawer = !drawer" color="white">
       
        </v-app-bar-nav-icon>
       
        <v-toolbar-title>D-Home Technical</v-toolbar-title>
         <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" temporary color="menu">
      <v-layout mt-3 column align-center>
        <v-flex>
          <v-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            
          </v-avatar>

        </v-flex>

      </v-layout>

      <v-list dense>
        <template>
          <v-list-item :to="{ name:'Home' }" >
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>
        </template>
        <template>
          <v-list-group>
            <v-list-item slot="activator" >
              <v-list-item-content>
                <v-list-item-title>
                  Información
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to=" { name: 'employees' } " color="menuclick">
              <v-list-item-action>
                <v-icon>engineering</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Trabajadores
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-item :to=" { name: 'customers' } " color="menuclick">
              <v-list-item-action>
                <v-icon>groups</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Clientes
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to=" { name: 'specialties' } " color="menuclick">
              <v-list-item-action>
                <v-icon>account_tree</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Especialidades
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to=" { name: 'districts' } " color="menuclick">
              <v-list-item-action>
                <v-icon>location_on</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Distritos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to=" { name: 'cities' } " color="menuclick">
              <v-list-item-action>
                <v-icon>map</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Departamentos
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          
          <v-list-group>
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Citas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to=" { name: 'appointments' } " color="menuclick">
              <v-list-item-action>
                <v-icon>book_online</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Registro de cita
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>

    </v-navigation-drawer>
    <!--Para ver todo el contenido en el conted  el router lo trae-->
    <v-main>
         <v-container class="fill-height" fluid >
        <v-slide-x-transition mode="out-in">
          <router-view />
        </v-slide-x-transition>
      </v-container>
    </v-main>
   
  </v-app>
</template>


<script>
import HelloWorld from './components/HelloWorld.vue';
export default{

  name: "App",
  components : {
   HelloWorld
  },
  
  data(){
    return {
      drawer: true


    };
  }

};
</script>

