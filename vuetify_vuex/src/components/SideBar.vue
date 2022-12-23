<template>
    <div style="black"  v-if="!['login'].includes($route.name)" fixed > 
        <v-list 
        >
          <v-list-item class="px-5">
            <v-list-item-content>
              <v-list-item-subtitle class="d-flex flex-row">
                  <ConfigModal class="ml-n5" ></ConfigModal>
                  <p class="mt-3 white--text">{{userCargo}}</p>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="px-2">
            <v-hover
              close-delay="0"
              open-delay="0"
              v-slot="{ hover }"
            >
              <v-list-item-avatar
                class="avatar-user"
              >
                  <v-avatar @click="dialog = true" >
                    <img
                      :src="url"
                      :alt="user"
                      :elevation="hover ? 16 : 2"
                      :class="{ 'on-hover': hover }"
                    >
                  </v-avatar>
              </v-list-item-avatar>
          </v-hover>
            <v-list-item-content>
              <v-list-item-title class="text-h8">
                {{user}}
              </v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
            nav
            
          >
          <v-list-item-group
          active-class="bg-active"
            >
              <v-list-item @click="$router.push('/pedidos')" link >
                <v-list-item-icon>
                  <v-icon>mdi-cash-register</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Registrar Venda</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/empresa')" v-if="userLevel > 2" link>
              <v-list-item-icon>
                <v-icon>mdi-domain</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Minha Empresa</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="$router.push('/estoque')">
              <v-list-item-icon>
                <v-icon>mdi-archive</v-icon>
              </v-list-item-icon >
              <v-list-item-title>Gestão do Estoque</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="$router.push('/relatorio')" v-if="userLevel > 2">
              <v-list-item-icon>
                <v-icon>mdi-printer</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Relatorios Diversos</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/despesas')" link>
              <v-list-item-icon>
                <v-icon>mdi-currency-usd-off</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Despesas</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/funcionarios')" link v-if="userLevel > 8">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Funcionarios</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/home')" link>
              <v-list-item-icon>
                <v-icon>mdi-book</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Dicas</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/')" link>
              <v-list-item-icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
      </v-list>
        <v-dialog
          v-if="dialog"
          v-model="dialog"
          v-click-outside="close"
          persistent
          max-width="250"
          
          @keydown.escape="dialog = false"
        >   
              <v-img 
                :src="url"
                
                :alt="user"
                max-height="250"
                max-width="250"
              ></v-img>
        </v-dialog>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfigModal from './ConfigModal.vue'
/* eslint-disable */
export default {
    data() {
        return {
            dialog: false,
            one: false,
            user: null,
            url : null,
            dialog : false
        };
    },
    computed: {
        ...mapGetters({ name: "userMod/getUser", userLevel: "userMod/getUserLevel", 
        userCargo: "userMod/getUserCargo", userId: "userMod/getUserId" }),
        mini() {
            switch (this.$vuetify.breakpoint.name) {
                case "xs": return true;
                case "sm": return true;
                case "md": return false;
                case "lg": return false;
                case "xl": return false;
            }
            return this.$vuetify.breakpoint.mdAndDown;
        }
    },
    methods:{
        ...mapActions("userMod", ['showUser']),
        async getUser(){
            let data = await this.showUser(this.userId)
            this.url = "data:image/png;base64," + data.usuario.IMAGE
            if(data.usuario.IMAGE == null || data.usuario.IMAGE == undefined){
                this.url = "https://cdn.vuetifyjs.com/images/john.jpg"
            }
        },
        close(){
          this.dialog = false
        }
    },
    created() {
        this.getUser()
        this.user = localStorage.getItem("user");
    },
    components: { ConfigModal }
}
</script>

<style lang="scss" >
.bg-active {
  background-color: #4CAF50;
  color : white !important;
}
.cards-colors{
  background-color: rgb(48, 48, 48) !important;
}
.relatorios{
  background-color: rgb(30, 30, 30) !important;
}
.avatar-user:hover{
  transform: translate(2px, -2.10px);
  transition: 1.5s;
  box-shadow: 0px 2px 5px 2px #e0dcdc !important;
}
</style>