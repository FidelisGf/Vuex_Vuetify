<template>
    <v-container fluid grid-list-md>
        <v-row dense class="mt-12 mt-lg-0">
            <v-col cols="12" v-if="showEmpresa">
                <v-card
                
                dark
                class="elevation-5"
                >
                    <v-card-title class="ml-2 text-h4 white--text ">
                    {{data.NOME}}
                    </v-card-title>
                    <v-card-text class="ml-3 white--text text-body-1">
                        <p >CNPJ : {{data.CNPJ}}</p>
                   
                        <p >Email : {{data.EMAIL}}}</p>
                            
                        <p >Nome Fantasia : {{data.NOME_FANTASIA}}</p>
                        <p>Endereço da Empresa : {{data.ENDERECO}}</p>
                             
                        <p>Inscrição Estadual : {{data.INC_ESTADUAL}}</p>
                        
                    </v-card-text>  
                    <v-card-text>
                        <v-row>
                            <v-col class="d-flex justify-center">
                                <div class="grafico ">
                                    <p class="text-subtitle-1 font-italic white--text titulo-grafico">Grafico de vendas no dia atual (Até 23h:00min, minimo duas vendas)</p>
                                    <v-sheet color="#1e1e1e">
                                        <v-sparkline
                                          :value="values"
                                          color="rgba(255, 255, 255, .7)"
                                          height="100"
                                          smooth="10"
                                          padding="20"
                                          
                                          stroke-linecap="round"
                                          auto-draw
                                          :auto-draw-duration="4000"
                                        >
                                        <template v-slot:label="item">
                                            {{parseFloat(item.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}
                                        </template>
                                        </v-sparkline>
                                      
                                    </v-sheet>
                                </div>
                                
                            </v-col>
                        </v-row>
                    </v-card-text> 
              </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return{
            showEmpresa : false,
            data : [],
        }
    },
    methods:{
        ...mapActions('empresaMod', ['getByUser', 'checkEmpresa']),
        ...mapActions('vendaMod', ['getVendas']),
        async checkUserHaveOffice(){
            const res =  await this.checkEmpresa()
            if(res == 1){
                this.getEmpresaByUser();
                await this.getVendas()
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
    computed :{
        ...mapGetters({values :  'vendaMod/getValuesPerMes'})
    },
    created(){
        this.checkUserHaveOffice();
        console.log(this.values)
    }
}
</script>

<style lang="scss" scoped>
    .grafico{
        width: 85%;
    }
    .titulo-grafico{
        text-decoration: underline !important;
    }
</style>