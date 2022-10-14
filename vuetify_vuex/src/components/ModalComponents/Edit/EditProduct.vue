<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12">
               
               
                <v-dialog
                    v-model="$store.getters.edit"
                    persistent
                    max-width="600px"
                >
                  
                    <v-card>
                    <v-card-title>
                        <span  class="text-h5">Editar Item: {{NOME}} #{{ID_PRODUTO}}</span>
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
                <small >*Manipule os dados basicos do produto.</small>
                </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn
                                color="teal lighten-1"
                                text
                                @click="closeEdit"
                            >
                            Fechar
                            </v-btn>
                            <v-btn
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
    </v-container>            
</template>

<script>
import categoryService from '@/service/categoryService'
import productService from '@/service/productService'
import CategoryModal from '../CategoryModal.vue'
export default {
    data() {
        return {
            ID_PRODUTO: null,
            NOME: "",
            VALOR: 0,
            DESC: "",
            Categoria: null,
        };
    },
    methods: {
        getProduct() {
            this.getCategorias();
            this.NOME = this.$store.getters.getGenerico.NOME;
            this.ID_PRODUTO = this.$store.getters.getGenerico.ID_PRODUTO;
            this.VALOR = this.$store.getters.getGenerico.VALOR;
            this.DESC = this.$store.getters.getGenerico.DESC;
            this.Categoria = this.$store.getters.getGenerico.category;
        },
        getCategorias() {
            categoryService.getCategory().then((res) => {
                this.$store.commit("clearListCategoria");
                this.$store.commit("beginListCategoria", res.data.data);
            });
        },
        editProduct() {
            var payload = {ID_PRODUTO : this.ID_PRODUTO, NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, ID_CATEGORIA: this.Categoria.ID_CATEGORIA}
            productService.editProduct(payload, this.ID_PRODUTO).then((res) => {
                if (res.status == 200) {
                    alert("Produto Editado com suceso !");
                }
            });
        },
        closeEdit() {
            this.$store.commit("disableEdit");
        }
    },
    created() {
        this.getProduct();
    },
    components: { CategoryModal }
}
</script>

<style lang="scss" scoped>

</style>