<template>
    <v-container fluid grid-list-md>
        <v-row class="d-flex flex-md-row flex-lg-row flex-column align-center ">
            <v-col cols="11" lg="2" md="2"><DespesaModal class="mt-0 mt-md-1"></DespesaModal></v-col>
            <v-col cols="11" lg="3" md="3"><TagModal class="mt-0 mt-md-1" ></TagModal></v-col>
            <v-col cols="10" sm="10" lg="3" md="3">
                
                
                <v-btn
                    color="teal accent-1"
                    class=" ml-n0 mt-5 mt-md-1 ml-sm-n3 ml-lg-n0  ml-md-n0 font-weight-medium"
                    dark
                   
                    text
                    >
                    <v-icon  dark color="teal accent-1" left>mdi-calendar</v-icon>
                            Ver despesas por data
                </v-btn>
            </v-col>
            <v-spacer v-if="!$vuetify.breakpoint.smAndDown" ></v-spacer>
            <v-col cols="10" sm="10" xs="2" md="2" lg="3">
                <v-sheet
                    color="cyan lighten-5"
                    elevation="8"
                    height="55px"
                    width="170px"
                    class="mt-md-n3 mt-0   exibeGasto"

                >
                    <p style="font-size: 16px;" class="ml-2 mt-4 font-weight-bold">Despesas do Mês</p>
                    <p class="mt-n4 ml-10 font-weight-bold">{{this.despesaVl}}</p>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <ListaGenerica :route="'despesas'"></ListaGenerica>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ListaGenerica from '@/components/ListaGenerica.vue';
import DespesaModal from '@/components/ModalComponents/DespesaModal.vue';
import TagModal from '@/components/ModalComponents/TagModal.vue';
import {mapActions} from 'vuex';
export default {
    data() {
        return {
            finalDateStart : '',
            finalDateEnd : '',
            op : null,
            despesaVl : 0,
        };
    },
    methods: {
        ...mapActions("tagMod", ['findAll']),
        ...mapActions('utilMod', ['setHeader']),
        ...mapActions('despesaMod', ['despesasMes'])
    },
    computed: {
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
        }
    },
    async created(){
        await this.findAll()
        this.setHeader(this.headers)
        this.despesaVl = await this.despesasMes()
        this.despesaVl = this.despesaVl.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
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