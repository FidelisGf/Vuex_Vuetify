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
                        <span  class="text-h5">Editar Item: {{NOME}} #{{ID}}</span>
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
                                        :loading="loading"
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
                                        :loading="loading"
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
                                    :loading="loading"
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
                                        :loading="loading"
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
                                @click="editP"
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
import CategoryModal from '../CategoryModal.vue'
import {  mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            ID: null,
            NOME: "",
            VALOR: 0,
            DESC: "",
            Categoria: null,
            loading : false,
            quantidade : null,
        };
    },
    methods: {
        ...mapActions('categoryMod', ['beginListCategoria']),
        ...mapActions('produtoMod', ['editProduct', 'findById']),
        async getProduct() {
            this.loading = true
            this.getCategorias();
            this.quantidade = this.$store.getters.getGenerico.QUANTIDADE
            this.ID = this.$store.getters.getGenerico.ID;
            let data = await this.findById(this.ID)
            if(data != null || data != undefined){
                this.NOME = data.NOME
                this.DESC = data.DESC
                this.VALOR = data.VALOR
                this.Categoria = data.category
                this.loading = false
            }

        },
        getCategorias() {
            this.beginListCategoria()
        },
        editP() {
            var payload = {ID : this.ID, NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, ID_CATEGORIA: this.Categoria.ID_CATEGORIA, 
                NOME_C : this.Categoria.NOME_C, QUANTIDADE : this.quantidade}
            this.editProduct(payload)
            
        },
        closeEdit() {
            this.$store.commit("disableEdit");
        }
    },
    computed:{
        ...mapGetters({listCategorias : 'categoryMod/listCategorias'})
    },
    created() {
        this.getProduct();
    },
    components: { CategoryModal }
}
</script>

<style lang="scss" scoped>

</style>