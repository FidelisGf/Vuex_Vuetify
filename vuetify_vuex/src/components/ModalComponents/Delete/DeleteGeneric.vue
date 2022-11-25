<template>
    <div>
        <v-snackbar
            v-model="registro"
            :timeout="timeout"
        >
            {{this.text}}
            <template v-slot:action="{ attrs }">
            <v-btn
                color="red"
                dark
                icon
                v-bind="attrs"
                @click="registro = false"
                >
                <v-icon small>mdi-close</v-icon>
            </v-btn>
            </template>
        </v-snackbar>
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
import { mapActions, mapGetters } from 'vuex'
export default {
   data(){
      return{
        active : false,
        text : '',
        registro : false, 
        timeout : 2000,

      }
   },
   props:{
      route : String,
      id : Number,
   },
   methods:{
        ...mapActions('produtoMod', ['deleteInList']),
        ...mapActions('utilMod', ['delete']),
        async deleteItem(route){
            let payload = {id : this.id, route : route}
            this.text = await this.delete(payload)
            if(this.text != "Sem autorização !"){
              this.deleteInList(this.id)
              this.registro = true
              this.active = false
            }else{
              this.registro = true
              this.active = false
            }
        }
   },
   computed:{
      ...mapGetters({generico : 'utilMod/getGenerico'})
   },
}
</script>

<style lang="scss" >

</style>