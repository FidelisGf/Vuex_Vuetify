<template>
    <v-app >
       <v-main>
          <v-container fluid fill-height>
             <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                   <v-card class="elevation-16">
                      <v-toolbar dark color="primary">
                         <v-toolbar-title>Login</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                      <form ref="form" @submit.prevent="logar">
                             <v-text-field
                               v-model="username"
                               name="username"
                               type="text"
                               placeholder="Usuario"
                               required
                            ></v-text-field>
       
                             <v-text-field
                               v-model="password"
                               name="password"
                               type="password"
                               placeholder="Senha"
                               required
                            ></v-text-field>
                            <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                            <router-link to="/register">
                              <v-btn type="submit" class="mt-4 ml-4" color="primary" value="log in">Registrar-se</v-btn>
                            </router-link> 
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


 export default {
   
   data() {
     return {
       username: "",
       password: "",
     };
   },
   methods: {
    async logar(){
        const res = await this.$http.post("/auth/login", {NAME : this.username, PASSWORD: this.password})
        console.log(res);
        if(res.status == 200){
          localStorage.setItem('token', res.data.access_token)
          this.$store.dispatch('setUser', this.username)
          this.$router.push('/')
        }else{
          alert("Dados Invalidos")
        }
    },

    async logout(){
      const res = await this.$http.post("/auth/logout")
      console.log(res);
    }
   },
   created(){
      localStorage.clear();
   }
 };
 </script>