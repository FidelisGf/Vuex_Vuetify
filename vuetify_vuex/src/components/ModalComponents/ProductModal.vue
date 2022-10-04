<template>
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
            @click="getCategorias"
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
                    > 
                        <v-select
                            :items="categorias"
                            label="Categoria"
                            v-model="Categoria"
                            color="orange"
                            item-text="NOME" 
                            return-object
                        ></v-select>
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
</template>
<script>
import categoryService from '@/service/categoryService'
import productService from '@/service/productService'
export default {
    props: {
        miniatura : Boolean
    },
    data(){
        return {
            dialog : false,
            data: [],
            categorias: [],
            Categoria: null,
            NOME: "",
            quantidade_inicial: 0,
            DESC: "",
            VALOR: 0,
            ID_CATEGORIA: 0,
        }
    },
    methods:{
        getCategorias() {
            categoryService.getCategory().then((res) => {
                this.categorias = res.data.data;
            });
        },
        postProduto() {
            var payload = { NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, quantidade_inicial: this.quantidade_inicial, ID_CATEGORIA: this.Categoria.ID };
            productService.postProduto(payload).then((res) => {
                if (res.status == 200) {
                    alert("Produto salvo com sucesso");
                    var payload2 = { NOME: this.NOME, VALOR: this.VALOR, DESC: this.DESC, CATEGORIA: this.Categoria.NOME }
                    this.$store.commit('saveProduct', payload2)
                    console.log(this.$store.state.product)
                    this.dialog = false;
                }
            });
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>