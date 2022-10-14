<template>
    <div>
        <v-dialog
            v-model="$store.getters.delete"
            persistent
            max-width="520"
        >
        <v-card>
          <v-card-title class="text-h5">
            Deseja mesmo deletar esse Item ?
          </v-card-title>
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
              @click="deleteItem(route)"
            >
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
   props:{
      route : String,
   },
   methods:{
        closeDelete(){
            this.$store.commit('desativateDelete')
        },
        deleteItem(route){
            console.log(route)
            let id = 0
            if(route == 'products'){
                id = this.$store.getters.getGenerico.ID_PRODUTO
            }else if(route == 'categorys'){
                id = this.$store.getters.getGenerico.ID_CATEGORIA
            }else{
                id = this.$store.getters.getGenerico.ID
            }
            axios.delete("http://127.0.0.1:8000/api/" + route  + "/"+ id ).then((res)=>{
                if(res.status == 200){
                    alert('Item Deletado com sucesso')
                    this.$store.commit('deleteInListProduct', id)
                    this.$store.commit('desativateDelete')
                }
            })
        }

   },
   created(){
      console.log(this.$store.getters.getGenerico.ID_PRODUTO)
      console.log(this.route)
      //this.deleteItem(this.route)
   }
}
</script>

<style lang="scss" scoped>

</style>