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
    methods:{
        disableList(){
            this.$store.commit("disableListaPedidos");
        }
    }
}
</script>

<style lang="scss" scoped>

</style>