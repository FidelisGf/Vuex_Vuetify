<template>
    <v-app >
        <v-main>
           <v-container fluid fill-height>
              <v-layout align-center justify-center>
                 <v-flex xs12 sm8 md4>
                    <v-card class="elevation-16" color="grey darken-2">
                       <v-toolbar dark color="grey darken-3">
                          <v-toolbar-title>Cadastro Usuario</v-toolbar-title>
                       </v-toolbar>
                       <v-card-text>
                       <form ref="form" @submit.prevent="makeRegister">
                              <v-text-field
                                v-model="username"
                                name="username"
                                type="text"
                                placeholder="Usuario"
                                required
                                prepend-inner-icon="mdi-account"
                                filled
                                dark
                                class="inputs"
                                rounded
                             ></v-text-field>
                              <v-text-field
                                v-model="password"
                                name="password"
                                type="password"
                                placeholder="Senha"
                                required
                                prepend-inner-icon="mdi-key"
                                filled
                                rounded
                                dark
                             ></v-text-field>
                             <v-text-field
                                v-model="email"
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                required
                                prepend-inner-icon="mdi-email"
                                filled
                                dark
                                rounded
                            ></v-text-field>
                             <v-btn  type="submit" class="acesso mt-4"  color="green accent-3" value="log in">Criar conta</v-btn>
                        </form>
                       </v-card-text>
                    </v-card>
                 </v-flex>
              </v-layout>
           </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            username : '',
            password : '',
            email : '',
        }
    },
    methods:{
        ...mapActions('userMod', ['register']),
        async makeRegister(){
           let payload = {NAME : this.username, PASSWORD: this.password, EMAIL : this.email}
           await this.register(payload)
           this.$router.push({name : 'login'})
        }
    },
    async created(){
    
    }
}
</script>

<style lang="scss" scoped>
div[data-app='true'] {
    background: rgb(130,130,133);
    background: linear-gradient(90deg, rgba(130,130,133,1) 0%, rgba(147,147,163,1) 51%, rgba(193,198,199,1) 100%);
  }
  .acesso:hover{
    transform: translate(2px, -2.10px);
    transition: 1.1s;
    box-shadow: 3px 1.2px 3px #69F0AE;
    background-color: white;
  }
</style>