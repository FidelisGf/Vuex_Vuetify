<template>
    <v-card>
        <v-card-actions>
            <v-btn 
                icon
                @click="emitClose"
            ><v-icon color="red">mdi-close</v-icon></v-btn>
        </v-card-actions>
        <v-card-title class="mt-n5">
            <span  class="text-h5">{{filtro}}</span>
        </v-card-title>
        <v-card-text class="mt-5">
            <v-row>
                <ListaGenerica :route="'estoques'" :headers="headers"  :opcao="filtro" ></ListaGenerica>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import ListaGenerica from '../ListaGenerica.vue';
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
        emitClose(){
            console.log('chegou')
            this.$emit('closeModal', false)
        }
    },
    components: { ListaGenerica }
}
</script>

<style lang="scss" scoped>

</style>