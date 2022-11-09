<template>
    <v-container fluid grid-list-md>
        <v-row dense>
            <v-col cols="12" v-if="showEmpresa">
                <v-card
                color="#f2f2f2"
                dark
                class="elevation-5"
                >
                    <v-card-title class="ml-2 text-h4 black--text ">
                    {{data.NOME}}
                    </v-card-title>
                    <v-card-text class="ml-3 black--text">
                        <p >CNPJ : {{data.CNPJ}}</p>
                   
                        <p >Email : {{data.EMAIL}}}</p>
                            
                        <p >Nome Fantasia : {{data.NOME_FANTASIA}}</p>
                        <p>Endereço da Empresa : {{data.ENDERECO}}</p>
                             
                        <p>Inscrição Estadual : {{data.INC_ESTADUAL}}</p>
                    </v-card-text>   
              </v-card>
            </v-col>
            <v-col cols="12" v-if="!showEmpresa">
                <v-card
                color="#f2f2f2"
                dark
                class="elevation-5"
                >
                    <v-card-title class="text-h4 black--text ">
                    Aqui ficará disponivel as informações de sua Empresa
                    </v-card-title>
                    <v-card-subtitle class="ml-3 mt-2 black--text">CNPJ : </v-card-subtitle>
                    <v-card-text class="ml-3 black--text">
                                 <p>Email : </p>
                                 <p>Nome Fantasia : </p>
                                 <p>Numero de Funcionarios Ativos : </p>
                                 <p>Endereço da Empresa :</p>
                                 <p>Inscrição Estadual : </p>
                                 <p>Numero de Filiais : </p>
                    </v-card-text>   
                    <v-card-actions class="ml-3">
                        <v-btn color="#3e3e3c" @click="$router.push('/vincula-empresa')" >
                            Vincular Empresa
                        </v-btn>
                    </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            showEmpresa : false,
            data : []
        }
    },
    methods:{
        ...mapActions('empresaMod', ['getByUser', 'checkEmpresa']),
        async checkUserHaveOffice(){
            const res =  await this.checkEmpresa()
            if(res == 1){
                this.getEmpresaByUser();
                this.showEmpresa = true;
            }else{
                this.showEmpresa = false;
            }
        },
        async getEmpresaByUser(){
            const res = await this.getByUser()
            this.data = res;
        }
    },
    created(){
        this.checkUserHaveOffice();
    }
}
</script>

<style lang="scss" scoped>

</style>