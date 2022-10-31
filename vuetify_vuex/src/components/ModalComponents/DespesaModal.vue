<template>
    <v-container>
        <v-dialog
            v-model="active"
            persistent
            max-width="600px"
            @keydown.escape="active = false"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="teal accent-3"
                    class="mt-1 ml-1  font-weight-medium"
                    dark
                    text
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon  dark color="teal accent-3" left>mdi-plus-circle-outline</v-icon>
                    Despesas
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    Registrar uma despesa
                </v-card-title>
                <v-card-text>
                   <v-row>
                            <v-col 
                            cols="12"
                            sm="6"
                           
                        >
                            <v-text-field
                                label="Descrição da despesa"
                                required
                                v-model="DESC"
                                color="teal lighten-1"
                            ></v-text-field>
                        </v-col>
                        <v-col 
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                                v-model="CUSTO"
                                label="Custo da despesa"
                                persistent-hint
                                required
                                color="teal lighten-1"
                                type="number"
                                min="0"
                                prefix="R$"
                            ></v-text-field>
                        </v-col>
                        <v-col 
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                                v-model="DATA"
                                label="Data"
                                persistent-hint
                                required
                                color="teal lighten-1"
                                type="date"
                    
                            ></v-text-field>
                           
                        </v-col>
                        <v-col 
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field
                            v-model="HORA"    
                            label="Hora"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="time"
        
                        ></v-text-field>
                       
                        </v-col>
                       
                        <v-col
                            cols="12"
                            sm="6"
                            class="d-flex"
                        >  
                            <v-select
                                :items="TAGS"
                                label="Tipo da despesa"
                                v-model="TAG"
                                color="teal lighten-1"
                                item-text="NOME" 
                                return-object
                            ></v-select>       
                        </v-col>
                   </v-row>
                </v-card-text>
                <v-card-actions class="mt-n4">
                    <v-btn
                        color="red lighten-1"
                        text
                        @click="active = false"
                    >
                    Fechar
                    </v-btn>
                    <v-btn 
                        color="green lighten-1"
                        text
                        @click="insert"
                    >
                    Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
   data(){
    return{
        DESC : '',
        CUSTO : 0,
        DATA : '',
        HORA : '',
        DTFINAL : '',
        TAG : null,
        active : false,
    }
   },
   computed:{
    ...mapGetters({TAGS : 'tagMod/getTags'})
   },
   methods:{
        ...mapActions('despesaMod', ['disableModalCadastro', 'save']),
        ...mapActions('produtoMod', ['saveList']),

       async insert(){
            this.saveHoraFinal()
            let custo = parseFloat(this.CUSTO)
            custo = custo.toFixed(2)
            if(this.DTFINAL != ''){
                let payload = {DESC : this.DESC, CUSTO : custo, DATA : this.DTFINAL, ID_TAG : this.TAG.ID}
                let Id = await this.save(payload)
                if(Id != null){
                    let payload2 = {ID : Id, DESC : this.DESC, CUSTO : custo, DATA : this.DTFINAL, tags : this.TAG}
                    console.log('blz')
                    console.log(payload)
                    console.log(payload2)
                    this.saveList(payload2)
                } 
            }else{
                alert('Data Invalida !');
            }
            this.clear()
        },
        saveHoraFinal(){
            let tmp = this.DATA
            this.DTFINAL = tmp + ' ' + this.HORA
        },
        clear(){
            this.DESC = ''
            this.CUSTO = 0
            this.DATA = ''
            this.HORA = ''
            this.TAG = null
        }
   },

   

   
}
</script>

<style lang="scss" scoped>

</style>