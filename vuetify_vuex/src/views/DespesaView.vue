<template>
    <v-container fluid grid-list-md>
        <v-card class="elevation-15">
            <v-card-title>
                Registro de Despesas
            </v-card-title>
            <v-card-text>
                <v-row class="flex-column">
                    <v-col>
                        <v-btn
                        color="red darken-1"
                        class="mt-1 ml-2 font-weight-medium"
                        dark
                        text
                        @click="activeMod"
                        >
                        <v-icon  dark color="red darken-1" left>mdi-plus-circle-outline</v-icon>
                            Despesas
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn
                        color="purple darken-1"
                        class="mt-1 ml-2 font-weight-medium"
                        dark
                        text
                        @click="activeModalCadastro"
                        >
                        <v-icon  dark color="purple darken-1" left>mdi-plus-circle-outline</v-icon>
                            Tipo de Despesa
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
            
        </v-card>
        <TagModal v-if="active"></TagModal>
        <DespesaModal v-if="activeDespesa"></DespesaModal>
    </v-container>
</template>

<script>
import DespesaModal from '@/components/ModalComponents/DespesaModal.vue';
import TagModal from '@/components/ModalComponents/TagModal.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {};
    },
    methods: {
        ...mapActions("tagMod", ["activeModalCadastro"]),
        ...mapActions('despesaMod', ['activeMod'])
    },
    computed: {
        ...mapGetters({ active: "tagMod/getModalCadastro", activeDespesa : "despesaMod/getModalCadastro"})
    },
    components: { TagModal, DespesaModal }
}
</script>

<style lang="scss" scoped>

</style>