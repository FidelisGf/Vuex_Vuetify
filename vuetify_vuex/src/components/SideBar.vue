<template>
    <div  v-if="!['login'].includes($route.name)">
        <v-navigation-drawer v-if="!$vuetify.breakpoint.smAndDown"
        :app="$vuetify.breakpoint.mdAndUp"
        :fixed="$vuetify.breakpoint.mdAndUp"
        :mini-variant.sync="mini"
        color="#f2f2f2"
        :scroll-toolbar-off-screen="$vuetify.breakpoint.smAndDown"
        permanent
        >  
        <v-list>
          <v-list-item class="px-5">
            <v-list-item-content>
              <v-list-item-subtitle>Admin</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h8">
                {{$store.state.user.username}}
              </v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
            nav
            dense
          >
            <v-list-item @click="$router.push('/pedidos')" link >
                <v-list-item-icon>
                  <v-icon>mdi-baguette</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Meus Produtos</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/empresa')" link>
              <v-list-item-icon>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Minha Empresa</v-list-item-title>
            </v-list-item>
            <v-list-item  link>
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Minhas Categorias</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-archive</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Gestão do Estoque</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-printer</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Relatorio de Vendas</v-list-item-title>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Usuarios do Sistema</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/')" link>
              <v-list-item-icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
      <v-toolbar dense app dark color="grey darken-0" class="hidden-md-and-up">
        <v-toolbar-title class="text-h10">Admin : {{$store.state.user.username}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.native="dialog = true"></v-app-bar-nav-icon>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar flat color="white darken-1">
              <v-toolbar-title>Config</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
              <v-list>
                <v-list-item class="px-5">
                  <v-list-item-content>
                    <v-list-item-subtitle>Admin</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item class="px-2">
                  <v-list-item-avatar>
                    <v-img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-h8">
                      {{$store.state.user.username}}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list
              nav
              dense
              class="text-center pt-2"
              >
                <v-list-item @click="$router.push('/products')" @click.native="dialog = false" link >
                    <v-list-item-icon>
                      <v-icon>mdi-baguette</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Meus Produtos</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$router.push('/empresa')" @click.native="dialog = false" link >
                  <v-list-item-icon>
                    <v-icon>mdi-domain</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Minha Empresa</v-list-item-title>
                </v-list-item>
                <v-list-item  link>
                  <v-list-item-icon>
                    <v-icon>mdi-star</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Minhas Categorias</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-archive</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Gestão do Estoque</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-printer</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Relatorio de Vendas</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Usuarios do Sistema</v-list-item-title>
                </v-list-item>
                <v-list-item @click="$router.push('/')" link>
                  <v-list-item-icon>
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Sair</v-list-item-title>
                </v-list-item>
              </v-list>
          </v-card>
        </v-dialog>

      </v-toolbar>
      
    </div>
</template>

<script>
/* eslint-disable */
export default {
  data(){
    return {
      dialog: false,
    }
  },
    computed:{
      mini(){
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return true
          case 'sm': return true
          case 'md': return false
          case 'lg': return false
          case 'xl': return false
        }
      return this.$vuetify.breakpoint.mdAndDown;
    }
  },
  methods:{
    async profile(){
        const response = await this.$http.post('/auth/profile')
        if(this.userLeng == 0){
          this.$store.dispatch('setUser', response.data.NAME)
        }    
    }, 
    
  },
  async created(){
    this.profile();
  },

  computed:{
    userLeng(state){
      return Object.keys(this.$store.state.user.username);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>