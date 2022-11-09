<template> 
    <v-card class="relatorios">
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
            <ListaGenerica v-if="!pedidos && !vendas" :route="'products'" :opcao="filtro" :headers="headers"></ListaGenerica>
            <ListaGenerica v-if="pedidos" :route="'pedidos'" :opcao="filtro" :headers="headers" :end-date="endDate" :starter-date="starterDate"></ListaGenerica>
            <ListaGenerica v-if="vendas" :route="'vendas'" :opcao="filtro" :headers="headers" :end-date="endDate" :starter-date="starterDate"></ListaGenerica>
        </v-card-text>
        <v-card-text v-if="ntTable">
            <RelatorioEscrito v-if="notTable" :route="'vendas'" :opcao="filtro" :end-date="endDate" :starter-date="starterDate"></RelatorioEscrito>
        </v-card-text>
    </v-card>
</template>

<script>
import ListaGenerica from '../ListaGenerica.vue';
import RelatorioEscrito from '../RelatorioEscrito.vue';
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
            entreDatas : false,
        };
    },
    computed: {
        ntTable : function(){
            return this.notTable
        },
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
        closeRelatorio(){
            this.$emit('closeModRelatorio', false)
        },
        checkRelatorio(){
            if(this.filtro == 'Vendas por periodo de dias'){
                this.vendas = true
                this.entreDatas = true
            }else if(this.filtro == 'Pedidos realizados entre duas datas'){
                this.pedidos = true
                this.entreDatas = true
            }
        }
    },
    created() {
        this.checkRelatorio()
        
    },
    components: { ListaGenerica, RelatorioEscrito }
}   
</script>

<style lang="scss">
   
</style>