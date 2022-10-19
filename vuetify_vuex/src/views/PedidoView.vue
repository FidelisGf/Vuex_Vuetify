<template>
    <v-container >
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title>Registrar uma Venda</v-card-title>
                    <v-card-subtitle >Favor informar todos os campos necessários</v-card-subtitle>
                    <v-card-subtitle v-if="sucesso"><v-alert  type="success" v-model="sucesso" dismissible dense shaped
                        outlined class="mt-n5">Produto adicionado a lista com sucesso !</v-alert></v-card-subtitle>
                    <v-card-subtitle v-if="fail && sucesso == false"><v-alert type="error" v-model="fail" dismissible dense shaped
                        outlined class="mt-n5">Algo de errado ocorreu, verifique se o produto existe !</v-alert></v-card-subtitle>
                    <v-card-subtitle v-if="registro"><v-alert type="success" v-model="registro" dismissible dense shaped
                        outlined class="mt-n5">Pedido Registrado com sucesso !</v-alert></v-card-subtitle>
                    <v-row dense>
                        <v-col cols="12" sm="6"  >
                            <form @submit.prevent="addLista" class="d-flex justify-center ml-0 ml-md-6 ml-sm-6 ml-lg-6">
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
                                            rules="required|min:1"
                                            type="submit"
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
                            </form>
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
                                v-model="$store.getters.getValorTotal"
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
                                v-model="escolhaSituacao"
                                outlined
                            ></v-select>
                        </v-col>
                        <ListaRapidaProduto></ListaRapidaProduto>
                        <v-col cols="6" class="d-flex ml-4 mt-n4">
                            <v-btn
                            class="ma-2"
                            block
                            outlined
                            @click="gerarVenda"
                            color="teal darken-3"
                          >
                            Gerar Venda
                          </v-btn>
                        </v-col>
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
import pedidoService from '@/service/pedidoService'
export default {
    data() {
        return {
            items: ["Foo", "Bar", "Fizz", "Buzz"],
            MetodosPagamento: ["Dinheiro", "Cartao/Debito", "Cartao/Credito", "Pix"],
            escolhaPagamento: "",
            valor_total: 0,
            dinheiroPago: 0,
            situacoes: ["Pago", "Pagamento pendente"],
            escolhaSituacao : '',
            produto: {
                id: null,
                valor: null,
                nome: null,
                quantidade: 1,
            },
            pedidos: [],
            fail : false,
            sucesso : false,
            registro : false,
        };
    },
    methods: {
        buscaLista() {
            this.fail = false
            this.sucesso = false
            this.$store.commit("activeListaRapidaProdutos")
        },
        listaPedidos(){
            this.fail = false
            this.sucesso = false
            this.$store.commit("activeListaPedidos")
        },
        somaItens(valor){
           this.valor_total += parseFloat(valor * this.produto.quantidade)
           this.$store.commit("saveValorTotal", this.valor_total)
        },
        addLista(){
            if(this.produto.quantidade == 0 || this.produto.id == null){
                return alert('Quantidade não pode ser zero e nem o produto pode ser vazio !')
            }
           productService.findProdutoById(this.produto.id).then((res)=>{
                if(res.status == 200){
                    this.fail = false
                    let payload = {id : res.data.ID_PRODUTO, nome : res.data.NOME, valor : res.data.VALOR, quantidade : this.produto.quantidade}
                    this.somaItens(res.data.VALOR)
                    this.$store.commit("savePedidos", payload) 
                    this.sucesso = true  
                    this.hideSucess()
                    return 
                }
                
            }) 
        },
        clear(){
            this.produto.id = null
            this.produto.valor = null
            this.produto.nome = null
            this.produto.quantidade = 1
        },
        gerarVenda(){
            this.fail = false
            if(this.escolhaSituacao == "Pago"){
                this.escolhaSituacao = 'T'
            }else{
                this.escolhaSituacao = 'F'
            }
            let payload = {METODO_PAGAMENTO : this.escolhaPagamento, produtos : this.$store.getters.getPedidos, aprovado : this.escolhaSituacao}
            pedidoService.save(payload).then((res)=>{
                if(res.status == 201){
                    this.$store.commit("limpaPedido")
                    this.$store.commit("limparValorTotal")
                    this.registro = true
                    this.clear()
                    this.clearPayment()
                }else if(res.status != 201){
                    this.fail = true
                }
            })
        },
        hideSucess : function (){
            if(this.sucesso){
                let interval = setInterval(() => {
                    this.sucesso = false; this.clearIntervalo(interval);
                    }, 2000)
                setInterval(interval);
                this.clear()
            }
            
        },

        clearIntervalo : function (interaval){
            clearInterval(interaval)
        },


        clearPayment(){
            this.dinheiroPago = 0
            this.troco = 0
            this.escolhaPagamento = ""
        },

        mounted : function(){
           
        }
    },
    computed: {
        troco: function () {
            let resultado = this.$store.getters.getValorTotal - this.dinheiroPago;
            if (resultado > 0) {
                return "Falta : " + resultado;
            }
            else {
                return resultado;
            }
        },
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