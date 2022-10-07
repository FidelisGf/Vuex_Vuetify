<template>
    <div>
        <v-dialog
            v-model="$store.getters.deleteProduct"
            persistent
            max-width="520"
        >
        <v-card>
          <v-card-title class="text-h5">
            Deseja mesmo deletar esse produto ?
          </v-card-title>
          <v-card-text>
            <p>Os dados desse produto serão excluidos do seu sistema. <b>Atenção !</b></p>
            <p><b>Nome do Produto :</b> {{$store.getters.getProduct.NOME}}</p>
            <p><b>Descrição do Produto :</b> {{$store.getters.getProduct.DESC}}</p>
            <p><b>Valor do Produto :</b> {{$store.getters.getProduct.VALOR}}</p>
            <small>O estoque desse item será removido</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken"
              text
              @click="closeDelete"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              @click="deleteProduct"
            >
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
<script>
import productService from '@/service/productService'
export default {

   methods:{
        closeDelete(){
            this.$store.commit('desativateDeleteProduct')
        },
        deleteProduct(){
            productService.deleteProduct(this.$store.getters.getProduct.ID_PRODUTO).then((res)=>{
                if(res.status == 200){
                    alert('Produto Deletado com sucesso')
                    this.$store.commit('deleteInListProduct', this.$store.getters.getProduct.ID_PRODUTO )
                    this.$store.commit('desativateDeleteProduct')
                }
            })
        }

   }
}
</script>

<style lang="scss" scoped>

</style>