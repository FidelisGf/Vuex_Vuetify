<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col class="d-flex">
                <v-btn
                    color="teal accent-3"
                    class="mt-1 ml-1  font-weight-medium"
                    dark
                    text
                    @click="activeMod"
                    >
                    <v-icon  dark color="teal accent-3" left>mdi-plus-circle-outline</v-icon>
                    Despesas
                </v-btn>
                <v-btn
                    color="teal accent-3"
                    class="mt-1 ml-1  font-weight-medium"
                    dark
                    text
                    @click="activeModalCadastro"
                >
                    <v-icon  dark color="teal accent-3" left>mdi-plus-circle-outline</v-icon>
                            Tipo de Despesa
                </v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
                <v-btn
                    color="teal accent-1"
                    class="mt-1 ml-1  font-weight-medium"
                    dark
                    text
                    @click="activeModalCadastro"
                    >
                    <v-icon  dark color="teal accent-1" left>mdi-calendar</v-icon>
                            Ver despesas por data
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <ListaGenerica :route="'despesas'"  ></ListaGenerica>
            </v-col>
        </v-row>
        <TagModal v-if="active"></TagModal>
        <DespesaModal v-if="activeDespesa"></DespesaModal>
    </v-container>
</template>

<script>
import ListaGenerica from '@/components/ListaGenerica.vue';
import DespesaModal from '@/components/ModalComponents/DespesaModal.vue';
import TagModal from '@/components/ModalComponents/TagModal.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            finalDateStart : '',
            finalDateEnd : '',
            op : null,
        };
    },
    methods: {
        ...mapActions("tagMod", ["activeModalCadastro"]),
        ...mapActions('despesaMod', ['activeMod'])
    },
    computed: {
        ...mapGetters({ active: "tagMod/getModalCadastro", activeDespesa : "despesaMod/getModalCadastro"}),
        headers (){
            return [
                    {
                        text: "CODIGO",
                        align: "start",
                        value: "ID",
                    },
                    { text: "CUSTO", value: "CUSTO" },
                    { text: "DESCRIÇÂO", value: "DESC" },
                    { text: "DATA", value: "DATA" },
                    { text: "Tipo", value: "tags.NOME"},
                    { text: "Actions", value: "actions", sortable: false },
            ];
        }
    },
    created(){
        this.$store.commit("setHeader", this.headers)
    },
    components: { TagModal, DespesaModal, ListaGenerica }
}
</script>

<style lang="scss" scoped>

</style>