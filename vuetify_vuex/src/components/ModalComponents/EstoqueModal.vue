<template>
    <div>
            <v-dialog
                v-model="$store.getters.getAdicionaEstoque"
                persistent
                max-width="550"
            >
            <v-card>
            <v-card-title class="text-h5">
                Selecione o produto : 
            </v-card-title>
            <v-card-text>
                <p>A quantidade inserida será somada com a quantidade existente do produto.</p>
                <v-select
                    :items="$store.getters.listProducts"
                    label="Escolha um Produto"
                    v-model="Produto"
                    color="teal lighten-1"
                    item-text="NOME" 
                    return-object
                >
                </v-select>
                <v-text-field
                    v-model="quantidade"
                    label="Quantidade"
                    required
                    color="teal lighten-1"
                    type="number"
                    min="0"
                ></v-text-field>
                <small>Atenção ao escolher o produto</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="green darken"
                text
                @click="closeAdicionaEstoque"
                >
                Cancelar
                </v-btn>
                <v-btn
                color="red darken-1"
                text
                @click="adicionarQuantidade"
                >
                Adicionar
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import estoqueService from '@/service/estoqueService'
export default {
    data(){
        return{
            Produto : null,
            quantidade : null,
        }
    },
    methods:{
        closeAdicionaEstoque(){
            this.$store.commit('desativateAdicionaEstoque')
        },
        adicionarQuantidade(){
            let payload = {product_id : this.Produto.ID_PRODUTO, quantidade : this.quantidade}
            estoqueService.adicionarQuantidade(payload).then((res) =>{
                console.log(res)
                if(res.status == 200){
                    alert("Quantidade Adicionada com sucesso !")
                    this.$store.commit('desativateAdicionaEstoque')
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>

</style>