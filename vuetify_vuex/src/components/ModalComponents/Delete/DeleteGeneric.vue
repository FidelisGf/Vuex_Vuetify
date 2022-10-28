<template>
    <div>
        <v-dialog
            v-model="active"
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
import { mapActions, mapGetters } from 'vuex'
export default {
   props:{
      route : String,
   },
   methods:{
        ...mapActions('produtoMod', ['deleteInList']),
        ...mapActions('utilMod', ['desativateDelete']),
        closeDelete(){
            this.desativateDelete()
        },
        deleteItem(route){
            console.log(route)
            let id = 0
            if(route == 'categorys'){
                id = this.generico.ID_CATEGORIA
            }else{
                id = this.generico.ID
            }
            axios.delete("http://127.0.0.1:8000/api/" + route  + "/"+ id ).then((res)=>{
                if(res.status == 200){
                    alert('Item Deletado com sucesso')
                    this.deleteInList(id)
                    this.desativateDelete()
                }
            })
        }

   },
   computed:{
      ...mapGetters({active : 'utilMod/delete', generico : 'utilMod/getGenerico'})
   },
   created(){
      console.log(this.route)
      //this.deleteItem(this.route)
   }
}
</script>

<style lang="scss" scoped>

</style>