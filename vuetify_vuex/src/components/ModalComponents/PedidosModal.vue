<template>
    <div>
        <v-dialog
            v-model="$store.getters.ListaPedidos"
            persistent
            max-width="650"
        >
        <v-card>
        <v-card-title class="text-h5">
            Lista de Produtos da Venda
        </v-card-title>
        <v-card-text>
            <v-list-item>
                <v-list-item-content >
                  <v-list-item-title v-for="item in this.$store.getters.getPedidos" :key="item.id"> 
                    <b>Nome do Produto : </b>{{item.nome}}     <b>Valor : R$ </b>{{ item.valor}}     
                    <b> Quantidade :</b> {{item.quantidade}} 
                    <v-icon color="red darken-4" small class="mt-n1" @click="ativaManipulaQuantidade">mdi-close</v-icon>
                    <v-dialog
                        v-model="manipulaQuantidade"
                        persistent 
                        max-width="550"

                    >
                     <v-card>
                        <v-card-title>
                            Manipule a quantidade do Item #{{item.nome}}
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
                                    v-model="item.quantidade"
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
                                @click="removeFromList(item)"
                            >
                                Salvar
                            </v-btn>
                        </v-card-actions>
                     </v-card>   
                    </v-dialog>
                    <v-divider></v-divider>
                 </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <small>Esses itens estão presentes nessa venda</small>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="red darken-1"
                text
                @click="disableList"
                >
                Fechar
            </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            manipulaQuantidade : false,
            valorTotal : 0,
        }
    },
    methods:{
        disableList(){
            this.$store.commit("disableListaPedidos");
        },
        ativaManipulaQuantidade(){
            this.manipulaQuantidade = true
        },
        disableManipulaQuantidade(){
            this.manipulaQuantidade = false
        },
        removeFromList(item){
            if(parseInt(item.quantidade) <= 0){
                this.$store.commit("removePedido", item)
                let pedidos = this.$store.getters.getPedidos
                pedidos.forEach(element => {
                   this.valorTotal += element.quantidade * element.valor
                });
                this.$store.commit("saveValorTotal", this.valorTotal)
                this.disableManipulaQuantidade()
            }else{
                let oldValor = this.$store.getters.getValorTotal
                let newValor = item.quantidade * item.valor
                this.$store.commit("saveValorTotal", oldValor - newValor)
                this.$store.commit("removeQntdPedido", item)
                this.disableManipulaQuantidade()
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>