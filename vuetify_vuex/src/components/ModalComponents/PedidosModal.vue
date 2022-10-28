<template>
    <div>
        <v-dialog
            v-model="active"
            persistent
            max-width="650"
            @keydown.escape="disableList"
        >
            <v-card>
                <v-card-actions>
                    <v-btn
                        color="red darken-1"
                        text
                        @click="disableList"
                        icon
                        >
                        <v-icon color="red darken-4">mdi-close</v-icon>
                    </v-btn>
                </v-card-actions>    
                <v-card-title  class="text-h5 font-weight-bold">
                    Lista de Produtos da Venda
                </v-card-title>
                <v-card-subtitle class="mt-1 ml-3"><p>Valor total : <b>R$ {{vlTotal}}</b> </p></v-card-subtitle>
                <v-card-text>
            <v-list>
                <v-list-item  v-for="item in pedidos" :key="item.id">
                    <v-list-item-content class="mt-n8" >
                        
                      <v-list-item-title >
                        <v-card>
                            <v-divider></v-divider>
                            <v-card-title>
                               <p>
                                <b class="ml-n1">Nome do Produto : </b >{{ item.nome}}
                                <v-icon color="red darken-4"  class="ml-1 mt-n1" @click="ativaManipulaQuantidade(item)">mdi-close</v-icon>
                               </p>      
                            </v-card-title>
                            <v-card-subtitle class="mt-n5">
                                <p>
                                    <b>Valor : R$ </b>{{ item.valor}}     
                                    <b> Quantidade :</b> {{item.quantidade}} 
                                </p>
                            </v-card-subtitle>
                            <v-card-text class="mt-n6">
                                <p>Sub total desse Item : R$ {{item.valor * item.quantidade}}</p>
                            </v-card-text>
                            <v-divider class="mt-n3"></v-divider>
                        </v-card>
                       
                        </v-list-item-title>
                   
                        <v-dialog v-if="manipulaQuantidade"
                            v-model="manipulaQuantidade"
                            persistent 
                            max-width="550"
                        >
                         <v-card>
                            <v-card-title>
                                Manipule a quantidade do Item #{{temp.nome}}
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col sm="6">
                                        <label class="ml-3">Quantidade do Produto</label>
                                        <v-text-field
                                        class="ml-3 w-25"
                                        outlined
                                        dense 
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
                                    color="red darken-1"
                                    text
                                    @click="disableManipulaQuantidade"
                                >
                                    Fechar
                                </v-btn>
                                <v-btn
                                    color="green darken-1"
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
            <small>Esses itens estão presentes nessa venda</small>
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
        }
    },
    computed:{
        ...mapGetters({active : 'pedidoMod/ListaPedidos', pedidos : 'pedidoMod/getPedidos'
     , vlTotal : 'pedidoMod/getValorTotal'})
    },
    methods:{
        ...mapActions('pedidoMod', ['disableListaPedidos', 'saveValorTotal', 'removeQntdPedido', 'removePedido']),
        ...mapActions('utilMod', ['setHeader']),
        disableList(){
            this.disableListaPedidos()
        },
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

<style lang="scss" scoped>

</style>