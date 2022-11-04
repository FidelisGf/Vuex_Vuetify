<template>
    <v-card color="#303030">
        <v-card-actions>
            <v-btn
                color="red darken-1"
                text
                class="ml-n3 mt-n2"
                @click="fechar"
                icon
                >
                <v-icon color="red darken-4">mdi-close</v-icon>
            </v-btn>
        </v-card-actions>    
        <v-card-title  class="text-h6 white--text font-weight-bold mt-n5">
            Lista de Matérias-Primas do produto.
        </v-card-title>
        <v-card-subtitle class="mt-1 ml-3 white--text"><p >Custo total para produção : <b class="lime--text">R$ {{total}}</b> </p></v-card-subtitle>
        <v-card-text>
            <v-list color="#303030">
                <v-list-item color="#303030"  v-for="item in materias" :key="item.ID">
                    <v-list-item-content class="mt-n8"  color="#303030">
                        <v-list-item-title >
                            <v-card color="#303030">
                                <v-divider color="white"></v-divider>
                                <v-card-title>
                                    <p class="white--text">
                                        <b class="ml-n1 subtitle-2 text-md-subtitle-1">Nome do Item : <b class="subtitle-1 " style="color: #39FF14;">#{{ item.NOME}}</b></b>
                                        <v-icon small color="blue lighten-1" class="ml-3 mt-n0" @click="activeManipula(item)">mdi-pencil</v-icon>
                                        <v-icon small color="red lighten-1"  class="ml-3 mt-n0" >mdi-close</v-icon>
                                    </p>      
                                </v-card-title>
                                <v-card-subtitle class="mt-n5 white--text"> 
                                        <p>Custo do Item : R${{ item.CUSTO}}</p>
                                        <p class="mt-n3">Quantidade : {{item.QUANTIDADE}} </p>
                                </v-card-subtitle>
                                <v-card-text class="mt-n7 white--text">
                                    <p>Sub total desse Item : R$ {{item.CUSTO * item.QUANTIDADE}}</p>
                                </v-card-text>
                                <v-divider class="mt-n3" color="white"></v-divider>
                            </v-card>
                    </v-list-item-title>
                        <v-dialog v-if="manipulaQuantidade"
                            v-model="manipulaQuantidade"
                            persistent 
                            max-width="550"
                            @keydown.escape="manipulaQuantidade = false"
                        >
                            <v-card>
                                <v-card-title>
                                    Manipule a quantidade do Item #{{temp.NOME}}
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
                                            color="red darken-1"
                                            text
                                            
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
            <small class="ml-2 white--text">Esses itens fazem parte da composição do produto</small>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
   data(){
        return{
            manipulaQuantidade : false,
            temp : null,
        }
   },
   methods:{
        ...mapActions('materiaMod', ['removeMateria', 'removeQntdMateria', 'saveCustoTotal']),
        activeManipula(item){
            this.temp = item
            this.manipulaQuantidade = true
        },
        fechar(){
            this.$emit('fechar-Lista', false)
        },
        async removeFromList(item){
            if(parseInt(item.QUANTIDADE) <= 0){
                await this.removeMateria(item)
                this.valorTotal = 0
                this.materias.forEach(element => {
                   this.valorTotal += parseFloat(element.quantidade * element.valor)
                });
                this.saveCustoTotal(parseFloat( this.valorTotal ))
                this.manipulaQuantidade = false
            }else{
                this.removeQntdPedido(item)
                this.valorTotal = 0
                this.materias.forEach(element => {
                   this.valorTotal += parseFloat(element.quantidade * element.valor)
                });
                this.saveCustoTotal(parseFloat( this.valorTotal ))
                this.manipulaQuantidade = false
            }
        }
   },
   computed:{
        ...mapGetters({materias : 'materiaMod/getMateriais', total : 'materiaMod/getCustoTotal'})
   }
}
</script>

<style lang="scss" scoped>

</style>