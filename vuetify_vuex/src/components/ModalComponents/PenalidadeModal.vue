<template>
    <v-dialog
        v-model="active"
        persistent
        max-width="550"
        @keydown.escape="active = false"
    >
        <template  v-slot:activator="{ on, attrs }">
            <v-btn
                color="teal accent-2"
                dark
                class="ml-1  font-weight-medium"
                v-bind="attrs"
                v-on="on"
                text 
            >
                <v-icon dark color="teal accent-2">mdi-alert-plus</v-icon>
                    <span class="ml-2">Registrar Penalidade</span>
            </v-btn>
        </template>
        <v-card dark>
            <v-card-actions>
                <v-icon  class="ml-n2 " color="red accent-2" @click="active = false">mdi-close</v-icon>
            </v-card-actions>
            <v-card-text class="white--text text-subtitle-1 text-md-h5">
                Novo tipo de Penalidade
            </v-card-text>
            <v-card-text>
                <v-row>
                    <v-col 
                        cols="5"
                        >
                        <v-select
                            :items="tipos"
                            label="Tipo de Penalidade"
                            v-model="tipo"
                            required 
                            dark
                            color="teal lighten-1"
                           
                        >  
                        </v-select>
                    </v-col>
                    <v-col 
                        cols="6"
                    >
                        <v-text-field
                            v-model="data"
                            label="Data"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="datetime-local"
                            dark
                        ></v-text-field>
                    </v-col>
                    <v-col 
                        cols="5"
                    >
                        <v-text-field
                            v-model="id_funcion??rio"
                            label="Codigo do Funcionario"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="number"
                            dark
                        ></v-text-field>
                    </v-col>
                    <v-col 
                        cols="6"
                    >
                        <v-text-field
                            v-model="desconto_salario"
                            label="Desconto no Sal??rio"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="number"
                            dark
                        ></v-text-field>
                    </v-col>
                    <v-col 
                    cols="11"
                    >
                        <v-textarea
                            v-model="desc"
                            label="Descri????o"
                            hint="Descreva a situa????o"
                            required
                            color="yellow lighten-1"
                            dark
                            counter="300"
                            outlined
                        ></v-textarea>
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
                    @click="post"
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
    data(){
        return{
            active : false,
            tipos : ['Falta' , 'Atraso', 'Outros'],
            tipo : '',
            data : '',
            desc : '',
            id_funcion??rio : '',
            desconto_salario : '',
        }
    },
    methods:{
        ...mapActions('penalidadeMod', ['postPenalidade']),
        async post(){
            let payload = {DATA : this.data, DESC : this.desc, TIPO : this.tipo, ID_USER : 
                this.id_funcion??rio, DESCONTO : this.desconto_salario}
            let text = await this.postPenalidade(payload)
            this.$emit('Cadastrado', text)
            this.clear()
            this.active = false
        },
        clear(){
            this.tipo = ''
            this.data = ''
            this.desc = ''
            this.id_funcion??rio = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.theme--dark input[type="date"]::-webkit-calendar-picker-indicator {
    background: url(https://img.icons8.com/cotton/64/000000/calendar.png) no-repeat;
    background-size: 24px 24px;
}
.theme--dark input[type="time"]::-webkit-calendar-picker-indicator {
    background: url(https://img.icons8.com/cotton/64/000000/clock.png) no-repeat;
    background-size: 24px 24px;
}
</style>