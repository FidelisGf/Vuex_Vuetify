<template>
    <v-container fluid grid-list-md>
    <v-row>
        <v-col cols="12">
            <v-btn
                color="teal accent-3"
                class="mt-1 ml-1  font-weight-medium"
                dark
                text
                @click="activeAdicionarEstoque"
            >
            <v-icon  dark color="teal accent-3" left>mdi-plus-circle-outline</v-icon>
                Estoque
            </v-btn>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
                <template v-if="!miniatura" v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="teal accent-3"
                    class="mt-1 ml-1 font-weight-medium"
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
                                sm="6"
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
                                sm="6"
                                class="d-flex"
                            > 
                            
                                <v-select
                                    :items="listCategorias"
                                    label="Categoria"
                                    v-model="Categoria"
                                    color="teal lighten-1"
                                    item-text="NOME_C" 
                                    return-object
                                ></v-select>
                                <CategoryModal :miniatura="true"  class="mt-4 ml-2 "></CategoryModal>
                            </v-col>
                    </v-row>
                </v-container>
                <small >*Os produtos criados serão adicionados ao seu estoque.</small>
            </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                            color="teal lighten-1"
                            text
                            @click="dialog = false"
                        >
                        Fechar
                        </v-btn>
                        <v-btn 
                            color="teal lighten-1"
                            text
                            @click="postProduto"
                        >
                        Salvar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-row >
        <v-col cols="12">
           <ListaGenerica :route="'products'"></ListaGenerica>
        </v-col>      
    </v-row>
    <v-row>
        <EstoqueModal v-if="activeEstoque"></EstoqueModal>
    </v-row>
</v-container>
</template>
<script>
import CategoryModal from './CategoryModal.vue'
import EstoqueModal from './EstoqueModal.vue';
import ListaGenerica from '../ListaGenerica.vue';
import { mapGetters, mapMutations ,mapActions } from 'vuex';
export default {
    props: {
        miniatura: Boolean
    },
    data() {
        return {
            Categoria: null,
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
           
        };
    },
    computed: {
        ...mapGetters({listCategorias : 'categoryMod/listCategorias', activeEstoque : 'estoqueMod/getAdicionaEstoque'}),
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
        ...mapActions('produtoMod', ['saveList', 'post']),
        ...mapMutations('estoqueMod', ['activeAdicionaEstoque']),
        activeAdicionarEstoque(){
            this.activeAdicionaEstoque()
        },
        postProduto() {
            var payload = { NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC,
                 quantidade_inicial: this.quantidade_inicial,
                  ID_CATEGORIA: this.Categoria.ID_CATEGORIA
                  , NOME_C : this.Categoria.NOME_C };
            this.post(payload)
            this.Categoria = null
            this.dialog = false
        },
        cleanProduct(){
            this.ID = null
            this.NOME = null
            this.VALOR = null
            this.DESC = null
            this.Categoria = null
        }, 
    },
    created() {
        this.$store.commit("setHeader", this.headers)

    },
    components: { CategoryModal, EstoqueModal, ListaGenerica }
}
</script>

<style lang="scss" scoped>

</style>