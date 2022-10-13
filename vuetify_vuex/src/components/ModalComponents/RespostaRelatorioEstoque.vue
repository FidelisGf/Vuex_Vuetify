<template>
    <v-container fluid grid-list-md>
        <v-row>
            <v-col cols="12"> 
                <v-dialog
                    v-model="$store.getters.getRelatorioEstoque"
                    persistent
                    max-width="600px"
                > 
                    <v-card>
                    <v-card-title>
                        <span  class="text-h5">{{this.$store.getters.getFiltroEstoque}}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-data-table
                                    :headers="headers"
                                    :items="lista"
                                    :items-per-page="6"
                                    hide-default-footer
                                    
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
                                @click="closeRelatorio"
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
import estoqueService from '@/service/estoqueService'
export default {
  props:{
    nomeRelatorio : String
  },
  data(){
    return{ 
        pagination: {
                current: 1,
                total: 0
        },
        lista : []
    }
  },
  computed: {
        headers() {
            return [
                {
                    text: "Produto",
                    align: "start",
                    value: "product[0].NOME",
                },
                { text: "Descrição", value: "product[0].DESC" },
                { text: "Valor", value: "product[0].VALOR" },
                { text: "Quantidade", value: "QUANTIDADE" },
            ];
         },
    },
  methods:{
        closeRelatorio(){
            this.$store.commit('desativeRelatorioEstoque')      
            this.$store.commit('deleteFiltroEstoque')
        },
        getRelatorio(){
            let filtro = this.$store.getters.getFiltroEstoque
            estoqueService.filter(this.pagination.current, filtro).then((response) => {
                this.lista = response.data.data
                console.log(this.lista)
                this.pagination.current = response.data.current_page
                this.pagination.total = response.data.last_page 
            })
        },
        onPageChange() {
            this.getRelatorio();
        },
  },
  created(){
    this.getRelatorio()
  }
}
</script>

<style lang="scss" scoped>

</style>