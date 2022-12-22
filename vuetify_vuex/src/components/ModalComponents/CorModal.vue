<template>
    <div>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="500px"
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
                    <span class="text-h6 white--text">Cadastro de Cor</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="7"         
                            >
                                <v-color-picker
                                    v-model="HEX"
                                    elevation="15"
                                    dot-size="15"
                                    swatches-max-height="100"
                                    mode="hexa"
                                ></v-color-picker>
                            </v-col>
                           
                            <v-col
                                cols="5"         
                            >
                                <v-text-field
                                    label="Nome da Cor"
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
                            @click="saveCor"
                        >
                        Salvar
                        </v-btn>
                </v-card-actions>
            </v-card>       
        </v-dialog>   
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props:{
        miniatura : Boolean
    },
    data(){
       
        return {
            NOME : '',
            HEX : '',
            dialog : false,
        }
    },
    methods:{
        ...mapActions('corMod', ['postCor']),
        async saveCor(){
            let payload = {NOME : this.NOME, HASH : this.HEX}
            let msg = await this.postCor(payload)
            this.NOME = ''
            this.$emit('cadastrado', msg)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>