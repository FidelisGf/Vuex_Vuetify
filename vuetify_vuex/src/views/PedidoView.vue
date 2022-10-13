<template>
    <v-container >
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>Registrar uma Venda</v-card-title>
                    <v-card-subtitle>Favor informar todos os campos necessários</v-card-subtitle>
                    <v-row dense>
                        <v-col cols="12" sm="6" class="d-flex justify-center ml-0 ml-md-6 ml-sm-6 ml-lg-6">
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        label="Digite o Codigo do produto"
                                        outlined
                                        dense 
                                        single-line
                                        @keydown.f2="buscaLista"
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <span>Tecle f2 para abrir a lista</span>
                              </v-tooltip>
                                <v-text-field
                                class="ml-3 w-25"
                                outlined
                                dense 
                                single-line
                                label="Quantidade do produto"
                                type="number"
                                min="1"
                               
                            ></v-text-field>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        color="primary"
                                        dark
                                        icon 
                                    >
                                        <v-icon aria-label="Adicionar a lista" aria-hidden="false" dark color="teal lighten-1">mdi-plus-circle-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Adicionar a lista</span>
                              </v-tooltip>
                        </v-col>
                        <v-col cols="12" sm="6" class="d-flex justify-center ml-0 ml-md-6 ml-sm-6 ml-lg-6">
                            <v-select
                                v-model="escolhaPagamento"
                                :items="MetodosPagamento"
                                label="Escolha o metodo de pagamento"
                                dense
                                outlined
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="10"
                            class="d-flex justify-space-around ml-0 ml-md-6 ml-sm-6 ml-lg-6"
                            v-if="escolhaPagamento == 'Dinheiro'"
                        >
                            
                            <v-text-field
                                v-model="dinheiroPago"
                                small
                                label="Dinheiro Pago"
                                required
                                outlined
                                value="0.00"
                                prefix="R$"
                            ></v-text-field>
                            <v-text-field
                                v-model="troco"
                                class="ml-3"
                                small
                                label="Troco"
                                outlined
                                readonly
                                min="-0.01"

                                prefix="R$"
                            ></v-text-field>
                            <v-text-field
                                class="ml-3"
                                v-model="valor_total"
                                small
                                label="Valor Total"
                                outlined
                                readonly
                                prefix="R$"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="d-flex justify-center ml-0 ml-md-6 ml-sm-6 ml-lg-6">
                            <v-select
                                :items="situacoes"
                                label="Situação desse pedido"
                                dense
                                outlined
                            ></v-select>
                        </v-col>
                        <ListaRapidaProduto></ListaRapidaProduto>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import ListaRapidaProduto from '@/components/ModalComponents/ListaRapidaProduto.vue';
export default {
    data() {
        return {
            items: ["Foo", "Bar", "Fizz", "Buzz"],
            MetodosPagamento: ["Dinheiro", "Cartao/Debito", "Cartao/Credito", "Pix"],
            escolhaPagamento: "",
            valor_total: 0,
            dinheiroPago: 0,
            situacoes: ["Pago", "Pagamento pendente"],
            produto: {
                id: null,
                valor: null,
                nome: null,
                quantidade: null,
            },
            pedidos: [],
        };
    },
    methods: {
        buscaLista() {
            console.log("Entrou");
            this.$store.commit("activeListaRapidaProdutos");
        }
    },
    computed: {
        troco: function () {
            let resultado = this.valor_total - this.dinheiroPago;
            if (resultado > 0) {
                return "Falta : " + resultado;
            }
            else {
                return this.valor_total - this.dinheiroPago;
            }
        }
    },
    created() {
    },
    components: { ListaRapidaProduto }
}
</script>

<style  scoped>
    .item-name{
        font-size: 14px;
    }
</style>