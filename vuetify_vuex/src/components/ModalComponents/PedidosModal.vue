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
                <v-card-subtitle class="mt-1 ml-3 total" ><p>Valor total : <b>{{vlTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</b> </p></v-card-subtitle>
                <v-card-text>
            <v-list class="cards-colors">
                <v-list-item  v-for="item in pedidos" :key="item.id">
                    <v-list-item-content class="mt-n8 cards-colors" >
                        
                      <v-list-item-title  >
                        <v-card class="cards-colors">
                            <v-divider color="white"></v-divider>
                            <v-card-title class="white--text">
                               <p class="white--text">
                                <b class="ml-n1 white--text text-h6">Nome do Produto : </b >{{ item.nome}}
                                <v-icon color="blue accent-3"  class="ml-1 mt-n1" @click="ativaManipulaQuantidade(item)">mdi-pencil</v-icon>
                                <v-icon color="red accent-2"  class="ml-1 mt-n1" @click="removePedido(item)">mdi-close</v-icon>
                               </p>      
                            </v-card-title>
                            <v-card-subtitle class="mt-n5 white--text">
                                <p class="mt-n2 info_prod">
                                    <b class="white--text font-weight-regular">Valor : </b>R$ {{item.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}     
                                    
                                </p>
                                <p class="mt-n2 info_prod">
                                    <b class="white--text font-weight-regular"> Quantidade :</b> {{item.quantidade}}  {{item.medida}}
                                </p>
                                <p class="mt-n2 info_prod font-weight-regular"><b class="white--text">Sub total  : </b>{{(item.valor * item.quantidade).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
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
                                Manipule a quantidade do Item #{{temp.nome}}
                            </v-card-title>
                            <v-card-text class="white--text">
                                <v-row>
                                    <v-col sm="6">
                                        <label class="ml-3">Quantidade do Produto</label>
                                        <v-text-field
                                        class="ml-3 w-25"
                                        outlined
                                        dense 
                                        dark
                                        required
                                        v-model="temp.quantidade"
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
            valorTotal : 0,
            temp : {
                id: null,
                valor: null,
                nome: null,
                quantidade: null,
                
            },
            active : false,
        }
    },
    computed:{
        ...mapGetters({ pedidos : 'pedidoMod/getPedidos'
     , vlTotal : 'pedidoMod/getValorTotal'})
    },
    methods:{
        ...mapActions('pedidoMod', ['saveValorTotal', 'removeQntdPedido', 'removePedido']),
        ...mapActions('utilMod', ['setHeader']),
       
        ativaManipulaQuantidade(item){
            this.manipulaQuantidade = true
            this.temp.id = item.id
            this.temp.nome = item.nome
            this.temp.quantidade = item.quantidade
            this.temp.valor = item.valor
        },
        disableManipulaQuantidade(){
            this.manipulaQuantidade = false
        },
        removeFromList(item){
            if(parseInt(item.quantidade) <= 0){
                this.removePedido(item)
                let pedidos = this.pedidos
                this.valorTotal = 0
                pedidos.forEach(element => {
                   this.valorTotal += parseFloat(element.quantidade * element.valor)
                });
                this.saveValorTotal(parseFloat( this.valorTotal ))
                this.disableManipulaQuantidade()
            }else{
                this.removeQntdPedido(item)
                this.valorTotal = 0
                this.pedidos.forEach(element => {
                   this.valorTotal += parseFloat(element.quantidade * element.valor)
                });
                this.saveValorTotal(parseFloat( this.valorTotal ))
                this.disableManipulaQuantidade()
            }
        }
    }
}
</script>

<style lang="scss" >
    .total{
        color: #FFD740!important;
    }
    .info_prod{
        color: #69F0AE !important;
    }
</style>