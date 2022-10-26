<template>
    <v-container>
        <v-dialog
            v-model="active"
            persistent
            max-width="300px"
            @keydown.escape="disableModalCadastro"
        >
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
            NOME : '',
        }
    },
    methods:{

        ...mapActions('tagMod', ['disableModalCadastro', 'post']),
        cadastrarTag(){
            let payload = {NOME : this.NOME}
            this.post(payload)
        }
    },
    computed:{
        ...mapGetters({active : 'tagMod/getModalCadastro'})
    }


}
</script>

<style lang="scss" scoped>

</style>