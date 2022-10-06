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
                <v-icon dark color="teal lighten-1">mdi-plus-circle-outline</v-icon>
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
                                color="teal lighten-1"
                                ></v-text-field>
                            </v-col>
                        </v-row>    
                    </v-container>
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
                        <v-btn
                            color="teal lighten-1"
                            text
                            @click="postCategory"
                        >
                        Salvar
                        </v-btn>
                </v-card-actions>
            </v-card>
               
                
                    
        </v-dialog>   
    </div>
</template>

<script>
import categoryService from '@/service/categoryService'
export default {
   props:{
        miniatura : Boolean
   },
   data(){
    return{
        dialog : false,
        NOME : '',
    }
   },
   methods:{
        postCategory(){
            let payload = {NOME : this.NOME}
            categoryService.postCategory(payload).then((res) => {
                alert('Categoria criada com sucesso ! ')
                console.log(res.data);
                this.$store.commit('saveListCategoria', res.data)
                console.log(this.$store.state.Categorias)
            })
        }
   }
}
</script>

<style lang="scss" scoped>

</style>