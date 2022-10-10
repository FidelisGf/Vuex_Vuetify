<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12"> 
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600px"
                > 
                    <v-card>
                    <v-card-title>
                        <span  class="text-h5">Relatorio</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-data-table
                                    :headers="headers"
                                    :items="$store.getters.listProducts"
                                    :items-per-page="6"
                                    hide-default-footer
                                    hide-default-header
                                    class="elevation-2"
                                >
                                </v-data-table>
                                <v-pagination
                                    color="teal lighten-1"
                                    v-model="pagination.current"
                                    :length="pagination.total"
                                    @input="onPageChange">  
                                </v-pagination> 
                            </v-col>     
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn
                                color="teal lighten-1"
                                text
                                @click="dialog = false"
                            >
                            Fechar
                            </v-btn>
                            <v-btn v-if="!editMode"
                                color="teal lighten-1"
                                text
                                @click="postProduto"
                            >
                            Fechar
                            </v-btn>
                            <v-btn v-if="editMode"
                                color="teal lighten-1"
                                text
                                @click="editProduct"
                            >
                            Editar
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

</style>