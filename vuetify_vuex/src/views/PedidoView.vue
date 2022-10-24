<template>
    <v-container >
        <v-row>
            <v-col cols="12">
                <v-card 
                     elevation="21">
                    <v-card-title class="text-h5 font-weight-bold">
                        Registrar uma Venda
                        <v-tooltip bottom>      
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    color="purple lighten-1"
                                    class="ml-3"
                                    dark
                                    icon
                                    @click="listaPedidos" 
                                >
                                    <v-icon aria-hidden="false" dark color="teal lighten-1">mdi-magnify</v-icon>
                                </v-btn>
                                <PedidosModal v-if="active"></PedidosModal>
                            </template>
                            <span>Carregar um Pedido</span>
                          </v-tooltip>
                    </v-card-title>
                    <v-card-subtitle class="font-weight-medium" >Favor informar todos os campos necessários</v-card-subtitle>
                    <v-card-subtitle v-if="sucesso"><v-alert  type="success" v-model="sucesso" dismissible dense shaped
                        outlined class="mt-n5">Produto adicionado a lista com sucesso !</v-alert></v-card-subtitle>
                    <v-card-subtitle v-if="fail && sucesso == false"><v-alert type="error" v-model="fail" dismissible dense shaped
                        outlined class="mt-n5">Algo de errado ocorreu, verifique se o produto existe !</v-alert></v-card-subtitle>
                    <v-card-subtitle v-if="registro"><v-alert type="success" v-model="registro" dismissible dense shaped
                        outlined class="mt-n5">Pedido Registrado com sucesso !</v-alert></v-card-subtitle>
                    <v-row dense class="mt-1">
                        <v-col cols="12" sm="6">
                            <form @submit.prevent="addLista" class="d-flex justify-center ml-2 ml-md-6 ml-sm-6 ml-lg-6">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="produto.id"
                                            label="Digite o Codigo do produto"
                                            outlined
                                            clearable
                                            dense 
                                            required
                                            color="purple lighten-1"
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
                                    label="Quantidade do produto"
                                    outlined
                                    clearable
                                    dense 
                                    color="purple lighten-1"
                                    required
                                    v-model="produto.quantidade"
                                    type="number"
                                    min="0"
                                   
                                ></v-text-field>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            v-bind="attrs"
                                            v-on="on"
                                            color="purple lighten-1"
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
                                            color="purple lighten-1"
                                            class="ml-3"
                                            dark
                                            icon
                                            @click="listaPedidos" 
                                        >
                                            <v-icon aria-hidden="false" dark color="teal lighten-1">mdi-cart</v-icon>
                                        </v-btn>
                                        <PedidosModal v-if="active"></PedidosModal>
                                    </template>
                                    <span>Ver a lista do pedido</span>
                                  </v-tooltip>
                            </form>
                        </v-col>
                        <v-col cols="6" sm="6" class="d-flex justify-center ml-2 ml-md-6 ml-sm-6 ml-lg-6">
                            <v-select
                                v-model="escolhaPagamento"
                                :items="MetodosPagamento"
                                label="Escolha o metodo de pagamento"
                                dense
                                outlined
                                color="purple lighten-1"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="10"
                            sm="10"
                            class="d-flex justify-space-around ml-2 ml-md-6 ml-sm-6 ml-lg-6"
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
                                color="purple lighten-1"
                            ></v-text-field>
                            <v-text-field
                                v-model="troco"
                                class="ml-3"
                                small
                                label="Troco"
                                outlined
                                readonly
                                min="-0.01"
                                color="purple lighten-1"
                                prefix="R$"
                            ></v-text-field>
                            <v-text-field
                                class="ml-3"
                                v-model="ValorTotal"
                                small
                                label="Valor Total"
                                outlined
                                readonly
                                prefix="R$"
                                color="purple lighten-1"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="6" class="d-flex justify-center ml-2 ml-md-6 ml-sm-6 ml-lg-6">
                            <v-select
                                :items="situacoes"
                                label="Situação desse pedido"
                                dense
                                v-model="escolhaSituacao"
                                outlined
                                color="purple lighten-1"
                            ></v-select>
                        </v-col>
                        <ListaRapidaProduto></ListaRapidaProduto>
                        <v-col cols="6" class="d-flex ml-sm-4 ml-xs-4 ml-lg-4 ml-md-4 ml-xl-4 mt-n4">
                            <v-btn
                            class="ma-2 mb-5 gerador"
                            block
                            outlined
                            :loading="loading"
                            :disabled="loading"
                            @click="gerarVenda"
                            color="purple darken-1"
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
import jsPdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import {mapMutations, mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            items: ["Foo", "Bar", "Fizz", "Buzz"],
            MetodosPagamento: ["Dinheiro", "Cartao/Debito", "Cartao/Credito", "Pix"],
            escolhaPagamento: "",
            loading : false,
            dinheiroPago: 0,
            situacoes: ["Pago", "Pagamento pendente"],
            escolhaSituacao : '',
            produto: {
                id: null,
                valor: null,
                nome: null,
                quantidade: 1,
            },
            fail : false,
            sucesso : false,
            registro : false,
        };
    },
    computed: {
        ...mapGetters({active : 'pedidoMod/ListaPedidos', pedidos : 'pedidoMod/getPedidos', ValorTotal : 'pedidoMod/getValorTotal', listaRapida : 'getListRapidaProdutos', cod : 'pedidoMod/getCodigo'}),
        troco: function () {
            let resultado = this.ValorTotal - this.dinheiroPago;
            if (resultado > 0) {
                return "Falta : " + resultado;
            }
            else {
                return resultado;
            }
        },
    },
    methods: {
        ...mapMutations('pedidoMod', ['disableListaPedidos', 'saveValorTotal', 'activeListaPedidos', 'activeListaRapidaProdutos']),
        ...mapActions('pedidoMod', ['findProduto', 'geraVenda']),
        buscaLista() {
            console.log('Entrei')
            this.fail = false
            this.sucesso = false
            this.activeListaRapidaProdutos()
        },
        listaPedidos(){
            this.fail = false
            this.sucesso = false
            this.activeListaPedidos()
        },
        somaItens(valor){
           this.valor_total += parseFloat(valor * this.produto.quantidade)
           this.saveValorTotal(this.valor_total)
        },
        addLista(){
            if(this.produto.quantidade == 0 || this.produto.id == null){
                return alert('Quantidade não pode ser zero e nem o produto pode ser vazio !')
            }
            let payload = {quantidade : this.produto.quantidade, id : this.produto.id}
            let getProd = this.findProduto(payload)
            if(getProd){
                this.sucesso = true  
                this.hideSucess()
            }
        },
        clear(){
            this.produto.id = null
            this.produto.valor = null
            this.produto.nome = null
            this.produto.quantidade = 1
        },
        gerarVenda(){
            this.loading = true
            this.fail = false
            if(this.escolhaSituacao == "Pago"){
                this.escolhaSituacao = 'T'
            }else{
                this.escolhaSituacao = 'F'
            }
            let payload = {METODO_PAGAMENTO : this.escolhaPagamento, produtos : this.pedidos, aprovado : this.escolhaSituacao}
            let gerarVenda = this.geraVenda(payload)
            if(gerarVenda){
                this.registro = true
                this.clear()
                this.clearPayment()
                this.loading = false
            }else{
                this.fail = true
            }       
        },
        down(){ // fazer uma variavel chamada Pedido Atual dentro de pedidoMod, essa variavel vai ter
            //uma mutation que recebe um payload, esse payload será o resultado da resposta quando cadastramos um pedido,
            // faça a montagem do objeto Pedido_Atual e depois use um getter para pega-lo no front , utilizando ele nos 
            //campos necessários 
            let Nome_Empresa = 'Anabel Personalizados'
            let pdf = new jsPdf()
            let values = this.pedidos.map( (elemento) => Object.values(elemento)); //poderiamos utlizar o pedido porem, esse em questão é somente um resumo dos produtos dentro do mesmo, sem forma de pagamento e etc
            pdf.setFontSize(26);0
            let id = 0
            pdf.text(Nome_Empresa + ' Pedido #' + ' ' +  id, 10, 20)
            pdf.text('-------------------------------------------------------------------', 2, 26)
            pdf.setFontSize(12);
            pdf.text('Codigo do Pedido :  ' + this.cod, 15, 35)
            pdf.text('Forma de Pagamento : Dinheiro', 80, 35)
            pdf.text('Valor Total : R$ 45', 160,35)
            pdf.text('Produtos do Pedido : ', 15, 50)
            pdf.setFontSize(10);
            autoTable(pdf,
            {
                startY: 60,
                cellWidth: 'auto',
                headStyles: {fillColor: [128,128,128]},
                styles: { fillColor: [211, 211, 211] },
                theme : 'striped',
                margin: { top: 10 },
                head: [['ID', 'NOME', 'VALOR', 'QUANTIDADE']],
                body: values,
            })  
            pdf.save('orcamento.pdf'); 
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
            this.escolhaPagamento = ""
        },

        mounted : function(){
           
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
    .gerador:hover{
        cursor: pointer;
        transition: .4s .02s ease-in all;
        border-color: #ad07f5;
        background-color: rgb(238, 238, 235);
        
    }


</style>