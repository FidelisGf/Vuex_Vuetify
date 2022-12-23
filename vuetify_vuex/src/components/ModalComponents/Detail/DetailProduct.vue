<template>
    <div>
        <v-skeleton-loader
            v-if="loading" class="black" :loading="loading" transition="fade-transition" type="card"
        >
        </v-skeleton-loader>
        <v-card class="cards-colors" :elevation="6" v-else >
            <v-card-actions>
                <v-btn
                    icon 
                    dark 
                    class="mt-n1 ml-n1"
                    @click="close"
                ><v-icon color="red accent-2 " >mdi-close</v-icon></v-btn>
            </v-card-actions>
            <v-card-title class="white--text text-md-h5 text-subtitle-1  
            mt-n4 d-flex justify-center flex-column">
                <p >Detalhes do Produto : # {{produto.NOME}} [{{produto.ID}}] </p>
                <div class="d-flex flex-sm-row">
                    <v-img   
                        class="mt-2 mt-sm-0" 
                        max-height="250"
                        max-width="250"
                        :src="url"
                    ></v-img>
                   
                </div>
                
            </v-card-title>
            <v-card-subtitle class="d-flex flex-sm-row justify-center mt-2">
                <div v-for="cor in cores" :key="cor.ID"  class="white--text subtitle-1 
                font-italic d-flex justify-center">
                    <div class="d-flex flex-sm-row ">
                        <v-sheet
                        
                        dense
                        :color="cor.HASH"
                        class="ml-1"
                        height="30"
                        width="30"
                    ></v-sheet>
                    </div>
                    
                </div>
            </v-card-subtitle>
            <v-card-text class="mt-n2 ml-0 ml-md-0">
                <v-row class="d-flex flex-column flex-md-row justify-center">
                    <v-col class="white--text  text-subtitle-1 text-md-h6 d-flex justify-center font-italic">
                        <p>
                            <b class="font-italic titulo ">Descriçao : </b>{{produto.DESC}}
                        </p>
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column flex-md-row mt-n3 justify-center">
                    <v-col class="white--text text-subtitle-1 text-md-h6  font-italic mt-n5 
                    d-flex justify-center">
                        <p>
                            <b class="font-italic titulo ">Valor do Produto : </b>R$ 
                            {{produto.VALOR.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                        </p>
                    </v-col>
                </v-row> 
                <v-row class="d-flex flex-column flex-md-row mt-n3 justify-center">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic 
                    mt-n5 d-flex justify-center">
                        <p>
                            <b class="font-italic titulo ">Quantidade em Estoque : </b> 
                            {{generico.QUANTIDADE}}
                        </p>
                    </v-col>
                </v-row>   
                <v-row class="d-flex flex-column flex-md-row mt-n3 justify-center">
                    <v-col class="white--text text-subtitle-1 text-md-h6 
                    font-italic mt-n5 d-flex justify-center">
                        <p>
                            <b class="font-italic titulo ">Categoria do Produto : </b>
                            {{produto.category.NOME_C}} [{{produto.category.ID_CATEGORIA}}]
                        </p>
                    </v-col>
                </v-row>  
                <v-row class="d-flex flex-column flex-md-row mt-n3 justify-center">
                    <v-col class="white--text text-subtitle-1 text-md-h6 
                    font-italic mt-n5 d-flex justify-center">
                        <p>
                            <b class="font-italic titulo ">Unidade de Medida : </b>
                            {{produto.medida.NOME}} [{{produto.medida.ID}}]
                        </p>
                    </v-col>
                </v-row> 
                <v-row class="d-flex flex-column flex-md-row mt-n3 justify-center">
                    <v-col class="white--text text-subtitle-1 text-md-h6 
                    font-italic mt-n5 d-flex justify-center">
                        <p>
                            <b class="font-italic titulo pl-4 pl-md-5">Margem de Lucro na venda : </b> 
                            {{lucro.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}

                            <span v-if="percent <= 20 && percent > 0" class="green--text">
                                ({{percent.toFixed(2)}}%) de lucro
                            </span>

                            <span class="red--text" v-else>
                                ({{percent.toFixed(2)}}%) de lucro
                            </span>
                        </p>
                    </v-col>
                </v-row>
                <v-row class="mt-n3 ml-md-8 ml-0">
                    <v-col cols="11" >
                        <div class="d-flex justify-center mt-n2">
                            <v-divider class="linha" ></v-divider>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column flex-md-row mt-n1 justify-center">
                    <v-col class="white--text text-subtitle-1 text-md-h6 
                    font-italic mt-md-0 mt-n2 d-flex justify-center flex-column">
                        <p>
                            <b class="font-italic titulo d-flex justify-center">Matérias Primas...</b>
                        </p>
                        <v-row class="flex-column mt-6 justify-center"> 
                            <v-col v-for="materia in produto.MATERIAS" 
                            :key="materia.ID"  class="white--text subtitle-1 
                            font-italic d-flex justify-center">
                                <p class="pl-0  mt-n10"><b class="titulo">Nome :</b> {{materia.NOME}}   
                                    <b class="titulo">/ Quantidade :</b> {{materia.QUANTIDADE}}   
                                    <b class="titulo">/ Custo :</b> 
                                    {{materia.CUSTO.
                                        toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                                </p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="mt-n4 ml-0 ml-md-8">
                    <v-col cols="11" >
                        <div class="d-flex justify-center mt-n2">
                            <v-divider class="linha" ></v-divider>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column flex-md-row mt-n2 justify-lg-start">
                    <v-col class="white--text text-subtitle-1  font-italic mt-n2">
                        <v-timeline>
                            <v-timeline-item color="blue accent-2"
                                fill-dot
                                small
                            >
                                Criado em : {{produto.CREATED_AT}}
                            </v-timeline-item>
                            <v-timeline-item class="text-right" fill-dot small color="teal accent-3">
                            Atualizado em : {{produto.UPDATED_AT}}
                            </v-timeline-item>
                          </v-timeline>
                    </v-col>
                </v-row>    
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data(){
        return{
            produto : null,
            lucro : 0,
            percent : null,
            loading : true,
            url : null,
            cores : []
        }
    },
    methods:{
        ...mapActions('produtoMod', ['findById', 'getLucroByProd']),
        async getProduct() {
            this.produto = await this.findById(this.generico.ID)
            this.lucro = await this.getLucroByProd(this.generico.ID)
            this.percent = this.lucro.porcentagem
            this.lucro = this.lucro.lucro
            this.url = "data:image/png;base64," + this.produto.IMAGE
            this.cores = await this.produto.CORES
            console.log(this.produto.MATERIAS)
            console.log(this.cores)
            if(this.produto != null && this.produto != undefined){
                this.produto.CREATED_AT = await this.formatDate(this.produto.CREATED_AT)
                this.produto.UPDATED_AT = await this.formatDate(this.produto.UPDATED_AT)
                this.loading = false
            }
            
        },
        clear(){
            this.produto = null
            this.getProduct()
        },
        close(){
            this.$emit('close', false)
        },
        formatDate(date){
            let obj = new Date(date)
            let day = obj.getDate()
            let month = obj.getMonth()
            month = parseInt(month + 1)
            let year = obj.getFullYear()
            let hour = obj.getHours()
            let minu = obj.getMinutes()
            let formatData  = day + "/" + month+ "/" + year + ": " + hour + ":" + minu ;
            return formatData
        }
    },
    computed:{
        ...mapGetters({generico : 'utilMod/getGenerico'})
    },
    watch: {
        generico : function(val) {
          if (val) {
            this.loading = true
             this.clear()
          }
          this.generico = val
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
    .linha{
        background-color: #BDBDBD !important;
    }
</style>