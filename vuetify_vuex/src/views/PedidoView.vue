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
                                    @click="findBy = true"
                                    icon 
                                >
                                    <v-icon aria-hidden="false" dark color="teal lighten-1">mdi-magnify</v-icon>
                                </v-btn>
                                    <v-dialog
                                            v-model="findBy"
                                            persistent
                                            max-width="650"
                                            @keydown.escape="findBy = false"
                                        >
                                        <v-card>
                                            <v-card-actions>
                                                <v-btn
                                                    color="red darken-1"
                                                    text
                                                    @click="findBy = false"
                                                    icon
                                                    >
                                                    <v-icon color="red darken-4">mdi-close</v-icon>
                                                </v-btn>
                                            </v-card-actions>    
                                            <v-card-title  class="text-h6 font-weight-bold mt-n4">
                                                Digite o Codigo do Pedido 
                                            </v-card-title>
                                            <v-card-text class="mt-n2">
                                                <v-text-field
                                                    v-model="id"
                                                    label="Codigo..."
                                                    outlined
                                                    clearable
                                                    dense 
                                                    required
                                                    type="number"
                                                    min="0"
                                                ></v-text-field>
                                            </v-card-text>
                                            <v-card-actions class="d-flex justify-end mt-n8">
                                                <v-btn
                                                    color="green darken-1"
                                                    text
                                                    @click="findPedidoById"
                                                    >
                                                    Buscar
                                                </v-btn>
                                            </v-card-actions>   
                                        </v-card> 
                                    </v-dialog>    
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
                    <v-card-subtitle v-if="sucessFind"><v-alert type="success" v-model="sucessFind" dismissible dense shaped
                        outlined class="mt-n5">Pedido carregado com sucesso !</v-alert></v-card-subtitle>
                    <v-row dense class="mt-1">
                        <v-col cols="12" md="12" sm="6">
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
                                  
                                  <PedidosModal ></PedidosModal>
                                  <ClientModalVue class="ml-n3 mt-n3"></ClientModalVue>
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
        <v-dialog
            @keydown.escape="fechar"
            v-model="listaRapida"
            persistent
            max-width="760px"
        >   
            <v-card>
                <p class="mt-5"><v-btn icon text @click="fechar"><v-icon color="red">mdi-close</v-icon></v-btn></p>
                
                <ListaGenerica  :route="'estoques'" :opcao="'Disponivel para venda'"></ListaGenerica>
            </v-card>
            
        </v-dialog>
    </v-container>
</template>
<script>
import ListaGenerica from '@/components/ListaGenerica.vue';
import ClientModalVue from '@/components/ModalComponents/ClientModal.vue';
import PedidosModal from '@/components/ModalComponents/PedidosModal.vue';
import jsPdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
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
            id : null,
            sucesso : false,
            findBy : false,
            registro : false,
            sucessFind : false,
            editMode : false,
            listaRapida : false,
        };
    },
    computed: {
        ...mapGetters({active : 'pedidoMod/ListaPedidos', pedidos : 'pedidoMod/getPedidos', ValorTotal : 'pedidoMod/getValorTotal', 
         cod : 'pedidoMod/getCodigo', pedidoAtual : 'pedidoMod/getPedidoAtual', empresaUser : 'userMod/getEmpresa', cliente : 'clienteMod/getCliente'}),
        troco: function () {
            let resultado = this.ValorTotal - this.dinheiroPago;
            if (resultado > 0) {
                return "Falta : " + resultado;
            }
            else {
                return resultado;
            }
        },
        headers() {
            return [
                {
                    text: "Codigo",
                    align: "start",
                    value: "product[0].ID",
                },
                {
                    text: "Produto",
                    value: "product[0].NOME",
                },
                { text: "Descrição", value: "product[0].DESC" },
                { text: "Valor", value: "product[0].VALOR" },
                { text: "Quantidade", value: "QUANTIDADE" },
            ];
         },
    },
    methods: {
        ...mapActions('pedidoMod', ['disableListaPedidos', 'saveValorTotal', 'activeListaPedidos', 'activeListaRapidaProdutos', 'limpaPedido', 'limparValorTotal']),
        ...mapActions('pedidoMod', ['findProduto', 'geraVenda', 'findPedido' , 'editarPedido']),
        ...mapActions('userMod', ['getEmpresaFromUser']),
        ...mapActions('clienteMod', ['clearClient']),
        ...mapActions('utilMod', ['setHeader']),
        buscaLista() {
            this.fail = false
            this.sucesso = false
            this.setHeader(this.headers)
            this.listaRapida = true
            
        },
        fechar(){
            this.listaRapida = false
        },  
       async findPedidoById(){
           let pedido = null
           pedido = await this.findPedido(this.id)
           if(pedido != null){
            this.escolhaPagamento = pedido.METODO_PAGAMENTO
            this.escolhaSituacao = pedido.APROVADO == "T" ? "Pago" : "Pagamento pendente"
            this.sucessFind = true
            this.editMode = true
            this.findBy = false
           }
        },
       async  editPedido(){
            this.loading = true
            if(this.escolhaSituacao == "Pago"){
                this.escolhaSituacao = 'T'
            }else{
                this.escolhaSituacao = 'F'
            }
            let payload = {ID : this.id, METODO_PAGAMENTO : this.escolhaPagamento, PRODUTOS : this.pedidos, 
            APROVADO : this.escolhaSituacao, ID_CLIENTE : this.cliente.id}
            await this.editarPedido(payload)
            this.editMode = false
            console.log(this.pedido)
            this.down(this.pedidoAtual)
            this.clear()
            this.clearPayment()
            this.limpaPedido()
            this.limparValorTotal()
            this.clearClient()
            this.loading = false
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
        async addLista(){
            if(this.produto.quantidade == 0 || this.produto.id == null){
                return alert('Quantidade não pode ser zero e nem o produto pode ser vazio !')
            }
            let payload = {quantidade : this.produto.quantidade, id : this.produto.id}
            let getProd = await this.findProduto(payload)
            if(getProd){
                this.sucesso = true  
                this.hideSucess()
            }else{
                this.fail = true
            }
        },
        clear(){
            this.produto.id = null
            this.produto.valor = null
            this.produto.nome = null
            this.produto.quantidade = 1
            
        },
        async gerarVenda(){
            await this.getEmpresaFromUser()
            let validate = this.validate()
            if(validate){
                if(this.editMode){
                    return this.editPedido()
                }else{
                    this.loading = true
                    this.fail = false
                    if(this.escolhaSituacao == "Pago"){
                        this.escolhaSituacao = 'T'
                    }else{
                        this.escolhaSituacao = 'F'
                    }
                    let payload = null
                    if(this.cliente.id != null){
                        payload = {METODO_PAGAMENTO : this.escolhaPagamento, produtos : this.pedidos, aprovado : this.escolhaSituacao, ID_CLIENTE : this.cliente.id}
                    }else{
                        payload = {METODO_PAGAMENTO : this.escolhaPagamento, produtos : this.pedidos, aprovado : this.escolhaSituacao}
                    }
                    let gerarVenda = await this.geraVenda(payload)
                    if(gerarVenda){
                        this.down(this.pedidoAtual)
                        this.registro = true
                        this.clear()
                        this.clearPayment()
                        this.loading = false
                        this.limpaPedido()
                        this.clearClient()
                    }else{
                        this.fail = true
                    }       
                }
            }else{
                alert('A campos que não foram preenchidos')
            }
        },
       async down(pedido){ 
            let Nome_Empresa = this.empresaUser.NOME
            let pdf = new jsPdf()
            let produtos = this.pedidos
            let nomeClatura = pedido.aprovado == "PAGO" ? 'Pedido' : 'Orçamento'
            console.log(pedido)
            let values = produtos.map( (elemento) => Object.values(elemento));
            pdf.setFontSize(26)
            pdf.text(Nome_Empresa + ' ' + nomeClatura + '#' +  pedido.codigo , 5, 15)
            pdf.setFontSize(10)
            pdf.text('CNPJ :  ' + this.empresaUser.CNPJ, 15, 22)
            pdf.text('ENDEREÇO : '  + this.empresaUser.ENDERECO, 70, 22)
            pdf.text('EMAIL : ' + this.empresaUser.EMAIL, 140, 22)
            pdf.setFontSize(26)
            pdf.text('-------------------------------------------------------------------', 2, 28)
            pdf.setFontSize(10);
            pdf.text('Codigo do Pedido :  ' + pedido.codigo, 15, 35)
            pdf.text('Forma de Pagamento :  ' + pedido.metodo_pagamento, 80, 35)
            if(this.cliente.id != null){
                pdf.text('Cliente :  ' + this.cliente.nome, 80, 45)
            }
            pdf.text('Valor Total :  R$' + pedido.valor_total, 160,35)
            pdf.text('Estado do Pagamento : ' + pedido.aprovado, 15,45)
            pdf.text('Produtos do Pedido : ', 15, 55)
            pdf.setFontSize(10);
            autoTable(pdf,
            {
                startY: 60,
                cellWidth: 'auto',
                headStyles: {fillColor: [128,128,128]},
                styles: { fillColor: [211, 211, 211] },
                theme : 'striped',
                margin: { top: 10 },
                head: [['CODIGO', 'NOME', 'VALOR', 'QUANTIDADE', 'MEDIDA']],
                body: values,
            }) 
            pdf.setFontSize(8);
            pdf.text('------------------------------------', 15, 155) 
            pdf.text('Assinatura do Cliente', 18, 158)
            pdf.save('pedido_' + pedido.codigo + '.pdf'); 
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


        validate(){
            if(this.escolhaPagamento == '' || this.escolhaSituacao == '' || this.pedidos == null){
                return false
            }else{
                return true
            }
        }
    },
   
    created() {
        
    },
    components: { PedidosModal, ClientModalVue, ListaGenerica }
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