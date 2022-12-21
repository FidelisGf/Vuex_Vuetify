<template>
    <v-dialog
        v-model="active"
        persistent
        max-width="730"
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
            <v-card-text class="white--text text-subtitle-1 text-md-h5">
                Cadastro de novo Funcionario
            </v-card-text>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="12" class="mt-n2 d-flex justify-space-between  flex-sm-row flex-column">
                        <label v-if="!image_colocada" class="arqv" for="arqv">Anexar Foto</label>
                        
                        <input
                            v-if="!image_colocada"
                            type="file"
                            ref="image"
                            label="Add Image"
                            @change="uploadImage"
                            id="arqv"
                        >
                        
                        
                        <v-img  
                            v-if="image_colocada"
                            class="mt-2 mt-sm-0" 
                            max-height="250"
                            max-width="250"
                            :src="image_url"
                        ></v-img>
                        <v-btn icon @click="clearImage" v-if="image_colocada">
                            <v-icon color="yellow darken-3">mdi-arrow-u-left-top-bold</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col 
                        cols="12"
                        md="6"
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
                    cols="12"
                    md="6"
                        >
                        <v-text-field
                            v-model="user.cpf"
                            label="Cpf do Funcionario"
                            persistent-hint
                            required
                            counter="11"
                            color="teal lighten-1"
                            type="text"
                            dark
                        ></v-text-field>
                    </v-col>
                    <v-col 
                    cols="12"
                    md="6"
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
                    cols="12"
                    md="6"
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
                    <v-col>
                        <v-text-field
                            v-model="user.salario"
                            label="Salário Líquido"
                            persistent-hint
                            required
                            color="teal lighten-1"
                            type="number"
                            dark
                        ></v-text-field>
                    </v-col>
                </v-row>        
            </v-card-text>
            <v-card-actions class="d-flex justify-end mt-n4">
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
                salario : 0,
                image_user : null
            },
            roles : [],
            role : null,
            image_url : null,
            image_file : null,
            msg : '',
            image_colocada : false,
        }
    },
    methods:{
        ...mapActions("userMod", ["register", "avaibleRoles"]),
        async cadNewFuncionario() {
            let fomr = new FormData()
            fomr.append('NAME', this.user.name)
            fomr.append('PASSWORD', this.user.pw)
            fomr.append('EMAIL', this.user.email)
            fomr.append('CPF', this.user.cpf)
            fomr.append('ID_ROLE', this.role.ID)
            fomr.append('SALARIO', this.user.salario)
            if(this.image_file != null){
                fomr.append('IMAGE', this.image_file, this.image_file.name)
            }
            
            this.msg = await this.register(fomr);
            this.$emit('Cadastrado', this.msg)
            this.active = false 
            this.clear()
        },
        clear(){
            this.user.cpf = ''
            this.user.email = ''
            this.user.name = ''
            this.user.pw = ''
        },
        clearImage(){
            this.user.image_user = null 
            this.image_url = null 
            this.image_file = null
            this.image_colocada = false
        },
        uploadImage(e){
            this.image_colocada = true
            this.user.image_user = e.target.files
           
            const fr = new FileReader()
            fr.readAsDataURL(this.user.image_user[0])
            fr.addEventListener('load', ()=>{
                this.image_url = fr.result
                this.image_file = this.user.image_user[0]
            })
            
           
        },
    },
   async created(){
        this.roles = await this.avaibleRoles();
    }
}
</script>

<style lang="scss" scoped>
input[type="file"] {
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.arqv {
    font-size: 1.05em;
    font-weight: 500;
    color: white;
    
    display: inline-block;
    
}
input[type="file"]:focus + .arqv,
input[type="file"] +  .arqv:hover{
    background-color: rgb(194, 52, 52);
}
</style>