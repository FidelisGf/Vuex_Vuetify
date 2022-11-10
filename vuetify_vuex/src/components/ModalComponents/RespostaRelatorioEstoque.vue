<template>
    <div>
        <v-skeleton-loader
            v-if="loading == true" class="black" :loading="loading" transition="fade-transition" type="card"
        ></v-skeleton-loader>
        <v-card class="relatorios" v-show="loading == false">
            <v-card-actions>
                <v-btn 
                    icon
                    @click="emitClose"
                    class="ml-n3 mt-n2"
                ><v-icon color="red accent-1">mdi-close</v-icon></v-btn>
            </v-card-actions>
            <v-card-text class="mt-5 white--text">
                <v-row>
                    <ListaGenerica :route="'estoques'" :headers="headers"  :opcao="filtro" ></ListaGenerica>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
  
</template>
<script>
import ListaGenerica from '../ListaGenerica.vue';
import { mapGetters } from 'vuex';
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
        ...mapGetters({loading : 'utilMod/getLoad'}),
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
        emitClose(){
            this.$emit('closeModal', false)
        }
    },
    components: { ListaGenerica }
}
</script>

<style lang="scss" scoped>

</style>