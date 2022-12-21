<template>
    <v-container>
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
        <v-dialog
                v-model="active"
                persistent
                max-width="500px"
                @keydown.escape="fechar"
            >
            <template v-slot:activator="{ on, attrs }">
                <div class="d-flex flex-column">
                    <v-btn
                    color="teal accent-3"
                    dark
                    icon
                    class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                    >
                        <v-icon aria-hidden="false" color="teal accent-1" >mdi-account</v-icon>
                    </v-btn>
                    <v-badge
                        v-show="vinculado"
                        class="mt-1 mr-3"
                        color="#757575"
                        content="V"
                    >
                    </v-badge>
                </div>
                    
            </template>
            <v-card v-if="!vinculado" class="cards-colors">
                <v-card-title>
                    <span class="text-h8 white--text">Insira o codigo do cliente</span>
                    <v-tooltip bottom>
                        <template  v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="teal accent-3"
                            dark
                            icon
                            class="ml-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="ativaCadastro"
                            >
                                <v-icon aria-hidden="false" color="teal lighten-1" >
                                    mdi-plus-circle-outline
                                </v-icon>
                            </v-btn>
                        </template>
                            <span>Cadastro rapido de cliente</span>
                      </v-tooltip>
                </v-card-title>
                <v-card-text>
                    <v-tooltip bottom>
                        <template  v-slot:activator="{ on, attrs }">
                            <v-text-field
                                label="Codigo..."
                                required
                                dark
                                v-model="codigo"
                                color="teal lighten-1"
                                v-bind="attrs"
                                @keydown.f2="ativaLista"
                                v-on="on"
                            ></v-text-field>
                        </template>
                            <span>Aperte F2 para exibir a lista</span>
                      </v-tooltip>
                </v-card-text>
                <v-card-actions class="mt-n10 d-flex justify-end">
                    <v-btn
                    text
                    dark 
                    color="red lighten-1"
                    @click="fechar"
                    >
                    Fechar
                    </v-btn>
                    <v-btn
                        text
                        dark 
                        color="teal lighten-1"
                        @click="setClient"
                    >
                        Vincular
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-card v-else-if="vinculado" class="cards-colors">
                <v-card-title>
                    <span class="white--text">Dados do cliente</span>
                </v-card-title>
                <v-card-text >
                    <p class="font-weight-medium white--text">Nome : {{clienteVinculado.nome}}</p>
                    <p class="font-weight-medium white--text">Cpf : {{clienteVinculado.cpf}} </p>
                    <p class="font-weight-medium white--text">Email : {{clienteVinculado.email}} </p>
                    <p class="font-weight-medium white--text">Endereço : {{clienteVinculado.endereco}} </p>
                    <p class="font-weight-medium white--text">Telefone : {{clienteVinculado.telefone}}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                    text
                    dark 
                    color="red lighten-1"
                    @click="fechar"
                    >
                    Fechar
                    </v-btn>
                    <v-btn
                        text
                        dark 
                        color="teal lighten-1"
                        @click="unsetClient"
                    >
                        Desvincular Cliente
                    </v-btn>
                </v-card-actions>
            </v-card>          
        </v-dialog>
        <v-dialog
            v-model="cadastroRapido"
            persistent
            max-width="550px"
            @keydown.escape="cadastroRapido = false"
        >
            <v-card class="cards-colors">
                <v-card-title class="white--text">
                    Cadastro rapido de cliente
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    label="Nome do Cliente"
                                    required
                                    dark
                                    v-model="client.nome"
                                    counter="60"
                                    color="teal lighten-1"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            
                            >
                                <v-text-field
                                    label="CPF"
                                    dark
                                    counter="11"
                                    v-model="client.cpf"
                                    color="teal lighten-1"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                label="Endereço"
                                persistent-hint
                                required
                                dark
                                v-model="client.endereco"
                                color="teal lighten-1"
                                ></v-text-field>
                            </v-col>
                            <v-col 
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    label="Telefone"
                                    persistent-hint
                                    required
                                    dark
                                    v-model="client.telefone"
                                    color="teal lighten-1"
                                    type="tel"
                                ></v-text-field>
                            </v-col>
                            <v-col 
                            cols="12"
                            sm="6"
                            md="6"
                        >
                            <v-text-field
                                label="Email"
                                persistent-hint
                                required
                                dark
                                v-model="client.email"
                                color="teal lighten-1"
                                type="email"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="d-flex justify-end mt-n8">
                    <v-btn
                    text
                    dark 
                    color="red lighten-1"
                    @click="ativaCadastro"
                    >
                    Fechar
                    </v-btn>
                    <v-btn
                        text
                        dark 
                        color="teal lighten-1"
                        @click="insert"
                    >
                    Salvar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="mostraLista"
            persistent
            max-width="750px"
            @keydown.escape="mostraLista = false"
        >
        <v-card class="cards-colors">
            <v-card-actions class="d-flex justify-start">
                <v-btn
                    icon
                    dark 
                    color="red lighten-1"
                    @click="ativaLista"
                    >
                    <v-icon>mdi-close</v-icon>
                </v-btn>    
            </v-card-actions>
            <v-card-title class="white--text">
                Lista de clientes
            </v-card-title>
            <v-card-text class="mt-2">
                <ListaGenerica v-if="mostraLista" :route="'clientes'" :headers="headers" ></ListaGenerica>
            </v-card-text>
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ListaGenerica from '../ListaGenerica.vue';
export default {
    data() {
        return {
            cadastroRapido: false,
            mostraLista: false,
            NOME : '',
            client : {
                nome : null,
                cpf : null,
                endereco : null,
                telefone : null,
                email : null,
            },
            codigo : null,
            active : false,
            registro : false,

            msg : '',
            timeout : 2000,
        };
    },
    computed: {
        ...mapGetters({vinculado : "clienteMod/getVinculo", clienteVinculado : "clienteMod/getCliente"}),
        headers() {
            return [
                {
                    text: "Codigo",
                    align: "start",
                    value: "ID",
                },
                {
                    text: "Nome",
                    value: "NOME",
                },
                { text: "Cpf", value: "CPF" },
                { text: "Endereço", value: "ENDERECO" },
                { text: "Telefone", value: "TELEFONE" },
            ];
         },
    },
    methods: {
        ...mapActions('clienteMod', ['activeModalCliente', 'saveCliente', 'disableModalCliente', 
        'getCliente', 'desvincularCliente']),
        ativaCadastro() {
            if (this.cadastroRapido) {
                this.cadastroRapido = false;
            }
            else {
                this.cadastroRapido = true;
            }
        },
        fechar(){
            this.active = false
        },
        ativaLista(){
            if(this.mostraLista){
                this.mostraLista = false 
            }else{
                this.mostraLista = true 
            }
        },
        async insert(){
            let payload = {NOME : this.client.nome, CPF : this.client.cpf, 
                ENDERECO: this.client.endereco, TELEFONE : this.client.telefone, EMAIL : this.client.email}
            this.msg = await this.saveCliente(payload)
            this.cadastroRapido = false
            this.registro = true 
        },
        async setClient(){
            let text = await this.getCliente(this.codigo)
            this.msg = text
            this.registro = true
            this.active = false
        },
        async unsetClient(){
            let text = await this.desvincularCliente()
            this.msg = text
            this.registro = true
            this.active = false
        }
    },
    components: { ListaGenerica }
}
</script>

<style lang="scss">

</style>