<template>
   <v-card class="cards-colors " :elevation="10">
        <v-card-actions>
            <v-btn
                icon 
                dark 
            ><v-icon color="red accent-2">mdi-close</v-icon></v-btn>
        </v-card-actions>
        <v-card-title class="white--text text-h5 mt-n5">
            Detalhes do Produto : # {{produto.NOME}}
        </v-card-title>
        <v-card-text >
            <v-row class="d-flex flex-column flex-md-row mt-4">
                <v-col class="white--text d-flex justify-space-around text-h6 font-italic">
                    <p>
                        <b class="font-italic titulo pl-5">Nome : </b>{{produto.NOME}}
                    </p>
                </v-col>
                <v-col class="white--text d-flex justify-space-around text-h6   font-italic">
                    <p>
                        <b class="font-italic titulo">Descrição : </b>{{produto.DESC}}
                    </p>
                </v-col>

            </v-row>
            <v-row class="d-flex flex-column flex-md-row">
                
                <v-col class="white--text d-flex justify-space-around text-h6   font-italic">
                    <p>
                        <b class="font-italic titulo">Codigo  : </b>{{produto.ID}}
                    </p>
                   
                </v-col>
                <v-col class="white--text d-flex justify-space-around text-h6   font-italic">
                    <p>
                        <b class="font-italic titulo pl-5">Valor : </b>{{produto.VALOR}}
                    </p>
                </v-col>
            </v-row>
            <v-row class="d-flex flex-column flex-md-row">
                <v-col class="white--text d-flex justify-space-around text-h6  font-italic">
                    <p>
                        <b class="font-italic titulo ml-n10">Categoria : </b>{{produto.category.NOME_C}}
                    </p>  
                </v-col>
                <v-col class="white--text d-flex justify-space-around text-h6  font-italic">
                    <p>
                        <b class="font-italic titulo ">Medida : </b>{{produto.medida.NOME}}
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
        }
    },
    methods:{
        ...mapActions('produtoMod', ['findById']),
        async getProduct() {
            this.loading = true
            this.produto = await this.findById(this.generico.ID)
            if(this.produto != null || this.produto != undefined){
                this.loading = false
                console.log(this.produto)
            }
        },
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