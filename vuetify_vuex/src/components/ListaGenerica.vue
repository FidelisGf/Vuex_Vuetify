<template>
   <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-data-table
                    :search="search"
                    :custom-filter="filterOnlyCapsText"
                    :loading="loading"
                    :headers="headers"
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
                    <v-icon color="blue darken-4"  @click="info(item.ID)">mdi-alpha-i-circle</v-icon>
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
                    <div >
                        <v-row >
                            <v-col cols="12" class="d-flex justify-center">
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
                                    item-text="NOME_C" 
                                    @keydown.enter="findAllByCategory"
                                    class="mx-5 w-25"
                                    return-object
                                >
                                </v-select>
                            </v-col>
                            <v-col>
                                <v-btn
                                    color="red lighten-1 "
                                    text
                                    class="mt-n10 ml-3"
                                    @click="clearCategorySearch"
                                >
                                 Limpar 
                                </v-btn>
                            </v-col>
                        </v-row>
                       
                    </div>
                </template>
            </v-data-table>
            <v-pagination
                color="teal lighten-1"
                v-model="current_page"
                :length="totalPage"
                @input="onPageChange">  
            </v-pagination> 
            <DeleteGeneric v-if="del" :route="route"></DeleteGeneric>
            <EditProduct v-if="editProd"></EditProduct>
            <EditDespesaVue v-if="editDespesa"></EditDespesaVue>
            </v-col>
        </v-row>
   </v-container>
</template>

<script>
import axios from 'axios'
import DeleteGeneric from './ModalComponents/Delete/DeleteGeneric.vue'
import EditProduct from './ModalComponents/Edit/EditProduct.vue'
import EditDespesaVue from './ModalComponents/Edit/EditDespesa.vue'
import router from '@/router'
import { mapActions, mapGetters} from 'vuex';
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
            change : false,

        };
    },
   
    methods: {
        ...mapActions('produtoMod', ['saveProduct', 'beginListProduct', 'saveListProduct', 
        'editListProduct', 'clearListProduct', 'findByAllCategory', 'activeEdit']),
        ...mapActions('despesaMod', ['activeEditDespesa']),
        ...mapActions('utilMod' , ['saveGenerico', 'activeDelete']),
        getLista(route) {
            this.dtStart = this.starterDate
            this.dtFinal = this.endDate
            this.loading = true;
            //this.clearListProduct()
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
                    console.log(this.opcao)
                    console.log(response)
                    this.beginListProduct(response.data.data)
                    this.per_page = response.data.per_page
                    this.loading = false;
                    this.current_page = response.data.current_page
                    this.tempCurrent = this.current_page
                    this.totalPage = response.data.last_page
                });
            }  
        },

        clearCategorySearch(){
            this.Categoria = ""
            this.getLista(this.route)
        },
       
        deleteItem(item) {
            
            this.saveGenerico(item)
            this.activeDelete()
        },
        editItem(item, route){
            this.saveGenerico(item)
            if(route == 'products'){
                this.activeEdit()
            }else if (route == 'despesas'){
                this.activeEditDespesa()

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
        async findAllByCategory() {
      
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
                let payload = {current_page : this.current_page, ID : this.Categoria.ID_CATEGORIA}
                let resposta = await this.findByAllCategory(payload)
                this.current_page = resposta.current_page
                this.totalPage = resposta.totalPage
                this.loading = false
            }else{
                this.getLista(this.route)
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
        ...mapGetters({listCategorias : 'categoryMod/listCategorias', listaProdutos : 'produtoMod/listProducts', 
        editDespesa: 'despesaMod/getEditDespesa', headers: 'utilMod/getHeader', 
        del: 'utilMod/delete', generico : 'utilMod/getGenerico', editProd : 'produtoMod/edit'})
    },  
    created() {
        this.clearPages();
        this.getLista(this.route);
    },
    components: { DeleteGeneric, EditProduct, EditDespesaVue }
}
</script>

<style lang="scss" scoped>

</style>