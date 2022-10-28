<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12"> 
                <v-dialog
                    v-model="relatorio"
                    persistent
                    max-width="720px"
                    @keydown.escape="closeRelatorio"
                > 
                    <v-card>
                    <v-card-title>
                        <span  class="text-h5">{{filtro}}</span>
                    </v-card-title>
                    <v-card-subtitle v-if="entreDatas" class="mt-2 ml-2 text-h8" ><p>De : {{starterDate}}  até : {{endDate}}</p></v-card-subtitle>
                    <v-card-text>
                        <v-row v-if="!this.notTable">
                            <ListaGenerica v-if="!pedidos && !vendas" :route="'products'" :opcao="filtro"></ListaGenerica>
                            <ListaGenerica v-if="pedidos" :route="'pedidos'" :opcao="filtro" :end-date="endDate" :starter-date="starterDate"></ListaGenerica>
                            <ListaGenerica v-if="vendas" :route="'vendas'" :opcao="filtro" :end-date="endDate" :starter-date="starterDate"></ListaGenerica>
                        </v-row>
                        <v-row v-if="notTable">
                            <RelatorioEscrito v-if="notTable" :route="'vendas'" :opcao="filtro" :end-date="endDate" :starter-date="starterDate"></RelatorioEscrito>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn
                                color="teal lighten-1"
                                text
                                @click="closeRelatorio"
                                class="mt-n5"
                            >
                            Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ListaGenerica from '../ListaGenerica.vue';
import RelatorioEscrito from '../RelatorioEscrito.vue';
import {mapActions, mapGetters} from 'vuex'
export default {
    props: {
        nomeRelatorio: String,
        starterDate : String,
        endDate : String,
    },
    data() {
        return {
            nome : '',
            tmp : false,
            pedidos : false,
            vendas : false,
            entreDatas : false,

        };
    },
    computed: {
        ...mapGetters({filtro : 'utilMod/getFiltro', notTable : 'utilMod/getNotTableFiltro', relatorio: 'utilMod/getRelatorio'}),
        headers() {
            if(this.filtro == 'Pedidos realizados entre duas datas'){
                return [
                    {
                        text: "CODIGO",
                        align: "start",
                        value: "ID",
                    },
                    { text: "METODO PAGAMENTO", value: "METODO_PAGAMENTO" },
                    { text: "VALOR TOTAL", value: "VALOR_TOTAL" },
                    { text: "PAGAMENTO", value: "APROVADO" },
                    { text: "PRODUTOS", value: "PRODUTOS" },
                ];
            }else if(this.filtro == 'Vendas por periodo de dias'){
                return [
                    {
                        text: "CODIGO",
                        align: "start",
                        value: "ID",
                    },
                    { text: "METODO PAGAMENTO", value: "METODO_PAGAMENTO" },
                    { text: "VALOR TOTAL", value: "VALOR_TOTAL" },
                    { text: "DATA DE PAGAMENTO", value: "DT_PAGAMENTO" },
                ];
            }else{
                return [
                    {
                        text: "Produto",
                        align: "start",
                        value: "NOME",
                    },
                    { text: "Descrição", value: "DESC" },
                    { text: "Valor", value: "VALOR" },
                    { text: "Categoria", value: "category.NOME_C" },
                ];
            }
        },
    },
    methods: {
        ...mapActions('utilMod', ['setHeader', 'desativeRelatorio', 'deleteFiltro', 'setNotTableFiltro', 'disableNotTableFiltro']),
        closeRelatorio() {
            this.desativeRelatorio()
            this.deleteFiltro()
        },
        getLista() {
            this.setHeader(this.headers)
        },
        checkRelatorio(){
            if(this.filtro == 'Vendas por periodo de dias'){
                this.vendas = true
                this.entreDatas = true
            }else if(this.filtro == 'Pedidos realizados entre duas datas'){
                this.pedidos = true
                this.entreDatas = true
            }else if(this.filtro == 'Vendas por Tipo de Pagamento'){
                this.setNotTableFiltro()
            }
        }
    },
    created() {
        this.disableNotTableFiltro()
        this.checkRelatorio()
        console.log(this.notTable)
        if(!this.notTable){
            this.getLista()
        }
        
    },
    components: { ListaGenerica, RelatorioEscrito }
}   
</script>

<style lang="scss" scoped>

</style>