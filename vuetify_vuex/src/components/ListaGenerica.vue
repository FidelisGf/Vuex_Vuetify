<template>
   <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-data-table
                    :search="search"
                    :custom-filter="filterOnlyCapsText"
                    :loading="loading"
                    :headers="$store.getters.getHeader"
                    :items="listaProdutos"
                    :items-per-page="per_page"
                    hide-default-footer       
                    class="elevation-2 mt-n5"
                >
                <template v-slot:[`item.actions`]="{ item }" >
                    <v-icon small color="teal lighten-1" class="mr-2" @click="editItem(item, route)">mdi-pencil</v-icon>
                    <v-icon small color="red lighten-1" @click="deleteItem(item)">mdi-delete</v-icon>          
                </template>
                <template v-slot:[`item.info`]="{ item }">
                    <v-icon color="blue darken-4"  @click="info(item.ID_PRODUTO)">mdi-alpha-i-circle</v-icon>
                </template>
                <template v-slot:[`item.APROVADO`]="{ item }">
                    <span v-if="item.APROVADO == 'T'">APROVADO</span>
                    <span color="red" v-if="item.APROVADO == 'F'">PENDENTE</span>
                </template>
                <template v-slot:[`item.PRODUTOS`]="{ item }">
                    <span v-for="prod in item.PRODUTOS" :key="prod.id">
                    <p>{{prod.nome}} : {{prod.quantidade}}</p>    
                    </span>
                </template>
                <template v-slot:top>
                    <div class="d-flex align-center">
                        <v-text-field 
                            v-model="search"
                            color="teal lighten-1"
                            label="Search (APENAS COM CAPS)"
                            class="mx-5 w-25"
                        >   
                        </v-text-field>
                        <v-select v-if="route == 'products'"
                            :items="listCategorias"
                            label="Filtre por uma categoria..."
                            v-model="Categoria"
                            color="teal lighten-1"
                            item-text="NOME" 
                            class="mx-5 w-25"
                            return-object
                        >
                        </v-select>
                    </div>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                v-on="on"
                                color="primary"
                                dark
                                text
                                @click="findAllByCategory"
                                class="ml-2 mt-n1"
                            >
                               Aplicar
                            </v-btn>
                        </template>
                        <span>Buscar pelos filtros acima</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                v-bind="attrs"
                                v-on="on"
                                color="primary"
                                dark
                                text
                                @click="cleanCategoryFilter"
                                class="ml-4 mt-n1"
                            >
                               Limpar
                            </v-btn>
                        </template>
                        <span>Limpa os Filtros</span>
                    </v-tooltip>
                </template>
            </v-data-table>
            <v-pagination
                color="teal lighten-1"
                v-model="current_page"
                :length="totalPage"
                @input="onPageChange">  
            </v-pagination> 
            <DeleteGeneric v-if="$store.getters.delete" :route="route"></DeleteGeneric>
            <EditProduct v-if="$store.getters.edit"></EditProduct>
            </v-col>
        </v-row>
   </v-container>
</template>

<script>
import axios from 'axios'
import DeleteGeneric from './ModalComponents/Delete/DeleteGeneric.vue'
import EditProduct from './ModalComponents/Edit/EditProduct.vue'
import productService from '@/service/productService'
import router from '@/router'
import { mapGetters, mapMutations } from 'vuex';
export default {
    props: {
        route: String,
        opcao : String,
        starterDate : String,
        endDate : String,
    },
    data() {
        return {
            current_page: 1,
            totalPage: 0,
            tempCurrent : 1,
            loading: true,
            search: "",
            rota : '',
            per_page : 0,
            tempCategory : '',
            filtroCategory : false,
            delete : false,
            Categoria : '',
            dtStart : '',
            dtFinal : '',

        };
    },
    methods: {
        ...mapMutations('produtoMod', ['saveProduct', 'beginListProduct', 'saveListProduct', 'editListProduct', 'clearListProduct']),
        getLista(route) {
            this.dtStart = this.starterDate
            this.dtFinal = this.endDate
            this.loading = true;
            this.clearListProduct()
            if(this.dtStart != undefined && this.dtFinal != undefined){
                axios.get("http://127.0.0.1:8000/api/" + route + "?page=" + this.current_page, { params: { opcao: this.opcao, start : this.dtStart, end : this.dtFinal} }).then((response) => {
                    
                    this.beginListProduct(response.data.data)
                    this.per_page = response.data.per_page
                    this.loading = false;
                    this.current_page = response.data.current_page
                    this.tempCurrent = this.current_page
                    this.totalPage = response.data.last_page
                });
            }else{
                axios.get("http://127.0.0.1:8000/api/" + route + "?page=" + this.current_page, { params: { opcao: this.opcao} }).then((response) => {
                    this.beginListProduct(response.data.data)
                    this.per_page = response.data.per_page
                    this.loading = false;
                    this.current_page = response.data.current_page
                    this.tempCurrent = this.current_page
                    this.totalPage = response.data.last_page
                });
            }  
        },
       
        deleteItem(item) {
            this.$store.commit("saveGenerico", item)
            this.$store.commit("activeDelete")
        },
        editItem(item, route){
            this.$store.commit("saveGenerico", item)
            if(route == 'products'){
                this.$store.commit("activeEdit")
            }
        },
        onPageChange() {
            if(this.filtroCategory){
                this.findAllByCategory()
            }else{
                this.getLista(this.route);
            }
            
        },
        info(id){
            router.push({ path: `/${this.route}/detail/${id}`}) 
        },
        clearPages() {
            this.current_page = 1;
            this.totalPage = 0;
        },
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === "string" &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1;
        },  
        findAllByCategory() {
      
            if(this.tempCurrent != 1){
                this.current_page = 1
                this.tempCurrent = 1;
            }
            if(this.tempCategory != this.Categoria.ID_CATEGORIA){
                this.current_page = 1;
            }
            this.tempCategory = this.Categoria.ID_CATEGORIA
            this.loading = true
            this.filtroCategory = true;
            if (this.Categoria != "") {
                this.loading = false
                productService.findAllProductByCategory(this.Categoria.ID_CATEGORIA, this.current_page).then((res) => {
                    this.loading = false
                    this.beginListProduct(res.data.data)
                    this.current_page = res.data.current_page;
                    this.totalPage = res.data.last_page;
                });
            }
        },
        cleanCategoryFilter() {
            this.current_page = 1
            this.filtroCategory = false;
            this.Categoria = ""
            this.getLista(this.route)
        }
    },
    computed:{
        ...mapGetters({listCategorias : 'categoryMod/listCategorias', listaProdutos : 'produtoMod/listProducts'})
    },  
    created() {
        this.clearPages();
        this.getLista(this.route);
    },
    components: { DeleteGeneric, EditProduct }
}
</script>

<style lang="scss" scoped>

</style>