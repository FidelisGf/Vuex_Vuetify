<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12"> 
                <v-dialog
                    v-model="$store.getters.getRelatorio"
                    persistent
                    max-width="720px"
                    @keydown.escape="closeRelatorio"
                > 
                    <v-card>
                    <v-card-title>
                        <span  class="text-h5">{{this.$store.getters.getFiltro}}</span>
                    </v-card-title>
                    <v-card-subtitle class="mt-2 ml-2 text-h8" ><p>De : {{starterDate}}  até : {{endDate}}</p></v-card-subtitle>
                    <v-card-text>
                        <v-row v-if="!this.$store.getters.getNotTableFiltro">
                            <ListaGenerica v-if="!pedidos && !vendas" :route="'products'" :opcao="this.$store.getters.getFiltro"></ListaGenerica>
                            <ListaGenerica v-if="pedidos" :route="'pedidos'" :opcao="this.$store.getters.getFiltro" :end-date="endDate" :starter-date="starterDate"></ListaGenerica>
                            <ListaGenerica v-if="vendas" :route="'vendas'" :opcao="this.$store.getters.getFiltro" :end-date="endDate" :starter-date="starterDate"></ListaGenerica>
                        </v-row>
                        <v-row v-if="this.$store.getters.getNotTableFiltro">
                            <RelatorioEscrito v-if="this.$store.getters.getNotTableFiltro" :route="'vendas'" :opcao="this.$store.getters.getFiltro" :end-date="endDate" :starter-date="starterDate"></RelatorioEscrito>
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

        };
    },
    computed: {
        headers() {
            if(this.$store.getters.getFiltro == 'Pedidos realizados entre duas datas'){
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
            }else if(this.$store.getters.getFiltro == 'Vendas por periodo de dias'){
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
                    { text: "Categoria", value: "category.NOME" },
                ];
            }
        },
    },
    methods: {
        closeRelatorio() {
            this.$store.commit("desativeRelatorio")
            this.$store.commit("deleteFiltro")
        },
        getLista() {
            this.$store.commit("setHeader", this.headers)
        },
        checkRelatorio(){
            if(this.$store.getters.getFiltro == 'Vendas por periodo de dias'){
                this.vendas = true
            }else if(this.$store.getters.getFiltro == 'Pedidos realizados entre duas datas'){
                this.pedidos = true
            }else{
                this.$store.commit("setNotTableFiltro");
            }
        }
    },
    created() {
        this.$store.commit("disableNotTableFiltro");
        this.checkRelatorio()
        console.log(this.$store.getters.getNotTableFiltro)
        if(!this.$store.getters.getNotTableFiltro){
            this.getLista()
        }
        
    },
    components: { ListaGenerica, RelatorioEscrito }
}   
</script>

<style lang="scss" scoped>

</style>