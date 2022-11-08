<template>
   <v-card class="cards-colors " :elevation="10">
        <v-card-actions>
            <v-btn
                icon 
                dark 
            ><v-icon color="red accent-2">mdi-close</v-icon></v-btn>
        </v-card-actions>
        <v-card-title class="white--text text-h5 mt-n5 ">
            <p class="pl-5">Detalhes do Produto : # {{produto.NOME}} [{{produto.ID}}] </p>
        </v-card-title>
        <v-card-text class="mt-n5">
            <v-row class="d-flex flex-column flex-md-row">
                <v-col class="white--text text-h6 font-italic">
                    <p>
                        <b class="font-italic titulo pl-5">Descriçao : </b>{{produto.DESC}}...
                    </p>
                </v-col>
            </v-row>
            <v-row class="d-flex flex-column flex-md-row mt-n5">
                <v-col class="white--text text-h6 font-italic mt-n5">
                    <p>
                        <b class="font-italic titulo pl-5">Valor do Produto : </b>R$ {{produto.VALOR.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                    </p>
                </v-col>
            </v-row>  
            <v-row class="d-flex flex-column flex-md-row mt-n5">
                <v-col class="white--text text-h6 font-italic mt-n5">
                    <p>
                        <b class="font-italic titulo pl-5">Categoria do Produto : </b>{{produto.category.NOME_C}} [{{produto.category.ID_CATEGORIA}}]
                    </p>
                </v-col>
            </v-row>  
            <v-row class="d-flex flex-column flex-md-row mt-n5">
                <v-col class="white--text text-h6 font-italic mt-n5">
                    <p>
                        <b class="font-italic titulo pl-5">Unidade de Medida : </b>{{produto.medida.NOME}} [{{produto.medida.ID}}]
                    </p>
                </v-col>
            </v-row> 
            <v-row class="d-flex flex-column flex-md-row mt-n2">
                <v-col class="white--text text-h6 font-italic mt-n2">
                    <p>
                        <b class="font-italic titulo pl-5">Matérias Primas necessárias : </b>
                    </p>
                    <v-row class="flex-column ml-10 mt-8"> 
                        <v-col v-for="materia in produto.MATERIAIS" :key="materia.ID"  class="white--text subtitle-1 font-italic">
                            <p class="pl-5 mt-n10"><b class="titulo">Nome :</b> {{materia.NOME}}   
                                <b class="titulo">/ Quantidade :</b> {{materia.QUANTIDADE}}   <b class="titulo">/ Custo :</b> {{materia.CUSTO.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="d-flex flex-column flex-md-row mt-n5">
                <v-col class="white--text text-h6 font-italic mt-n5">
                    <p>
                        <b class="font-italic titulo pl-5">Lucro encima do custo :</b> {{lucro.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                        ({{percent}}%) de lucro
                    </p>
                </v-col>
            </v-row>
            <v-row class="d-flex flex-column flex-md-row mt-n2">
                <v-col class="white--text text-h6 font-italic mt-n2">
                    <p>
                        <b class="font-italic titulo pl-5">Data de Registro  : </b> {{produto.CREATED_AT}}
                    </p>
                </v-col>
            </v-row>    
        </v-card-text>
   </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data(){
        return{
            produto : null,
            NOME : '',
            lucro : 0,
            percent : null,
        }
    },
    methods:{
        ...mapActions('produtoMod', ['findById', 'getLucroByProd']),
        async getProduct() {
            this.loading = true
            this.produto = await this.findById(this.generico.ID)
            this.lucro = await this.getLucroByProd(this.generico.ID)
            if(this.produto != null || this.produto != undefined){
                this.loading = false
                console.log(this.produto)
            }
            await this.getPercent()
        },
        getPercent(){
            this.percent = Math.round((this.lucro / this.produto.VALOR) * 100);
        }
    },
    computed:{
        ...mapGetters({generico : 'utilMod/getGenerico'})
    },
    watch: {
        generico : function(val) {
          if (val) {
             this.clear()
             this.getProduct()
          }
        }  
    },
    created(){
        this.getProduct()
    }
}
</script>

<style lang="scss" scoped>
    .titulo{
        color: #c5c3c3 !important;
    }
</style>