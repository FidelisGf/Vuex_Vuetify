<template>
    <div>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="300px"
            >
            <template v-if="miniatura" v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                
                v-bind="attrs"
                v-on="on"
                icon 
                >
                <v-icon dark large color="blue">mdi-plus-circle-outline</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h6">Cadastro de Categoria</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                
                            >
                                <v-text-field
                                label="Nome da Categoria"
                                required
                                v-model="NOME"
                                counter="60"
                                color="orange"
                                ></v-text-field>
                            </v-col>
                        </v-row>    
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                        >
                        Fechar
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="postCategoria"
                        >
                        Salvar
                        </v-btn>
                </v-card-actions>
            </v-card>
               
                
                    
        </v-dialog>   
    </div>
</template>

<script>
export default {
   props:{
        miniatura : Boolean
   },
   data(){
    return{
        dialog : false
    }
   }
}
</script>

<style lang="scss" scoped>

</style>