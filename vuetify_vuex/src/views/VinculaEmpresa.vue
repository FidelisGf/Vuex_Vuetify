<template>
    <v-app >
        <v-main>
           <v-container fluid fill-height>
              <v-layout align-center justify-center>
                 <v-flex xs12 sm8 md5>
                    <v-card class="elevation-16" color="grey darken-2">
                       <v-toolbar dark  color="grey darken-3">
                          <v-toolbar-title>Cadastre sua Empresa</v-toolbar-title>
                       </v-toolbar>
                       <v-card-text>
                       <form ref="form" @submit.prevent="logar">
                        <v-row>
                           <v-col>
                              <v-text-field
                                v-model="CNPJ"
                                name="cnpj"
                                type="text"
                                placeholder="Cnpj"
                                required
                                prepend-inner-icon="mdi-smart-card"
                                filled
                                color="light-green "
                                dark
                                class="inputs"
                                rounded
                             ></v-text-field>
                           </v-col>
                           <v-col>
                              <v-text-field
                                v-model="INC_ESTADUAL"
                                name="inc_estadual"
                                type="text"
                                placeholder="Inscrição Estadual"
                                required
                                prepend-inner-icon="mdi-text-box"
                                filled
                                color="light-green "
                                dark
                                class="inputs"
                                rounded
                            ></v-text-field>
                           </v-col>
                         
                        </v-row>
                        <v-row>
                           <v-col>
                              <v-text-field
                                v-model="NOME"
                                name="nome"
                                type="text"
                                placeholder="Razão Social"
                                required
                                prepend-inner-icon="mdi-store"
                                filled
                                color="light-green "
                                dark
                                class="inputs"
                                rounded
                             ></v-text-field>
                           </v-col>
                           <v-col>
                              <v-text-field
                                v-model="EMAIL"
                                name="email"
                                type="email"
                                placeholder="E-mail da empresa"
                                required
                                prepend-inner-icon="mdi-email"
                                filled
                                color="light-green "
                                dark
                                class="inputs"
                                rounded
                            ></v-text-field>
                            
                           
                           </v-col>
                           
                        </v-row>

                        <v-row>
                           <v-col>
                              <v-text-field
                              v-model="NOME_FANTASIA"
                              name="fantasia"
                              type="text"
                              placeholder="Nome Fantasia"
                              required
                              prepend-inner-icon="mdi-store-edit"
                              filled
                              color="light-green "
                              dark
                              class="inputs"
                              rounded
                              ></v-text-field>
                           </v-col>
                           <v-col>
                              <v-text-field
                              v-model="ENDERECO"
                                 name="endereco"
                                 type="text"
                                 placeholder="Endereço da Empresa"
                                 required
                                 prepend-inner-icon="mdi-store-marker"
                                 filled
                                 color="light-green "
                                 dark
                                 class="inputs"
                                 rounded
                              ></v-text-field>
                           </v-col>
                        </v-row>  
                            <v-card-actions class="d-flex justify-center">
                              <v-btn type="submit" @click="vincularOfficeUser" class="acesso mt-4" color="green accent-3" value="log in">Vincular empresa</v-btn>
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
export default {
    data(){
      return{
         NOME : '',
         CNPJ : '',
         NOME_FANTASIA : '',
         ENDERECO : '',
         EMAIL : '',
         INC_ESTADUAL : '',
      }
    },
    methods:{
      async vincularOfficeUser(){
         var data = { NOME: this.NOME, CNPJ: this.CNPJ, NOME_FANTASIA : 
         this.NOME_FANTASIA, EMAIL : this.EMAIL, INC_ESTADUAL : this.INC_ESTADUAL,
         ENDERECO : this.ENDERECO }
         const res = await this.$http.post("/vincularUserEmpresa", data)
         if(res.status == 200){
            alert('Empresa cadastrada e vinculada com sucesso !')
            this.$router.push('/')
         }
      }
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