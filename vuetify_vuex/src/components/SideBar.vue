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
            <v-list-item-avatar>
              <v-icon>mdi-account</v-icon>
            </v-list-item-avatar>
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfigModal from './ConfigModal.vue'
/* eslint-disable */
export default {
    data() {
        return {
            dialog: false,
            one: false,
            user: null,
        };
    },
    computed: {
        ...mapGetters({ name: "userMod/getUser", userLevel: "userMod/getUserLevel", userCargo: "userMod/getUserCargo" }),
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
    created() {
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
</style>