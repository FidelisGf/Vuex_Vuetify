<template>
    <v-card class="cards-colors">
        <v-snackbar
            v-model="registro"
            :timeout="timeout"
        >
            {{this.msg}}
            <template v-slot:action="{ attrs }">
            <v-btn
                color="red"
                dark
                icon
                v-bind="attrs"
                @click="registro = false"
                >
                <v-icon small>mdi-close</v-icon>
            </v-btn>
            </template>
        </v-snackbar>
        <v-card-actions>
            <v-btn
                icon
                text
                dark
                @click="closeEdit"
                class="ml-n3 mt-n1"
            >
            <v-icon color="red accent-2">mdi-close</v-icon>
            </v-btn>
        </v-card-actions>
        <v-card-title class="mt-n3 text-h5 white--text">
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
                            dark
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
                            dark
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
                            dark
                    
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
                            dark
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
                            dark
                        ></v-select>       
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="mt-n4 d-flex justify-end">
                <v-btn 
                    color="green accent-3"
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
            msg : '',
            registro : false,
            timeout : 2000,
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
        closeEdit(){
            this.$emit('close-edit-despesa', false)
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
            this.msg = await this.edit(payload)
            this.registro = true
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