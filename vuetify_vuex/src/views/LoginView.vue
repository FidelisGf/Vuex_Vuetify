<template>
    <v-app >
       <v-main>
          <v-container fluid fill-height >
             <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                   <v-card class="elevation-16" color="grey darken-2" style="border-radius: 10px;"> 
                      <v-toolbar dark color="grey darken-3">
                         <v-toolbar-title >Login</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                      <form ref="form" @submit.prevent="logar" class="mt-5">
                             <v-text-field
                               v-model="username"
                               name="username"
                               type="text"
                               placeholder="Usuario"
                               required
                               prepend-inner-icon="mdi-account"
                               filled
                               color="light-green "
                               dark
                               class="inputs"
                               rounded
                            >
                           </v-text-field>
                             <v-text-field
                               v-model="password"
                               name="password"
                               type="password"
                               placeholder="Senha"
                               required
                               color="light-green "
                               class="inputs"
                               dark
                               prepend-inner-icon="mdi-key"
                               filled
                               rounded
                            ></v-text-field>
                            <v-card-actions class="d-flex justify-center">
                              <v-btn dense rounded type="submit" class="acesso mt-4" color="green accent-3" style="width: 100px;" value="log in">Login</v-btn>
                              <v-btn @click="$router.push('/register')" rounded type="submit" class="acesso mt-4 ml-4" color="green accent-3" value="log in">Registrar-se</v-btn>
                              
                            </v-card-actions>
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
 import userService from '@/service/userService';
 import { mapActions } from 'vuex';
 export default {
   
   data() {
     return {
       username: "",
       password: "",
     };
   },
   methods: {
    ...mapActions('userMod', ['setUser', 'profile']),
    async logar(){
         let payload = {NAME : this.username, PASSWORD: this.password}
        const res = await userService.login(payload)
        console.log(res);
        if(res.status == 200){
          localStorage.setItem('token', res.data.access_token)
          this.$router.push('/home')
          localStorage.setItem('user', this.username)
        }else{
          alert("Dados Invalidos")
        }
    },
   },
   created(){
      localStorage.clear();
   }
 };
 </script>
 <style scoped>
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