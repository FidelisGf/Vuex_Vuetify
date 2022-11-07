<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card color="#1e1e1e">
                        <v-card-title class="white--text">
                            Tipo de Pagamentos 
                        </v-card-title>
                        <v-card-text class="white--text">
                            <v-list color="#1e1e1e">
                                <v-list-item >
                                    <v-list-item-content>
                                        <v-list-item-title class="ml-2 white--text">
                                            <p class="text-h5"><b>Recebimento Total :{{total}}</b></p>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item >
                                    <v-list-item-content>
                                        <v-list-item-title class="ml-2 white--text">
                                            <p><b>Pagamento Por PIX : {{pix}}</b></p>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item >
                                    <v-list-item-content>
                                        <v-list-item-title class="ml-2 white--text">
                                            <p><b>Pagamento Por Cartao : {{cartao}}</b></p>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item >
                                    <v-list-item-content>
                                        <v-list-item-title class="ml-2 white--text">
                                            <p><b>Pagamento Por Dinheiro: {{dinheiro}}</b></p>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                </v-card>      
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

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
            dtStart : '',
            dtFinal : '',
        }
    },
    methods:{
        
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
                }
            })
            this.total = this.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.pix = this.pix.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.cartao = this.cartao.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            this.dinheiro = this.dinheiro.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            
        }
    },
    created(){
        this.getDados(this.route)
    }
}
</script>

<style lang="scss" scoped>

</style>