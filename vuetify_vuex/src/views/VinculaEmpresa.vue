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
                                v-model="nome"
                                name="nome"
                                type="text"
                                placeholder="Razão Social"
                                required
                             ></v-text-field>
                              <v-text-field
                                v-model="cnpj"
                                name="cnpj"
                                type="text"
                                placeholder="Cnpj"
                                required
                             ></v-text-field>
                             <v-text-field
                                v-model="email"
                                name="email"
                                type="email"
                                placeholder="E-mail da empresa"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="fantasia"
                                name="fantasia"
                                type="text"
                                placeholder="Nome Fantasia"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="insc_estadual"
                                name="insc_estadual"
                                type="text"
                                placeholder="Inscrição Estadual"
                                required
                            ></v-text-field>
                            <v-btn type="submit" @click="register" class="mt-4" color="success" value="log in">Vincular empresa</v-btn>
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
    
}
</script>

<style lang="scss" scoped>

</style>