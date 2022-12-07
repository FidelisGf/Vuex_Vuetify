<template>
    <div>
        <v-skeleton-loader
            v-if="loading" class="black" :loading="loading" transition="fade-transition" type="card"
        >
        </v-skeleton-loader>
        <v-card class="cards-colors" :elevation="6" v-else>
            <v-card-actions>
                <v-btn
                    icon 
                    dark 
                    class="mt-n1 ml-n1"
                    @click="close"
                ><v-icon color="red accent-2 " >mdi-close</v-icon></v-btn>
            </v-card-actions>
            <v-card-title class="white--text text-sm-h5 text-body-1  mt-n4">
                <p class="pl-5">Detalhes do Usuario : # {{usuario.NAME}} [{{usuario.ID}}] </p>
            </v-card-title>
            <v-card-text class="mt-n7">
                <v-row class="d-flex flex-column flex-md-row">
                    <v-col class="white--text  text-subtitle-1 text-md-h6  font-italic">
                        <p>
                            <b class="font-italic titulo pl-11 pt-1">Email : </b>{{usuario.EMAIL}}...
                        </p>
                      
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column flex-md-row mt-n5">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo pl-11 pt-1">Cpf : </b> {{usuario.CPF}}
                        </p>
                    </v-col>
                </v-row> 
                <v-row class="d-flex flex-column flex-md-row mt-n5">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo pl-11 pt-1">Cargo : </b> {{cargo}}
                        </p>
                    </v-col>
                </v-row>   
                <v-row class="d-flex flex-column flex-md-row mt-n5">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5 d-flex flex-row">
                        <p>
                            <b class="font-italic titulo pl-11 pt-1">Penalidades Tomadas : </b> 
                            {{qntdPenalidades}}
                        </p> 
                        <v-btn icon class="ml-2" @click="getPenalidades">
                            <v-icon v-if="!$vuetify.breakpoint.smAndDown"  
                            color="grey lighten-1">mdi-magnify-expand</v-icon>
                            <v-icon v-else small class="ml-n2 mt-n2" 
                            color="grey lighten-1">mdi-magnify-expand</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>  
                <v-row class="d-flex flex-column flex-md-row mt-n5">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo pl-11 pt-1">Vendas Realizadas : </b>{{qntdVendas}}
                        </p>
                    </v-col>
                </v-row> 
                <v-row class="d-flex flex-column flex-md-row mt-n5">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo pl-11 pt-1">Total Vendido : </b>{{totalVendido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                        </p>
                    </v-col> 
                </v-row> 
                <v-row class="mt-n3 ml-0 ml-md-8">
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
                                Criado em : {{usuario.CREATED_AT}}
                            </v-timeline-item>
                            <v-timeline-item class="text-right" fill-dot small color="teal accent-3">
                                Atualizado em : {{usuario.UPDATED_AT}}
                            </v-timeline-item>
                          </v-timeline>
                    </v-col>
                </v-row>    
            </v-card-text>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="620px"
                @keydown.escape="dialog = false"
            >   
                <v-card class="cards-colors" :elevation="6">
                    <v-card-actions class="d-flex justify-start ml-n2 ">
                        <v-btn @click="(dialog = false)" icon color="red accent-2">
                            <v-icon color="red accent-2">mdi-close</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-title class="white--text mt-n3" >
                        <p>Penalidades aplicadas</p>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="d-flex flex-column white--text ml-0 ml-md-5" v-for="item in penalidades" :key="item.ID">
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Codigo da Penalidade : #{{item.ID}} </b></p>
                            </v-col>
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Tipo da Penalidade : {{item.TIPO}}</b> </p>
                            </v-col>
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Descrição da Penalidade : {{item.DESC}}</b></p>
                            </v-col>
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Data da Penalidade : {{formatDate( item.DATA)}}</b> </p>
                            </v-col>
                            <v-col cols="11" >
                                <div class="d-flex justify-center mt-n2">
                                    <v-divider class="linha" ></v-divider>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>

        </v-card>
    </div>
  

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data(){
        return{
           usuario : null ,
           qntdVendas : 0,
           qntdPenalidades : 0,
           totalVendido : 0,
           cargo : '',
           loading : false,
           dialog : false,
           penalidades : [],
        }
    },
    methods:{
        ...mapActions('userMod', ['showUser', 'getPenalidade']),
        async getUser() {
            let data  = await this.showUser(this.generico.ID)
            this.usuario =  data.usuario
            this.qntdVendas =  data.qntdVendas
            this.qntdPenalidades =  data.qntdPenalidades
            this.cargo = data.cargo
            this.totalVendido = data.totalVendido
            console.log(this.usuario)
            if(this.usuario != null || this.usuario != undefined){
                this.usuario.CREATED_AT = await this.formatDate(this.usuario.CREATED_AT)
                this.usuario.UPDATED_AT = await this.formatDate(this.usuario.UPDATED_AT)
                this.loading = false
            }
        },
        clear(){
            this.produto = null
            this.getUser()
        },
        close(){
            this.$emit('close', false)
        },
        formatDate(data){
            data = new Date(data)
            return data.toLocaleString()
        },
        async getPenalidades(){
            this.penalidades = await this.getPenalidade(this.generico.ID);
            this.dialog = true
            console.log(this.penalidades)
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
        this.getUser()
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