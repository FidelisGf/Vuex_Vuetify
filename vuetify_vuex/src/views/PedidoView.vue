<template>
    <v-container >
        <v-row class="mt-8 mt-md-10 mt-lg-0">
            <v-snackbar
                v-model="registro"
                :timeout="timeout"
                :color="color"
                
                bottom
                right
            >
                {{this.msg}}
                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="red"
                        dark
                        icon
                        v-bind="attrs"
                        @click="registro = false"
                        >
                        <v-icon small>mdi-close</v-icon>
                    </v-btn>
                </template>
            </v-snackbar>
            <v-col cols="12">
                <v-card 
                     elevation="21"
                     class="cards-colors"
                    
                >
                    <v-card-title class="text-h5 font-weight-bold white--text">
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
                                    <v-icon aria-hidden="false" dark color="teal accent-1">mdi-magnify</v-icon>
                                </v-btn>
                                    <v-dialog
                                            v-model="findBy"
                                            persistent
                                            max-width="650"
                                            @keydown.escape="findBy = false"
                                        >
                                        <v-card class="cards-colors">
                                            <v-card-actions>
                                                <v-btn
                                                    color="red accent-1"
                                                    text
                                                    @click="findBy = false"
                                                    icon
                                                    >
                                                    <v-icon color="red accent-1">mdi-close</v-icon>
                                                </v-btn>
                                            </v-card-actions>    
                                            <v-card-title  class="text-h6 font-weight-bold mt-n4 white--text">
                                                Digite o Codigo do Pedido 
                                            </v-card-title>
                                            <v-card-text class="mt-n2">
                                                <v-text-field
                                                    v-model="id"
                                                    label="Codigo..."
                                                    outlined
                                                    dark
                                                    clearable
                                                    dense 
                                                    required
                                                    type="number"
                                                    min="0"
                                                ></v-text-field>
                                            </v-card-text>
                                            <v-card-actions class="d-flex justify-end mt-n8">
                                                <v-btn
                                                    color="teal accent-1"
                                                    text
                                                    @click="findPedidoById"
                                                    >
                                                    Buscar
                                                </v-btn>
                                            </v-card-actions>   
                                        </v-card> 
                                    </v-dialog>    
                            </template>
                            <span class="white--text">Carregar um Pedido</span>
                          </v-tooltip>
                          <v-tooltip bottom v-if="editMode">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    color="purple lighten-1"
                                    class="ml-3"
                                    dark
                                    
                                    icon 
                                >
                                    <v-icon color="red accent-2" @click="deletePedidoMod = true">mdi-close</v-icon>
                                </v-btn>
                            </template> 
                            <span>Excluir Pedido</span>
                            <v-dialog
                                v-model="deletePedidoMod"
                                persistent
                                max-width="450"
                                @keydown.escape="deletePedidoMod = false"
                            >
                                <v-card dark>
                                    <v-card-actions>
                                        <v-btn
                                            icon
                                            class="ml-n2 mt-n1"
                                            @click="deletePedidoMod = false"
                                        >
                                        <v-icon small color="red accent-2">mdi-close</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                    <v-card-text class="white--text">
                                        Deseja mesmo excluir esse pedido ? Essa ação não terá volta.
                                    </v-card-text>
                                    <v-card-actions class="d-flex justify-end">
                                        <v-btn
                                        text
                                        @click="deletePedidoMod = false"
                                        color="red accent-2"
                                        >
                                            Fechar
                                        </v-btn>
                                        <v-btn
                                        text
                                        color="teal accent-2"
                                        @click="deletePed"
                                        >
                                            Salvar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>   
                          </v-tooltip>
                    </v-card-title>
                    <v-row>
                        <v-col cols="11" md="8" sm="12">
                            <form @submit.prevent="addLista" class="d-flex justify-center ml-2 ml-md-6 ml-sm-6 ml-lg-6 flex-column flex-sm-row ">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="produto.id"
                                            label="Digite o Codigo do produto"
                                            outlined
                                            clearable
                                            dense 
                                            dark
                                            required
                                            color="teal accent-2"
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
                                    class="ml-0 ml-sm-3 w-25"
                                    label="Quantidade do produto"
                                    outlined
                                    dark
                                    clearable
                                    dense 
                                    color="teal accent-2"
                                    required
                                    v-model="produto.quantidade"
                                    type="number"
                                    min="0"
                                   
                                ></v-text-field>
                                <div class="d-flex  flex-row  justify-lg-start pl-16 pl-sm-0">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    class="ml-0 ml-sm-3"
                                                    dark
                                                    rules="required|min:1"
                                                    type="submit"
                                                    icon 
                                                    
                                                >
                                                    <v-icon aria-label="Adicionar a lista" aria-hidden="false" dark color="teal accent-1">mdi-plus-circle-outline</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Adicionar a lista</span>
                                        </v-tooltip>
                                        <PedidosModal class="pl-sm-0 pl-3" ></PedidosModal>
                                        <ClientModalVue class="pl-sm-3 pl-5 ml-n3 mt-n3"></ClientModalVue>
                                  </div>
                            </form>
                        </v-col>
                        <v-col cols="11" sm="6" md="6" class="d-flex justify-center ml-2 ml-md-6 ml-sm-6 ml-lg-6 mt-sm-0 mt-n2">
                            <v-select
                                v-model="escolhaPagamento"
                                :items="MetodosPagamento"
                                label="Escolha o metodo de pagamento"
                                dense
                                outlined
                                dark
                                color="teal accent-2"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="10"
                            sm="10"
                            class="d-flex justify-space-around ml-2 ml-md-6 ml-sm-6 ml-lg-6 flex-column flex-md-row"
                            v-if="escolhaPagamento == 'Dinheiro'"
                        > 
                            <v-text-field
                                class="ml-sm-0 ml-3"
                                v-model="dinheiroPago"
                                small
                                label="Dinheiro Pago"
                                required
                                outlined
                                dark
                                value="0.00"
                                prefix="R$"
                                color="teal accent-2"
                            ></v-text-field>
                            <v-text-field
                                v-model="troco"
                                class="ml-3"
                                small
                                label="Troco"
                                outlined
                                readonly
                                dark
                                min="-0.01"
                                color="teal accent-2"
                                prefix="R$"
                            ></v-text-field>
                            <v-text-field
                                class="ml-3"
                                v-model="ValorTotal"
                                small
                                label="Valor Total"
                                outlined
                                readonly
                                dark
                                prefix="R$"
                                color="teal accent-2"
                            ></v-text-field>
                        </v-col>
                        <v-col 
                        cols="11" 
                        sm="6" 
                        class="d-flex justify-center ml-2 ml-md-6 
                            ml-sm-6 ml-lg-6 mt-sm-0 mt-n8"
                        >
                            <v-select
                                :items="situacoes"
                                label="Situação desse pedido"
                                dense
                                v-model="escolhaSituacao"
                                outlined
                                dark
                                color="teal accent-2"
                            ></v-select>
                        </v-col>
                        <v-col cols="11" sm="6" class="d-flex ml-sm-4 ml-xs-4 ml-lg-4 ml-md-4 ml-xl-4 mt-n4">
                            <v-btn
                            class="ma-2 mb-5 gerador"
                            block
                            outlined
                            :loading="loading"
                            :disabled="loading"
                            @click="gerarVenda"
                            color="teal accent-2"
                          >
                            {{btn_msg}}
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
            max-width="860px"
            :fullscreen="$vuetify.breakpoint.mobile"
        >   
            <v-card color="#1e1e1e">
                <p class="mt-5"><v-btn icon text @click="fechar"><v-icon color="red">mdi-close</v-icon></v-btn></p>
                
                <ListaGenerica :key="restart" :headers="headers" :route="'estoques'" :opcao="'Disponivel para venda'"></ListaGenerica>
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
            confirmModal : false,
            dinheiroPago: 0,
            situacoes: ["Pago", "Pagamento pendente"],
            escolhaSituacao : '',
            produto: {
                id: null,
                valor: null,
                nome: null,
                quantidade: 1,
            },
            btn_msg : 'Gerar Venda',
            id : null,
            guardCodPedido : 0,
            findBy : false,
            registro : false,
            timeout : 2000,
            msg : '',
            color : '',
            sucessFind : false,
            editMode : false,
            deletePedidoMod : false,
            listaRapida : false,
            restart : 0,
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
        ...mapActions('pedidoMod', ['findProduto', 'geraVenda', 'findPedido' , 'editarPedido', 'deletePedido']),
        ...mapActions('userMod', ['getEmpresaFromUser']),
        ...mapActions('clienteMod', ['clearClient']),
        buscaLista() {
            this.restart += 1
            this.listaRapida = true 
        },
        fechar(){
            this.listaRapida = false
        },  
       async findPedidoById(){
           let pedido = null
           pedido = await this.findPedido(this.id)
           if(pedido != null){
            this.registro = true 
            this.msg = 'Pedido carregado com sucesso !'
            this.color = 'green darken-3'
            this.escolhaPagamento = pedido.METODO_PAGAMENTO
            this.escolhaSituacao = pedido.APROVADO == "T" ? "Pago" : "Pagamento pendente"
            this.editMode = true
            this.btn_msg = 'Alterar Pedido'
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
            this.registro = true 
            this.msg = 'Pedido Editado com sucesso !'
            this.color = 'green darken-3'
            this.btn_msg = 'Gerar Venda'
            this.down(this.pedidoAtual)
            this.clear()
            this.clearPayment()
            this.limpaPedido()
            this.limparValorTotal()
            
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
                this.registro = true 
                this.msg = 'Quantidade não pode ser zero e nem o produto pode ser vazio !'
                this.color = 'yellow darken-4'
            }else{
                let payload = {quantidade : this.produto.quantidade, id : parseInt(this.produto.id)}
                let getProd = await this.findProduto(payload)
                if(getProd){
                    this.registro = true 
                    this.msg = 'Produto Adicionado a Lista com successo !'
                    this.color = 'green darken-3'
                    this.hideSucess()
                    this.clear()
                }else{
                    this.registro = true 
                    this.msg = 'Quantidade em estoque insuficiente !'
                    this.color = 'red darken-3'
                    this.hideSucess()
                }
            }
        },
        clear(){
            this.produto.id = null
            this.produto.valor = null
            this.produto.nome = null
            this.produto.quantidade = 1
            
        },
        deletePed(){
            console.log(this.pedidoAtual)
            this.deletePedido(this.pedidoAtual.codigo) 
            this.deletePedidoMod = false
            this.registro = true 
            this.msg = 'Pedido Excluido com sucesso !'
            this.color = 'green darken-3'
            this.editMode = false
            this.clear()
            this.clearPayment()
            this.limpaPedido()
            this.clearClient()
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
                    if(this.cliente.id != null || this.cliente.id != 0){
                        payload = {METODO_PAGAMENTO : this.escolhaPagamento, produtos : this.pedidos, aprovado : this.escolhaSituacao, ID_CLIENTE : this.cliente.id}
                    }else{
                        payload = {METODO_PAGAMENTO : this.escolhaPagamento, produtos : this.pedidos, aprovado : this.escolhaSituacao}
                    }
                    let gerarVenda = await this.geraVenda(payload)
                    if(gerarVenda){
                        this.down(this.pedidoAtual)
                        this.registro = true 
                        this.msg = 'Pedido Gerado com sucesso !'
                        this.color = 'green darken-3'
                        this.clear()
                        this.clearPayment()
                        this.limpaPedido()
                        this.clearClient()
                        this.loading = false
                    }else{
                        this.$store.commit('setLoading', false)
                        this.loading = false
                        this.registro = true 
                        this.msg = 'Erro ao gerar Pedido !'
                        this.color = 'red darken-3'
                        this.clear()
                        this.clearPayment()
                        this.limpaPedido()
                        this.clearClient()
                    }       
                }
            }else{
                this.registro = true 
                this.msg = 'A campos que não foram preenchidos !'
                this.color = 'yellow darken-4'
            }
        },
       async down(pedido){ 
            let Nome_Empresa = this.empresaUser.NOME
            let pdf = new jsPdf()
            let produtos = this.pedidos
            let nomeClatura = pedido.aprovado == "PAGO" ? 'Pedido' : 'Orçamento'
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
            pdf.save('pedido.pdf'); 
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
   


</style>