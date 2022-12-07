<template>
    <v-dialog
        v-model="active"
        persistent
        max-width="550"
        @keydown.escape="active = false"
    >
        <template  v-slot:activator="{ on, attrs }">
            <v-btn
                v-if="!mini"
                color="teal accent-2"
                dark
                class="ml-1  font-weight-medium"
                v-bind="attrs"
                v-on="on"
                text 
            >
                <v-icon dark color="teal accent-2">mdi-account-plus</v-icon>
                    <span class="ml-2">Adicionar Funcionário</span>
            </v-btn>
            <v-btn
                v-else-if="mini"
                color="teal lighten-1"
                dark
                large
                class="ml-2"
                v-bind="attrs"
                v-on="on"
                icon 
            >
                <v-icon dark color="teal lighten-1">mdi-account-plus</v-icon>
            </v-btn>
        </template>
        <v-card dark>
            <v-card-actions>
                <v-icon class="ml-n2 " color="red accent-2" @click="active = false">mdi-close</v-icon>
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
                            label="Cargo do Funcionario"
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
</template>

<script>
import { mapActions } from 'vuex';


export default {
    props:{
        mini : Boolean
    },
    data(){
        return{
            active : false,
            user: {
                name: "",
                email: "",
                cpf: "",
                pw: "",
            },
            roles : [],
            role : null,
            msg : ''
        }
    },
    methods:{
        ...mapActions("userMod", ["register", "avaibleRoles"]),
        async cadNewFuncionario() {
            let payload = { NAME: this.user.name, PASSWORD: this.user.pw, EMAIL: this.user.email, CPF: this.user.cpf, ID_ROLE: this.role.ID };
            this.msg = await this.register(payload);
            this.$emit('Cadastrado')
            this.active = false 
            this.clear()
        },
        clear(){
            this.user.cpf = ''
            this.user.email = ''
            this.user.name = ''
            this.user.pw = ''
        }
    },
   async created(){
        this.roles = await this.avaibleRoles();
    }
}
</script>

<style lang="scss" scoped>

</style>