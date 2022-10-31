<template>
    <v-card>
            <v-card-title>
                Edição de Despesa
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col 
                        cols="12"
                        sm="6"
                           
                    >
                        <v-text-field
                            label="Descrição da despesa"
                            required
                            v-model="DESC"
                            color="teal lighten-1"
                            :loading="loading"
                        ></v-text-field>
                    </v-col>
                    <v-col 
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                            v-model="CUSTO"
                            label="Custo da despesa"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="number"
                            min="0"
                            prefix="R$"
                            :loading="loading"
                        ></v-text-field>
                    </v-col>
                    <v-col 
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                            v-model="DATA"
                            label="Data"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="date"
                            :loading="loading"
                    
                        ></v-text-field>   
                    </v-col>
                    <v-col 
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                            v-model="HORA"    
                            label="Hora"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="time"
                            :loading="loading"
                        ></v-text-field>
                       
                    </v-col>
                    <v-col
                            cols="12"
                            sm="6"
                            class="d-flex"
                    >  
                        <v-select
                            :items="TAGS"
                            label="Tipo da despesa"
                            v-model="TAG"
                            color="teal lighten-1"
                            item-text="NOME" 
                            return-object
                            :loading="loading"
                        ></v-select>       
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="mt-n4">
                <v-btn 
                    color="green lighten-1"
                    text
                    @click="editDespesa"
                >
                Editar
                </v-btn>
            </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data(){
        return{
            DESC : '',
            CUSTO : null,
            DATA : '',
            HORA : '',
            dtTmp: '',
            TAG : null,
            loading : false,
            TAGS : [],
            ID : null,
        }
    },
    computed:{
        ...mapGetters({generico : 'utilMod/getGenerico'})
    },
    methods:{
        ...mapActions('despesaMod', ['disableEditDespesa', 'findById', 'edit']),
        ...mapActions('tagMod', ['findAll']),
        async getDespesa(){
            this.loading = true
            this.TAGS = await this.findAll()
            this.ID = this.generico.ID;
            let data = await this.findById(this.ID)
            if(data != null || data != undefined){
                this.dtTmp = data.DATA.split(" ")
                this.DATA = this.dtTmp[0]
                this.HORA = this.dtTmp[1]
                this.DESC = data.DESC
                this.CUSTO = data.CUSTO 
                this.TAG = data.tags.NOME
            }
            this.loading = false
        },
        clear(){
            this.loading = false
            this.DATA = ''
            this.HORA = ''
            this.DESC = ''
            this.CUSTO = '' 
            this.TAG = ''
        },
        transformData(){
            this.dtTmp  = null
            this.dtTmp = this.DATA + " " + this.HORA
        },
        async editDespesa(){
            this.transformData()
            let payload = {ID: this.ID, DESC : this.DESC, CUSTO : this.CUSTO, ID_TAG : this.TAG.ID, DATA : this.dtTmp, tags : this.TAG}
            await this.edit(payload)
        }
    },
    watch: {
        generico : function(val) {
          if (val) {
             this.clear()
             this.getDespesa()
          }
        }  
    },
    created(){
        this.getDespesa()
    }
}
</script>

<style lang="scss" scoped>

</style>