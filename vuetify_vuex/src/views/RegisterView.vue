<template>
    <v-app >
        <v-main>
           <v-container fluid fill-height>
              <v-layout align-center justify-center>
                 <v-flex xs12 sm8 md4>
                    <v-card class="elevation-16">
                       <v-toolbar dark color="primary">
                          <v-toolbar-title>Cadastro Usuario</v-toolbar-title>
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
                             <v-text-field
                                v-model="email"
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                required
                            ></v-text-field>
                             <v-btn type="submit" @click="register" class="mt-4" color="primary" value="log in">Criar conta</v-btn>
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
            username : '',
            password : '',
            email : '',
        }
    },
    methods:{
        async register(){
            const res = await this.$http.post("/auth/register", {NAME : this.username, PASSWORD: this.password, EMAIL : this.email})
            console.log(res);
            if(res.status == 200){
                alert('Usuario Criado com sucesso !')
                this.$router.push('/login')
            }else{
                alert("Dados Invalidos");
            }
        }
    },
    async created(){
    
    }
}
</script>

<style lang="scss" scoped>

</style>