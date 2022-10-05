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
                color="primary"
                dark
                block
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
                            color="orange"
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
                                color="orange"
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
                            color="orange"
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
                                color="orange"
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
                                :items="categorias"
                                label="Categoria"
                                v-model="Categoria"
                                color="orange"
                                item-text="NOME" 
                                return-object
                            ></v-select>
                            <CategoryModal :miniatura="true"  class="mt-3 ml-2 "></CategoryModal>
                            
                        </v-col>
                    </v-row>
                </v-container>
            <small>*Os produtos criados serão adicionados ao seu estoque.</small>
            </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                    >
                    Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="postProduto"
                    >
                    Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </v-col>
    </v-row>
    <v-row >
        <v-col cols="12" sm="6" class="d-flex justify-start">
            <v-select
                :items="categorias"
                label="Filtre por uma categoria..."
                v-model="Categoria"
                color="orange"
                item-text="NOME" 
                @change="filterOnlyCapsText"
                return-object
            >
            </v-select>
            <v-btn
            color="blue darken-1"
            text
            class="mt-4 ml-2 "
            @click="findAllProductByCategory"
            >
            Aplicar   
            </v-btn>
            <v-btn
            text
            color="blue darken-1"
            class="mt-4 ml-2 "
            @click="cleanCategoryFilter"
            >
            Limpar  
            </v-btn>
        </v-col>
 
        <v-col cols="12">
            <v-data-table
            :search="search"
            :custom-filter="filterOnlyCapsText"
            :headers="headers"
            :items="products"
            :items-per-page="5"
            class="elevation-2"
            >
            <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="Search (APENAS COM CAPS)"
                  class="mx-4"
                ></v-text-field>
            </template>
            </v-data-table>
        </v-col> 
           
        
    </v-row>
</v-container>
</template>
<script>
import categoryService from '@/service/categoryService'
import productService from '@/service/productService'
import CategoryModal from './CategoryModal.vue'
export default {
    props: {
        miniatura: Boolean
    },
    data() {
        return {
            dialog: false,
            data: [],
            categorias: [],
            Categoria: null,
            NOME: "",
            quantidade_inicial: 0,
            DESC: "",
            VALOR: 0,
            search: "",
            ID_CATEGORIA: 0,
            products: [],
        };
    },
    computed: {
        headers() {
            return [
                {
                    text: "Produto",
                    align: "start",
                    value: "NOME",
                },
                { text: "Descrição", value: "DESC" },
                { text: "Valor", value: "VALOR" },
                { text: "Categoria", value: "category.NOME" },
            ];
        }
    },
    methods: {
        getCategorias() {
            categoryService.getCategory().then((res) => {
                this.categorias = res.data.data;
            });
        },
        postProduto() {
            var payload = { NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, quantidade_inicial: this.quantidade_inicial, ID_CATEGORIA: this.Categoria.ID_CATEGORIA };
            productService.postProduto(payload).then((res) => {
                if (res.status == 200) {
                    alert("Produto salvo com sucesso");
                    var payload2 = { NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, CATEGORIA: this.Categoria.NOME };
                    this.$store.commit("saveProduct", payload2);
                    console.log(this.$store.state.product);
                    this.products.push(this.$store.state.product);
                    this.dialog = false;
                }
            });
        },
        getProdutos() {
            productService.getProdutos().then((response) => {
                this.products = response.data.data;
                console.log(this.products);
            });
        },
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === "string" &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1;
        },
        findAllProductByCategory() {
            console.log(this.Categoria);
            if (this.Categoria != "") {
                productService.findAllProductByCategory(this.Categoria.ID_CATEGORIA).then((res) => {
                    this.products = res.data.data;
                });
            }
        },
        cleanCategoryFilter() {
            this.Categoria = "";
            this.getProdutos();
        }
    },
    created() {
        this.getProdutos();
        this.getCategorias();
    },
    components: { CategoryModal }
}
</script>

<style lang="scss" scoped>

</style>