<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12"> 
                <v-card>
                    <v-card-title>
                        <span  class="text-h5">{{filtro}}</span>
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <v-row>
                            <ListaGenerica :route="'estoques'" :opcao="filtro"></ListaGenerica>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import ListaGenerica from '../ListaGenerica.vue';
import {mapActions} from 'vuex'
export default {
    props: {
        filtro : String,

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
        ...mapActions('utilMod', ['setHeader']),
        getLista() {
            this.setHeader(this.headers)
        },
    },
    created() {
        
        console.log('Foda')
        this.getLista()
    },
    components: { ListaGenerica }
}
</script>

<style lang="scss" scoped>

</style>