<template>
    <v-container>
        <v-dialog
            v-model="active"
            persistent
            max-width="600px"
            @keydown.escape="disableModalCadastro"
        >
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
                                v-model="NOME"
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
                        @click="disableModalCadastro"
                    >
                    Fechar
                    </v-btn>
                    <v-btn 
                        color="green lighten-1"
                        text
                        @click="cadastrarTag"
                    >
                    Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
   data(){
    return{
        DESC : '',
        CUSTO : 0,
        DATA : '',
        TAGS : [],
        TAG : null
    }
   },
   methods:{
        ...mapActions('despesaMod', ['disableModalCadastro'])
   },

   computed:{
        ...mapGetters({active : 'despesaMod/getModalCadastro'})
   }
}
</script>

<style lang="scss" scoped>

</style>