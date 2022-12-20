<template>
    <v-container fluid grid-list-md>
    <v-row class="d-flex flex-column-reverse d-sm-flex flex-md-row mt-10 mt-md-0 mt-lg-0">
        <v-snackbar
            v-model="registro"
            :timeout="timeout"
        >
            {{this.msg}}
            <template v-slot:action="{ attrs }">
            <v-btn
                color="red"
                dark
                icon
                v-bind="attrs"
                @click="registro = false"
                >
                <v-icon small>mdi-close</v-icon>
            </v-btn>
            </template>
        </v-snackbar>
        <v-col cols="12" md="12" sm="12"  lg="6" class="d-flex flex-column-reverse flex-md-row justify-center justify-lg-start mt-0 mt-md-10 mt-lg-0">
            <div class="ml-0 ml-lg-n10 pl-0 d-flex justify-center">
                <MaterialModal @messageSnackBar="getMessage" class="ml-sm-0  pl-sm-0 ml-lg-10  "></MaterialModal>
            </div>
            <v-btn
                color="teal accent-3"
                class="mt-0 ml-1 ml-lg-0  font-weight-medium"
                dark
                text
                @click="estoqueMod = true"
            >
            <v-icon  dark color="teal accent-3" left>mdi-plus-circle-outline</v-icon>
                Estoque
            </v-btn>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="720px"
                @keydown.escape="dialog = false"
                
            >
                <template v-if="!miniatura" v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="teal accent-3"
                    class="mt-0 ml-1 font-weight-medium"
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
                    <v-stepper dark v-model="e1">
                            <v-stepper-header >
                                <v-stepper-step
                                    :complete="e1 > 1"
                                    step="1"
                                    color="green darken-1"
                                   
                                >
                                    Info Básicas
                                </v-stepper-step>
                                
                                <v-divider></v-divider>
                                
                                <v-stepper-step
                                    :complete="e1 > 2"
                                    step="2"
                                    color="green darken-1"
                                    
                                >
                                     Matérias Primas
                                </v-stepper-step>
                            </v-stepper-header>
                                <v-stepper-items>
                                    <v-stepper-content  step="1">
                                        <v-card class="cards-colors">
                                            <v-card-title class="white--text">
                                                        <span class="text-h5 mt-n4">Informações do Produto</span>
                                            </v-card-title>
                                            <form ref="form" @submit.prevent="proximaEtapa" class="mt-n4" enctype="multipart/form-data">
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="8"
                                                        >
                                                        <v-text-field
                                                            label="Nome do produto"
                                                            required
                                                            dark
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
                                                            v-model="VALOR"
                                                            label="Valor do produto"
                                                            persistent-hint
                                                            required
                                                            dark
                                                            color="teal lighten-1"
                                                            value="10.00"
                                                            prefix="R$"
                                                            type="number"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col 
                                                        cols="12"
                                                        sm="4"
                                                        md="4"
                                                    >
                                                        <v-text-field
                                                            v-model="quantidade_inicial"
                                                            label="Quantidade"
                                                            persistent-hint
                                                            required
                                                            dark
                                                            color="teal lighten-1"
                                                            type="number"
                                                            min="0"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="4"
                                                        class="d-flex"
                                                    > 
                                                        
                                                        <v-select
                                                            :items="listCategorias"
                                                            label="Categoria"
                                                            v-model="Categoria"
                                                            color="teal lighten-1"
                                                            item-text="NOME_C" 
                                                            return-object
                                                            dark
                                                            transition="fab-transition"
                                                            required
                                                    ></v-select>
                                                    <CategoryModal @insertCategory="listenMsg" :miniatura="true"  class="mt-4 ml-2 "></CategoryModal>
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
                                                        dark
                                                        color="teal lighten-1"
                                                        item-text="NOME" 
                                                        return-object
                                                        required
                                                    ></v-select>
                                                    <MedidaModal @insertMedida="listenMsg"></MedidaModal>
                                                </v-col>
                                                
                                                <v-col
                                                    cols="12"
                                                    sm="12"
                                                    md="12"
                                                    class="mt-n2"
                                                >
                                                    <v-textarea
                                                        v-model="DESC"
                                                        label="Descrição"
                                                        required
                                                        color="yellow lighten-1"
                                                        dark
                                                        counter="300"
                                                        outlined
                                                    ></v-textarea>
                                                </v-col>
                                                <v-col cols="6" md="6" class="mt-n2">
                                                    <label class="arqv" for="arqv">Anexar Foto</label>
                                                    <input
                                                        type="file"
                                                        ref="image"
                                                        label="Add Image"
                                                        
                                                        @change="uploadImage"
                                                        id="arqv"
                                                    >
                                                </v-col>
                                                <v-col cols="12">
                                                    <img :src="image_url" height="150" v-if="image_url"/>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>  
                                        <small class="ml-3 mt-n6" >*Os produtos criados serão adicionados ao seu estoque.</small>  
                                        <v-card-actions class="mt-0 mt-md-n6">
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="red lighten-1"
                                                text
                                                @click="dialog = false"
                                            >
                                                Fechar
                                            </v-btn>
                                            <v-btn 
                                                color="teal lighten-1"
                                                text
                                                type="submit"
                                            >
                                                Proxima
                                            </v-btn>
                                        </v-card-actions>
                                    </form> 
                                </v-card>         
                            </v-stepper-content>
                            <v-stepper-content step="2">
                                <ChoseMateriaisModal @voltar-etapa="voltarEtapa" 
                                @fechar="closeByChildEvent" @finalizarCadastro="postProduto"></ChoseMateriaisModal>    
                            </v-stepper-content>
                        </v-stepper-items>                
                    </v-stepper>   
            </v-dialog>
        </v-col>     
        <v-spacer v-if="!$vuetify.breakpoint.smAndDown" ></v-spacer>
        <v-col 
            cols="10" 
            md="12" 
            lg="3" 
            sm="12" 
            class="pl-sm-0 mt-2 mt-md-2 mt-lg-2 
                   d-inline-flex d-lg-inline-flex  
                   justify-center justify-lg-start ml-10 ml-sm-0 "
        >
            <v-sheet
                color="cyan lighten-5"
                elevation="8"
                height="57px"
                width="200px"
                class=" exibeGasto ml-lg-10 ml-md-3  mt-n5 "
            >
                <p style="font-size: 16px;" class="ml-3 mt-2 font-weight-medium"><v-icon class="ml-n2 mt-n3" color="teal lighten-1">mdi-checkbox-marked-circle</v-icon>Produtos Ativos</p>
                <p style="font-size : 14px;" class="mt-n4 ml-8 font-weight-bold">Quantidade Atual : {{countProdutos}}</p>
            </v-sheet>
        </v-col>
    </v-row>
    <v-row >
        <v-col cols="12">
           <ListaGenerica :key="renicializar" :route="'products'" :headers="headers"></ListaGenerica>
        </v-col>      
    </v-row>
    <v-row>
        <v-dialog
            v-model="estoqueMod"
            persistent
            max-width="550"
            @keydown.escape="estoqueMod = false"
            
        >
            <EstoqueModal @postMessage="getMessage" @closeEstoque="closeEstoqueMod"></EstoqueModal>
        </v-dialog>
    </v-row>
</v-container>
</template>
<script>
import CategoryModal from './CategoryModal.vue'
import EstoqueModal from './EstoqueModal.vue';
import ListaGenerica from '../ListaGenerica.vue';
import { mapGetters,mapActions } from 'vuex';
import MedidaModal from './MedidaModal.vue';
import MaterialModal from './MaterialModal.vue';
import ChoseMateriaisModal from './ChoseMateriaisModal.vue';

export default {
    props: {
        miniatura: Boolean
    },
    data() {
        return {
            Categoria: null,
            Medida : null,
            NOME: "",
            dialog : false,
            ID: "",
            DESC: "",
            VALOR: 1,
            filtroAtivo : false,
            loading: true,
            ID_CATEGORIA: 0,
            products: [],
            tempCategory : null,
            registro : false,
            fracasso : false,
            msg : '',
            timeout : 4000,
            estoqueMod : false,
            e1 : 1,
            quantidade_inicial : 0,
            renicializar : 0,
            image_product : null,
            image_url : null,
            image_file : null,
           
        };
    },
    computed: {
        ...mapGetters({listCategorias : 'categoryMod/listCategorias', activeEstoque : 'estoqueMod/getAdicionaEstoque',
        countProdutos : 'produtoMod/getCount', listMedidas : 'medidaMod/getMedidas'
        , materias : 'materiaMod/getMateriais'}),
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
    watch: {
        quantidade_inicial: function(val) {
          if (val) {
             this.setQntdProd(val)
          }
        },
    },
    methods: {
        ...mapActions('produtoMod', ['post', 'countProd', 'setQntdProd']),
        ...mapActions('estoqueMod', ['activeAdicionaEstoque']),
        ...mapActions('medidaMod', ['getAll']),
        ...mapActions('materiaMod', ['clearMateriais']),
        listenMsg(e){
            this.msg = e
            this.registro = true
        },
        closeEstoqueMod(e){
            
            this.estoqueMod = e

        },
        forceRerender (){
            this.renicializar += this.renicializar + 1;
        },
        async closeByChildEvent(e){
            this.clearMateriais()
            await this.forceRerender()
            this.dialog = e.estado
            this.e1 = e.valor
        },
        async voltarEtapa(e){
            await this.forceRerender()
            this.e1 = e
        },
        async getMessage(e){
            this.msg = e
            this.registro = true
            await this.forceRerender()
        },  
        
       async postProduto() {
            
            console.log(this.image_file)
            var payload = { NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC,
                 quantidade_inicial: this.quantidade_inicial,
                  ID_CATEGORIA: this.Categoria.ID_CATEGORIA
                  , NOME_C : this.Categoria.NOME_C, ID_MEDIDA : this.Medida.ID, MATERIAIS : this.materias, file : this.image_url };
            this.msg = await this.post(payload)
            this.loading = true
            await this.forceRerender()      
            this.registro = true
            this.dialog = false 
            this.e1 = 1
            this.Categoria = null
            this.loading = false
            this.clearMateriais()
            this.cleanProduct()
        },
        uploadImage(e){
            //this.image_product = this.$refs.file.files[0]
            this.image_product = e.target.files
            console.log(this.image_product[0])
            if(this.image_product[0] !== undefined){
                let name = this.image_product[0].name 
                console.log(name)
            }
            const fr = new FileReader()
            fr.readAsDataURL(this.image_product[0])
            fr.addEventListener('load', ()=>{
                this.image_url = fr.result
                this.image_file = this.image_product[0]
            })
            console.log(this.image_url)
            console.log(this.image_file)
        },
        proximaEtapa(){
            console.log(this.image_product)
            if(this.image_product){
                let formImage = new FormData()
                formImage.append('image', this.image_product.name)
                console.log(formImage)
            }
            this.e1 = 2
        },
        cleanProduct(){
            this.ID = null
            this.NOME = null
            this.VALOR = null
            this.DESC = null
            this.Categoria = null
            this.Medida = null
            this.quantidade_inicial = 0
        }, 
    },
   async created() {
        await this.getAll()
        await this.countProd()
    },
    components: { CategoryModal, EstoqueModal, ListaGenerica, MedidaModal, MaterialModal, ChoseMateriaisModal }
}
</script>

<style lang="scss" >
    .exibeGasto{
        border-color: aqua !important;
        box-shadow: 0px 2px 25px 2px #96f5f0 !important;
        border-radius: 10px !important;
    
    }
    .cards-colors{
        background-color: rgb(48, 48, 48) !important;
    }
    .exibeGasto:hover{
        transform: translate(2px, -2.10px);
        transition: 1.5s;
        box-shadow: 0px 2px 35px 2px #505050 !important;
    }
    .exibeGasto:hover::after{
        transform: translate(2px, +2.10px);
        transition: 1.5s;
        box-shadow: 2px 2px 25px 2px #09d163 !important;
    }
    input[type="file"] {
        display: none;
    }
    .arqv {
        padding: 20px 10px;
        width: 150px;
        background-color: rgb(59, 59, 59);
        color: #FFF;
        text-align: center;
        display: block;
        margin-top: 5px;
        cursor: pointer;
    }
</style>