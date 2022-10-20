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
            <RespostaRelatorio :nome-relatorio="relatorioEscolha" :starter-date="startData" :end-date="endData" v-if="$store.getters.getRelatorio"></RespostaRelatorio>
            <RespostaRelatorioEstoque :nome-relatorio="relatorioEscolha" v-if="$store.getters.getRelatorioEstoque"></RespostaRelatorioEstoque>
        </v-row>
        <v-row>
            <v-col v-if="hasDateInput">
                <v-menu 
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="start"
                    label="Data Inicial"
                    prepend-icon="mdi-calendar"
                    readonly
                    dark
                    color="orange darken-1"
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                    color="orange darken-1"
                    v-model="start"
                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    min="1950-01-01"
                ></v-date-picker>
            </v-menu>
            </v-col>
            <v-col>
                <v-menu v-if="timeHrEndChoose"
                    ref="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="end"
                        color="orange darken-1"
                        dark
                        label="Data Final"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                        color="orange darken-1"
                        v-model="end"
                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                        min="1950-01-01"
                    ></v-date-picker>
                </v-menu>
            </v-col>
        </v-row>
        <v-row>
            <v-col 
                v-if="filledStart"
                sm="6"
            >
                <v-dialog
                ref="dialog"
                v-model="modHrIni"
                persistent
                width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="tmpIni"
                    label="Hora Inicial"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    dark
                    color="orange darken-1"
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                    color="orange darken-1"
                    v-if="modHrIni"
                    v-model="tmpIni"
                    format="24hr"
                    full-width
                >
                    <v-spacer></v-spacer>
                    <v-btn
                    text
                    color="teal accent-3"
                    @click="fechaHoraInicial"
                    >
                    Cancel
                    </v-btn>
                    <v-btn
                    text
                    @click="saveHoraIni"
                    color="teal accent-3"
                    >
                    OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
          <v-col 
            v-if="filledEnd"
            sm="6"
          >
            <v-dialog
            ref="dialog"
            v-model="modHrFin"
            persistent
            width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    color="orange darken-1"
                    dark
                    v-model="tmpFina"
                    label="Hora Final"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                    color="orange darken-1"
                    v-if="modHrFin"
                    v-model="tmpFina"
                    format="24hr"
                    full-width
                >
                    <v-spacer></v-spacer>
                        <v-btn
                        text
                        color="teal accent-3"
                        @click="fechaHoraFinal"
                        >
                        Cancel
                        </v-btn>
                        <v-btn
                        text
                        @click="saveHoraFinal"
                        color="teal accent-3"
                        >
                        OK
                        </v-btn>
                </v-time-picker>
      </v-dialog>
        </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="green accent-1" class="btns" @click="makeRelatorio">
                    Gerar
                    
                </v-btn>
                <v-btn color="lime lighten-4" class=" btns ml-3">
                    Limpar
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import RespostaRelatorio from '@/components/ModalComponents/RespostaRelatorio.vue';
import RespostaRelatorioEstoque from '../components/ModalComponents/RespostaRelatorioEstoque.vue';

export default {
    data() {
        return {
            relatoriosList: ["Relatorios de Produtos", "Relatorios do Estoque", "Relatorios de Pedidos", "Relatorio de Vendas"],
            relatorioEscolhaLista : null, // Escolha de uma das listas
            relatorioEscolha: null, // Escolha de uma opção dentro de uma lista
            relatorioProductList : ["Produtos mais caros", "Produtos mais baratos"],
            relatorioEstoqueList : ["Produtos com mais estoque", "Produtos com pouco estoque", "Produtos com mais saidas"],
            relatorioPedidoList : ["Pedidos realizados entre duas datas"],
            relatorioVendaList : ["Vendas por periodo de dias"],
            number_per_pages: null,
            activeRelatorio: false,
            end : null, // dataFinal (dia,mes,ano)
            tmpIni : null, //HorarioInicial
            start : null,// dataInicial (dia,mes,ano)
            tmpFina : null,//HorarioFinal
            modHrIni : false,//Modal para escolher Horario
            modHrFin : false,
            startData : '', //dataInicial Formatada (dia,mes,ano,hora,minuto)
            endData : '', //dataFinal Formatada (dia,mes,ano,hora,minuto)
            timeHrEndChoose : false, //Habilita a seleção de data Final
        };
    },
    computed:{                                   //todas computed nessa view servem para retornar nos v-if
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
            if(this.relatorioEscolha == 'Pedidos realizados entre duas datas' || this.relatorioEscolha == 'Vendas por periodo de dias'){
                flag = true
                return flag
            }
            return flag
        }
    },
    watch: {
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
        makeRelatorio() {
            let validado = this.validaDados()
            if(!validado){
                alert('Preencha todos os campos necessários')
            }else{
                this.$store.commit('deleteFiltro')
                this.$store.commit('deleteFiltroEstoque')
                let opcao = this.relatorioEscolha
                if(this.relatorioEscolhaLista == 'Relatorios de Produtos'){
                    this.$store.commit("saveFiltro", opcao)
                    this.$store.commit("activeRelatorio")
                }
                else if (this.relatorioEscolhaLista == 'Relatorios do Estoque'){
                    this.$store.commit("saveFiltroEstoque", opcao)
                    this.$store.commit("activeRelatorioEstoque")
                }else{
                    let comparaDatas = this.compareDates()
                    if(comparaDatas){
                        this.$store.commit("saveFiltro", opcao);
                        this.$store.commit("activeRelatorio");  
                        this.clear()
                    }else{
                        alert('Data Inicial maior que data Final')
                    }
                    
                }
            }
        },
        fechaHoraFinal(){
            this.modHrFin = false
            this.tmpFina = null
        },
        fechaHoraInicial(){
            this.modHrIni = false
            this.tmpIni = null
        },
        saveHoraIni(){
            let tmp = this.start
            this.startData = tmp + ' ' + this.tmpIni
            this.timeHrEndChoose = true
            this.modHrIni = false
        },
        refactorStartData(){
            let tmp = this.start
            this.startData = tmp + ' ' + this.tmpIni
        },
        refactorEndData(){
            let tmp = this.end
            this.endData = tmp + ' ' + this.tmpFina
        },
        saveHoraFinal(){
            let tmp = this.end
            this.endData = tmp + ' ' + this.tmpFina
            this.modHrFin = false
        },
        formatData(data){
            if (!data) return null
            const [year, month, day] = data.split('-')
            return `${day}.${month}.${year}`
        },
        clear(){
            this.tmpFina = null,
            this.tmpIni = null,
            this.start = null,
            this.end = null,
            this.timeHrEndChoose = false
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
            console.log(data)
            console.log(hora)
            const[year, month, day] = data.split('-')
            const[hours, minutes] = hora.split(':')
            const date =  new Date(year,month,day,hours, minutes);
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