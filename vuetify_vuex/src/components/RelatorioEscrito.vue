<template>
    <v-container>
        <v-row>
            <v-col>
                <v-skeleton-loader
                    v-if="loading == true" class="black" :loading="loading" transition="fade-transition" type="card"
                >
                </v-skeleton-loader>
                    <v-list color="#1e1e1e">
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 ml-sm-2 mt-n5  teal--text">
                                    <p><b class="text-caption text-sm-h6">Recebimento Total : {{total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</b></p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 white--text ml-sm-2">
                                    <p><b class="text-caption text-sm-body-1 ">Pagamento Por PIX : {{pix}}</b></p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 white--text ml-sm-2">
                                    <p><b class="text-caption text-sm-body-1">Pagamento Por Cartao de Crédito : {{cartao}}</b></p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 white--text ml-sm-2">
                                    <p><b class="text-caption text-sm-body-1">Pagamento Por Dinheiro: {{dinheiro}}</b></p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
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
            pix : null,
            dinheiro : null,
            cartao : null,
            total : null,
            lucro : null,
            gasto : null,
            dtStart : '',
            dtFinal : '',
            loading : true,
        }
    },
    methods:{
        ...mapActions('utilMod' , ['setLoad']),
        async getDados(route){
            this.dtStart = this.starterDate
            this.dtFinal = this.endDate
            await axios.get("http://127.0.0.1:8000/api/" + route, 
            { params: { opcao: this.opcao, start : this.dtStart, end : this.dtFinal} }).then((response) => {
                if(this.route  == 'vendas'){
                    this.dinheiro = response.data[2].VALORES
                    this.cartao = response.data[0].VALORES
                    this.pix = response.data[3].VALORES
                    this.loading = false
                }
            })
            this.total += parseFloat(this.pix)
            this.total += parseFloat(this.dinheiro)
            this.total += parseFloat(this.cartao)
            this.pix = this.pix.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.cartao = this.cartao.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.dinheiro = this.dinheiro.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.setLoad(false)
        }
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