<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12"> 
                <v-dialog
                    @keydown.escape="fechar"
                    v-model="active"
                    persistent
                    max-width="760px"
                > 
                    <v-card>
                    <v-card-title>
                        <p  class="text-h5">Lista de Produtos</p>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                           <ListaGenerica v-if="active" :route="'estoques'" :opcao="'Disponivel para venda'"></ListaGenerica>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn
                                color="teal lighten-1"
                                text
                                @click="fechar"
                            >
                            Fechar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import ListaGenerica from '../ListaGenerica.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            pagination: {
                current: 1,
                total: 0
            },
        };
    },
    methods: {
        ...mapActions('pedidoMod', ['desativeListaRapidaProdutos']),
        fechar() {
            this.desativeListaRapidaProdutos()
        }
    },
    computed: {
            ...mapGetters({active : 'pedidoMod/getListRapidaProdutos'}),
    },
    created() {
       
    },
    components: { ListaGenerica }
}
</script>

<style lang="scss" scoped>

</style>