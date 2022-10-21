<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12"> 
                <v-dialog
                    v-model="active"
                    persistent
                    max-width="600px"
                > 
                    <v-card>
                    <v-card-title>
                        <span  class="text-h5">{{filtro}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <ListaGenerica :route="'estoques'" :opcao="filtro"></ListaGenerica>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn
                                color="teal lighten-1"
                                text
                                @click="closeRelatorio"
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
import {mapGetters, mapMutations} from 'vuex'
export default {
    props: {
        nomeRelatorio: String
    },
    data() {
        return {
            pagination: {
                current: 1,
                total: 0
            },
            lista: []
        };
    },
    computed: {
        ...mapGetters({filtro : 'estoqueMod/getFiltroEstoque', active : 'estoqueMod/getRelatorioEstoque'}),
        headers() {
            if(this.filtro != 'Produtos com mais saidas'){
                return [
                    {
                        text: "Produto",
                        align: "start",
                        value: "product[0].NOME",
                    },
                    { text: "Descrição", value: "product[0].DESC" },
                    { text: "Valor", value: "product[0].VALOR" },
                    { text: "Quantidade", value: "QUANTIDADE" },
                ];
            }else{
                return [
                    {
                        text: "Produto",
                        align: "start",
                        value: "product[0].NOME",
                    },
                    { text: "Descrição", value: "product[0].DESC" },
                    { text: "Valor", value: "product[0].VALOR" },
                    { text: "Quantidade", value: "QUANTIDADE" },
                    { text: "Saidas", value: "SAIDAS" },
                ];
            }
          
        },
    },
    methods: {
        ...mapMutations('estoqueMod', ['desativeRelatorioEstoque']),
        closeRelatorio() {
            this.desativeRelatorioEstoque()
        },
        getLista() {
            this.$store.commit("setHeader", this.headers)
        },
    },
    created() {
        this.getLista()
    },
    components: { ListaGenerica }
}
</script>

<style lang="scss" scoped>

</style>