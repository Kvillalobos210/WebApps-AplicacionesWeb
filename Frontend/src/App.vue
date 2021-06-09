<!--
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template>
          <v-list-item :to="{ name:'Home' }">
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
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Información
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to=" { name: 'employees' } ">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Empleados
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to=" { name: 'customers' } ">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Clientes
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
            <v-list-item :to=" { name: '' } ">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
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

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="gray" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        <span class="hidden-sm-and-down">D-Home Technical</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>view_list</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-slide-x-transition mode="out-in">
          <router-view />
        </v-slide-x-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import HelloWord from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWord,
  },

  data: () => ({
    drawer: null
  }),
};
</script>-->
<template>
  <v-app>
    <v-toolbar 
    color="blue-grey darken-1"
    app>
        <v-app-bar-nav-icon @click="drawer = !drawer">
       
        </v-app-bar-nav-icon>
       
        <v-toolbar-title >D-Home Technical</v-toolbar-title>
         <v-spacer></v-spacer>

      
        
      
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" temporary color="amber accent-2">
      <v-layout mt-3 column align-center>
        <v-flex>
          <v-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            
          </v-avatar>

        </v-flex>

      </v-layout>

      <v-list dense>
        <template>
          <v-list-item :to="{ name:'Home' }">
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
            <v-list-item slot="activator">
              <v-list-item-content>
                <v-list-item-title>
                  Información
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to=" { name: 'employees' } ">
              <v-list-item-action>
                <v-icon>grid_view</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Trabajadores
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item :to=" { name: '' } ">
              <v-list-item-action>
                <v-icon>grid_view</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Clientes
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
            <v-list-item :to=" { name: '' } ">
              <v-list-item-action>
                <v-icon>grid_view</v-icon>
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
    <v-content>
      <router-view/>
   
     </v-content>
   
  </v-app>
</template>


<script>
export default{
  name: "App",
  data(){
    return {
      drawer: true


    };
  }

};
</script>