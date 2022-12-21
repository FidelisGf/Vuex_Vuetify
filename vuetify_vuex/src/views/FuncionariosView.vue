<template>
    <v-container fluid grid-list-md v-if="(userLevel > 3)">
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
        <v-row class="d-flex mt-11 mt-lg-0 justify-center justify-lg-start  ">
            <v-col cols="12" lg="4" md="4" class="d-flex justify-center" >
                <FuncionarioModal @Cadastrado="attLista" :mini="false"></FuncionarioModal></v-col>
            <v-col cols="12" lg="4" md="4" class="d-flex justify-center" >
               <PenalidadeModal @Cadastrado="setMsg"></PenalidadeModal>
            </v-col>
            <v-col 
            cols="12" 
            md="4" 
            lg="4"  
            class="pl-sm-0 mt-2 mt-md-2 mt-lg-2 
                    d-flex  
                   justify-center ml-0 ml-sm-0 "
            >
                <v-sheet
                    color="cyan lighten-5"
                    elevation="8"
                    height="57px"
                    width="200px"
                    class="exibeGasto ml-lg-10 ml-md-3  mt-n5 "
                >
                    <p style="font-size: 16px;" class="ml-5 mt-1 font-weight-medium">
                        <v-icon small class="ml-n4 mt-n3" color="teal lighten-1">mdi-checkbox-marked-circle
                        </v-icon>
                        Funcionarios Ativos
                    </p>
                    <p style="font-size : 14px;" class="mt-n4 ml-7 font-weight-bold">
                        Quantidade : {{count}}
                    </p>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="4" md="4" class="d-flex justify-center">
                <v-btn text color="teal accent-2" class="ml-1  font-weight-medium"
                 @click="chooseFolha">
                    <v-icon
                        
                        class="ml-1"
                    >
                        mdi-cloud-download
                    </v-icon> 
                    <span class="ml-2">Baixar Folha Salarial</span>   
                </v-btn>
            </v-col>
            <v-col cols="12" lg="4" md="4" class="d-flex justify-center">
                <v-btn text color="indigo accent-1" class="ml-1  font-weight-medium" @click="listPayments = true">
                    <v-icon
                        class="ml-1"
                    >
                        mdi-list-box
                    </v-icon> 
                    <span class="ml-2">Ver Salarios Pagos</span>
                    
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
           <v-dialog
                v-model="chooseModal"
                persistent
                max-width="400"
                @keydown.escape="chooseModal = false"
           >
                <v-card dark>
                    <v-card-actions>
                        <v-icon small  class="ml-n2 " color="red accent-2" @click="chooseModal = false">
                            mdi-close
                        </v-icon>
                    </v-card-actions>
                    <v-card-title class="mt-n5">
                        <span v-if="!folhabaixada">Escolha a Folha salarial... </span>
                        <span v-else class="text-subtitle-1">Deseja Marcar como paga essa folha ?</span>   
                    </v-card-title>
                    <v-card-text class="mt-2">
                            <v-row class="d-flex justify-center" v-if="!folhabaixada">
                                <v-col cols="12" class="d-flex justify-center">
                                    <v-btn  text color="indigo lighten-3" @click="setFolha('Adiantamento')">
                                        <v-icon
                                            class="ml-1"
                                        >
                                            mdi-cloud-download
                                        </v-icon> 
                                        <span class="ml-2">Folha Adiantamento</span>
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-center">
                                     
                                        <v-btn @click="setFolha('Salario')"  text color="indigo lighten-2">
                                            <v-icon
                                                class="ml-1"
                                            >
                                                mdi-cloud-download
                                            </v-icon> 
                                            <span class="ml-2">Folha Salário</span>
                                        </v-btn>
                                </v-col>
                            </v-row>
                            <v-row v-else>
                                <v-col cols="12" class="d-flex justify-center">
                                    <v-btn text @click="pagarFolha" color="indigo lighten-2">
                                        Marcar {{this.escolhaFolha}} como Pago
                                    </v-btn>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-center" >
                                    <v-btn text @click="chooseModal = false" color="red lighten-2">
                                        Cancelar
                                    </v-btn>
                                </v-col>
                            </v-row>
                    </v-card-text>
                </v-card>
           </v-dialog>
        </v-row>
        <v-row>
            <v-dialog
                v-model="listPayments"
                persistent
                max-width="720"
                @keydown.escape="closePayment"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
                <v-card dark>
                    <v-card-actions>
                        <v-icon small  class="ml-n2 " color="red accent-2" @click="closePayment">mdi-close</v-icon>
                    </v-card-actions>
                    <v-card-title>
                        Lista de Pagamentos Realizados... 
                    </v-card-title>
                    <v-card-text>
                        <ListaGenerica v-if="listPayments" @deletedPenalidade="setMsg" :key="renicializar" 
                        :route="'pagamentos'" :headers="headersPayment"></ListaGenerica>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-row>
        <v-row class="d-flex justify-center mt-10">
            <ListaGenerica @deletedPenalidade="setMsg" :key="renicializar" 
            :route="'usuarios'" :headers="headers"></ListaGenerica>
        </v-row>
    </v-container>
</template>

<script>
import ListaGenerica from '@/components/ListaGenerica.vue';
import FuncionarioModal from '@/components/ModalComponents/FuncionarioModal.vue';
import PenalidadeModal from '@/components/ModalComponents/PenalidadeModal.vue';
import { mapActions, mapGetters } from 'vuex';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
    data(){
        return{
            registro : false,
            timeout : 2000,
            msg : '',
            count : 0,
            renicializar : 0,
            columns : ['CODIGO', 'NOME', 'CPF', 'DESCONTOS', 'SALARIO_BASE', 'A RECEBER'],
            active : false,
            loading : false,
            escolhaFolha : null,
            filtroTmp : null,
            folhabaixada : false,
            chooseModal : false,
            listPayments : false, 
        }
    },
    components: { FuncionarioModal, ListaGenerica, PenalidadeModal },
    methods:{
        ...mapActions('userMod', ['getActiveUsers', 'getEmpresaFromUser', 'getFolhaSalario', 
        'setAjustesFolha', 'showAjusteFolha', 'pagarFuncionarios', 'checkIfSalario']),
        async setCountAtivos(){
            this.count = await this.getActiveUsers()
        },
        async attLista(e){
            this.count = await this.getActiveUsers()
            this.renicializar += 1
            this.msg = e
            this.registro = true
        },
        setMsg(e){
            this.msg = e
            this.registro = true
        },
        clearFiltros(){
          this.filtroTmp = null
          this.escolhaFolha = null  
          this.folhabaixada = false
          this.chooseModal = false
        },
        closePayment(){
            this.listPayments = false 
            this.renicializar += 1
        },
        async chooseFolha(){
            let obj = await this.showAjusteFolha()
            if(obj.DT_ADIANTAMENTO !== null){
                this.chooseModal = true
            }else{
                this.filtroTmp = "SALARIO"
                this.folhabaixada = true
                this.chooseModal = true 
                this.downLoadFolhaSalario("Salario")
            }
        },
        async pagarFolha(){
            let flag = false
            if(this.filtroTmp != null){
                this.escolhaFolha = this.filtroTmp
                flag = true
            }
            let pay = {TIPO : this.escolhaFolha}
            const check = await this.checkIfSalario(pay)
            console.log(check)
            if(!check){
               let payload = {TIPO : this.escolhaFolha, FLAG : flag}
               this.msg = await this.pagarFuncionarios(payload)
               this.registro = true
            }else{
               this.msg = "Folha " + this.escolhaFolha + " já foi paga nesse mês"
               this.registro = true
            }
            this.clearFiltros()
        },
        async setFolha(filtro){
            this.escolhaFolha = filtro
            this.downLoadFolhaSalario(filtro)
            this.folhabaixada = true
        },
        async downLoadFolhaSalario(filtro){
            let flag = false
            let pdf = new jsPDF()
            if(this.filtroTmp != null){
                flag = true
            }
            let payload = {FILTRO : filtro, FLAG : flag}
            let values = await this.getFolhaSalario(payload)
            let valorTotal = values.vlTotal
            values = values.data.map( (elemento) => Object.values(elemento));
            const nameOfMonth = new Date().toLocaleString(
                'default', {month: 'long'}
            );
            pdf.setFontSize(26)
            pdf.text(this.empresaUser.NOME + ' Relatorio'  , 15, 15)
            pdf.setFontSize(10)
            pdf.text('CNPJ :  ' + this.empresaUser.CNPJ, 15, 22)
            pdf.text('ENDEREÇO : '  + this.empresaUser.ENDERECO, 70, 22)
            pdf.text('EMAIL : ' + this.empresaUser.EMAIL, 140, 22)
            pdf.setFontSize(26)
            pdf.text('-------------------------------------------------------------------', 2, 28)
            pdf.setFontSize(22)
            pdf.text("Relatorio : Folha " + filtro + " de" + " " + nameOfMonth, 15, 35)
            pdf.setFontSize(10);
            pdf.text("Sempre utilize como base a coluna : A RECEBER ", 15, 42)
            pdf.text("Valor Total da Folha  R$ " + valorTotal.toFixed(2), 15, 48)
            if(this.columns != undefined || this.columns != null){
                autoTable(pdf,
                {
                    startY: 50,
                    cellWidth: 'auto',
                    headStyles: {fillColor: [128,128,128]},
                    styles: { fillColor: [211, 211, 211], overflow: 'linebreak' },
                    theme : 'striped',
                    margin: { top: 10 },
                    head: [this.columns],
                    body: values,
                }) 
            }
            pdf.save('FolhaSalarial'); 
        },
    },
    watch: {
        adiantamento: function (val) {
            if (val == false) {
                this.dtPagamentoAdiantamento = '';
            }
            this.adiantamento = val;
        }
    },
    async created() {
        this.setCountAtivos()
        await this.getEmpresaFromUser()
    },
    computed:{
        headers() {
            return [
                { text: "Detalhes", value: "info", sortable: false },
                { text: "Cod", value: "ID",},
                {
                    text: "Nome",
                    value: "NAME",
                },
                { text: "Email", value: "EMAIL" },
                { text: "Cpf", value: "CPF" },
                { text: "Cargo", value: "role.NOME" },
                { text: "Actions", value: "actions", sortable: false },
            ];
        },
        ...mapGetters({ userLevel: "userMod/getUserLevel", empresaUser : 'userMod/getEmpresa' }),
        headersPayment() {
            return [
                { text: "Cod", value: "ID",},
                {
                    text: "Valor Pago",
                    value: "VALOR_PAGO",
                },
                { text: "Tipo", value: "TIPO" },
                { text: "Data", value: "DATA" },
                { text: "Actions", value: "actions", sortable: false },
            ];
        },
    }
    
}
</script>

<style lang="scss" scoped>
    .theme--dark input[type="date"]::-webkit-calendar-picker-indicator {
    background: url(https://img.icons8.com/cotton/64/000000/calendar.png) no-repeat !important;
    background-size: 24px 24px !important;
}
    .theme--dark input[type="time"]::-webkit-calendar-picker-indicator {
    background: url(https://img.icons8.com/cotton/64/000000/clock.png) no-repeat !important;
    background-size: 24px 24px !important;
    }
    .exibeGasto{
        border-color: aqua !important;
        box-shadow: 0px 2px 10px 2px #96f5f0 !important;
        border-radius: 10px !important;

    }
    .cards-colors{
        background-color: rgb(48, 48, 48) !important;
    }
    .exibeGasto:hover{
        transform: translate(2px, -2.10px);
        transition: 1.5s;
        box-shadow: 0px 2px 35px 2px #505050 !important;
    }
    .exibeGasto:hover::after{
        transform: translate(2px, +2.10px);
        transition: 1.5s;
        box-shadow: 2px 2px 25px 2px #09d163 !important;
    }
</style>