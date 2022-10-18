<template>
    <v-container fluid grid-list-md>
        <v-row dense>
            <v-col cols="12">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-select
                            class="mt-3"
                            :items="relatoriosList"
                            label="Escolha um Relatorio"
                            v-model="relatorioEscolhaLista"
                            color="teal accent-3"
                            outlined  
                            v-bind="attrs"
                            v-on="on"     
                            >  
                        </v-select>
                    </template>
                    <span>Selecione uma modalidade de Relatorio</span>
                  </v-tooltip>
                   
                        <v-select v-if="relatorioEscolhaLista == 'Relatorios do Estoque'"
                            :items="relatorioEstoqueList"
                            label="Tipo de relatorio para o estoque"
                            v-model="relatorioEscolha"
                            color="teal accent-3"
                            outlined  
                        >  
                        </v-select>
                        <v-select v-if="relatorioEscolhaLista == 'Relatorios de Produtos'"
                            :items="relatorioProductList"
                            label="Tipo de relatorio para os produtos"
                            v-model="relatorioEscolha"
                            color="teal accent-3"
                            outlined  
                        >  
                    </v-select>
                    
         
            </v-col>

            <RespostaRelatorio :nome-relatorio="relatorioEscolha" v-if="$store.getters.getRelatorio"></RespostaRelatorio>
            <RespostaRelatorioEstoque :nome-relatorio="relatorioEscolha" v-if="$store.getters.getRelatorioEstoque"></RespostaRelatorioEstoque>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="teal lighten-4" class="btns" @click="makeRelatorio">
                    Gerar
                </v-btn>
                <v-btn color="cyan lighten-4" class=" btns ml-3">
                    Limpar
                </v-btn>
            </v-col>
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
    .btns{
        width: 20%;
    }
</style>