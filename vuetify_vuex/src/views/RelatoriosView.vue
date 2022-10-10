<template>
    <v-container fluid grid-list-md>
        <v-row dense>
            <v-col cols="12">
                <v-card
                    color="blue-grey lighten-3"
                    dark
                    class="elevation-5"
                >
                    <v-card-title class="ml-2 text-h4 black--text">
                        Selecione um Relátorio a ser Gerado
                    </v-card-title>
                    <v-row>
                        <v-col  cols="12" sm="6" class="d-flex justify-center ml-0 ml-md-6 ml-sm-6 ml-lg-6">
                            <v-select
                                :items="relatorioList"
                                label="Escolha um Relatorio"
                                v-model="relatorioEscolha"
                                color="teal accent-3"
                            >  
                            </v-select>
                            <v-text-field
                                    v-model="number_per_pages"
                                    label="Elementos por Pagina"
                                    required
                                    color="teal lighten-1"
                                    type="number"
                                    min="1"
                                    class="ml-5"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            
                        </v-col>
                    </v-row>
                    <v-card-actions class="ml-3">
                        <v-btn color="#3e3e3c">
                            Gerar
                        </v-btn>
                        <v-btn color="#3e3e3c" class="ml-3">
                            Voltar
                        </v-btn>
                    </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
   data(){
    return{
        relatorioList : ['Categoria com maior valor' , 'Media de Valor por Categoria', 'Produtos mais caros'],
        relatorioEscolha : null,
        number_per_pages : null,

    }
   }
}
</script>

<style lang="scss" scoped>

</style>