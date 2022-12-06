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
            <v-card class="cards-colors">
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
                                    
                                    <form>
                                        <v-card class="cards-colors">
                                            <v-card-title class="text-h6 white--text">
                                                Cadastro de Materia Prima
                                            </v-card-title>
                                            <v-card-text>
                                                <v-row class="d-flex flex-row" >
                                                    <v-col cols="8">
                                                        <v-text-field
                                                            dark
                                                            label="Nome da Materia"
                                                            required
                                                            v-model="NOME"
                                                            counter="100"

                                                            color="teal lighten-1"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="4">
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
                                                    <v-col cols="8">
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
                                            <v-card-actions class="d-flex justify-end">
                                                
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
                                    @click="qntdModal = true"
                                >
                                    Aumentar Estoque da Materia
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-dialog
                                    v-model="qntdModal"
                                    persistent
                                    max-width="551px"
                                    @keydown.escape="qntdModal = false"
                                >
                                    <v-card class="cards-colors">
                                        <v-card-title class="white--text text-subtitle-1 text-md-h6 ">
                                            Adicionar Quantidade para Matéria 
                                        </v-card-title>
                                        <v-card-text>
                                            <v-row class="d-flex flex-row mt-2">
                                                <v-col cols="7">
                                                    <v-text-field
                                                        dark
                                                        label="Codigo do Material"
                                                        required
                                                        v-model="codigo"
                                                        color="teal lighten-1"
                                                        type="number"
                                                        value="1"
                                                        append-icon="mdi-list-box"
                                                        @click:append="(listaRapida = true)"
                                                        min="1"
                                                        @keydown.f2="listaRapida = true"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-text-field
                                                        dark
                                                        label="Quantidade a ser adicionada"
                                                        required
                                                        v-model="QUANTIDADE"
                                                        color="teal lighten-1"
                                                        type="number"
                                                        value="1"
                                                        min="1"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>  
                                            <v-row>
                                                <v-col>
                                                    <v-dialog
                                                        v-model="listaRapida"
                                                        persistent
                                                        max-width="650px"
                                                        @keydown.escape="listaRapida = false"
                                            
                                                    >
                                                        <v-card color="#1e1e1e">
                                                            <v-card-actions>
                                                                <v-btn
                                                                    icon
                                                                    dark
                                                                    @click="listaRapida = false"
                                                                    class="ml-n3 mt-n2"
                                                                >
                                                                <v-icon color="red accent-1">mdi-close</v-icon>
                                                                </v-btn>
                                                            </v-card-actions>
                                                            <v-card-text>
                                                                <ListaGenerica :route="'materiais'" :headers="headers"></ListaGenerica>
                                                            </v-card-text>
                                                        </v-card>
                                                    </v-dialog>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions class="d-flex justify-end mt-n2">
                                            <v-btn
                                                text 
                                                color="red accent-1"
                                                @click="qntdModal = false"
                                            >
                                                Fechar
                                            </v-btn>
                                            <v-btn
                                                text 
                                                color="teal accent-1"
                                                @click="addMaterial"
                                            >
                                                Salvar
                                            </v-btn>
                                        </v-card-actions>
                                   </v-card>
                                </v-dialog>
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
import ListaGenerica from '../ListaGenerica.vue'
export default {
    data() {
        return {
            dialog: false,
            cadModal: false,
            qntdModal: false,
            NOME: "",
            CUSTO: 0,
            QUANTIDADE: 0,
            msg: "",
            codigo: null,
            listaRapida : false,
        };
    },
    computed:{
        headers() {
            return [
                {
                    text: "Codigo",
                    align: "start",
                    value: "ID",
                },
                {
                    text: "Item",
                    value: "NOME",
                },
                { text: "Custo", value: "CUSTO" },
                { text: "Qntd. Disponivel", value: "QUANTIDADE" },
            ];
         },
    },
    methods: {
        ...mapActions("materiaMod", ['post', 'findMateria', 'adicionaMaterial']),
        async saveMateriaPrima() {
            let payload = { NOME: this.NOME, CUSTO: this.CUSTO, QUANTIDADE: this.QUANTIDADE }
            this.msg = await this.post(payload)
            this.$emit('messageSnackBar', this.msg)
            this.clear();
        },
        async addMaterial(){
            let payload = {ID : this.codigo, QUANTIDADE : this.QUANTIDADE}
            this.msg = await this.adicionaMaterial(payload)
            this.qntdModal = false 
            this.$emit('messageSnackBar', this.msg)
            this.clear();
        },
        clear() {
            this.NOME = ""
            this.CUSTO = 0
            this.QUANTIDADE = 0
            this.codigo = null
        }
    },
    components: { ListaGenerica }
}
</script>

<style lang="scss" scoped>

</style>