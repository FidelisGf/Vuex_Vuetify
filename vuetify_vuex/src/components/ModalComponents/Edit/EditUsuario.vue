<template>
    <v-card dark>
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
            <v-card-actions>
                <v-icon class="ml-n2 " color="red accent-2" @click="closeMod">mdi-close</v-icon>
            </v-card-actions>
            <v-card-text class="white--text text-subtitle-1 text-md-h5">
                Editar Usuario  #{{user.name}} [{{generico.ID}}]
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
                            :loading="loading"
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
                            :loading="loading"
                        ></v-text-field>
                    </v-col>
                    <v-col 
                        cols="6"
                        >
                        <v-text-field
                            v-model="user.salario"
                            label="Salário do Funcionario"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="text"
                            dark
                            :loading="loading"
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
                            :loading="loading"
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
                            :loading="loading"
                        ></v-select>
                    </v-col>
                </v-row>        
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
                <v-btn
                    @click="closeMod"
                    text 
                    color="red lighten-1"
                >Fechar</v-btn>
                <v-btn
                    @click="editUser"
                    text 
                    color="teal lighten-1"
                >Salvar </v-btn>
            </v-card-actions>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
                salario : ""
            },
            roles : [],
            role : null,
            msg : '',
            loading : true,
            registro : false,
            timeout : 2000,
        }
    },
    methods:{
        ...mapActions("userMod", ['avaibleRoles', 'showUser', 'edit']),
        clear(){
            this.user.cpf = ''
            this.user.email = ''
            this.user.name = ''
            this.user.pw = '',
            this.user.salario = ''
            this.getUser()
        },
        closeMod(){
            this.$emit('close-edit-usuario', false)
        },
        async getUser(){
            let data  = await this.showUser(this.generico.ID)
            this.user.cpf = data.usuario.CPF 
            this.user.email = data.usuario.EMAIL 
            this.user.name = data.usuario.NAME 
            this.user.salario = data.usuario.SALARIO
            this.role = data.cargo
            this.roles = await this.avaibleRoles();
            this.loading = false
        },
        async editUser(){
            let payload = {ID : this.generico.ID,  NAME : this.user.name, EMAIL : this.user.email, CPF : this.user.cpf,  ID_ROLE : this.role.ID, role : this.role, SALARIO : this.user.salario}
            this.msg = await this.edit(payload)
            this.registro = true 
        }
    },
    computed:{
        ...mapGetters({generico : 'utilMod/getGenerico'})
    },
    watch: {
        generico : function(val) {
          if (val) {
            this.loading = true
             this.clear()
          }
          this.generico = val
        }  
    },
    async created(){
            this.getUser()
            
    }
}
</script>

<style lang="scss" scoped>

</style>