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
                                <v-list-item-title class="ml-0 ml-sm-2 white--text">
                                    <p class="text-sm-h5 title-text"><b>Lucro Total : {{lucro}}</b></p>
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 ml-sm-2  white--text">
                                    <p><b class=" text-sm-body-1 text-caption">Recebimento Total : {{total}}</b></p>
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
                                    <p><b class="text-caption text-sm-body-1">Pagamento Por Cartao : {{cartao}}</b></p>
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
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="ml-0 footer-text ml-sm-2">
                                    <p ><b class="text-caption text-sm-body-1 ">Gastos com Matéria Prima : {{gasto}}</b></p>
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
                    this.dinheiro = response.data[0]
                    this.cartao = response.data[1]
                    this.pix = response.data[2]
                    this.total = response.data[3]
                    this.lucro = response.data[4]
                    this.loading = false
                }
            })
            this.gasto = await  parseFloat(this.total - this.lucro)
            this.total = this.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.pix = this.pix.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.cartao = this.cartao.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.dinheiro = this.dinheiro.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.lucro = this.lucro.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.gasto = this.gasto.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
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