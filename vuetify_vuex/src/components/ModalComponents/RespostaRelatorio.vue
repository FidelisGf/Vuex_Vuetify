<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12"> 
                <v-dialog
                    v-model="$store.getters.getRelatorio"
                    persistent
                    max-width="620px"
                    @keydown.escape="closeRelatorio"
                > 
                    <v-card>
                    <v-card-title>
                        <span  class="text-h5">{{this.$store.getters.getFiltro}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <ListaGenerica v-if="!pedidos" :route="'products'" :opcao="this.$store.getters.getFiltro"></ListaGenerica>
                            <ListaGenerica v-if="pedidos" :route="'pedidos'" :opcao="this.$store.getters.getFiltro" :end-date="starterDate" :starter-date="endDate"></ListaGenerica>
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
            if(this.$store.getters.getFiltro == 'Pedidos realizados entre duas datas'){
                this.pedidos = true
            }
            this.$store.commit("setHeader", this.headers)
        },
    },
    created() {
        console.log(this.starterDate)
        console.log(this.endDate)
        this.getLista()
    },
    components: { ListaGenerica }
}   
</script>

<style lang="scss" scoped>

</style>