<template>
    <v-container fluid grid-list-md>
        <v-row dense>
            <v-col cols="12">
                <v-card
                color="#f2f2f2"
                dark
                class="elevation-5"
                >
                    <v-card-actions class="ml-3">
                        <v-btn color="#3e3e3c" @click="down">
                            Download
                        </v-btn>
                    </v-card-actions>
              </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import jsPdf from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {

   methods : {
        down(){
            let data = [{id : 1, nome : 'Gabriel', valor: '25,00', quantidade : '25'},
                        {id : 2, nome : 'Felipe',  valor : '45,00', quantidade : '35'}]
            let id = 43
            let Nome_Empresa = 'Anabel Personalizados'
            let pdf = new jsPdf()
            let values = data.map( (elemento) => Object.values(elemento));
            pdf.setFontSize(26);
            pdf.text(Nome_Empresa + ' Pedido #' + ' ' +  id, 10, 20)
            pdf.text('-------------------------------------------------------------------', 2, 26)
            pdf.setFontSize(12);
            pdf.text('Codigo do Pedido : 43', 15, 35)
            pdf.text('Forma de Pagamento : Dinheiro', 80, 35)
            pdf.text('Valor Total : R$ 45', 160,35)
            pdf.text('Produtos do Pedido : ', 15, 50)
            pdf.setFontSize(10);
            autoTable(pdf,
            {
                startY: 60,
                cellWidth: 'auto',
                headStyles: {fillColor: [128,128,128]},
                styles: { fillColor: [211, 211, 211] },
                theme : 'striped',
                margin: { top: 10 },
                head: [['ID', 'NOME', 'VALOR', 'QUANTIDADE']],
                body: values,
            })  
            pdf.save('orcamento.pdf'); 
        }
   }
}
</script>

<style lang="scss" scoped>

</style>