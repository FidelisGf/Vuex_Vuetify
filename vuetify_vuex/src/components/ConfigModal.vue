<template>
    <div>
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            max-width="650"
            transition="dialog-bottom-transition"
            @keydown.escape="(dialog = false)"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="purple lighten-1"
                    class="ml-3"
                    dark
                    icon
                    @click="active = true" 
                >
                    <v-icon aria-hidden="false" dark color="grey lighten-2">mdi-cog</v-icon>
                </v-btn>
            </template>
            <v-skeleton-loader
            v-if="loading" class="black"  :loading="loading"  type="card"
            ></v-skeleton-loader>
            <v-card dark class="cardi" v-else>
                <v-sheet color="grey darken-3" :elevation="4">
                            <v-card-title >
                                <p>Configurações Gerais do Sistema</p>
                            </v-card-title>
                            <v-card-subtitle class="mt-n8">
                                <p class="ml-2">Tudo que for alterado aqui, afetará diretamente o sistema...</p>
                            </v-card-subtitle>
                </v-sheet>
                <v-card-text class="mt-2">
                    <v-row>
                        <v-col cols="4">
                            <small>Somente o dia é considerado nas datas !</small>
                            <v-switch
                                v-model="adiantamento"
                                label="Utilizar Adiantamento..."
                                color="teal accent-3"
                                hide-details
                            ></v-switch>
                        </v-col>
                       
                        <v-divider color="white" class="mt-2" vertical></v-divider>
                        <v-col cols="4" >
                            <small>Utiliza para atribuir comissão aos vendedores</small>
                            <v-switch
                                v-model="comissao"
                                label="Ativar comissões..."
                            
                                color="teal accent-3"
                                hide-details
                            ></v-switch>
                        </v-col>
                        <v-divider color="white" class="mt-2" vertical></v-divider>
                        <v-col cols="4" >
                            <small>Utilizar Tabela Virtual para relatorios</small>
                            <v-switch
                                v-model="tabelaVirtual"
                                label="Ativar Tabela Virtual no Relátorio"
                            
                                color="teal accent-3"
                                hide-details
                            ></v-switch>
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="4" >
                            <v-text-field
                                v-model="dtPagamentoSalario"
                                label="Data de Pagamento do Salário"
                                persistent-hint
                                required
                                color="teal lighten-1"
                                type="date"
                                dark
                            ></v-text-field>       
                        </v-col>
                        <v-divider vertical color="white" ></v-divider>
                        <v-col cols="4" >  
                            <v-text-field
                                v-if="comissao" 
                                v-model="porcentagemComissao"
                                label="Porcentagem da Comissão"
                                persistent-hint
                                required
                                placeholder="Valores entre 0.01 a 99.99"
                                max="99.99"
                                color="teal lighten-1"
                                type="number"
                                min="0.01"    
                            ></v-text-field>
                        </v-col>
                        <v-divider vertical color="white" ></v-divider>
                    </v-row>
                    <v-row>
                        <v-col cols="4" v-if="adiantamento">
                            <v-text-field
                                v-model="dtPagamentoAdiantamento"
                                label="Data de Pagamento do Adiantamento"
                                persistent-hint
                                required
                                color="teal lighten-1"
                                type="date"
                                dark
                            ></v-text-field>
                        </v-col>
                        <v-divider v-if="adiantamento" vertical color="white" ></v-divider>
                        <v-col cols="4">

                        </v-col>
                        <v-divider v-if="adiantamento" vertical color="white" ></v-divider>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-footer  fixed color="transparent">
                <v-row>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-alert
                            v-model="alert"
                            border="left"
                            close-text="Fechar"
                            color="green darken-3"
                            dark
                            dismissible
                            transition="scale-transition"
                        >
                           <span>{{msg}}</span>
                        </v-alert>
                    </v-col>
                    <v-col class="d-flex justify-end" v-if="!alert" >
                        <v-btn icon fab>
                            <v-icon x-large @click="dialog = false" color="red darken-2">
                                mdi-arrow-u-left-top-bold
                             </v-icon>
                        </v-btn>
                        <v-btn icon fab @click="setConfigs">
                            <v-icon x-large color="teal darken-2">
                               mdi-content-save
                             </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-footer>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data(){
        return {
            dialog : false,
            adiantamento : false,
            dtPagamentoSalario : '',
            dtPagamentoAdiantamento : '',
            comissao : false, 
            porcentagemComissao : 0.01,
            tabelaVirtual : false,
            alert: false,
            msg : '',
            loading : false,
            flag : false,
        }
    },
    methods:{
        ...mapActions('userMod', ['setAjustesFolha', 'showAjusteFolha']),
        ...mapActions('utilMod', ['setConfig', 'getConfig']),
        async openAjustes(){
            this.loading = true
            let obj = await this.showAjusteFolha()
            if(obj.DT_ADIANTAMENTO !== null && obj.DT_ADIANTAMENTO !== undefined){
                this.adiantamento = true
                this.dtPagamentoAdiantamento = this.formatDatas(obj.DT_ADIANTAMENTO) 
                console.log(this.dtPagamentoAdiantamento)
            }
            this.dtPagamentoSalario = this.formatDatas(obj.DT_SALARIO)
        },
        async setAjustes(){
            let compararData = this.comparaDatas(this.dtPagamentoSalario, this.dtPagamentoAdiantamento)
            if(!compararData){
                let payload = {DT_PAGAMENTO : this.dtPagamentoSalario, 
                    DT_ADIANTAMENTO : this.dtPagamentoAdiantamento, FLAG : this.adiantamento}
                let msg = await this.setAjustesFolha(payload)
                return msg
            }
        },
        formatDatas(obj){
            obj = new Date(obj).toLocaleDateString('en-CA');
            return obj
        },
        async setConfigs(){
            let payload = this.makePayload("Comissao", this.comissao, this.porcentagemComissao)
            let msg1 = await this.setConfig(payload)
            let payload2 = this.makePayload("Tabela_Virtual", this.tabelaVirtual, "1") 
            let msg2 = await this.setConfig(payload2)
            let msg3 = await this.setAjustes()
            this.msg = msg1 + "; " + msg2 + "; " + msg3
            this.alert = true
            console.log(this.msg)
        },
        async getConfigsGeneric(nome){
            let payload = this.makeGetPayload(nome)
            let data = await this.getConfig(payload)
            return data            
        },
        async getAllConfigs(){
            let porcentagemDt = await this.getConfigsGeneric("Comissao")
            this.comissao = porcentagemDt.ESTADO 
            this.porcentagemComissao = parseFloat(porcentagemDt.PARAMETRO) 
            let tabelaDt = await this.getConfigsGeneric("Tabela_Virtual")
            this.tabelaVirtual = tabelaDt.ESTADO
        },
        makePayload(nome, estado, parametro){
            let payload = {ESTADO : estado, 
                PARAMETRO : parametro, NOME : nome}
            return payload
        },
        makeGetPayload(nome){
            let payload = {NOME : nome}
            return payload
        },
        comparaDatas(obj1, obj2){
         return obj1 == obj2 ? true : false 
        }

    },
    watch: {
        adiantamento: function (val) {
            if (val == false) {
                this.dtPagamentoAdiantamento = '';
            }
            this.adiantamento = val;
        },
        porcentagemComissao : function(val){
            if(val <= 0 || val == '' || val == null){
                this.porcentagemComissao = 0.01
            }
            if(val >= 99.99){
                this.porcentagemComissao = 99.99
            }
        },
        dialog : function(val) {
            if(val == true && this.flag == false){
                this.openAjustes()
                this.getAllConfigs()
                this.loading = false
                this.flag = true
            }
        }
    
    },
}
</script>

<style lang="scss" scoped>
#linha-vertical {
    height: 200px;
    border-right: 1px solid red;
}
.footer{
    height: 100%; 
}

</style>