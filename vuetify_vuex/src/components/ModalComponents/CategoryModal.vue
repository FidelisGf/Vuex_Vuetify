<template>
    <div>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="300px"
            @keydown.escape="dialog = false"
            >
            <template v-if="miniatura" v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                icon 
                >
                <v-icon dark color="teal lighten-1">mdi-plus-circle-outline</v-icon>
                </v-btn>
            </template>
            <v-card class="cards-colors">
                <v-card-title>
                    <span class="text-h6 white--text">Cadastro de Categoria</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"         
                            >
                                <v-text-field
                                label="Nome da Categoria"
                                required
                                dark
                                v-model="NOME"
                                counter="60"
                                color="teal lighten-1"
                                ></v-text-field>
                            </v-col>
                        </v-row>    
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                            color="red accent-2"
                            text
                            @click="dialog = false"
                        >
                        Fechar
                        </v-btn>
                        <v-btn
                            color="teal accent-3"
                            text
                            @click="postCategory"
                        >
                        Salvar
                        </v-btn>
                </v-card-actions>
            </v-card>       
        </v-dialog>   
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
   props:{
        miniatura : Boolean
   },
   data(){
    return{
        dialog : false,
        NOME : '',
    }
   },
   methods:{
        ...mapActions('categoryMod', ['saveListCategoria']),
        async postCategory(){
            let payload = {NOME_C : this.NOME}
            let text = await this.saveListCategoria(payload)
            this.$emit('insertCategory', text)
        }
   }
}
</script>

<style lang="scss" >

</style>