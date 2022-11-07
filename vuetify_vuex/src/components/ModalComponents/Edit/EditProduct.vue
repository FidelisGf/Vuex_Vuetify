<template>
    <v-card class="cards-colors">
        <v-snackbar
            v-model="registro"
            :timeout="timeout"
        >
            {{this.msg}}
            <template v-slot:action="{ attrs }">
            <v-btn
                color="red accent-1"
                dark
                icon
                v-bind="attrs"
                @click="registro = false"
                >
                <v-icon small>mdi-close</v-icon>
            </v-btn>
            </template>
        </v-snackbar>
        <v-card-actions>
            <v-btn
                icon
                text 
                dark 
                class="ml-n3 mt-n1"
                @click="closeEdit"
            ><v-icon color="red accent-2">mdi-close</v-icon></v-btn>
        </v-card-actions>
        <v-card-title class="white--text">
            <span  class="mt-n3 text-h5">Editar Item: <b>{{NOME}} #{{ID}}</b></span>
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
                            dark
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
                            dark
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
                            dark
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
                                dark
                                return-object
                                :loading="loading"
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
                                dark
                                item-text="NOME" 
                                return-object
                                required
                            ></v-select>
                            <MedidaModal></MedidaModal>
                        </v-col>
                </v-row>
            </v-container>
            <small class="white--text" >*Manipule os dados basicos do produto.</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
                <v-btn
                    color="teal lighten-1"
                    text
                    @click="editP"
                >
                    Editar
                </v-btn>
        </v-card-actions>
    </v-card>
            
</template>

<script>
import CategoryModal from '../CategoryModal.vue'
import {  mapActions, mapGetters } from 'vuex'
import MedidaModal from '../MedidaModal.vue';
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
            Medida : "",
            msg : "",
            registro : false,
            timeout : 2000,
        };
    },
    methods: {
        ...mapActions('categoryMod', ['beginListCategoria']),
        ...mapActions('produtoMod', ['editProduct', 'findById']),
        async getProduct() {
            this.loading = true
            this.getCategorias();
            this.quantidade = this.generico.QUANTIDADE
            this.ID = this.generico.ID;
            let data = await this.findById(this.ID)
            if(data != null || data != undefined){
                this.NOME = data.NOME
                this.DESC = data.DESC
                this.VALOR = data.VALOR
                this.Medida = data.medida
                this.Categoria = data.category
                this.loading = false
            }
        },
        getCategorias() {
            this.beginListCategoria()
        }, 
        closeEdit(){
            this.$emit('close-edit', false)
        },
        clear(){
            this.NOME = ''
            this.DESC = ''
            this.VALOR = ''
            this.Categoria = ''
            this.loading = false
        },
        async editP() {
            var payload = {ID : this.ID, NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, ID_CATEGORIA: this.Categoria.ID_CATEGORIA, 
                NOME_C : this.Categoria.NOME_C, QUANTIDADE : this.quantidade, ID_MEDIDA : this.Medida.ID}
            this.msg = await this.editProduct(payload)
            console.log(this.msg)
            this.registro = true
        },
    },
    computed:{
        ...mapGetters({listCategorias : 'categoryMod/listCategorias', generico : 'utilMod/getGenerico',  listMedidas : 'medidaMod/getMedidas'})
    },
    watch: {
        generico : function(val) {
          if (val) {
             this.clear()
             this.getProduct()
          }
        }  
    },
    created() {
        this.getProduct();
    },
    components: { CategoryModal, MedidaModal }
}
</script>

<style lang="scss" scoped>
    
</style>