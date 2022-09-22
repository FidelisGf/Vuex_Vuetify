<template>
    <div  v-if="!['login'].includes($route.name)">
        <v-navigation-drawer 
        :app="$vuetify.breakpoint.mdAndUp"
        :fixed="$vuetify.breakpoint.mdAndUp"
        :mini-variant.sync="mini"
        color="#f2f2f2"
        :scroll-toolbar-off-screen="$vuetify.breakpoint.smAndDown"
        permanent
        :width="340"
        >  
        <v-list
            nav
            
          >
            <v-list-item @click="$router.push('/pedidos')" link >
                <v-card class="d-flex-column  rounded-xl" :width="320">
                    <v-card-title class="ml-13">Pedidos</v-card-title>
                    <v-list>
                        <v-list-item class="d-flex justify-end mt-n11">
                            <v-icon large color="blue" left>
                                mdi-basket
                            </v-icon>
                            <v-card-subtitle >acompanhe seus pedidos, veja as notas fiscais...</v-card-subtitle>
                            <v-icon large color="blue" left>
                                mdi-chevron-right
                            </v-icon>
                        </v-list-item>
                    </v-list>
                </v-card>
                
            </v-list-item>
            <v-list-item @click="$router.push('/products')" link >
                <v-card class="d-flex-column  rounded-xl" :width="320">
                    <v-card-title class="ml-13">Cadastro</v-card-title>
                    <v-list>
                        <v-list-item class="d-flex justify-end mt-n11">
                            <v-icon large color="blue" left>
                                mdi-account-plus
                            </v-icon>
                            <v-card-subtitle >acompanhe seus pedidos, veja as notas fiscais...</v-card-subtitle>
                            <v-icon large color="blue" left>
                                mdi-chevron-right
                            </v-icon>
                        </v-list-item>
                    </v-list>
                </v-card>
                
            </v-list-item>
            
        </v-list>
    </v-navigation-drawer>
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