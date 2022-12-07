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
            <v-card-title class="white--text text-md-h5 text-subtitle-1  mt-n4">
                <p class="pl-5">Detalhes da Despesa : #  {{despesa.ID}}</p>
            </v-card-title>
            <v-card-text class="mt-n7 ml-0 ml-md-0">
                <v-row class="d-flex flex-column flex-md-row pl-6">
                    <v-col cols="11" class="white--text  text-subtitle-1 text-md-h6  font-italic">
                        <p>
                            <b class="font-italic titulo ">Descrição :  </b> {{despesa.DESC}}

                        </p>
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column flex-md-row mt-n3 pl-6">
                    <v-col cols="11" class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo ">Valor do Produto : </b>R$ {{despesa.CUSTO.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                        </p>
                    </v-col>
                </v-row> 
                <v-row class="d-flex flex-column flex-md-row mt-n3 pl-6">
                    <v-col cols="11" class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo ">Data da Despesa : </b> {{formatDate(despesa.DATA)}}
                        </p>
                    </v-col>
                </v-row>   
                <v-row class="d-flex flex-column flex-md-row mt-n3 pl-6">
                    <v-col cols="11" class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo ">Tipo : </b> {{despesa.tags.NOME}}
                        </p>
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
            despesa : null,
            loading : true
        }
    },
    methods:{
        ...mapActions('despesaMod', ['findById']),
        async getDespesa() {
            this.despesa = await this.findById(this.generico.ID)
            this.loading = false
        },
        clear(){
            this.despesa = null
            this.getDespesa()
        },
        close(){
            this.$emit('close', false)
        },
        formatDate(date){
            let obj = new Date(date)
           
            return obj.toLocaleString()
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
        this.getDespesa()
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