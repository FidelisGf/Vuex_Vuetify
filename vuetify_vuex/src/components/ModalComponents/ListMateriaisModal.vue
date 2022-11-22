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
        <v-card-subtitle class="mt-1 ml-3 white--text"><p >Custo total para produção : <b class="lime--text"> {{total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</b> </p></v-card-subtitle>
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
                                        <v-icon small color="red lighten-1"  class="ml-3 mt-n0" @click="removeMateria(item)">mdi-close</v-icon>
                                    </p>      
                                </v-card-title>
                                <v-card-subtitle class="mt-n5 white--text"> 
                                    <p>Custo do Item : {{ item.CUSTO.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                                    <p class="mt-n3">Quantidade : {{item.QUANTIDADE}} </p>
                                </v-card-subtitle>
                                <v-card-text class="mt-n7 white--text">
                                    <p>Sub total desse Item : {{(item.CUSTO * item.QUANTIDADE).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
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
                            <v-card dark>
                                <v-card-title>
                                    <p v-if="!notification" class="white--text">Manipule a quantidade do Item #{{temp.NOME}}</p>
                                    <v-alert v-if="notification && msg.type == 'success'" type="success" v-model="notification" 
                                    dismissible dense shaped
                                    outlined class="not" >
                                        {{msg.text }}  
                                    </v-alert>
                                    <v-alert v-if="notification && msg.type == 'danger'" type="error" v-model="notification" 
                                    dismissible dense shaped
                                    outlined class="not" >
                                        {{msg.text }}  
                                    </v-alert>
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col sm="10">
                                            <label class="ml-3">Quantidade do Produto (Estoque atual do material : {{qntdDisponivel}})</label>
                                            <v-text-field
                                                class="ml-3 w-25"
                                                outlined
                                                dark
                                                
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
                                            @click="manipulaQuantidade = false"
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
            <small class="ml-2 white--text">*Esses itens fazem parte da composição do produto</small>
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
            qntdDisponivel : 0,
            notification : false,
            msg : {
                text : '',
                type : '',
            },
            oldQntd : null,
        }
   },
   methods:{
        ...mapActions('materiaMod', ['removeMateria', 'removeQntdMateria'
        , 'saveCustoTotal', 'checkQuantidade', 'getQuantidadeDisponivelMateria']),
        async activeManipula(item){
            this.temp = item
            this.qntdDisponivel =  await this.getQuantidadeDisponivelMateria(this.temp.ID)
            this.oldQntd = item.QUANTIDADE
            this.manipulaQuantidade = true
        },
        fechar(){
            this.$emit('fechar-Lista', false)
        },
        async removeFromList(){
            let tmp = this.temp
            if(parseInt(tmp.QUANTIDADE) <= 0){
                await this.removeMateria(tmp)
                this.valorTotal = 0
                this.materias.forEach(element => {
                   this.valorTotal += parseFloat(element.QUANTIDADE * element.CUSTO)
                });
                this.saveCustoTotal(parseFloat( this.valorTotal ))
                this.manipulaQuantidade = false
            }else{
                this.msg = await this.removeQntdMateria(tmp)
                if(this.msg.type == 'danger'){
                    this.temp.QUANTIDADE = this.oldQntd
                }
                this.valorTotal = 0
                this.materias.forEach(element => {
                this.valorTotal += parseFloat(element.QUANTIDADE * element.CUSTO)
                });
                this.saveCustoTotal(parseFloat( this.valorTotal ))
                this.notification = true
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