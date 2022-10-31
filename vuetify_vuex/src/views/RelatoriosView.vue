<template>
    <v-container fluid grid-list-md>
        <v-row dense>
            <v-col cols="12">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-select
                            class="mt-3"
                            :items="relatoriosList"
                            label="Escolha um Relatorio"
                            v-model="relatorioEscolhaLista"
                            outlined 
                            dark
                            color="orange darken-1"
                            v-bind="attrs"
                            v-on="on"     
                            >  
                        </v-select>
                    </template>
                    <span >Selecione uma modalidade de Relatorio</span>
                  </v-tooltip>
                   
                        <v-select v-if="relatorioEscolhaLista == 'Relatorios do Estoque'"
                            :items="relatorioEstoqueList"
                            label="Tipo de relatorio para o estoque"
                            v-model="relatorioEscolha"
                            color="orange darken-1"
                            dark
                            outlined  
                        >  
                        </v-select>
                        <v-select v-if="relatorioEscolhaLista == 'Relatorios de Produtos'"
                            :items="relatorioProductList"
                            label="Tipo de relatorio para os produtos"
                            v-model="relatorioEscolha"
                            color="orange darken-1"
                            dark
                            outlined  
                        > 
                        </v-select> 
                        <v-select v-if="relatorioEscolhaLista == 'Relatorios de Pedidos'"
                            :items="relatorioPedidoList"
                            label="Tipo de relatorio para os pedidos"
                            v-model="relatorioEscolha"
                            color="orange darken-1"
                            dark
                            outlined  
                        >  
                        </v-select>
                        <v-select v-if="relatorioEscolhaLista == 'Relatorio de Vendas'"
                            :items="relatorioVendaList"
                            label="Tipo de relatorio para os pedidos"
                            v-model="relatorioEscolha"
                            color="orange darken-1"
                            dark
                            outlined  
                        >  
                        </v-select>
            </v-col>
            <v-dialog
                v-model="relatorio"
                persistent
                max-width="700px"
                @keydown.escape="relatorio = false"
            >
                <v-card>
                    <v-card-actions>
                        <v-btn 
                         icon
                         @click="relatorio = false"
                        ><v-icon color="red">mdi-close</v-icon></v-btn>
                    </v-card-actions>
                    <RespostaRelatorio :nome-relatorio="relatorioEscolha" 
                    :starter-date="startData" :end-date="endData" :filtro="filtro" :not-table="notTable" 
                    v-if="relatorio"></RespostaRelatorio>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="relatorioE"
                persistent
                max-width="700px"
                @keydown.escape="relatorioE = false"
            >
                <v-card>
                    <v-card-actions>
                        <v-btn 
                        icon
                        @click="relatorioE = false"
                       ><v-icon color="red">mdi-close</v-icon></v-btn>
                    </v-card-actions>
                    <RespostaRelatorioEstoque :filtro="filtro" ></RespostaRelatorioEstoque>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row>
            <v-col v-if="hasDateInput">
                <v-text-field
                    dark
                    v-model="start"
                    label="Data Inicial"
                    persistent-hint
                    required
                    color="teal lighten-1"
                    type="date"
                ></v-text-field>  
            </v-col>
            <v-col 
            v-if="filledStart"
            sm="6"
            >
                <v-text-field
                    v-model="tmpIni"
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
            <v-col v-if="timeHrEndChoose">
                <v-text-field
                    v-model="end"
                    label="Data Final"
                    persistent-hint
                    required
                    color="teal lighten-1"
                    type="date"
                    dark
                ></v-text-field>  
            </v-col>
          <v-col 
            v-if="filledEnd"
          >
            <v-text-field
                    dark
                    v-model="tmpFina"
                    label="Hora final"
                    persistent-hint
                    required
                    color="teal lighten-1"
                    type="time"
            ></v-text-field>     
        </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="green accent-1" class="btns" @click="makeRelatorio">
                    Gerar
                    
                </v-btn>
                <v-btn color="lime lighten-4" class=" btns ml-3" @click="clear">
                    Limpar
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

import RespostaRelatorio from '@/components/ModalComponents/RespostaRelatorio.vue';
import RespostaRelatorioEstoque from '../components/ModalComponents/RespostaRelatorioEstoque.vue';
import {mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            relatoriosList: ["Relatorios de Produtos", "Relatorios do Estoque", "Relatorios de Pedidos", "Relatorio de Vendas"],
            relatorioEscolhaLista : null, // Escolha de uma das listas
            relatorioEscolha: null, // Escolha de uma opção dentro de uma lista
            relatorioProductList : ["Produtos mais caros", "Produtos mais baratos"],
            relatorioEstoqueList : ["Produtos com mais estoque", "Produtos com pouco estoque", "Produtos com mais saidas"],
            relatorioPedidoList : ["Pedidos realizados entre duas datas"],
            relatorioVendaList : ["Vendas por periodo de dias", "Vendas por Tipo de Pagamento"],
            number_per_pages: null,
            activeRelatorio: false,
            end : null, // dataFinal (dia,mes,ano)
            tmpIni : null, //HorarioInicial
            start : null,// dataInicial (dia,mes,ano)
            tmpFina : null,//HorarioFinal
            modHrIni : false,//Modal para escolher Horario
            modHrFin : false,
            startData : '', //dataInicial Formatada (dia,mes,ano,hora,minuto)
            endData : '', //dataFinal Formatada (dia,mes,ano,hora,minuto) //Habilita a seleção de data Final,
            relatorio : false,
            filtro : '',
            notTable : false,
            relatorioE : false,
        };
    },
    computed:{
        ...mapGetters({active : 'estoqueMod/getRelatorioEstoque'}),    
                             
          //todas computed nessa view servem para retornar nos v-if
        filledStart: function() {  //verifica se a data inicial foi inserida
            let flag = false
            if(this.start != null){
               flag = true
               return flag
            } 
            return flag
        },
        filledEnd: function(){  //verifica se a data final foi inserida 
            let flag = false
            if(this.end != null){
                flag = true
                return flag
            }
            return flag
        },  
        hasDateInput: function(){ //verifica se o relátorio vai possuir input de datas 
            let flag = false   
            
            if(this.relatorioEscolha == 'Pedidos realizados entre duas datas' 
            || this.relatorioEscolha == 'Vendas por periodo de dias' || this.relatorioEscolha == 'Vendas por Tipo de Pagamento'){
                flag = true
                return flag
            }
            return flag
        },
        timeHrEndChoose: function(){
            let flag = false
            if(this.tmpIni != null){
                flag = true
                return flag
            }
            return flag
        }
    },
    watch: { // monitora as variaveis de dt, para que caso mudem elas sejam atulizadas antes do botão gerar ser clicado
        start: function(val) {
          if (val) {
             this.refactorStartData()
          }
          val = this.start
      },
      end: function(val){
        if(val){
            this.refactorEndData()
        }
        val = this.end
      }
    },
    methods: {
        ...mapActions('estoqueMod', ['saveFiltroEstoque','activeRelatorioEstoque']),
        makeRelatorio() {
            this.notTable = false
            let validado = this.validaDados()
            if(!validado){
                alert('Preencha todos os campos necessários')
            }else{
                if(this.relatorioEscolhaLista == 'Relatorios de Produtos'){
                    this.filtro = this.relatorioEscolha
                    this.relatorio = true
                }
                else if (this.relatorioEscolhaLista == 'Relatorios do Estoque'){
                    
                    this.filtro = this.relatorioEscolha
                    this.relatorioE = true
                }else if(this.relatorioEscolha == 'Pedidos realizados entre duas datas' || this.relatorioEscolha == 'Vendas por periodo de dias' 
                || this.relatorioEscolha == 'Vendas por Tipo de Pagamento'){
                   
                    let comparaDatas = this.compareDates()
                    this.saveHoras()
                    if(comparaDatas){
                        if(this.relatorioEscolha == 'Vendas por Tipo de Pagamento'){
                            this.notTable = true
                        } 
                        this.filtro = this.relatorioEscolha
                        this.relatorio = true
                        this.clear()
                    }else{
                        alert('Data Inicial maior que data Final')
                    }
                }else{
                    this.filtro = this.relatorioEscolha
                    this.relatorio = true
                }
            }
        },
        saveHoras(){
            this.saveHoraIni()
            this.saveHoraFinal()
        },
        saveHoraIni(){
            let tmp = this.start
            
            this.startData = tmp + ' ' + this.tmpIni
        },
        saveHoraFinal(){
            let tmp = this.end
            this.endData = tmp + ' ' + this.tmpFina
            this.modHrFin = false
        },
        refactorStartData(){
            let tmp = this.start
            this.startData = tmp + ' ' + this.tmpIni
        },
        refactorEndData(){
            let tmp = this.end
            this.endData = tmp + ' ' + this.tmpFina
        },
        clear(){
            this.tmpFina = null,
            this.tmpIni = null,
            this.start = null,
            this.end = null,
            this.filledStart = false,
            this.disableNotTableFiltro()
        },
        compareDates(){
            let inicio = this.makeValibleData(this.start, this.tmpIni)
            let fim = this.makeValibleData(this.end, this.tmpFina)
            console.log(inicio)
            if(fim < inicio){
                return false
            }
            else{
                return true
            }
        },
        makeValibleData(data, hora){
            const[day, month, year] = data.split('-')
            const[hours, minutes] = hora.split(':')
            const date =  new Date(day,month,year,hours, minutes);
            console.log(date)
            return date;
        },
        validaDados(){
            if(this.relatorioEscolha == null || this.relatorioEscolhaLista == null){
               return false
            }else{
                if(this.relatorioEscolha != 'Pedidos realizados entre duas datas'){
                    return true
                }else{
                    if(this.tmpFina == null || this.tmpIni == null ||  this.start == null || this.end == null){
                        return false
                    }else{
                        return true
                    }
                }
            }
        }
    },
    components: { RespostaRelatorio, RespostaRelatorioEstoque }
}
</script>

<style lang="scss" scoped>
    .btns{
        width: 20%;
    }

</style>