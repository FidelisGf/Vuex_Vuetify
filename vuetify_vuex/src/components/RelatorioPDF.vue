<template>
    <div>

    </div>
</template>

<script>
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { mapActions, mapGetters } from 'vuex'
export default {
    props:{
        nomeRelatorio: String,
        starterDate : String,
        endDate : String,
        filtro : String,
        notTable : Boolean,
        route : String,
        columns : Array
    },
    computed: {
        ...mapGetters({itens : 'utilMod/getListaItens', empresaUser : 'userMod/getEmpresa'}),
    },
    methods:{
        ...mapActions('utilMod', ['setListaItens']),
        ...mapActions('userMod', ['getEmpresaFromUser']),
        async down(){
            let payload = {route : this.route, 
                opcao : this.filtro, 
                dtStart : this.starterDate, 
                dtFinal : this.endDate, 
                pdf : 'T'}
            await this.setListaItens(payload)
            let pdf = new jsPDF()
            let values = this.itens
            if(this.filtro != 'Lucros e Gastos por dias'){
                console.log('Entrou aqui')
                values = this.toCurrency(values)
                values = values.map( (elemento) => Object.values(elemento));
            }
            console.log(this.itens)
            pdf.setFontSize(26)
            pdf.text(this.empresaUser.NOME + ' Relatorio'  , 15, 15)
            pdf.setFontSize(10)
            pdf.text('CNPJ :  ' + this.empresaUser.CNPJ, 15, 22)
            pdf.text('ENDEREÇO : '  + this.empresaUser.ENDERECO, 70, 22)
            pdf.text('EMAIL : ' + this.empresaUser.EMAIL, 140, 22)
            pdf.setFontSize(26)
            pdf.text('-------------------------------------------------------------------', 2, 28)
            pdf.setFontSize(22)
            pdf.text("Relatorio : " + this.filtro, 15, 35)
            pdf.setFontSize(10);
            if(this.starterDate != undefined || this.starterDate != null){
                pdf.text("Data Inicial : " + this.convertStartandEndDates(this.starterDate) + "  Data Final : " + this.convertStartandEndDates(this.endDate), 20, 42)
            }
            if(this.columns != undefined || this.columns != null){
                autoTable(pdf,
                {
                    startY: 46,
                    cellWidth: 'auto',
                    headStyles: {fillColor: [128,128,128]},
                    styles: { fillColor: [211, 211, 211], overflow: 'linebreak' },
                    theme : 'striped',
                    margin: { top: 10 },
                    head: [this.columns],
                    body: values,
                }) 
            }
            if(this.route == 'vendas'){
                if(this.filtro == 'Lucros e Gastos por dias'){
                    console.log('Entrou no filtro ! ')
                    let gastosMaterial = this.subTraiGastos(this.itens.Lucro_Vendas, this.itens.Total)
                    this.itens.Despesas = parseFloat(this.itens.Despesas)
                    pdf.text('Total de Vendas : ' + this.itens.Total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 20, 50)
                    pdf.text('Total de Lucros nas Vendas : ' + this.itens.Lucro_Vendas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 95, 50)
                    pdf.text('Total de gastos com Despesa : ' + this.itens.Despesas.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 20, 58)
                    pdf.text('Total de gastos com Material : ' + gastosMaterial.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) , 95, 58 )
                    if(this.itens.Saldo_Final < 0 ){
                        pdf.setTextColor(225,51,36)
                    }
                    pdf.text('Saldo Final : ' + this.itens.Saldo_Final.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 20, 68 )
                }else{
                    pdf.text('Valor Total : ' + this.itens.vlTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 20, 150)
                    pdf.text('Lucros : ' + this.itens.vlReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 65, 150)
                    pdf.text('Gastos : ' + this.itens.vlDiff.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}), 105, 150)
                }
            }
            pdf.save('relatorio_' +  this.filtro + '.pdf'); 
        },
        toCurrency(values){
            values.forEach(element => {
                if(this.route == 'products' || this.route == 'estoques'){
                    element.VALOR = element.VALOR.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                }else if (this.route != 'despesas'){
                    element.VALOR_TOTAL = element.VALOR_TOTAL.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                }else{
                    element.CUSTO = element.CUSTO.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                }   
            });
            return values
        },
        subTraiGastos(a,b){
            let result = 0
            if(a > b){
               result = a - b
            }else{
                result = b - a
            }
            return result
        },
        convertStartandEndDates(data){
            data = new Date()
            return data.toLocaleString()
        }
    },

    async created(){
        await this.getEmpresaFromUser()
        this.down()
    }
}
</script>

<style lang="scss" scoped>

</style>