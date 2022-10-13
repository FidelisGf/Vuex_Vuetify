<template>
    <v-container fluid grid-list-md>
        <v-row dense>
            <v-col cols="12">
                <v-card
                    color="blue-grey lighten-3"
                    dark
                    class="elevation-5"
                >
                    <v-card-title class="ml-2 text-h4 black--text">
                        Selecione um Relátorio a ser Gerado
                    </v-card-title>
                    <v-row>
                        <v-col  cols="12" sm="6" class="d-flex justify-center ml-0 ml-md-6 ml-sm-6 ml-lg-6">
                            <v-select
                                :items="relatoriosList"
                                label="Escolha um Relatorio"
                                v-model="relatorioEscolhaLista"
                                color="teal accent-3"
                                outlined
                                
                            >  
                            </v-select>
                            
                        </v-col>
                        <v-col cols="6" class="d-flex justify-center ml-0 ml-md-6 ml-sm-6 ml-lg-6">
                            <v-select v-if="relatorioEscolhaLista == 'Relatorios do Estoque'"
                                :items="relatorioEstoqueList"
                                label="Tipo de relatorio para o estoque"
                                v-model="relatorioEscolha"
                                color="teal accent-3"
                            >  
                            </v-select>
                            <v-select v-if="relatorioEscolhaLista == 'Relatorios de Produtos'"
                                :items="relatorioProductList"
                                label="Tipo de relatorio para os produtos"
                                v-model="relatorioEscolha"
                                color="teal accent-3"
                            >  
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-card-actions class="ml-3">
                        <v-btn color="#3e3e3c" @click="makeRelatorio">
                            Gerar
                        </v-btn>
                        <v-btn color="#3e3e3c" class="ml-3">
                            Voltar
                        </v-btn>
                    </v-card-actions>
              </v-card>
            </v-col>
            <RespostaRelatorio :nome-relatorio="relatorioEscolha" v-if="$store.getters.getRelatorio"></RespostaRelatorio>
            <RespostaRelatorioEstoque :nome-relatorio="relatorioEscolha" v-if="$store.getters.getRelatorioEstoque"></RespostaRelatorioEstoque>
        </v-row>
    </v-container>
</template>

<script>
import RespostaRelatorio from '@/components/ModalComponents/RespostaRelatorio.vue';
import RespostaRelatorioEstoque from '../components/ModalComponents/RespostaRelatorioEstoque.vue';

export default {
    data() {
        return {
            relatoriosList: ["Relatorios de Produtos", "Relatorios do Estoque"],
            relatorioEscolhaLista : null,
            relatorioEscolha: null,
            relatorioProductList : ["Produtos mais caros", "Produtos mais baratos"],
            relatorioEstoqueList : ["Produtos com mais estoque", "Produtos com pouco estoque"],
            number_per_pages: null,
            activeRelatorio: false,
        };
    },
    methods: {
        makeRelatorio() {
            this.$store.commit('deleteFiltro')
            this.$store.commit('deleteFiltroEstoque')
            let opcao = this.relatorioEscolha
            if(this.relatorioEscolhaLista == 'Relatorios de Produtos'){
                this.$store.commit("saveFiltro", opcao);
                this.$store.commit("activeRelatorio");
            }
            else{
                this.$store.commit("saveFiltroEstoque", opcao);
                this.$store.commit("activeRelatorioEstoque");
            }
            this.relatorioEscolha = ''
        }
    },
    components: { RespostaRelatorio, RespostaRelatorioEstoque }
}
</script>

<style lang="scss" scoped>

</style>