<template>
    <v-container>
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
        <v-dialog
            v-model="active"
            persistent
            max-width="600px"
            @keydown.escape="active = false"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="teal accent-3"
                    class="mt-1 ml-1  font-weight-medium"
                    dark
                    text
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon  dark color="teal accent-3" left>mdi-plus-circle-outline</v-icon>
                    Despesas
                </v-btn>
            </template>
            <form ref="form" @submit.prevent="insert">
                <v-card class="cards-colors">
                    <v-card-title class="white--text">
                        Registrar uma despesa
                    </v-card-title>
                    <v-card-text>
                       <v-row>
                                <v-col 
                                cols="12"
                                sm="6"
                               
                            >
                                <v-text-field
                                    dark
                                    label="Descrição da despesa"
                                    required
                                    v-model="DESC"
                                    color="teal lighten-1"
                                ></v-text-field>
                            </v-col>
                            <v-col 
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    dark
                                    v-model="CUSTO"
                                    label="Custo da despesa"
                                    persistent-hint
                                    required
                                    color="teal lighten-1"
                                    type="number"
                                    min="0"
                                    prefix="R$"
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
                                    required 
                                    return-object
                                    dark
                                ></v-select>       
                            </v-col>
                       </v-row>
                    </v-card-text>
                    <v-card-actions class="mt-n4 d-flex justify-end">
                        <v-btn
                            color="red accent-2"
                            text
                            @click="active = false"
                        >
                        Fechar
                        </v-btn>
                        <v-btn 
                            color="teal accent-3"
                            text
                            type="submit"
                        >
                        Salvar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </form>
        </v-dialog>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
   data(){
    return{
        DESC : '',
        CUSTO : 0,
        DATA : '',
        HORA : '',
        DTFINAL : '',
        TAG : null,
        active : false,
        registro : false,
        timeout : 2000,
        msg : '',
    }
   },
   computed:{
    ...mapGetters({TAGS : 'tagMod/getTags'})
   },
   methods:{
        ...mapActions('despesaMod', ['disableModalCadastro', 'save']),
        ...mapActions('produtoMod', ['saveList']),

       async insert(){
            this.saveHoraFinal()
            let custo = parseFloat(this.CUSTO)
            custo = custo.toFixed(2)
            if(this.DTFINAL != ''){
                let payload = {DESC : this.DESC, CUSTO : custo, DATA : this.DTFINAL, ID_TAG : this.TAG.ID}
                let info  = await this.save(payload)
                if(info.Id != null){
                    let payload2 = {ID : info.Id, DESC : this.DESC, CUSTO : custo, DATA : this.DTFINAL, tags : this.TAG}
                    this.saveList(payload2)
                    this.active = false
                } 
                this.registro = true
                this.msg = info.text
            }else{
                this.registro = true
                this.msg = 'Data Invalida'
            }
            this.atualizarLista()
            this.clear()
        },
        saveHoraFinal(){
            let tmp = this.DATA
            this.DTFINAL = tmp + ' ' + this.HORA
        },
        atualizarLista(){
            this.$emit('atualizar', false)
        },
        clear(){
            this.DESC = ''
            this.CUSTO = 0
            this.DATA = ''
            this.HORA = ''
            this.TAG = null
        }
   },

   

   
}
</script>

<style lang="scss" >
    .theme--dark input[type="date"]::-webkit-calendar-picker-indicator {
        background: url(https://img.icons8.com/cotton/64/000000/calendar.png) no-repeat;
        background-size: 24px 24px;
    }
    .theme--dark input[type="time"]::-webkit-calendar-picker-indicator {
        background: url(https://img.icons8.com/cotton/64/000000/clock.png) no-repeat;
        background-size: 24px 24px;
    }
</style>