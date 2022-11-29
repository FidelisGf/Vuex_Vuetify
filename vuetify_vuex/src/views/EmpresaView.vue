<template>
    <v-container fluid grid-list-md>
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
        <v-row dense class="mt-12 mt-lg-0">
            <v-col cols="12" v-if="showEmpresa">
                <v-card
                
                dark
                class="elevation-5"
                >
                    <v-card-title class="ml-2 text-h4 white--text ">
                        {{data.NOME}} <v-icon v-if="userLevel > 3" @click="openCadFuncionario"  large color="teal accent-2" class="ml-5">mdi-account-plus</v-icon>
                    </v-card-title>
                    <v-card-text class="ml-3 white--text text-body-1">
                        <p >CNPJ : {{data.CNPJ}}</p>
                   
                        <p >Email : {{data.EMAIL}}}</p>
                            
                        <p >Nome Fantasia : {{data.NOME_FANTASIA}}</p>
                        <p>Endereço da Empresa : {{data.ENDERECO}}</p>
                             
                        <p>Inscrição Estadual : {{data.INC_ESTADUAL}}</p>
                        
                    </v-card-text>  
                    <v-card-text>
                        <v-row>
                            <v-col class="d-flex justify-center">
                                <div class="grafico ">
                                    <p class="text-subtitle-1 font-italic white--text titulo-grafico">Grafico vendas do dia (Miníma, Média, Máxima, Total Recebido) até as 23h:00min. Quantidade de vendas hoje : {{qntd}}</p>
                                    <v-sheet color="#1e1e1e">
                                        <v-sparkline
                                          :value="values"
                                          color="green accent-2"
                                          height="80"
                                          smooth="10"
                                          padding="20"
                                          stroke-linecap="round"
                                          auto-draw
                                          :auto-draw-duration="4000"
                                        >
                                        <template v-slot:label="item">
                                            {{parseFloat(item.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                                        </template>
                                        </v-sparkline>
                                      
                                    </v-sheet>
                                </div>
                                
                            </v-col>
                        </v-row>
                    </v-card-text> 
                    <v-card-text>
                        <v-row>
                            <v-col class="d-flex justify-center">
                                <div class="grafico ">
                                    <p class="text-subtitle-1 font-italic white--text titulo-grafico">Grafico do total de vendas dos ultimos três meses (inicio da esquerda para direita)</p>
                                    <v-sheet color="#1e1e1e">
                                        <v-sparkline
                                          :value="valoresUltimosMeses"
                                          color="#FB8C00"
                                          height="80"
                                          smooth="10"
                                          padding="20"
                                          stroke-linecap="round"
                                          auto-draw
                                          :auto-draw-duration="4000"
                                        >
                                        <template v-slot:label="item">
                                            {{parseFloat(item.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}
                                        </template>
                                        </v-sparkline>
                                      
                                    </v-sheet>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text> 
              </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-dialog
                    v-model="active"
                    persistent
                    max-width="550"
                    @keydown.escape="active = false"
                >
                    <v-card dark>
                        <v-card-actions>
                            <v-icon small class="ml-n2 mt-n1" color="red accent-2" @click="active = false">mdi-close</v-icon>
                        </v-card-actions>
                        <v-card-text class="white--text text-subtitle-1">
                            Cadastro de novo Funcionario
                        </v-card-text>
                        <v-card-text>
                            <v-row>
                                <v-col 
                                    cols="6"
                                    >
                                    <v-text-field
                                        v-model="user.name"
                                        label="Nome do Funcionario"
                                        persistent-hint
                                        required
                                        color="teal lighten-1"
                                        type="text"
                                        dark
                                    ></v-text-field>
                                </v-col>
                                <v-col 
                                    cols="6"
                                    >
                                    <v-text-field
                                        v-model="user.cpf"
                                        label="Cpf do Funcionario"
                                        persistent-hint
                                        required
                                        color="teal lighten-1"
                                        type="text"
                                        dark
                                    ></v-text-field>
                                </v-col>
                                <v-col 
                                    cols="6"
                                    >
                                    <v-text-field
                                        v-model="user.email"
                                        label="Email do Funcionario"
                                        persistent-hint
                                        required
                                        color="teal lighten-1"
                                        type="email"
                                        dark
                                    ></v-text-field>
                                </v-col>
                                <v-col 
                                    cols="6"
                                >
                                    <v-text-field
                                        v-model="user.pw"
                                        label="Senha do Funcionario"
                                        persistent-hint
                                        required
                                        color="teal lighten-1"
                                        type="password"
                                        dark
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-select
                                        :items="roles"
                                        label="Cargos"
                                        v-model="role"
                                        color="teal lighten-1"
                                        item-text="NOME" 
                                        return-object
                                        dark
                                        transition="fab-transition"
                                        required
                                    ></v-select>
                                </v-col>
                            </v-row>        
                        </v-card-text>
                        <v-card-actions class="d-flex justify-end">
                            <v-btn
                                @click="active = false"
                                text 
                                color="red lighten-1"
                            >Fechar</v-btn>
                            <v-btn
                                @click="cadNewFuncionario"
                                text 
                                color="teal lighten-1"
                            >Salvar </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return{
            showEmpresa : false,
            data : [],
            valores : [],
            qntd : 0,
            active : false,
            valoresUltimosMeses : [],
            registro : false,
            timeout : 2000,
            msg : '',
            user : {
                name : '',
                email : '',
                cpf : '',
                pw : '',
            },
            roles : null,
            role : null,
        }
    },
    methods:{
        ...mapActions('empresaMod', ['getByUser', 'checkEmpresa']),
        ...mapActions('vendaMod', ['getVendas', 'getVendasUltimosTresMeses']),
        ...mapActions('userMod', ['register', 'avaibleRoles']),
        async checkUserHaveOffice(){
            const res =  await this.checkEmpresa()
            if(res == 1){
                this.getEmpresaByUser();
                this.qntd = await this.getVendas()
               
                this.valoresUltimosMeses = await this.getVendasUltimosTresMeses()
                this.showEmpresa = true;
            }else{
                this.showEmpresa = false;
            }
        },
        async getEmpresaByUser(){
            const res = await this.getByUser()
            this.data = res;
        },
        async openCadFuncionario(){
            this.roles = await this.avaibleRoles()
            console.log(this.roles)
            this.active = true
        },
        async cadNewFuncionario(){
            let payload = {NAME : this.user.name, PASSWORD: this.user.pw, 
            EMAIL : this.user.email, CPF: this.user.cpf, ID_ROLE : this.role.ID}
            this.msg = await this.register(payload)
            this.registro = true
        } 
    },
    computed :{
        ...mapGetters({values :  'vendaMod/getValuesPerMes', userLevel : 'userMod/getUserLevel'})
    },
    created(){
        this.checkUserHaveOffice();
    }
}
</script>

<style lang="scss" scoped>
    .grafico{
        width: 92%;
    }
    .titulo-grafico{
        text-decoration: underline !important;
    }
</style>