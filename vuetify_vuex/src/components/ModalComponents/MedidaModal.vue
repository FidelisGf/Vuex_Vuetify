<template>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="300px"
    @keydown.escape="dialog = false"
    >
    <template  v-slot:activator="{ on, attrs }">
        <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        icon 
        class="mt-4 ml-2"
        >
        <v-icon dark color="deep-purple lighten-3">mdi-plus-circle-outline</v-icon>
        </v-btn>
    </template>
    <v-card class="cards-colors">
        <v-card-title class="white--text">
            <span class="text-h6">Cadastro de Medida</span>
        </v-card-title>
        <v-card-text class="white--text">
            <v-container>
                <v-row>
                    <v-col
                        cols="12"         
                    >
                        <v-text-field
                        label="Nome da Medida"
                        required
                        v-model="NOME"
                        dark
                        counter="20"
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
                    @click="postMedida"
                >
                Salvar
                </v-btn>
        </v-card-actions>
    </v-card>       
</v-dialog>   
</template>

<script>
import {mapActions} from 'vuex'
export default {
   
   data(){
    return{
        dialog : false,
        NOME : '',
    }
   },
   methods:{
        ...mapActions('medidaMod', ['post']),
        async postMedida(){
            let payload = {NOME : this.NOME}
            let text = await this.post(payload)
            this.$emit('insertMedida', text)
            
        }
   }
}
</script>

<style lang="scss" scoped>

</style>