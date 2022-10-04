<template>

    <v-container fluid grid-list-md>
        
        <v-row dense>
            <v-col cols="12">
                <ProductModal :miniatura="false">
                    
                </ProductModal>
            </v-col>
        </v-row>
        <v-row >
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="products"
                    :items-per-page="5"
                    class="elevation-1"
                >
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>                   
</template>
<script>
import productService from '@/service/productService'
import ProductModal from '@/components/ModalComponents/ProductModal.vue'
export default {
    data() {
        return {
            data: [],
            categorias: [],
            Categoria: null,
            headers: [
                {
                    text: "Produto",
                    align: "start",
                    value: "NOME",
                },
                { text: "Descrição", value: "DESC" },
                { text: "Valor", value: "VALOR" },
                { text: "Categoria", value: "category.NOME" },
            ],
            products: [],
            dialog: false,
            NOME: "",
            quantidade_inicial: 0,
            DESC: "",
            VALOR: 0,
            ID_CATEGORIA: 0,
        };
    },
    methods: {
        getProdutos() {
            productService.getProdutos().then((response) => {
                console.log(response);
                this.products = response.data.data;
            });
        },
    },
    async created() {
        this.getProdutos();
    },
    components: { ProductModal }
}
</script>

<style lang="scss" scoped>

</style>