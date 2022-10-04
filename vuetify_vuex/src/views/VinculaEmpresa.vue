<template>
    <v-app >
        <v-main>
           <v-container fluid fill-height>
              <v-layout align-center justify-center>
                 <v-flex xs12 sm8 md4>
                    <v-card class="elevation-16">
                       <v-toolbar dark color="success">
                          <v-toolbar-title>Cadastre sua Empresa</v-toolbar-title>
                       </v-toolbar>
                       <v-card-text>
                       <form ref="form" @submit.prevent="logar">
                              <v-text-field
                                v-model="NOME"
                                name="nome"
                                type="text"
                                placeholder="Razão Social"
                                required
                             ></v-text-field>
                              <v-text-field
                                v-model="CNPJ"
                                name="cnpj"
                                type="text"
                                placeholder="Cnpj"
                                required
                             ></v-text-field>
                             <v-text-field
                                v-model="EMAIL"
                                name="email"
                                type="email"
                                placeholder="E-mail da empresa"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="NOME_FANTASIA"
                                name="fantasia"
                                type="text"
                                placeholder="Nome Fantasia"
                                required
                            ></v-text-field>
                            <v-text-field
                              v-model="ENDERECO"
                                 name="endereco"
                                 type="text"
                                 placeholder="Endereço da Empresa"
                                 required
                              ></v-text-field>
                            <v-text-field
                                v-model="INC_ESTADUAL"
                                name="inc_estadual"
                                type="text"
                                placeholder="Inscrição Estadual"
                                required
                            ></v-text-field>
                            <v-btn type="submit" @click="vincularOfficeUser" class="mt-4" color="success" value="log in">Vincular empresa</v-btn>
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
         console.log(res)
         if(res.status == 200){
            alert('Empresa cadastrada e vinculada com sucesso !')
            this.$router.push('/')
         }
      }
    }
}
</script>

<style lang="scss" scoped>

</style>