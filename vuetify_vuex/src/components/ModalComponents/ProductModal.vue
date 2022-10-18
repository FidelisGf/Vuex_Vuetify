<template>
    <v-container fluid grid-list-md>
    <v-row>
        <v-col cols="12">
           
           
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
                <template v-if="!miniatura" v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="teal lighten-1"
                    dark
                    block
                    
                    @click="cleanProduct"
                    v-bind="attrs"
                    v-on="on"
                    >
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
                                    :items="$store.getters.listCategorias"
                                    label="Categoria"
                                    v-model="Categoria"
                                    color="teal lighten-1"
                                    item-text="NOME" 
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
        <v-col>
            <v-btn
            color="teal lighten-3"
            class="mt-3 ml-1"
            dark
            text
            @click="activeAdicionarEstoque"
            >
            <v-icon  dark color="teal lighten-1" left>mdi-plus-circle-outline</v-icon>
                Estoque
            </v-btn>
        </v-col>
        <v-col cols="12">
           <ListaGenerica :route="'products'"></ListaGenerica>
        </v-col>      
    </v-row>
    <v-row>
        <EstoqueModal v-if="$store.getters.getAdicionaEstoque"></EstoqueModal>
    </v-row>
</v-container>
</template>
<script>
import productService from '@/service/productService'
import CategoryModal from './CategoryModal.vue'
import EstoqueModal from './EstoqueModal.vue';
import ListaGenerica from '../ListaGenerica.vue';
export default {
    props: {
        miniatura: Boolean
    },
    data() {
        return {
            Categoria: null,
            NOME: "",
            dialog : false,
            ID_PRODUTO: "",
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
        headers() {
            return [
                { text: "Cod", value: "ID_PRODUTO",},
                { text: "Detalhes", value: "info", sortable: false },
                {
                    text: "Produto",
                    value: "NOME",
                },
                { text: "Descrição", value: "DESC" },
                { text: "Valor", value: "VALOR" },
                { text: "Categoria", value: "category.NOME" },
                { text: "Actions", value: "actions", sortable: false },
            ];
        }
    },
   
    methods: {
        activeAdicionarEstoque(){
            this.$store.commit('activeAdicionaEstoque')
        },
        postProduto() {
            var payload = { NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, quantidade_inicial: this.quantidade_inicial, ID_CATEGORIA: this.Categoria.ID_CATEGORIA };
            productService.postProduto(payload).then((res) => {
                var payload2 = {NOME: this.NOME, ID_PRODUTO: res.data.ID_PRODUTO, VALOR: this.VALOR, DESC: this.DESC, category: this.Categoria}
                if (res.status == 200) {
                    console.log(res);
                    alert("Produto salvo com sucesso");
                    this.Categoria = null
                    this.$store.commit('saveListProduct', payload2)
                    this.dialog = false
                }
            });
        },
        cleanProduct(){
            this.ID_PRODUTO = null
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