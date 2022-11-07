<template>
    <v-container fluid grid-list-md>
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
        <v-row class="d-flex flex-md-row flex-lg-row flex-column align-center ">
            <v-col cols="11" lg="2" md="2"><DespesaModal class="mt-0 mt-md-1"></DespesaModal></v-col>
            <v-col cols="11" lg="3" md="3"><TagModal class="mt-0 mt-md-1" ></TagModal></v-col>
            <v-col cols="10" sm="10" lg="3" md="3">
                
                
                <v-btn v-if="!hasFilter"
                    color="teal accent-1"
                    class=" ml-n0 mt-5 mt-md-1 ml-sm-n3 ml-lg-n0  ml-md-n0 font-weight-medium"
                    dark
                    @click="active = true"
                    text
                    >
                    <v-icon  dark color="teal accent-1" left>mdi-calendar</v-icon>
                            Ver despesas por data
                </v-btn>
                <v-btn v-if="hasFilter"
                    color="teal accent-1"
                    class=" ml-n0 mt-5 mt-md-1 ml-sm-n3 ml-lg-n0  ml-md-n0 font-weight-medium"
                    dark
                    @click="limpaFiltros"
                    text
                    >
                    <v-icon  dark color="teal accent-1" left>mdi-calendar</v-icon>
                            Voltar Despesas a ordem normal
                </v-btn>
            </v-col>
            <v-spacer v-if="!$vuetify.breakpoint.smAndDown" ></v-spacer>
            <v-col cols="10" sm="10" xs="2" md="3" lg="3">
                <v-sheet
                    color="cyan lighten-5"
                    elevation="8"
                    height="55px"
                    width="170px"
                    class="mt-md-n3 mt-0   exibeGasto"

                >
                    <p style="font-size: 16px;" class="ml-2 mt-4 font-weight-bold">Despesas do Mês</p>
                    <p class="mt-n4 ml-10 font-weight-bold">{{despesasValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                </v-sheet>
            </v-col>
            <v-dialog
                v-model="active"
                persistent
                max-width="720"
                @keydown.escape="active = false"
            >
                <form ref="form" @submit.prevent="getTwoDates">
                    <v-card class="cards-colors">
                        <v-card-title class="white--text">
                            Despesas entre duas datas
                        </v-card-title>
                        <v-card-text class="white--text">
                            <v-row>
                                <v-col 
                                    cols="6"
                                    
                                    >
                                    <v-text-field
                                        v-model="DATA_INI"
                                        label="Data Inicial"
                                        persistent-hint
                                        required
                                        color="teal lighten-1"
                                        type="date"
                                        dark
                                    ></v-text-field>
                                </v-col>
                                <v-col 
                                    cols="6"
                                    sm="6"
                                    md="6"
                                    >
                                    <v-text-field
                                        v-model="HORA_INI"    
                                        label="Hora Inicial"
                                        persistent-hint
                                        required
                                        color="teal lighten-1"
                                        type="time"
                                        dark
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col 
                                    cols="6"
                                    
                                    >
                                    <v-text-field
                                        v-model="DATA_FIN"
                                        label="Data Final"
                                        persistent-hint
                                        required
                                        color="teal lighten-1"
                                        type="date"
                                        dark
                                    ></v-text-field>
                                </v-col>
                                <v-col 
                                    cols="6"
                                    sm="6"
                                    md="6"
                                    >
                                    <v-text-field
                                        v-model="HORA_FIN"    
                                        label="Hora Final"
                                        persistent-hint
                                        required
                                        color="teal lighten-1"
                                        type="time"
                                        dark
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions class="d-flex justify-end">
                            <v-btn
                                text 
                                color="teal accent-2"
                                type="submit"
                            >
                                Listar 
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </form>
            </v-dialog>
        </v-row>

        <v-row>
            <v-col>
                <ListaGenerica :headers="headers"  :key="renicializar" :route="'despesas'" :starter-date="DTINICIAL" :end-date="DTFINAL" :opcao="filtro"></ListaGenerica>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ListaGenerica from '@/components/ListaGenerica.vue';
import DespesaModal from '@/components/ModalComponents/DespesaModal.vue';
import TagModal from '@/components/ModalComponents/TagModal.vue';
import {mapActions, mapGetters} from 'vuex';

 
export default {
    data() {
        return {
            op : null,
            active : false,
            DATA_INI : '',
            HORA_INI : '',
            DATA_FIN : '',
            HORA_FIN : '',
            DTINICIAL : '',
            DTFINAL : '',
            filtro : '',
            hasFilter : false,
            renicializar : 0,
            registro : false,
            msg : '',
            timeout : 2000,
        };
    },
    methods: {
        ...mapActions("tagMod", ['findAll']),
        ...mapActions('despesaMod', ['despesasMes']),
        saveDatas(){
            let tmp = this.DATA_INI
            this.DTINICIAL = tmp + ' ' + this.HORA_INI
            tmp = this.DATA_FIN
            this.DTFINAL = tmp + ' ' + this.HORA_FIN
        },
        limpaFiltros(){
            this.DTFINAL = ''
            this.DTINICIAL = ''
            this.filtro = ''
            this.forceRerender()
            this.hasFilter = false
            this.msg = 'Filtros limpados com sucesso !'
            this.registro = true
        },  
        forceRerender (){
            this.renicializar += this.renicializar + 1;
        },
        
        makeValibleData(data, hora){
            const[day, month, year] = data.split('-')
            const[hours, minutes] = hora.split(':')
            const date =  new Date(day,month,year,hours, minutes);
            console.log(date)
            return date;
        },
        getTwoDates(){
            this.saveDatas()
            if(!this.compareDates()){
                this.msg = 'Data Inicial maior que a Data Final'
                this.registro = true
                this.active = false
                this.limpaFiltros()
            }else{
                this.filtro = "Duas datas"
                this.hasFilter = true
                console.log(this.hasFilter)
                this.forceRerender()
                this.msg = 'Busca realizada com sucesso !'
                this.registro = true
                this.active = false
            }
        },
        compareDates(){
            let inicio = this.makeValibleData(this.DATA_INI, this.HORA_INI)
            let fim = this.makeValibleData(this.DATA_FIN, this.HORA_FIN)
            console.log(inicio)
            if(fim < inicio){
                return false
            }
            else{
                return true
            }
        },
    },
    computed: {
        ...mapGetters({despesasValor : 'despesaMod/getDespesasMes'}),
        headers (){
            return [
                    {
                        text: "CODIGO",
                        align: "start",
                        value: "ID",
                    },
                    { text: "CUSTO", value: "CUSTO" },
                    { text: "DESCRIÇÂO", value: "DESC" },
                    { text: "DATA", value: "DATA" },
                    { text: "Tipo", value: "tags.NOME"},
                    { text: "Actions", value: "actions", sortable: false },
            ];
        },
    },
    async created(){
        await this.findAll()
        await this.despesasMes()
    },
    components: { TagModal, DespesaModal, ListaGenerica }
}
</script>

<style lang="scss" scoped>
    .exibeGasto{
        border-color: aqua !important;
        box-shadow: 0px 2px 25px 2px #E0F2F1 !important;
        border-radius: 10px !important;
      
    }
    .exibeGasto:hover{
        transform: translate(2px, -2.10px);
        transition: 1.5s;
        box-shadow: 0px 2px 35px 2px #505050 !important;
    }
    .exibeGasto:hover::after{
        transform: translate(2px, +2.10px);
        transition: 1.5s;
        box-shadow: 0px 2px 25px 2px #E0F2F1 !important;
    }
</style>