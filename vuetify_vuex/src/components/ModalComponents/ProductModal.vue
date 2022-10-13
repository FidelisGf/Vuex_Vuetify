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
                    <span v-if="!editMode" class="text-h5">Cadastar novo produto</span>
                    <span v-if="editMode" class="text-h5">Editar Produto : {{NOME}} #{{ID_PRODUTO}}</span>
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
                            <v-col v-if="!editMode"
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
            <small v-if="!editMode" >*Os produtos criados serão adicionados ao seu estoque.</small>
            <small v-if="editMode" >*Manipule os dados basicos do produto.</small>
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
                        <v-btn v-if="!editMode"
                            color="teal lighten-1"
                            text
                            @click="postProduto"
                        >
                        Salvar
                        </v-btn>
                        <v-btn v-if="editMode"
                            color="teal lighten-1"
                            text
                            @click="editProduct"
                        >
                        Editar
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-row >
        <v-col cols="12" sm="8" class="d-flex justify-start">
            <v-select
                :items="$store.getters.listCategorias"
                label="Filtre por uma categoria..."
                v-model="Categoria"
                color="teal lighten-1"
                item-text="NOME" 
                return-object
            >
            </v-select>
            <v-btn
                color="teal lighten-1"
                text
                class="mt-4 ml-2 "
                @click="findAllProductByCategory"
                >
                Aplicar   
            </v-btn>
            <v-btn
                text
                color="teal lighten-1"
                class="mt-4 ml-2 "
                @click="cleanCategoryFilter"

                >
                Limpar  
            </v-btn>
           
        </v-col>
        <v-spacer></v-spacer>
        <v-col>
            <v-btn
            color="teal lighten-3"
            class="mt-3"
            dark
            text
            @click="activeAdicionarEstoque"
            >
            <v-icon dark color="teal lighten-1" left>mdi-plus-circle-outline</v-icon>
            Estoque
            </v-btn>
        </v-col>
        <v-col cols="12">
            <v-data-table
                :search="search"
                :custom-filter="filterOnlyCapsText"
                :loading="loading"
                :headers="headers"
                :items="$store.getters.listProducts"
                :items-per-page="6"
                hide-default-footer
                class="elevation-2"
            >
                <template v-slot:top>
                    <v-text-field
                    v-model="search"
                    color="teal lighten-1"
                    label="Search (APENAS COM CAPS)"
                    class="mx-4"
                    ></v-text-field>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small color="teal lighten-1" class="mr-2" @click="editViewProduct(item)">mdi-pencil</v-icon>
                    <v-icon small color="red lighten-1" @click="deleteProduct(item)">mdi-delete</v-icon>
                </template>
                <template v-slot:[`item.info`]="{ item }">
                    <v-icon color="blue darken-4"  @click="infoProduct(item.ID_PRODUTO)">mdi-alpha-i-circle</v-icon>
                </template>
            </v-data-table>
            <v-pagination
                color="teal lighten-1"
                v-model="pagination.current"
                :length="pagination.total"
                @input="onPageChange">  
            </v-pagination>  
            <DeleteProduct></DeleteProduct>
            <EstoqueModal></EstoqueModal>
        </v-col>      
    </v-row>
    <v-row>
        
    </v-row>
</v-container>
</template>
<script>
import router from '@/router';
import categoryService from '@/service/categoryService'
import productService from '@/service/productService'
import CategoryModal from './CategoryModal.vue'
import DeleteProduct from './Delete/DeleteProduct.vue';
import EstoqueModal from './EstoqueModal.vue';
export default {
    props: {
        miniatura: Boolean
    },
    data() {
        return {
            dialog: false,
            data: [],
            Categoria: null,
            NOME: "",
            ID_PRODUTO: "",
            editMode : false,
            quantidade_inicial: 0,
            DESC: "",
            excludeMode: false,
            VALOR: 1,
            filtroAtivo : false,
            loading: true,
            search: "",
            ID_CATEGORIA: 0,
            products: [],
            pagination: {
                current: 1,
                total: 0
            },
            tempCategory : null,
           
        };
    },
    computed: {
        headers() {
            return [
                { text: "Detalhes", value: "info", sortable: false },
                {
                    text: "Produto",
                    align: "start",
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
        getCategorias() {
            categoryService.getCategory().then((res) => {
                this.$store.commit('clearListCategoria')
                this.$store.commit('beginListCategoria', res.data.data)
            });
        }, 
        deleteProduct(item){
            console.log(item);
            var payload = {ID_PRODUTO : item.ID_PRODUTO ,NOME: item.NOME, VALOR: item.VALOR, DESC: item.DESC, category: item.Categoria}
            this.$store.commit("saveProduct", payload)
            this.$store.commit('activeDeleteProduct')
        },
        activeAdicionarEstoque(){
            this.$store.commit('activeAdicionaEstoque')
        },
        infoProduct(idProduto){
            router.push({ path: `/products/detail/${idProduto}` }) 
        },
        postProduto() {
            var payload = { NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, quantidade_inicial: this.quantidade_inicial, ID_CATEGORIA: this.Categoria.ID_CATEGORIA };
            //var payload2 = {NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, category: this.Categoria}
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
        editViewProduct(item){ 
            this.editMode = true
            this.ID_PRODUTO = item.ID_PRODUTO
            this.NOME = item.NOME
            this.VALOR = item.VALOR
            this.DESC = item.DESC
            this.Categoria = item.category
            this.dialog = true
        },
        cleanProduct(){
            this.editMode = false
            this.ID_PRODUTO = null
            this.NOME = null
            this.VALOR = null
            this.DESC = null
            this.Categoria = null
            this.dialog = false
        },
        editProduct(){
            var payload = {ID_PRODUTO : this.ID_PRODUTO, NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, ID_CATEGORIA: this.Categoria.ID_CATEGORIA}
            productService.editProduct(payload, this.ID_PRODUTO).then(() =>{
                alert('Produto editado com sucesso !')
            })
            this.cleanProduct()
        },
        getProdutos() {
            this.loading = true
            this.$store.commit('clearListProduct')
            productService.getProdutos(this.pagination.current).then((response) => {
                this.loading = false
                this.$store.commit('beginListProduct', response.data.data)
                this.pagination.current = response.data.current_page;
                this.tempCurrent = response.data.current_page;
                this.pagination.total = response.data.last_page;   
            });
        },
        onPageChange() {
            if(this.filtroAtivo == true){

                this.findAllProductByCategory();
            }else{
                this.getProdutos();
            }
            
        },
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === "string" &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1;
        },
        findAllProductByCategory() {
            this.$store.commit('clearListProduct')
            console.log(this.tempCurrent);
            if(this.tempCurrent != 1){
                this.pagination.current = 1
                this.tempCurrent = 1;
                console.log(this.pagination.current)
            }
            if(this.tempCategory != this.Categoria.ID_CATEGORIA){
                this.pagination.current = 1;
            }
            this.tempCategory = this.Categoria.ID_CATEGORIA
            this.loading = true
            this.filtroAtivo = true;
            if (this.Categoria != "") {
                this.loading = false
                productService.findAllProductByCategory(this.Categoria.ID_CATEGORIA, this.pagination.current).then((res) => {
                    this.loading = false
                    this.$store.commit('beginListProduct', res.data.data)
                    this.pagination.current = res.data.current_page;
                    this.pagination.total = res.data.last_page;
                });
            }
        },
        cleanCategoryFilter() {
            this.pagination.current = 1
            this.filtroAtivo = false;
            this.Categoria = ""
            this.getProdutos()
        }
    },
    created() {
        this.getProdutos();
        this.getCategorias();
        
        console.log(this.$store.state.Categorias)
    },
    components: { CategoryModal, DeleteProduct, EstoqueModal }
}
</script>

<style lang="scss" scoped>

</style>