<template> 
    <div>
        <v-skeleton-loader
            v-if="loading == true" class="black" :loading="loading" transition="fade-transition" type="card"
        >
        </v-skeleton-loader>
        <v-card class="relatorios" v-show="loading == false">
            <v-card-actions>
                <v-btn
                    icon 
                    dark 
                    @click="closeRelatorio"
                    class="ml-n2 mt-n1"
                >
                    <v-icon color="red accent-2">mdi-close</v-icon>
                </v-btn>
            </v-card-actions>
            <v-card-text class="mt-n2" v-if="!ntTable">
                <ListaGenerica :key="restart"  v-if="!pedidos && !vendas && !despesas" 
                :route="'products'" :opcao="filtro" :headers="headers"></ListaGenerica>
                <ListaGenerica :key="restart"  v-if="pedidos == true || vendas == true || 
                despesas == true" :route="route" :opcao="filtro" :headers="headers" 
                :end-date="endDate" :starter-date="starterDate"></ListaGenerica>
            </v-card-text>
            <v-card-text v-if="ntTable">
                <RelatorioEscrito v-if="notTable" :route="'vendas'" 
                :opcao="filtro" :end-date="endDate" :starter-date="starterDate"></RelatorioEscrito>
            </v-card-text> 
        </v-card>
    </div>
   
</template>

<script>
import ListaGenerica from '../ListaGenerica.vue';
import RelatorioEscrito from '../RelatorioEscrito.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    props: {
        nomeRelatorio: String,
        starterDate : String,
        endDate : String,
        filtro : String,
        notTable : Boolean,
    },
    data() {
        return {
            nome : '',
            tmp : false,
            pedidos : false,
            vendas : false,
            despesas : false,
            entreDatas : false,
            restart : 0,
            route : '',
        };
    },
    computed: {
        ...mapGetters({loading : 'utilMod/getLoad'}),
        ntTable : function(){
            return this.notTable
        },
        headers() {
            if(this.pedidos == true){
                return [
                    {
                        text: "CODIGO",
                        align: "start",
                        value: "ID",
                    },
                    { text: "METODO PAGAMENTO", value: "METODO_PAGAMENTO" },
                    { text: "VALOR TOTAL", value: "VALOR_TOTAL" },
                    { text: "PAGAMENTO", value: "APROVADO" },
                ];
            }else if(this.vendas == true){
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
            }else if(this.despesas == true){
                return [
                    {
                        text: "CODIGO",
                        align: "start",
                        value: "ID",
                    },
                    { text: "CUSTO", value: "CUSTO" },
                    { text: "DESC", value: "DESC" },
                    { text: "TIPO", value: "tags.NOME" },
                    { text: "DATA", value: "DATA" },
                ];
            }else{
                return [
                    {
                        text: "Produto",
                        align: "start",
                        value: "NOME",
                    },
                    { text: "Categoria", value: "category.NOME_C" },
                    { text: "Valor", value: "VALOR" }, 
                ];
            }
        },
    },
    methods: {
        ...mapActions('utilMod', ['setLoad']),
        closeRelatorio(){
            this.restart += 1
            this.$emit('closeModRelatorio', false)
        },
        stopeLoad(e){
            this.loading = e
        },
        checkRelatorio(){
            if(this.filtro == 'Vendas por periodo de dias'){
                this.route = 'vendas'
                this.vendas = true
                this.entreDatas = true
            }else if(this.filtro == 'Pedidos realizados entre duas datas'){
                this.route = 'pedidos'
                this.pedidos = true
                this.entreDatas = true
            }else if(this.filtro == 'Despesas entre duas datas'){
                this.route = 'despesas'
                this.despesas = true
                this.entreDatas = true
            }
        }
    },
    created() {
        
        this.setLoad(true)
        this.checkRelatorio()
        console.log(this.loading)
    },
    watch:{
        filtro : function(val){
            if(val){
                this.setLoad(true)
                this.restart += 1
                this.checkRelatorio()
            }
        }
    },
    components: { ListaGenerica, RelatorioEscrito }
}   
</script>

<style lang="scss">
   
</style>