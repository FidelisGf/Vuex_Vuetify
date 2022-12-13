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
            <v-col cols="12" lg="4" md="4" class="d-flex justify-center" ><FuncionarioModal @Cadastrado="attLista" :mini="false"></FuncionarioModal></v-col>
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
                    <p style="font-size: 16px;" class="ml-5 mt-1 font-weight-medium"><v-icon small class="ml-n4 mt-n3" color="teal lighten-1">mdi-checkbox-marked-circle</v-icon>Funcionarios Ativos</p>
                    <p style="font-size : 14px;" class="mt-n4 ml-7 font-weight-bold">Quantidade : {{count}}</p>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="4" md="4" class="d-flex justify-center">
                <v-btn text color="teal accent-2" @click="downLoadFolhaSalario">
                    <v-icon
                        left
                        
                    >
                        mdi-cloud-download
                    </v-icon> 
                    Baixar Folha Salarial
                    
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center mt-10">
            <ListaGenerica @deletedPenalidade="setMsg" :key="renicializar" :route="'usuarios'" :headers="headers"></ListaGenerica>
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
            columns : ['CODIGO', 'NOME', 'CPF', 'DESCONTOS', 'SALARIO_BASE', 'SALARIO_FINAL']
        }
    },
    components: { FuncionarioModal, ListaGenerica, PenalidadeModal },
    methods:{
        ...mapActions('userMod', ['getActiveUsers', 'getEmpresaFromUser', 'getFolhaSalario']),
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
        async downLoadFolhaSalario(){
            
            let pdf = new jsPDF()
            let values = await this.getFolhaSalario()
            values = values.map( (elemento) => Object.values(elemento));
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
            pdf.text("Relatorio : Folha Salarial de" + " " + nameOfMonth, 15, 35)
            pdf.setFontSize(10);
            pdf.text("Sempre utilize como base a coluna : SALARIO_FINAL ", 15, 42)
            if(this.columns != undefined || this.columns != null){
                autoTable(pdf,
                {
                    startY: 48,
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
    }
    
}
</script>

<style lang="scss" scoped>
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