<template>
    <div>
        <v-dialog
            v-model="active"
            persistent
            max-width="650"
            @keydown.escape="active = false"
            :fullscreen="$vuetify.breakpoint.mobile"
            
        >                                    
                <template v-slot:activator="{ on, attrs }">
                    <div class="d-flex flex-column">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                            color="purple lighten-1"
                            class="ml-3"
                            dark
                            icon
                            @click="active = true" 
                        >
                            <v-icon aria-hidden="false" dark color="teal accent-1">mdi-cart</v-icon>
                        </v-btn>
                        <v-badge
                            v-show="countProd > 0"
                            class="mt-1 mr-3"
                            color="#757575"
                            :content="countProd"
                        >
                        </v-badge>
                    </div>
                    
                </template>
            <v-card class="cards-colors">
                <v-card-actions>
                    <v-btn
                        color="red accent-2"
                        text
                        class="ml-n3 mt-n2"
                        @click="active = false"
                        icon
                        >
                        <v-icon color="red darken-4">mdi-close</v-icon>
                    </v-btn>
                </v-card-actions>    
                <v-card-title  class="text-h5 white--text mt-n5">
                    Lista de Produtos da Venda
                </v-card-title>
                <v-card-subtitle class="mt-1 font-italic ml-3 total" ><p>Valor total : <b>{{vlTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</b> </p></v-card-subtitle>
                <v-card-text>
            <v-list class="cards-colors">
                <v-list-item  v-for="item in pedidos" :key="item.id">
                    <v-list-item-content class="mt-n8 cards-colors" >
                        
                      <v-list-item-title  >
                        <v-card class="cards-colors">
                            <v-divider color="white"></v-divider>
                            <v-card-title class="white--text">
                               <p class="white--text">
                                <b class="ml-n1 white--text text-h6">Nome do Produto : </b >{{ item.NOME}}
                                <v-icon color="blue accent-3"  class="ml-1 mt-n1" @click="ativaManipulaQuantidade(item)">mdi-pencil</v-icon>
                                <v-icon color="red accent-2"  class="ml-1 mt-n1" @click="removePedido(item)">mdi-close</v-icon>
                               </p>      
                            </v-card-title>
                            <v-card-subtitle class="mt-n5 white--text">
                                <p class="mt-n2 info_prod">
                                    <b class="white--text font-weight-regular">Valor : </b>R$ {{item.VALOR.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}     
                                    
                                </p>
                                <p class="mt-n2 info_prod">
                                    <b class="white--text font-weight-regular"> Quantidade :</b> {{item.QUANTIDADE}}  {{item.medida}}
                                </p>
                                <p class="mt-n2 info_prod font-weight-regular"><b class="white--text">Sub total  : </b>{{(item.VALOR * item.QUANTIDADE).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                            </v-card-subtitle>
                           
                            <v-divider class="mt-n3 " color="white"></v-divider>
                        </v-card>
                    </v-list-item-title>
                    <v-dialog v-if="manipulaQuantidade"
                            
                            v-model="manipulaQuantidade"
                            persistent 
                            max-width="550"
                            @keydown.escape="manipulaQuantidade = false"
                        >
                         <v-card class="cards-colors">
                            <v-card-title class="white--text">
                                Manipule a quantidade do Item #{{temp.NOME}}
                            </v-card-title>
                            <v-card-text class="white--text">
                                <v-row>
                                    <v-col sm="10">
                                        <label class="ml-3">Quantidade do Produto (Estoque atual do produto : {{parseFloat(qntdDisponivelProduto)}})</label>
                                        <v-text-field
                                        class="ml-3 w-25"
                                        outlined
                                        dense 
                                        dark
                                        required
                                        v-model="temp.QUANTIDADE"
                                        single-line
                                        type="number"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <small>Caso a quantidade chegue a 0, o item será removido da lista</small>
                            </v-card-text>
                            <v-card-actions class="d-flex justify-end">
                                <v-btn
                                    color="red accent-2"
                                    text
                                    @click="disableManipulaQuantidade"
                                >
                                    Fechar
                                </v-btn>
                                <v-btn
                                    color="teal accent-3"
                                    text
                                    @click="removeFromList(temp)"
                                >
                                    Salvar
                                </v-btn>
                            </v-card-actions>
                         </v-card>   
                        </v-dialog>
                    </v-list-item-content>
                  </v-list-item>
            </v-list>
            <small class="white--text">* Esses itens estão presentes nessa venda</small>
        </v-card-text>
       
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    props:{
        search : Boolean,
    },
    data(){
        return{
            manipulaQuantidade : false,
            qntdDisponivelProduto : 0,
            valorTotal : 0,
            temp : {
                ID: null,
                VALOR: null,
                NOME: null,
                QUANTIDADE: null,
                
            },
            active : false,
        }
    },
    computed:{
        ...mapGetters({ pedidos : 'pedidoMod/getPedidos'
     , vlTotal : 'pedidoMod/getValorTotal', countProd : 'pedidoMod/getCounterProd'})
    },
    methods:{
        ...mapActions('pedidoMod', ['saveValorTotal', 'removeQntdPedido', 'removePedido', 'getQuantidadeDisponivelProduto']),
        ...mapActions('utilMod', ['setHeader']),
       
        async ativaManipulaQuantidade(item){
            this.manipulaQuantidade = true
            this.qntdDisponivelProduto = await this.getQuantidadeDisponivelProduto(item.ID)
            this.temp.ID = item.ID
            this.temp.NOME = item.NOME
            this.temp.QUANTIDADE = item.QUANTIDADE
            this.temp.VALOR = item.VALOR
        },
        disableManipulaQuantidade(){
            this.manipulaQuantidade = false
        },
        async removeFromList(item){
            let temp = item
            if(parseInt(item.QUANTIDADE) <= 0){
                this.removePedido(item)
                let pedidos = this.pedidos
                console.log(pedidos)
                this.valorTotal = 0
                pedidos.forEach(element => {
                   this.valorTotal += parseFloat(element.QUANTIDADE * element.VALOR)
                });
                this.saveValorTotal(parseFloat( this.valorTotal ))
                this.disableManipulaQuantidade()
            }else{
                let check = await this.removeQntdPedido(temp)
                if(check == true){
                    this.valorTotal = 0
                    this.pedidos.forEach(element => {
                    this.valorTotal += parseFloat(element.QUANTIDADE * element.VALOR)
                    });
                    console.log(this.valorTotal)
                    this.saveValorTotal(parseFloat( this.valorTotal ))
                    item = temp
                    this.disableManipulaQuantidade()
                }else{
                    this.$emit('failAddQntdProduto', 'Quantidade em estoque insuficiente')
                }
                
            }
        }
    }
}
</script>

<style lang="scss" >
    .total{
        color: #f3f3f3!important;
    }
    .info_prod{
        color: #c4c4c4 !important;
    }
</style>