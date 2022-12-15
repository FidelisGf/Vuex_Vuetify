<template>
    <div>
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            max-width="650"
            transition="dialog-bottom-transition"
            @keydown.escape="(dialog = false)"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="purple lighten-1"
                    class="ml-3"
                    dark
                    icon
                    @click="active = true" 
                >
                    <v-icon aria-hidden="false" dark color="grey lighten-2">mdi-cog</v-icon>
                </v-btn>
            </template>
            <v-card dark>
                <v-sheet color="grey darken-3">
                    <v-card-actions class="d-flex justify-start ml-n2 mt-n1">
                        <v-btn @click="(dialog = false)" icon color="red accent-2">
                            <v-icon color="red accent-2">mdi-close</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-title class="mt-n6">
                        <p>Configurações Gerais do Sistema</p>
                    </v-card-title>
                    <v-card-subtitle class="mt-n5">
                        <p class="ml-2">Tudo que for alterado aqui, afetará diretamente o sistema...</p>
                    </v-card-subtitle>
                </v-sheet>
            </v-card>

        </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            dialog : false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>