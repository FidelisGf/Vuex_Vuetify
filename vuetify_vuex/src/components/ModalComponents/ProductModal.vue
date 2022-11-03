<template>
    <v-container fluid grid-list-md>
    <v-row class="d-flex flex-column-reverse d-sm-flex flex-md-row">
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
        <v-col cols="12" md="12" sm="12"  lg="6" class="d-flex flex-column-reverse flex-md-row justify-center justify-lg-start">
            <div class="ml-0 pl-0 d-flex justify-center">
                <MaterialModal class="ml-sm-0  pl-sm-0  "></MaterialModal>
            </div>
            <v-btn
                color="teal accent-3"
                class="mt-0 ml-1  font-weight-medium"
                dark
                text
                @click="estoqueMod = true"
            >
            <v-icon  dark color="teal accent-3" left>mdi-plus-circle-outline</v-icon>
                Estoque
            </v-btn>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="720px"
                @keydown.escape="dialog = false"
            >
                <template v-if="!miniatura" v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="teal accent-3"
                    class="mt-0 ml-1 font-weight-medium"
                    dark
                    text
                    @click="cleanProduct"
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon  dark color="teal accent-3" left>mdi-plus-circle-outline</v-icon>
                        Novo Produto
                    </v-btn>
                </template>
                <form ref="form" @submit.prevent="postProduto">
                    <v-card>
                    <v-card-title>
                        <span class="text-h5">Cadastar novo produto</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                      
                            <v-row>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                        label="Nome do produto"
                                        required
                                        v-model="NOME"
                                        counter="60"
                                        color="teal lighten-1"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                
                                >
                                    <v-text-field
                                        v-model="DESC"
                                        label="Desc do produto"
                                        counter="120"
                                        required
                                        color="teal lighten-1"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                                >
                                    <v-text-field
                                    v-model="VALOR"
                                    label="Valor do produto"
                                    persistent-hint
                                    required
                                    color="teal lighten-1"
                                    value="10.00"
                                    prefix="R$"
                                    type="number"
                                    ></v-text-field>
                                </v-col>
                                <v-col 
                                    cols="12"
                                    sm="4"
                                    md="4"
                                >
                                    <v-text-field
                                        v-model="quantidade_inicial"
                                        label="Quantidade"
                                        persistent-hint
                                        required
                                        color="teal lighten-1"
                                        type="number"
                                        min="0"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="4"
                                    class="d-flex"
                                > 
                                
                                    <v-select
                                        :items="listCategorias"
                                        label="Categoria"
                                        v-model="Categoria"
                                        color="teal lighten-1"
                                        item-text="NOME_C" 
                                        return-object
                                        transition="fab-transition"
                                        required
                                    ></v-select>
                                    <CategoryModal :miniatura="true"  class="mt-4 ml-2 "></CategoryModal>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="4"
                                    class="d-flex flex-row"
                                > 
                                    <v-select
                                        :items="listMedidas"
                                        label="Unidade de Medida"
                                        v-model="Medida"
                                        color="teal lighten-1"
                                        item-text="NOME" 
                                        return-object
                                        required
                                    ></v-select>
                                    <MedidaModal></MedidaModal>
                                </v-col>
                        </v-row>
                        </v-container>
                        <small >*Os produtos criados serão adicionados ao seu estoque.</small>
                        </v-card-text>
                        <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="red lighten-1"
                                        text
                                        @click="dialog = false"
                                    >
                                    Fechar
                                    </v-btn>
                                    <v-btn 
                                        color="teal lighten-1"
                                        text
                                        type="submit"
                                    >
                                    Salvar
                                    </v-btn>
                        </v-card-actions>
                    </v-card>
                </form> 
            </v-dialog>
        
        </v-col>
       
            
        <v-spacer v-if="!$vuetify.breakpoint.smAndDown" ></v-spacer>
        <v-col 
            cols="10" 
            md="12" 
            lg="3" 
            sm="12" 
            class="pl-sm-0 mt-2 mt-md-2 mt-lg-2 
                   d-inline-flex d-lg-inline-flex  
                   justify-center justify-lg-start ml-10 ml-sm-0 "
        >
            <v-sheet
                color="cyan lighten-5"
                elevation="8"
                height="57px"
                width="200px"
                class=" exibeGasto ml-lg-6 ml-md-3  mt-n5 "
            >
                <p style="font-size: 16px;" class="ml-3 mt-2 font-weight-medium">Produtos Ativos</p>
                <p style="font-size : 14px;" class="mt-n4 ml-5 font-weight-bold">Quantidade Atual : {{countProdutos}}</p>
            </v-sheet>
        </v-col>
    </v-row>
    <v-row >
        <v-col cols="12">
           <ListaGenerica :route="'products'"></ListaGenerica>
        </v-col>      
    </v-row>
    <v-row>
        <v-dialog
            v-model="estoqueMod"
            persistent
            max-width="550"
            @keydown.escape="estoqueMod = false"
        >
            <EstoqueModal @postMessage="getMessage" @closeEstoque="closeEstoqueMod"></EstoqueModal>
        </v-dialog>
    </v-row>
</v-container>
</template>
<script>
import CategoryModal from './CategoryModal.vue'
import EstoqueModal from './EstoqueModal.vue';
import ListaGenerica from '../ListaGenerica.vue';
import { mapGetters,mapActions } from 'vuex';
import MedidaModal from './MedidaModal.vue';
import MaterialModal from './MaterialModal.vue';
export default {
    props: {
        miniatura: Boolean
    },
    data() {
        return {
            Categoria: null,
            Medida : null,
            NOME: "",
            dialog : false,
            ID: "",
            quantidade_inicial: 0,
            DESC: "",
            VALOR: 1,
            filtroAtivo : false,
            loading: true,
            ID_CATEGORIA: 0,
            products: [],
            tempCategory : null,
            registro : false,
            fracasso : false,
            msg : '',
            timeout : 2000,
            estoqueMod : false,
           
        };
    },
    computed: {
        ...mapGetters({listCategorias : 'categoryMod/listCategorias', activeEstoque : 'estoqueMod/getAdicionaEstoque',
        countProdutos : 'produtoMod/getCount', listMedidas : 'medidaMod/getMedidas'}),
        headers() {
            return [
                { text: "Detalhes", value: "info", sortable: false },
                { text: "Cod", value: "ID",},
                {
                    text: "Produto",
                    value: "NOME",
                },
                { text: "Quantidade", value: "QUANTIDADE" },
                { text: "Valor", value: "VALOR" },
                { text: "Categoria", value: "NOME_C" },
                { text: "Actions", value: "actions", sortable: false },
            ];
        }
    },
    methods: {
        ...mapActions('produtoMod', ['saveList', 'post', 'countProd']),
        ...mapActions('estoqueMod', ['activeAdicionaEstoque']),
        ...mapActions('utilMod', ['setHeader']),
        ...mapActions('medidaMod', ['getAll']),
        closeEstoqueMod(e){
            console.log('Aqui')
            this.estoqueMod = e
        },
        getMessage(e){
           
            this.msg = e.msg
            this.registro = e.registro
            this.estoqueMod = e.dialog
        },  
       async postProduto() {
            var payload = { NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC,
                 quantidade_inicial: this.quantidade_inicial,
                  ID_CATEGORIA: this.Categoria.ID_CATEGORIA
                  , NOME_C : this.Categoria.NOME_C, ID_MEDIDA : this.Medida.ID };
            this.msg = await this.post(payload)      
            console.log(this.msg)
            this.registro = true
            this.dialog = false 
            this.cleanProduct()
            this.Categoria = null
        },
        cleanProduct(){
            this.ID = null
            this.NOME = null
            this.VALOR = null
            this.DESC = null
            this.Categoria = null
            this.Medida = null
            this.quantidade_inicial = 0
        }, 
    },
   async created() {
        this.setHeader(this.headers)
        await this.getAll()
        await this.countProd()
    },
    components: { CategoryModal, EstoqueModal, ListaGenerica, MedidaModal, MaterialModal }
}
</script>

<style lang="scss" scoped>
    .exibeGasto{
        border-color: aqua !important;
        box-shadow: 0px 2px 25px 2px #96f5f0 !important;
        border-radius: 10px !important;
    
    }
    .exibeGasto:hover{
        transform: translate(2px, -2.10px);
        transition: 1.5s;
        box-shadow: 0px 2px 35px 2px #505050 !important;
    }
    .exibeGasto:hover::after{
        transform: translate(2px, +2.10px);
        transition: 1.5s;
        box-shadow: 0px 2px 25px 2px #E0F2F1 !important;
    }
</style>