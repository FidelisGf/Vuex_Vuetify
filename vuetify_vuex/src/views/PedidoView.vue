<template>
    <v-container >
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>Registrar uma Venda</v-card-title>
                    <v-card-subtitle>Favor informar todos os campos necessários</v-card-subtitle>
                    <v-row dense>
                        <v-col cols="12" sm="6" class="d-flex justify-center ml-0 ml-md-6 ml-sm-6 ml-lg-6" >
                         
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="produto.id"
                                            label="Digite o Codigo do produto"
                                            outlined
                                            dense 
                                            required
                                            single-line
                                            @keydown.f2="buscaLista"
                                            type="number"
                                            min="0"
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <span>Tecle f2 para ver os disponiveis</span>
                                  </v-tooltip>
                                    <v-text-field
                                    class="ml-3 w-25"
                                    outlined
                                    dense 
                                    required
                                    v-model="produto.quantidade"
                                    single-line
                                    label="Quantidade do produto"
                                    type="number"
                                    min="0"
                                   
                                ></v-text-field>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            color="primary"
                                            class="ml-3"
                                            dark
                                            @click="addLista"
                                            icon 
                                        >
                                            <v-icon aria-label="Adicionar a lista" aria-hidden="false" dark color="teal lighten-1">mdi-plus-circle-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Adicionar a lista</span>
                                  </v-tooltip>
                                  <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            color="teal"
                                            class="ml-3"
                                            dark
                                            icon
                                            @click="listaPedidos" 
                                        >
                                            <v-icon aria-hidden="false" dark color="teal lighten-1">mdi-cart</v-icon>
                                        </v-btn>
                                        <PedidosModal v-if="$store.getters.ListaPedidos"></PedidosModal>
                                    </template>
                                    <span>Ver a lista do pedido</span>
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
import PedidosModal from '@/components/ModalComponents/PedidosModal.vue';
import productService from '@/service/productService'
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
                quantidade: 1,
            },
            pedidos: [],

        };
    },
    methods: {
        buscaLista() {
            console.log("Entrou")
            this.$store.commit("activeListaRapidaProdutos")
        },
        listaPedidos(){
            this.$store.commit("activeListaPedidos")
        },
        somaItens(produto){
           this.valor_total += produto.quantidade * produto.valor  
        },
        addLista(){
            if(this.produto.quantidade == 0 || this.produto.id == null){
                return alert('Quantidade não pode ser zero e nem o produto pode ser vazio !')
            }
           productService.findProdutoById(this.produto.id).then((res)=>{
                if(res.status == 200){
                    let payload = {id : res.data.ID_PRODUTO, nome : res.data.NOME, valor : res.data.VALOR, quantidade : this.produto.quantidade}
                    this.somaItens(this.produto)
                    this.$store.commit("savePedidos", payload)    
                }else{
                    alert('Falha ao adicionar Item, verifique os campos')
                }
            })
            //this.clear()    
        },
        clear(){
            this.produto.id = null
            this.produto.valor = null
            this.produto.nome = null
            this.produto.quantidade = 1
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
    components: { ListaRapidaProduto, PedidosModal }
}
</script>

<style  scoped>
    .item-name{
        font-size: 14px;
    }
</style>