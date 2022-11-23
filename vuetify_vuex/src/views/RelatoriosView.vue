<template>
    <v-container fluid grid-list-md>
        <v-snackbar
                v-model="registro"
                :timeout="timeout"
                :color="color"
                bottom
                right
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
        <v-row dense class="mt-8 mt-md-10 mt-lg-0">
            <v-col cols="12">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-select
                            class="mt-3"
                            :items="modelosRelatorios"
                            label="Escolha o modelo do relatorio"
                            v-model="relatorioEscolhaModelo"
                            outlined 
                            dark
                            color="orange darken-1"
                            v-bind="attrs"
                            v-on="on"     
                            >  
                        </v-select>
                    </template>
                    <span >Selecione o modelo de relatorio a ser gerado</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-select
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
                            label="Tipo de relatorio para as vendas"
                            v-model="relatorioEscolha"
                            color="orange darken-1"
                            dark
                            outlined  
                        >  
                        </v-select>
                        <v-select v-if="relatorioEscolhaLista == 'Relatorios de Lucros'"
                            :items="relatorioLucrosList"
                            label="Tipo de relatorio para os lucros e gastos"
                            v-model="relatorioEscolha"
                            color="orange darken-1"
                            dark
                            outlined  
                        >  
                        </v-select>
                        <v-select v-if="relatorioEscolhaLista == 'Relatorio de Despesas'"
                            :items="relatorioDespesaList"
                            label="Tipo de relatorio para as despesas"
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
                max-width="850px"
                @keydown.escape="relatorio = false"
            >
                    <RespostaRelatorio v-if="relatorio" :nome-relatorio="relatorioEscolha" 
                    :starter-date="startData" :end-date="endData" :filtro="filtro" :not-table="notTable" 
                    @closeModRelatorio="closeRelatorio"></RespostaRelatorio>
                
            </v-dialog>
            <v-dialog
                v-model="relatorioE"
                persistent
                max-width="750px"
                @keydown.escape="relatorioE = false"
            >
                    <RespostaRelatorioEstoque v-if="relatorioE" @closeModal="closeRelatorio" :filtro="filtro" ></RespostaRelatorioEstoque>
              
            </v-dialog>
            <RelatorioPDF :key="renicializarPdf" 
                v-if="pdf == true" 
                :starter-date="startData" 
                :end-date="endData" :filtro="filtro"
                :route="route"
                :columns="pdfColumn">
            </RelatorioPDF>
        </v-row>
        <v-row>
            <v-col v-if="hasDateInput">
                <v-text-field
                    darks
                    v-model="start"
                    label="Data Inicial"
                    persistent-hint
                    class="input"
                    required
                    dark
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
                    class="input"
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
                <v-btn color="teal accent-2" class="btns" @click="makeRelatorio">
                    Gerar
                </v-btn>
                <v-btn color="light-blue accent-2" class=" btns ml-3" @click="clear">
                    Limpar
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

import RespostaRelatorio from '@/components/ModalComponents/RespostaRelatorio.vue';
import RespostaRelatorioEstoque from '../components/ModalComponents/RespostaRelatorioEstoque.vue';
import RelatorioPDF from '@/components/RelatorioPDF.vue';
export default {
    data() {
        return {
            registro : false,
            timeout : 2000,
            msg : '',
            color : '',
            relatoriosList: ["Relatorios de Produtos", 
                            "Relatorio de Despesas", "Relatorios do Estoque", 
                            "Relatorios de Pedidos", "Relatorio de Vendas",
                            "Relatorios de Lucros"],
            modelosRelatorios : ["PDF", "Tabela Virtual"],
            relatorioEscolhaModelo : null,
            relatorioEscolhaLista : null, // Escolha de uma das listas
            relatorioEscolha: '', // Escolha de uma opção dentro de uma lista
            relatorioProductList : ["Produtos mais caros", "Produtos mais baratos"],
            relatorioEstoqueList : ["Produtos com mais estoque", "Produtos com pouco estoque", "Produtos com mais saidas"],
            relatorioPedidoList : ["Pedidos realizados entre duas datas"],
            relatorioVendaList : ["Vendas por periodo de dias", "Vendas por Tipo de Pagamento"],
            relatorioDespesaList : ["Despesas entre duas datas"],
            relatorioLucrosList: ["Lucros e Gastos por dias"],
            number_per_pages: null,
            end : null, // dataFinal (dia,mes,ano)
            tmpIni : null, //HorarioInicial
            start : null,// dataInicial (dia,mes,ano)
            tmpFina : null,//HorarioFinal
            startData : '', //dataInicial Formatada (dia,mes,ano,hora,minuto)
            endData : '', //dataFinal Formatada (dia,mes,ano,hora,minuto) //Habilita a seleção de data Final,
            relatorio : false,
            filtro : '',
            notTable : false,
            relatorioE : false,
            renicializar : 0,
            renicializarPdf : 0,
            pdfColumn : null,
            loading : false,
            route : '',
            pdf : false,
        };
    },
    computed:{ 
                             
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

            if(this.relatorioEscolha.includes("datas") || this.relatorioEscolha.includes("dias")){
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
      },
      relatorioEscolhaLista: function(val){
        if(val){
            if(val == 'Relatorios de Lucros'){
                this.relatorioEscolhaModelo = 'PDF'
            }
            this.relatorioEscolha = ''
            this.tmpFina = null
            this.tmpIni = null
            this.start = null
            this.end = null
            this.filledStart = false
        }
      },
    },
    methods: {
        closeRelatorio(e){
            this.relatorioE = e
            this.relatorio = e
            this.forceRerender()
        },
        forceRerender (){
            this.renicializar += this.renicializar + 1;
        },
        makeRelatorio() {
            this.filtro = this.relatorioEscolha
            this.loading = true
            this.notTable = false
            let validado = this.validaDados()
            if(this.start != null && this.end != null){
                let comparaDatas = this.compareDates()
                this.saveHoras()
                if(comparaDatas){
                    if(this.relatorioEscolha == 'Vendas por Tipo de Pagamento'){
                        this.notTable = true
                    }
                }else{
                        this.registro = true 
                        this.msg = "Data inicial mair que a data final !"
                        this.color = "red darken-3"
                        return 
                    }
            }
            if(!validado){
                this.registro = true 
                this.msg = "Preencha todos os campos necessários !"
                this.color = "yellow darken-3"
            }else{
               
                if(this.relatorioEscolhaModelo == 'PDF'){ 
                    switch (this.relatorioEscolhaLista) {
                        case 'Relatorios de Produtos':
                            this.pdfColumn = ['CODIGO', 'NOME', 'CATEGORIA', 'MEDIDA', 'VALOR', 'QUANTIDADE']
                            this.route = 'products'
                            break
                       case 'Relatorios do Estoque':
                            this.pdfColumn = ['CODIGO', 'PRODUTO', 'VALOR', 'QUANTIDADE', 'SAIDAS']
                            this.route = 'estoques'
                            break
                        case 'Relatorios de Pedidos':    
                            this.pdfColumn = ['CODIGO', 'METODO_PAGAMENTO', 'VALOR_TOTAL', 'SITUAÇÃO', 'FEITO EM']
                            this.route = 'pedidos'
                            break
                        case 'Relatorio de Vendas':
                            this.pdfColumn = ['CODIGO', 'VALOR_TOTAL', 'COD PEDIDO', 'METODO_PAGAMENTO', 'DT_PAGAMENTO']
                            this.route = 'vendas'
                            break
                        case 'Relatorio de Despesas':    
                            this.pdfColumn = ['CODIGO', 'CUSTO', 'DESCRIÇÃO','TIPO','DATA']
                            this.route = 'despesas'
                            break 
                        case 'Relatorios de Lucros' :
                            this.route = 'vendas'
                            break           
                        default:
                            console.log('Vazio.'); 
                            break   
                    }
                    this.pdf = true
                    this.renicializarPdf += 1
                }else{
                   
                    if(this.relatorioEscolhaLista == 'Relatorios do Estoque'){
                        this.relatorioE = true
                    }else{
                        this.relatorio = true
                    }
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
            this.relatorioEscolhaModelo = null
            this.relatorioEscolhaLista = null // Escolha de uma das listas
            this.relatorioEscolha = ''
            this.closeRelatorio(false)
        },
        compareDates(){
            let inicio = this.makeValibleData(this.start, this.tmpIni)
            let fim = this.makeValibleData(this.end, this.tmpFina)
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
            return date;
        },
        validaDados(){
            if(this.relatorioEscolha == '' || this.relatorioEscolhaLista == null){
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
    components: { RespostaRelatorio, RespostaRelatorioEstoque, RelatorioPDF }
}
</script>

<style lang="scss" scoped>
    .btns{
        width: 20%;
    }
    .theme--dark input[type="date"]::-webkit-calendar-picker-indicator {
        background: url(https://img.icons8.com/cotton/64/000000/calendar.png) no-repeat;
        background-size: 24px 24px;
    }
    .theme--dark input[type="time"]::-webkit-calendar-picker-indicator {
        background: url(https://img.icons8.com/cotton/64/000000/clock.png) no-repeat;
        background-size: 24px 24px;
    }

</style>