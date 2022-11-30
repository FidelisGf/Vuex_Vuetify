<template>
    <v-dialog
        v-model="active"
        persistent
        max-width="550"
        @keydown.escape="active = false"
    >
        <template  v-slot:activator="{ on, attrs }">
            <v-btn
                color="yellow accent-2"
                dark
                class="ml-1  font-weight-medium"
                v-bind="attrs"
                v-on="on"
                text 
            >
                <v-icon dark color="yellow accent-2">mdi-alert-plus</v-icon>
                    <span class="ml-2">Registrar Penalidade</span>
            </v-btn>
        </template>
        <v-card dark>
            <v-card-actions>
                <v-icon small class="ml-n2 mt-n1" color="red accent-2" @click="active = false">mdi-close</v-icon>
            </v-card-actions>
            <v-card-text class="white--text text-subtitle-1">
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
                            v-bind="attrs"
                            v-on="on"     
                        >  
                        </v-select>
                    </v-col>
                    <v-col 
                        cols="6"
                    >
                        <v-text-field
                            label="Descrição"
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
                            label="Data"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="date"
                            dark
                        ></v-text-field>
                    </v-col>
                    <v-col 
                        cols="5"
                    >
                        <v-text-field
                            label="Codigo do Funcionario"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="number"
                            dark
                        ></v-text-field>
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
                    text 
                    color="teal lighten-1"
                >Salvar </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data(){
        return{
            active : false,
            tipos : ['Falta' , 'Atraso', 'Outros'],
            tipo : ''
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