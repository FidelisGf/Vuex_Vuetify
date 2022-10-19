<template>
   <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-data-table
                    :search="search"
                    :custom-filter="filterOnlyCapsText"
                    :loading="loading"
                    :headers="$store.getters.getHeader"
                    :items="$store.getters.listProducts"
                    :items-per-page="6"
                    hide-default-footer       
                    class="elevation-2"
                >
                <template v-slot:[`item.actions`]="{ item }" >
                    <v-icon small color="teal lighten-1" class="mr-2" @click="editItem(item, route)">mdi-pencil</v-icon>
                    <v-icon small color="red lighten-1" @click="deleteItem(item)">mdi-delete</v-icon>          
                </template>
                <template v-slot:[`item.info`]="{ item }">
                    <v-icon color="blue darken-4"  @click="info(item.ID_PRODUTO)">mdi-alpha-i-circle</v-icon>
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
                            :items="$store.getters.listCategorias"
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
            tempCategory : '',
            filtroCategory : false,
            delete : false,
            Categoria : '',
            dtStart : '',
            dtFinal : '',

        };
    },
    methods: {
        getLista(route) {
            this.loading = true;
            this.$store.commit("clearListProduct");
            if(this.starterDate != undefined && this.endDate != undefined){
                this.dtStart = this.formatData(this.starterDate)
                this.dtFinal = this.formatData(this.endDate)
                axios.get("http://127.0.0.1:8000/api/" + route + "?page=" + this.current_page, { params: { opcao: this.opcao, start : this.dtStart, end : this.dtFinal} }).then((response) => {
                    this.$store.commit("beginListProduct", response.data.data)
                    this.loading = false;
                    this.current_page = response.data.current_page
                    this.tempCurrent = this.current_page
                    this.totalPage = response.data.last_page
                });
            }else{
                axios.get("http://127.0.0.1:8000/api/" + route + "?page=" + this.current_page, { params: { opcao: this.opcao} }).then((response) => {
                    this.$store.commit("beginListProduct", response.data.data)
                    this.loading = false;
                    this.current_page = response.data.current_page
                    this.tempCurrent = this.current_page
                    this.totalPage = response.data.last_page
                });
            }  
        },
        formatData(data){
            const [year, month, day] = data.split('-')
            return `${day}.${month}.${year}`
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
      
            console.log(this.tempCurrent);
            if(this.tempCurrent != 1){
                this.current_page = 1
                this.tempCurrent = 1;
                console.log(this.current_page)
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
                    this.$store.commit('beginListProduct', res.data.data)
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
    created() {
       
        this.clearPages();
        this.getLista(this.route);
    },
    components: { DeleteGeneric, EditProduct }
}
</script>

<style lang="scss" scoped>

</style>