<template>
    <div  v-if="!['login'].includes($route.name)">
        <v-navigation-drawer
        clipped 
        :mini-variant="mini"
        color="#f2f2f2"
        permanent
        fixed
        app
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
          
          <v-list-item @click="$router.push('/products')" link >
              <v-list-item-icon>
                <v-icon>mdi-baguette</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Meus Produtos</v-list-item-title>
          </v-list-item>
          <v-list-item link>
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
          <v-divider></v-divider>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    computed:{
    mini(){
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return false
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
        console.log(response)
          
    }, 
    
  },
}
</script>

<style lang="scss" scoped>

</style>