<template>
    <v-app >
       <v-main>
        <v-snackbar
            v-model="register"
            :timeout="timeout"
           
        >
            {{this.msg}}
            <template v-slot:action="{ attrs }">
            <v-btn
                color="red"
                dark
                icon
                v-bind="attrs"
                @click="registro = false"
                >
                <v-icon small>mdi-close</v-icon>
            </v-btn>
            </template>
        </v-snackbar>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            @keydown.escape="close"
          >
          <v-overlay
            :value="$store.state.loading"
            >
              <div class="d-flex flex-column justify-center">
                <span>Enviando email...</span>
                <v-progress-circular
                  indeterminate
                  color="white"
                  class="mt-7 ml-8"
                  >
                 
                </v-progress-circular>   
              </div>
               
            </v-overlay>
            <v-stepper dark class="stepper" v-model="e1">
              <v-stepper-header  class="white--text" >
                  <v-stepper-step
                      :complete="e1 > 1"
                      step="1"
                      color="green darken-1"
                      class="white--text"
                  >
                      Enviar Email
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step
                      :complete="e1 > 2"
                      step="2"
                      color="green darken-1"
                      class="white--text"
                  >
                      Mudar Senha
                  </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content  step="1">
                      <v-card dark>
                          <v-card-title class="white--text">
                              Insira o seu Email
                          </v-card-title>
                          <form @submit.prevent="enviarEmailRecuperacao" >
                            <v-card-text >
                              
                                <v-text-field
                                    v-model="email"
                                    dark
                                    label="Seu Email"
                                    counter="120"
                                    required
                                    color="teal lighten-1"
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions class="d-flex justify-end">
                                <v-btn
                                  text 
                                  @click="close"
                                  color="red accent-2"
                                >
                                  Fechar
                                </v-btn>
                                <v-btn
                                  text 
                                  type="submit"
                                  color="green accent-2"
                                >
                                  Enviar
                                </v-btn>
                            </v-card-actions>
                          </form>
                      </v-card>
                  </v-stepper-content>
                  <v-stepper-content  step="2">
                    <v-card dark>
                      <v-card-title class="white--text text-subtitle-1">
                          Utilize o token enviado ao seu e-mail.
                      </v-card-title>
                      <form @submit.prevent="mudarSenha">
                          <v-card-text> 
                            <v-text-field
                              v-model="token"
                              dark
                              label="Token"
                              required
                              color="teal lighten-1"
                            ></v-text-field>
                            <v-text-field
                                v-model="newPw"
                                dark
                                label="Nova senha"
                                counter="60"
                                required
                                type="password"
                                color="teal lighten-1"
                            ></v-text-field>
                          </v-card-text>
                          <v-card-actions class="d-flex justify-end">
                            <v-btn
                              text 
                              @click="close"
                              color="red accent-2"
                            >
                              Fechar
                            </v-btn>
                            <v-btn
                              text 
                              type="submit"
                              color="green accent-2"
                            >
                              Enviar
                            </v-btn>
                          </v-card-actions>
                      </form>
                     
                    </v-card>
                  </v-stepper-content>
                </v-stepper-items>    
              </v-stepper>  
          </v-dialog>
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
                            <div class="d-flex justify-center"><a @click="dialog = true" class="white--text forgetPw">Esqueci minha senha</a></div>

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
 import { mapActions } from 'vuex';
 export default {
   
   data() {
     return {
       username: "",
       password: "",
       dialog : false,
       e1 : 1,
       email : "",
       token : '',
       newPw : '',
       msg : null,
       register : false,
       timeout : 2000
     };
   },
   methods: {
    ...mapActions('userMod', ['setUser', 'profile', 'checkEmpresa', 'login', 'sendEmail', 'changeSenha']),
    async logar(){
         let payload = {NAME : this.username, PASSWORD: this.password}
         let res = await this.login(payload)
        if(res.login){
          localStorage.setItem('user', this.username)
          if(res.vinculado){
            this.$router.push('/home')
          }else{
            this.$router.push('/vincula-empresa')
          }
        }else{
          alert("Dados Invalidos")
        }
    },
    close(){
      this.email = ""
      this.e1 = 1
      this.token = ''
      this.newPw = ''
      this.dialog = false
    },
    async enviarEmailRecuperacao(){
        let payload = {EMAIL : this.email}
        let check = await this.sendEmail(payload)
        if(check){
            this.register = true
            this.msg = 'Email enviado com sucesso !'
            this.e1 = 2
        }
    },
    async mudarSenha(){
      let payload = {PW : this.newPw, token : this.token}
      let check = await this.changeSenha(payload)
      if(check){
          this.register = true
          this.msg = 'Senha alterada com sucesso !'
          this.close()
      }
    }
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
 .forgetPw{
    color : #EEEEEE !important;
    text-decoration: underline !important;
 }
 .stepper{
  background-color: rgb(30, 30, 30) !important;
 }


 
</style>