<template>
    <ProductModal :miniatura="false"></ProductModal>               
</template>
<script>
import ProductModal from '@/components/ModalComponents/ProductModal.vue'
import categoryService from '@/service/categoryService'
export default {
    methods:{
        getCategoria(){
            categoryService.getCategory(1).then((res)=>{
                this.$store.commit("beginListCategoria",res.data.data)
            })
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