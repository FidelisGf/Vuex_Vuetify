<template>
    <div>
        <v-skeleton-loader
            v-if="loading" class="black" :loading="loading" transition="fade-transition" type="card"
        >
        </v-skeleton-loader>
        <v-card class="cards-colors" :elevation="6" v-else>
            <v-card-actions>
                <v-btn
                    icon 
                    dark 
                    class="mt-n1 ml-n1"
                    @click="close"
                ><v-icon color="red accent-2 " >mdi-close</v-icon></v-btn>
            </v-card-actions>
            <v-card-title class="white--text text-sm-h5 text-body-1  mt-n4">
                <p class="pl-0 pl-md-5">Detalhes do Usuario : # {{usuario.NAME}} [{{usuario.ID}}] </p>
            </v-card-title>
            <v-card-text class="mt-n7">
                <v-row class="d-flex flex-column flex-md-row pl-5 pl-md-10">
                    <v-col class="white--text  text-subtitle-1 text-md-h6  font-italic">
                        <p>
                            <b class="font-italic titulo  pt-1">Email : </b>{{usuario.EMAIL}}...
                        </p>
                      
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column flex-md-row mt-n5 pl-5 pl-md-10">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo  pt-1">Cpf : </b> {{usuario.CPF}}
                        </p>
                    </v-col>
                </v-row> 
                <v-row class="d-flex flex-column flex-md-row mt-n5 pl-5 pl-md-10">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo pt-1">Cargo : </b> {{cargo.NOME}}
                        </p>
                    </v-col>
                </v-row>   
                <v-row class="d-flex flex-column flex-md-row mt-n5 pl-5 pl-md-10">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo pt-1">Salário : R$</b> {{usuario.SALARIO.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                        </p>
                    </v-col>
                </v-row>   
                <v-row class="d-flex flex-column flex-md-row mt-n5 pl-5 pl-md-10">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5 d-flex flex-row">
                        <p>
                            <b class="font-italic titulo pt-1">Penalidades Tomadas : </b> 
                            {{qntdPenalidades}}
                        </p> 
                        <v-btn icon class="ml-2" @click="getPenalidades">
                            <v-icon v-if="!$vuetify.breakpoint.smAndDown"  
                            color="grey lighten-2">mdi-magnify-expand</v-icon>
                            <v-icon v-else small class="ml-n2 mt-n2" 
                            color="grey lighten-2">mdi-magnify-expand</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>  
                <v-row class="d-flex flex-column flex-md-row mt-n5 pl-5 pl-md-10">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5 d-flex flex-row">
                        <p>
                            <b class="font-italic titulo  pt-1">Vendas Realizadas : </b>{{qntdVendas}}
                        </p>
                        <v-btn icon class="ml-2" @click="getVendasByUser">
                            <v-icon v-if="!$vuetify.breakpoint.smAndDown"  
                            color="grey lighten-2">mdi-magnify-expand</v-icon>
                            <v-icon v-else small class="ml-n2 mt-n2" 
                            color="grey lighten-2">mdi-magnify-expand</v-icon>
                        </v-btn>
                    </v-col>
                </v-row> 
                <v-row class="d-flex flex-column flex-md-row mt-n5 pl-5 pl-md-10">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5">
                        <p>
                            <b class="font-italic titulo pt-1">Total Vendido : </b>{{totalVendido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                        </p>
                    </v-col> 
                </v-row> 
                <v-row class="d-flex flex-column flex-md-row mt-n5 pl-5 pl-md-10">
                    <v-col class="white--text text-subtitle-1 text-md-h6 font-italic mt-n5 d-flex flex-row">
                        <p>
                            <b class="font-italic titulo pt-1">Historico Salarial</b>
                        </p>
                        <v-btn icon class="ml-2" @click="getHistorico">
                            <v-icon v-if="!$vuetify.breakpoint.smAndDown"  
                            color="grey lighten-2">mdi-magnify-expand</v-icon>
                            <v-icon v-else small class="ml-n2 mt-n2" 
                            color="grey lighten-2">mdi-magnify-expand</v-icon>
                        </v-btn>
                    </v-col> 
                </v-row>
                <v-row class="mt-n3 ml-0 ml-md-8">
                    <v-col cols="11" >
                        <div class="d-flex justify-center mt-n2">
                            <v-divider class="linha" ></v-divider>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="d-flex flex-column flex-md-row mt-n2 justify-lg-start">
                    <v-col class="white--text text-subtitle-1  font-italic mt-n2">
                        <v-timeline>
                            <v-timeline-item color="blue accent-2" 
                                class="text-body-1 text-md-subtitle-1"
                                fill-dot
                                small
                            >
                                Criado em : {{usuario.CREATED_AT}}
                            </v-timeline-item>
                            <v-timeline-item 
                                class="text-right text-body-1 text-md-subtitle-1" 
                                fill-dot small color="teal accent-3" 
                            >
                                Atualizado em : {{usuario.UPDATED_AT}}
                            </v-timeline-item>
                        </v-timeline>
                    </v-col>
                </v-row>    
            </v-card-text>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="620px"
                @keydown.escape="dialog = false"
            >   
                <v-card class="cards-colors" :elevation="6">
                    <v-card-actions class="d-flex justify-start ml-n2 ">
                        <v-btn @click="(dialog = false)" icon color="red accent-2">
                            <v-icon color="red accent-2">mdi-close</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-title class="white--text mt-n3" >
                        <p>Penalidades aplicadas</p>
                    </v-card-title>
                    <v-card-subtitle>
                        <p class="font-italic titulo pt-1 white--text">Total de Desconto esse Mês : {{totalDescontoPenalidade.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</p>
                    </v-card-subtitle>
                    <v-card-text>
                        <v-row class="d-flex flex-column white--text ml-0 ml-md-5" v-for="item in penalidades" :key="item.ID">
                            <v-col cols="11" >
                                <div class="d-flex justify-center mt-n2">
                                    <v-divider class="linha" ></v-divider>
                                    <DeleteGeneric @atualizar="deletePenal" class="mt-n3" :id="item.ID" small :route="'penalidades'"></DeleteGeneric>  
                                </div>
                            </v-col>
                            <v-col class="mt-n3">
                                <p class="font-italic text-subtitle-1"><b>Codigo da Penalidade : #{{item.ID}} </b></p>
                            </v-col>
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Tipo da Penalidade : {{item.TIPO}}</b> </p>
                            </v-col>
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Descrição da Penalidade : {{item.DESC}}</b></p>
                            </v-col>
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Desconto no salário : R$ {{item.DESCONTO.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</b> </p>
                            </v-col>
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Data da Penalidade : {{formatDate( item.DATA)}}</b> </p>
                            </v-col>
                            
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="dialogVendas"
                persistent
                max-width="620px"
                @keydown.escape="(dialogVendas = false)"
            >   
                <v-card class="cards-colors" :elevation="6">
                    <v-card-actions class="d-flex justify-start ml-n2 ">
                        <v-btn @click="(dialogVendas = false)" icon color="red accent-2">
                            <v-icon color="red accent-2">mdi-close</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-title class="white--text mt-n3" >
                        <p>Vendas Realizadas</p>
                    </v-card-title>
                    <v-card-subtitle>
                       
                        <p>
                            <b class="font-italic titulo pt-1">Media de Venda no ano : 
                                {{mediaValorAno.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                            </b>
                        </p>
                        <p>
                            <b class="font-italic titulo pt-1">Total Vendido Nesse Mês :  
                            {{totalVendaMes.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</b>
                        </p>
                        
                       
                    </v-card-subtitle>
                    <v-card-text>
                        <v-row class="d-flex flex-column white--text ml-0 ml-md-5" v-for="item in pedidos" :key="item.ID">
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Codigo do Pedido : #{{item.ID}} </b></p>
                            </v-col>
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Valor da Venda : R$ {{item.VALOR_TOTAL.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}</b> </p>
                            </v-col>
                            <v-col>
                                <p class="font-italic text-subtitle-1"><b>Data do Pagamento : {{formatDate(item.DT_PAGAMENTO)}}</b> </p>
                            </v-col>
                            <v-col cols="11" >
                                <div class="d-flex justify-center mt-n2">
                                    <v-divider class="linha" ></v-divider>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="dialogHistorico"
                persistent
                max-width="620px"
                @keydown.escape="(dialogHistorico = false)"
            >   
                <v-card class="cards-colors" :elevation="6">
                    <v-card-actions class="d-flex justify-start ml-n2 ">
                        <v-btn @click="(dialogHistorico = false)" icon color="red accent-2">
                            <v-icon color="red accent-2">mdi-close</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-card-title class="white--text mt-n3" >
                        <p>Historico Salarial</p>
                    </v-card-title>
                    <v-card-subtitle>
                        <p>
                            <b class="font-italic titulo pt-1">Salario Atual : 
                               R$ {{usuario.SALARIO.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                            </b>
                        </p>
                    </v-card-subtitle>
                    <v-card-text>
                        <v-sheet color="rgba(0, 0, 0, .12)">
                            <v-sparkline
                              :value="historicoSalarios"
                              color="rgba(255, 255, 255, .7)"
                              height="100"
                              padding="24"
                              stroke-linecap="round"
                              smooth
                            >
                              <template v-slot:label="item">
                                R${{ item.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}
                              </template>
                            </v-sparkline>
                          </v-sheet>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DeleteGeneric from '../Delete/DeleteGeneric.vue';
export default {
    data() {
        return {
            usuario: null,
            qntdVendas: 0,
            qntdPenalidades: 0,
            totalVendido: 0,
            totalVendaMes: 0,
            totalDescontoPenalidade: 0,
            dialogVendas: false,
            cargo: "",
            loading: false,
            dialogHistorico: false,
            dialog: false,
            penalidades: [],
            historicoSalarios: [],
            mediaValorAno: 0,
            pedidos: [],
        };
    },
    methods: {
        ...mapActions("userMod", ["showUser", "getPenalidade", "getVendasUser", "getUserMediaVendasAno", "getTotalVendasMes", "getHistoricoSalarios"]),
        ...mapActions("penalidadeMod", ["getTotalDescontoMes", "deletePenalidade"]),
        async getUser() {
            let data = await this.showUser(this.generico.ID);
            this.usuario = data.usuario;
            this.qntdVendas = data.qntdVendas;
            this.qntdPenalidades = data.qntdPenalidades;
            this.cargo = data.cargo;
            this.totalVendido = data.totalVendido;
            if (this.usuario != null || this.usuario != undefined) {
                this.usuario.CREATED_AT = await this.formatDate(this.usuario.CREATED_AT);
                this.usuario.UPDATED_AT = await this.formatDate(this.usuario.UPDATED_AT);
                this.loading = false;
            }
        },
        async deletePenal(e) {
            this.loading = e;
            this.dialog = false;
            this.penalidades = await this.getPenalidade(this.generico.ID);
            this.totalDescontoPenalidade = await this.getTotalDescontoMes(this.generico.ID);
            this.loading = false;
            this.dialog = true;
        },
        clear() {
            this.produto = null;
            this.getUser();
        },
        close() {
            this.$emit("close", false);
        },
        formatDate(data) {
            data = new Date(data);
            return data.toLocaleString();
        },
        async getPenalidades() {
            this.loading = true;
            this.penalidades = await this.getPenalidade(this.generico.ID);
            this.totalDescontoPenalidade = await this.getTotalDescontoMes(this.generico.ID);
            this.dialog = true;
            this.loading = false;
        },
        async getHistorico() {
            this.loading = true;
            this.historicoSalarios = await this.getHistoricoSalarios(this.generico.ID);
            console.log(this.historicoSalarios);
            this.loading = false;
            this.dialogHistorico = true;
        },
        async getVendasByUser() {
            this.loading = true;
            this.pedidos = await this.getVendasUser(this.generico.ID);
            this.mediaValorAno = await this.getUserMediaVendasAno(this.generico.ID);
            this.totalVendaMes = await this.getTotalVendasMes(this.generico.ID);
            this.dialogVendas = true;
            this.loading = false;
        },
    },
    computed: {
        ...mapGetters({ generico: "utilMod/getGenerico" })
    },
    watch: {
        generico: function (val) {
            if (val) {
                this.loading = true;
                this.clear();
            }
            this.generico = val;
        }
    },
    created() {
        this.getUser();
    },
    components: { DeleteGeneric }
}
</script>

<style lang="scss" scoped>
    .titulo{
        color: #c5c3c3 !important;
    }
    .linha{
        background-color: #BDBDBD !important;
    }
</style>