<template>
    <v-card color="#303030">
        <form @submit.prevent="addToList">
            <v-card-title  class="white--text text-h8">
                <p v-if="!notification">Escolha os Materiais do Produto...</p>

                <v-alert v-if="notification && msg.type == 'success'" type="success" v-model="notification" 
                dismissible dense shaped
                outlined class="not" >
                    {{msg.text }}  
                </v-alert>
                <v-alert v-if="notification && msg.type == 'danger'" type="error" v-model="notification" 
                dismissible dense shaped
                outlined class="not" >
                    {{msg.text }}  
                </v-alert>
            </v-card-title>
            <v-card-text color="#303030" class="mt-0 mt-lg-4">
                <v-row class="d-flex flex-column flex-md-row">
                    <v-col>
                        <v-tooltip bottom>      
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="CODIGO"
                                    label="Insira o Codigo da Matéria Prima"
                                    persistent-hint
                                    required
                                    outlined
                                    @keydown.f2="buscaLista"
                                    clearable
                                    dense 
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    color="teal lighten-1"
                                    type="number"
                                ></v-text-field>
                             </template>
                             <span>F2 exibe a lista !</span>
                        </v-tooltip>   
                       
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="QUANTIDADE"
                            label="Insira a quantidade para o produto"
                            outlined
                            clearable
                            dense 
                            dark
                            required
                            color="teal lighten-1"
                            type="number"
                        ></v-text-field>
                    </v-col>
                   
                     
                   
                    <v-col>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    color="teal accent-2"
                                    class="ml-3"
                                    dark
                                    rules="required|min:1"
                                    type="submit"
                                    icon 
                                    
                                >
                                    <v-icon aria-label="Adicionar a lista" aria-hidden="false" dark color="teal accent-2">mdi-plus-circle-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Adicionar a lista</span>
                        </v-tooltip>
                        <v-tooltip bottom>      
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    color="teal accent-2"
                                    class="ml-3"
                                    dark
                                    icon 
                                >
                                    <v-icon>mdi-list-box-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Ver lista de matérias adicionadas</span>
                            <v-dialog
                                v-model="materiaisMod"
                                persistent
                                max-width="600px"
                                @keydown.escape="materiaisMod = false"
                            
                            >

                            </v-dialog>
                        </v-tooltip>
                        <v-dialog
                            v-model="listMateria"
                            persistent
                            max-width="600px"
                            @keydown.escape="listMateria = false"
                        >
                            <v-card dark>
                                <v-card-title>
                                    Materiais Disponiveis
                                </v-card-title>
                                <v-card-text class="mt-3">
                                    <ListaGenerica :route="'materiais'"></ListaGenerica>
                                </v-card-text>
                            </v-card>
                        </v-dialog>        
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-end mt-0 mt-lg-5 ">
                <v-btn
                    color="blue accent-3"
                    text
                    @click="voltarEtapa"
                >
                    Voltar
                </v-btn>
                <v-btn
                    color="red accent-2"
                    text
                    @click="fechar"
                >
                    Fechar
                </v-btn>
                <v-btn 
                    color="teal accent-3"
                    text
                    type="submit"
                >
                    Salvar
                </v-btn>
            </v-card-actions>
        </form>
    </v-card>
</template>
<script>
import ListaGenerica from '../ListaGenerica.vue';
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            listMateria : false,
            CODIGO : undefined,
            QUANTIDADE : null,
            notification : false,
            msg : null,
            materiaisMod : false
        }
    },
    methods: {
        ...mapActions('utilMod', ['setHeader']),
        ...mapActions('materiaMod', ['findMateria']),
        voltarEtapa() {
            this.$emit("voltar-etapa", 1);
        },
        async addToList(){
            let payload = {ID : this.CODIGO, QUANTIDADE : this.QUANTIDADE}
            this.msg = await this.findMateria(payload)
            this.notification = true
        },
        async buscaLista(){
            await this.setHeader(this.headers)
            this.listMateria = true
        },
        fechar(){
            let payload = {valor : 1, estado : false }            
            this.$emit("fechar",payload)
        }
    },
    computed: {
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
    components: { ListaGenerica }
}
</script>

<style lang="scss" scoped>
    .not{
        width: 100%;
    }
</style>