<template>
    <v-container>
        <v-snackbar
            v-model="registro"
            :timeout="timeout"
        >
            {{this.msg}}
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
            <v-card class="cards-colors">
                <v-card-title class="white--text">
                    Cadastro tipo de despesa
                </v-card-title>
                <v-card-subtitle class="white--text">
                    Insira o nome do tipo abaixo...
                </v-card-subtitle>
                <v-card-text>
                    <v-text-field
                        label="Nome do tipo de despesa"
                        required
                        v-model="NOME"
                        dark
                        color="teal lighten-1"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        color="red accent-1"
                        text
                        @click="active = false"
                    >
                    Fechar
                    </v-btn>
                    <v-btn 
                        color="teal accent-2"
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
            registro : false,
            msg : '',
            timeout : 2000,
        }
    },
    methods:{
        ...mapActions('tagMod', ['post']),
        async cadastrarTag(){
            let payload = {NOME : this.NOME}
            this.msg = await this.post(payload)
            this.NOME = ''
            this.active = false
            this.registro = true
        }
    },
}
</script>

<style lang="scss" scoped>

</style>