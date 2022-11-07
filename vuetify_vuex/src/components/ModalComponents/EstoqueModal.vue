<template>
    <div>
        <v-card class="cards-colors">
            <v-card-title class="text-h5 white--text">
                Selecione o produto : 
            </v-card-title>
            <v-card-text class="white--text">
                <p>A quantidade inserida será somada com a quantidade existente do produto.</p>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="id"
                            label="Digite o Codigo do produto"
                            outlined
                            dense 
                            dark
                            required
                            single-line
                            type="number"
                            min="0"
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <span class="white--text">Caso não saiba, consulte na lista</span>
                </v-tooltip>
                <v-text-field
                    v-model="quantidade"
                    label="Quantidade"
                    required
                    color="teal lighten-1"
                    type="number"
                    dark
                    min="0"
                ></v-text-field>
                <small class="white--text">Atenção ao escolher o produto</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="red accent-2"
                text
                @click="closeAdicionaEstoque"
                >
                Cancelar
                </v-btn>
                <v-btn
                color="teal accent-3"
                text
                @click="adicionarQuantidade"
                >
                Adicionar
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            Produto: null,
            id: null,
            quantidade: null,
            registro : false,
            timeout : 2000,
            msg : '',

        };
    },
    methods: {
        ...mapActions('estoqueMod', ['saveQuantidade']),
        ...mapActions('estoqueMod', ['desativateAdicionaEstoque']),
        closeAdicionaEstoque() {
            this.$emit('closeEstoque', false)
        },
        async adicionarQuantidade() {
            let payload = { product_id: this.id, quantidade: this.quantidade };
            this.msg = await this.saveQuantidade(payload)
            let eventPayload = {msg : this.msg, registro : true, dialog : false}
            this.$emit('postMessage',eventPayload)
        },
    },
    computed:{
        ...mapGetters({active : 'estoqueMod/getAdicionaEstoque'}),  
    }
}
</script>

<style lang="scss" >

</style>