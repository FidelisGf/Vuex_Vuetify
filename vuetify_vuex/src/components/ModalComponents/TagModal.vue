<template>
    <v-container>
        <v-dialog
            v-model="active"
            persistent
            max-width="300px"
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
                            Tipo de Despesa
                    </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    Cadastro tipo de despesa
                </v-card-title>
                <v-card-subtitle>
                    Insira o nome do tipo abaixo...
                </v-card-subtitle>
                <v-card-text>
                    <v-text-field
                        label="Nome do tipo de despesa"
                        required
                        v-model="NOME"
                        color="teal lighten-1"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
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
import {mapActions } from 'vuex';
export default {
    data(){
        return{
            NOME : '',
            active : false,
        }
    },
    methods:{
        ...mapActions('tagMod', ['post']),
        cadastrarTag(){
            let payload = {NOME : this.NOME}
            this.post(payload)
            this.NOME = ''
        }
    },
}
</script>

<style lang="scss" scoped>

</style>