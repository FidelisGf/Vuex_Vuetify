<template>
    <ProductModal :miniatura="false"></ProductModal>               
</template>
<script>
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
    components: { ProductModal }
}
</script>

<style lang="scss" scoped>

</style>