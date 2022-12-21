<template>
    <v-container>
        <v-row>
            <v-col>
                <v-skeleton-loader
                    v-if="loading == true" class="black" :loading="loading" 
                    transition="fade-transition" type="card"
                >
                </v-skeleton-loader>
                    <v-list color="#1e1e1e" class="mt-n3 mt-md-0">
                        <v-list-item >
                            <v-list-item-content  >
                                <v-list-item-title class="ml-0 ml-sm-2  mt-md-n3   teal--text">
                                    <p><b class="text-caption text-sm-h6 text-body-1 ">
                                        Recebimento Total : {{total.
                                            toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                                        </b>
                                    </p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 white--text ml-sm-2">
                                    <p><b class="text-caption text-sm-body-1 ">
                                        Pagamento Por PIX : {{pix}}</b>
                                    </p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 white--text ml-sm-2">
                                    <p><b class="text-caption text-sm-body-1">
                                        Pagamento Por Cartao de Crédito : {{cartao}}</b>
                                    </p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 white--text ml-sm-2">
                                    <p><b class="text-caption text-sm-body-1">
                                        Pagamento Por Cartao de Débito : {{cartaoDebito}}</b>
                                    </p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 white--text ml-sm-2">
                                    <p><b class="text-caption text-sm-body-1">Pagamento Por Dinheiro: 
                                        {{dinheiro}}</b>
                                    </p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props:{
        route: String,
        opcao : String,
        starterDate : String,
        endDate : String,
    },
    data(){
        return{
            pix : 0,
            dinheiro : 0,
            cartao : 0,
            total : 0,
            cartaoDebito: 0,
            lucro : null,
            gasto : null,
            dtStart : '',
            dtFinal : '',
            loading : true,
        }
    },
    methods:{
        ...mapActions('utilMod' , ['setLoad', 'setListaItens']),
        async getDados(route){
            this.dtStart = this.starterDate
            this.dtFinal = this.endDate
            let payload = {route: route, opcao : this.opcao, dtStart : this.dtStart, dtFinal : this.dtFinal}
            let data = await this.setListaItens(payload)
            console.log(data)
            if(data[2] !== undefined){
                this.dinheiro = parseFloat(data[2].VALORES)
            }
            if(data[0] !== undefined ){
                this.cartao = parseFloat(data[0].VALORES)
            }
            if(data[1] !== undefined ){
                this.cartaoDebito = parseFloat(data[1].VALORES)
            } 
            if(data[3] !== undefined ){
                this.pix = parseFloat(data[3].VALORES)
            }
            this.loading = false
            this.total += parseFloat(this.pix)
            this.total += parseFloat(this.dinheiro)
            this.total += parseFloat(this.cartao)
            this.total += parseFloat(this.cartaoDebito)
            this.pix = this.pix.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.cartao = this.cartao.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.cartaoDebito = this.cartaoDebito.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.dinheiro = this.dinheiro.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.setLoad(false)
        },
    },
    created(){
        this.getDados(this.route)
    }
}
</script>

<style lang="scss" scoped>
    .title-text{
        color: #B2FF59 !important;
    }
    .footer-text{
        color:  #FF5252 !important;
    }
</style>