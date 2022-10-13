<template>
    <div>
        <!--Dekstop Version -->
        <v-navigation-drawer v-if="!$vuetify.breakpoint.smAndDown"
        :app="$vuetify.breakpoint.mdAndUp"
        :fixed="$vuetify.breakpoint.mdAndUp"
        color="#f2f2f2"
        :scroll-toolbar-off-screen="$vuetify.breakpoint.smAndDown"
        permanent
        :width="340"
        >  
        <v-list
            nav 
          >
          <v-row class="mt-2" >
            <v-col >
              <v-list-item @click="$router.push('/pedidos')" class="d-flex-row justify-center"  link>
                <v-card class="rounded-xl" elevation="6">
                    <v-card-title class="mt-n2 ml-2">Vendas</v-card-title>
                    <v-row  style="margin-top: 1px">
                      <v-col cols="1" class="mt-n5 ml-3">
                        <v-icon large color="teal lighten-1" left>
                          mdi-cash-register
                        </v-icon>
                      </v-col>
                      <v-col cols="9" class="mt-n3 ml-5">
                        <p>Registre suas vendas aqui</p>
                      </v-col>
                      <v-col cols="1" class="mt-n5 ml-n12">
                        <v-icon large color="teal lighten-1" right>
                          mdi-chevron-right
                        </v-icon>
                      </v-col>
                    </v-row> 
                </v-card>
              </v-list-item> 
            </v-col>
            </v-row>
            <v-row class="mt-2" >
              <v-col >
                <v-list-item @click="$router.push('/estoque')" class="d-flex-row justify-center"  link>
                  <v-card class="rounded-xl" elevation="6">
                      <v-card-title class="mt-n2 ml-2">Estoque</v-card-title>
                      <v-row  style="margin-top: 1px">
                        <v-col cols="1" class="mt-n5 ml-3">
                          <v-icon large color="teal lighten-1" left>
                            mdi-archive-check
                          </v-icon>
                        </v-col>
                        <v-col cols="9" class="mt-n3 ml-5">
                          <p>Gerencie seu estoque aqui</p>
                        </v-col>
                        <v-col cols="1" class="mt-n5 ml-n12">
                          <v-icon large color="teal lighten-1" right>
                            mdi-chevron-right
                          </v-icon>
                        </v-col>
                      </v-row> 
                  </v-card>
                </v-list-item> 
              </v-col>
              </v-row>
            <v-row >
              <v-col >
                <v-list-item @click="$router.push('/relatorio')"  class="d-flex-row justify-center" link>
                  <v-card class="rounded-xl" elevation="6">
                      <v-card-title class="ml-2">Relatorios Produtos</v-card-title>
                      <v-row style="margin-top: 1px">
                        <v-col cols="1" class="mt-n5 ml-3">
                          <v-icon large color="teal lighten-1" left>
                            mdi-file-check-outline
                          </v-icon>
                        </v-col>
                        <v-col cols="9" class="mt-n3 ml-5">
                          <p>Acesso à relatorios diversos</p>
                        </v-col>
                        <v-col cols="1" class="mt-n5 ml-n12">
                          <v-icon large color="teal lighten-1" right>
                            mdi-chevron-right
                          </v-icon>
                        </v-col>
                      </v-row> 
                  </v-card>
                </v-list-item> 
              </v-col>
            </v-row>
            <v-row >
              <v-col >
                <v-list-item @click="$router.push('/empresa')"  class="d-flex-row justify-center" link>
                  <v-card class="rounded-xl" elevation="6">
                      <v-card-title class="ml-2">Empresa</v-card-title>
                      <v-row style="margin-top: 1px">
                        <v-col cols="1" class="mt-n5 ml-3">
                          <v-icon large color="teal lighten-1" left>
                            mdi-office-building-outline
                          </v-icon>
                        </v-col>
                        <v-col cols="9" class="mt-n3 ml-5">
                          <p>Vincule / Veja sua empresa</p>
                        </v-col>
                        <v-col cols="1" class="mt-n5 ml-n12">
                          <v-icon large color="teal lighten-1" right>
                            mdi-chevron-right
                          </v-icon>
                        </v-col>
                      </v-row> 
                  </v-card>
                </v-list-item> 
              </v-col>
            </v-row>
        </v-list>
      </v-navigation-drawer>
    <!-- Middle Version -->
    <v-container v-if="$vuetify.breakpoint.smAndDown" class="info">
        <v-row >
          <v-col >
            <v-list-item @click="$router.push('/estoque')" class="d-flex-row justify-center" link>
              <v-card class="rounded-xl" style="width:100vh;" elevation="5">
                  <v-card-title>Pedidos</v-card-title>
                  <v-row >
                    <v-col cols="1" class="mt-n4 ml-3">
                      <v-icon large color="teal lighten-1" left>
                        mdi-package-variant-closed
                      </v-icon>
                    </v-col>
                    <v-col cols="9" class="mt-n3 ml-5">
                      <p>Consulte seus pedidos aqui</p>
                    </v-col>
                    <v-col cols="1" class="mt-n4 ml-n12">
                      <v-icon large color="teal lighten-1" right>
                        mdi-chevron-down
                      </v-icon>
                    </v-col>
                  </v-row> 
              </v-card>
            </v-list-item> 
          </v-col>
        </v-row>
        <v-row >
          <v-col >
            <v-list-item @click="$router.push('/relatorio')" class="d-flex-row justify-center" link>
              <v-card class="rounded-xl" style="width:100vh; " elevation="5" >
                  <v-card-title>Cadastro</v-card-title>
                  <v-row >
                    <v-col cols="1" class="mt-n4 ml-3">
                      <v-icon large color="teal lighten-1" left>
                        mdi-account-plus
                      </v-icon>
                    </v-col>
                    <v-col cols="9" class="mt-n3 ml-5">
                      <p>Complete seu cadastro aqui</p>
                    </v-col>
                    <v-col cols="1" class="mt-n4 ml-n12">
                      <v-icon large color="teal lighten-1" right>
                        mdi-chevron-down
                      </v-icon>
                    </v-col>
                  </v-row> 
              </v-card>
            </v-list-item> 
          </v-col>
        </v-row>
        <v-row >
          <v-col >
            <v-list-item @click="$router.push('/empresa')" class="d-flex-row justify-center" link>
              <v-card class="rounded-xl" style="width:100vh; " elevation="5" >
                  <v-card-title>Empresa</v-card-title>
                  <v-row >
                    <v-col cols="1" class="mt-n4 ml-3">
                      <v-icon large color="teal lighten-1" left>
                        mdi-office-building-outline
                      </v-icon>
                    </v-col>
                    <v-col cols="9" class="mt-n3 ml-5">
                      <p>Vincule / Veja sua empresa</p>
                    </v-col>
                    <v-col cols="1" class="mt-n4 ml-n12">
                      <v-icon large color="teal lighten-1" right>
                        mdi-chevron-down
                      </v-icon>
                    </v-col>
                  </v-row> 
              </v-card>
            </v-list-item> 
          </v-col>
        </v-row>
    </v-container>
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