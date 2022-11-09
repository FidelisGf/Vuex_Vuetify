<template>
    <ProductModal  :miniatura="false"></ProductModal>               
</template>
<script>
import ProductModal from '@/components/ModalComponents/ProductModal.vue'

export default {
    methods:{
        getCategoria(){
            this.$store.dispatch('categoryMod/beginListCategoria')
        }
    },
    created(){
        this.getCategoria()
    },
    components: { ProductModal }
}
</script>

<style lang="scss" scoped>

</style>