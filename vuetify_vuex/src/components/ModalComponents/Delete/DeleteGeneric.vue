<template>
    <div>
        <v-dialog
            v-model="active"
            persistent
            max-width="520"
            @keydown.escape="active = false"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            icon 
            small
            >
              <v-icon color="red accent-3" >mdi-delete</v-icon>
            </v-btn>
        </template>
        <v-card class="cards-colors">
          
          <v-card-title class="text-h5 white--text">
            Deseja mesmo deletar esse Item ?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green accent-3"
              text
              @click="active = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="red accent-3"
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
   data(){
      return{
        active : false,
      }
   },
   props:{
      route : String,
      id : Number,
   },
   methods:{
        ...mapActions('produtoMod', ['deleteInList']),
        deleteItem(route){
            axios.delete("http://127.0.0.1:8000/api/" + route  + "/"+ this.id ).then((res)=>{
                if(res.status == 200){
                    alert('Item Deletado com sucesso')
                    this.deleteInList(this.id)
                    this.active = false
                }
            })
        }
   },
   computed:{
      ...mapGetters({generico : 'utilMod/getGenerico'})
   },
}
</script>

<style lang="scss" >

</style>