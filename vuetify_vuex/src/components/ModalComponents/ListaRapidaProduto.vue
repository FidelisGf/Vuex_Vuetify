<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12"> 
                <v-dialog
                    v-model="$store.getters.getListRapidaProdutos"
                    persistent
                    max-width="600px"
                > 
                    <v-card>
                    <v-card-title>
                        <p  class="text-h5">Lista de Produtos</p>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                           <ListaGenerica :route="'products'"></ListaGenerica>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn
                                color="teal lighten-1"
                                text
                                @click="fechar"
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
import ListaGenerica from '../ListaGenerica.vue'
export default {
    data() {
        return {
            pagination: {
                current: 1,
                total: 0
            },
        };
    },
    methods: {
        getLista() {
            this.$store.commit("setHeader", this.headers)
        },
        fechar() {
            this.$store.commit("desativeListaRapidaProdutos");
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: "Codigo",
                    align: "start",
                    value: "ID_PRODUTO",
                },
                {
                    text: "Produto",
                    value: "NOME",
                },
                { text: "Descrição", value: "DESC" },
                { text: "Valor", value: "VALOR" },
                { text: "Categoria", value: "category.NOME" },
            ];
        },
    },
    created() {
        this.getLista();
    },
    components: { ListaGenerica }
}
</script>

<style lang="scss" scoped>

</style>