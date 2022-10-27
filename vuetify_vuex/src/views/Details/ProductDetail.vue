<template>
    <v-container fluid grid-list-md>
        <v-row dense>
            <v-col cols="12">
                <v-card
                    color="#f2f2f2"
                    dark
                    class="elevation-5"
                >
                    <v-card-title class="ml-2 text-h4 black--text">
                    {{data.NOME}}
                    </v-card-title>
                    <v-card-subtitle class="ml-3 mt-2 black--text">Descrição do Produto : {{data.DESC}}</v-card-subtitle>
                    <v-card-text class="ml-3 black--text">
                                 <p>Valor : {{data.VALOR}}</p>
                                 <p>Categoria do produto  : {{categoria_Nome}}</p>
                                 <p>Quantidade em estoque : {{quantidade.QUANTIDADE}}</p>
                                 <p>Data de criação do Item : {{data.CREATED_AT}}</p>
                                 <p v-if="data.UPDATED_AT != data.CREATED_AT">Data de atulização do Item : {{data.UPDATED_AT}}</p>
                    </v-card-text>   
                    <v-card-actions class="ml-3">
                        <v-btn color="#3e3e3c">
                            Editar Produto
                        </v-btn>
                        <router-link to="/estoque">
                            <v-btn color="#3e3e3c" class="ml-3">
                                Voltar
                            </v-btn>
                        </router-link>   
                      
                    </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import productService from '@/service/productService'
import estoqueService from '@/service/estoqueService'
export default {
    // this.$route.params.id
    data(){
        return{
            categoria_Nome : '',
            data : [],
            quantidade : 0,

        }
    },
    methods:{
        getProduto(){
            productService.findProdutoById(this.$route.params.id).then((res) =>  {
                this.data = res.data
                this.categoria_Nome = res.data.category.NOME_C
                
            })
            estoqueService.getQuantidadeFromProduto(this.$route.params.id).then((res) => {
                this.quantidade = res.data
            })
        }
    },
    created(){
        this.getProduto();
    }
}
</script>

<style lang="scss" scoped>

</style>