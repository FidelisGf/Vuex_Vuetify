<template>
    <div>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="421px"
            @keydown.escape="dialog = false"
            >
            <template  v-slot:activator="{ on, attrs }">
                <v-btn
                color="teal accent-3"
                class="mt-0 ml-1  font-weight-medium"
                dark
                text
                v-bind="attrs"
                v-on="on"
                >
                <v-icon  dark color="teal accent-3" left>mdi-plus-circle-outline</v-icon>
                    Materias Prima
                </v-btn>
            </template>
            <v-card color="grey darken-3">
                <v-card-actions>
                    <v-btn
                        icon 
                        dark 
                        @click="dialog = false"
                        class="ml-n4 mt-n2"
                    >
                    <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-card-title class="d-flex justify-center mt-n8">
                    <span class="text-h6 white--text">Controle de Materias Primas</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row class="d-flex flex-column justify-center">
                            <v-col
                                cols="12"
                                class="d-flex justify-center"         
                            >
                                <v-btn
                                    outlined
                                    dark
                                    color="teal accent-3"
                                    @click="cadModal = true"
                                >
                                    Adicionar nova Materia Prima
                                </v-btn>

                                <v-dialog
                                    v-model="cadModal"
                                    persistent
                                    max-width="551px"
                                    @keydown.escape="cadModal = false"
                                >
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
                                    <form>
                                        <v-card color="grey darken-3">
                                            <v-card-title class="text-h6 white--text">
                                                Cadastro de Materia Prima
                                            </v-card-title>
                                            <v-card-text>
                                                <v-row >
                                                    <v-col cols="12">
                                                        <v-text-field
                                                            dark
                                                            label="Nome da Materia"
                                                            required
                                                            v-model="NOME"
                                                            counter="100"

                                                            color="teal lighten-1"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field
                                                            dark
                                                            label="Custo da Materia"
                                                            required
                                                            v-model="CUSTO"
                                                            color="teal lighten-1"
                                                            prefix="R$"
                                                            type="number"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field
                                                            dark
                                                            label="Quantidade Inicial"
                                                            required
                                                            v-model="QUANTIDADE"
                                                            color="teal lighten-1"
                                                            type="number"
                                                            value="1"
                                                            min="1"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                            <v-card-actions class="d-flex justify-center">
                                                
                                                <v-btn
                                                    text 
                                                    dark 
                                                    color="red lighten-2"
                                                    @click="cadModal = false"
                                                >Fechar</v-btn>
                                                <v-btn
                                                    text 
                                                    dark 
                                                    color="green accent-3"
                                                    @click="saveMateriaPrima"
                                                >Salvar</v-btn>
                                                  
                                            </v-card-actions>
                                        </v-card>
                                    </form>
                                    
                                </v-dialog>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"    
                                class="d-flex justify-center"     
                            >   
                                <v-btn
                                    outlined
                                    dark
                                    color="teal accent-3"
                                >
                                    Aumentar Estoque da Materia
                                </v-btn>
                            </v-col>    
                        </v-row>        
                    </v-container>
                </v-card-text>
            </v-card>       
        </v-dialog>   
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
   data(){
        return{
            dialog : false,
            cadModal : false,
            NOME : '',
            CUSTO : 0,
            QUANTIDADE : 0,
            msg : '',
            registro : false,
            timeout : 2000,
        }
   },
   methods:{
        ...mapActions('materiaMod', ['post', 'findMateria']),
        async saveMateriaPrima() {
            let payload = {NOME : this.NOME, CUSTO : this.CUSTO, QUANTIDADE : this.QUANTIDADE}
            this.msg = await this.post(payload)
            this.registro = true
            this.clear()
        },
       
        clear(){
            this.NOME = ''
            this.CUSTO = 0
            this.QUANTIDADE  = 0
        }
   }
}
</script>

<style lang="scss" scoped>

</style>