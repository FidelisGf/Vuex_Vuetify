<template> 
    <v-card>
        <v-card-actions>
            <v-btn 
                icon
                @click="closeRelatorio"
            ><v-icon color="red">mdi-close</v-icon></v-btn>
        </v-card-actions>
        <v-card-title class="mt-n5">
            <span  class="text-h5 ">{{filtro}}</span>
        </v-card-title>
        <v-card-subtitle v-if="entreDatas" class="mt-2 ml-2 text-h8" ><p>De : {{starterDate}}  até : {{endDate}}</p></v-card-subtitle>
        <v-card-text class="mt-3">
            <v-row v-if="!ntTable">
                <ListaGenerica v-if="!pedidos && !vendas" :route="'products'" :opcao="filtro" :headers="headers"></ListaGenerica>
                <ListaGenerica v-if="pedidos" :route="'pedidos'" :opcao="filtro" :headers="headers" :end-date="endDate" :starter-date="starterDate"></ListaGenerica>
                <ListaGenerica v-if="vendas" :route="'vendas'" :opcao="filtro" :headers="headers" :end-date="endDate" :starter-date="starterDate"></ListaGenerica>
            </v-row>
            <v-row v-if="ntTable">
                <RelatorioEscrito v-if="notTable" :route="'vendas'" :opcao="filtro" :end-date="endDate" :starter-date="starterDate"></RelatorioEscrito>
            </v-row>
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
        console.log(this.notTable)
        
    },
    components: { ListaGenerica, RelatorioEscrito }
}   
</script>

<style lang="scss" scoped>

</style>