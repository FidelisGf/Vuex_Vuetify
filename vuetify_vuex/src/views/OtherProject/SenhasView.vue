<template>
    <v-container fluid grid-list-md>
        <v-row justify="center">
            <v-dialog
              v-model="dialog"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  block
                  @click="cleanForm"
                  class="mt-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nova Senha
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5" v-if="!editMode && !detailMode">Cadastro de Senha</span>
                  <span class="text-h5" v-if="editMode && !detailMode">Ediçaõ de Senha</span>
                  <span class="text-h5" v-if="detailMode">Detalhes da Senha</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row v-if="!detailMode">
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="senha"
                          label="Senha"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="desc"
                          label="Descrição"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="url"
                          label="Url"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-select
                          v-model="usuario"
                          :items="Users"
                          item-text="username" 
                          return-object
                          label="Usuario"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row v-if="detailMode">
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="senha"
                            label="Senha"
                            required
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="desc"
                            label="Descrição"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="url"
                            label="Url"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-select
                            v-model="usuario"
                            :items="Users"
                            item-text="username" 
                            return-object
                            label="Usuario"
                            readonly
                          ></v-select>
                        </v-col>
                      </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Criar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row>
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="Senhas"
                    :items-per-page="10"
                    class="elevation-2"
                >
                <template v-slot:[`item.info`]="{ item }">
                    <v-icon color="blue darken-4"  @click="infoSenha(item)">mdi-alpha-i-circle</v-icon>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small color="teal lighten-1" class="mr-2" @click="editViewSenha(item)">mdi-pencil</v-icon>
                    <v-icon small color="red lighten-1" @click="deleteSenha(item)">mdi-delete</v-icon>
                </template>
                <template v-slot:top>
                    <v-text-field
                    v-model="search"
                    color="teal lighten-1"
                    label="Procure Pela exata descrição"
                    class="mx-4"
                    ></v-text-field>
                    <v-btn
                        color="cyan lighten-1"
                        class="ml-2"
                        dark
                        >
                            Buscar
                    </v-btn>
                </template>
                </v-data-table>
            </v-col>     
        </v-row>
    </v-container>
   
   

</template>

<script>
export default {
  data(){
    return{
        search : null,
        senha : null,
        url : null,
        detailMode : false,
        id : null,
        Users : [{id: 1, username : 'Fidelis'},
                {id: 2, username : 'Joao'}],
        desc : null,
        usuario : null,
        editMode : false,
        Senhas : [
            {id : 1, password : '441289', description :  'Nao sei', url: 'https:://localhost:8185/com.br', User_ID : 1},
            {id : 2, password : '4712289', description : 'Nao sei', url: 'https:://localhost:8285/com.br', User_ID : 2},
            {id : 3, password : '4774889', description : 'Nao sei', url: 'https:://localhost:8385/com.br', User_ID : 3},
        ],
        dialog : false,

    }
  },
  methods:{
        editViewSenha(item){
            this.editMode = true
            this.id = item.id
            this.senha = item.password
            this.url = item.url
            this.desc = item.description
            this.usuario = item.User_ID
            this.dialog = true
        },
        infoSenha(item){
            this.detailMode = true
            this.id = item.id
            this.senha = item.password
            this.url = item.url
            this.desc = item.description
            this.usuario = item.User_ID
            this.dialog = true
        },
        cleanForm(){
            this.detailMode = false
            this.editMode = false
            this.id = null
            this.senha = null
            this.url = null
            this.desc = null
            this.usuario = null
        },
        //fazer um store para a lista de senhas, e criar os save e remove , aqui vai um exemplo da lista : 

            //usar como na data table :
                //:items="$store.getters.listSenhas"   

            // state : Senhas : []


            // getters : 
                // listSenhas(state){
                //     return state.Senhas
                // },


            // mutation :  
                // beginListSenhas(state, payload){
                //    state.Senhas = payload
                // },
                // clearListSenhas(state){
                //   state.Senhas.length = 0
                // },
                // saveListSenhas(state, payload){
                //   state.Senhas.push(payload)
                // },
                // deleteInListSenhas(state, payload){
                //   state.Senhas =  state.Products.filter(item => item.id !== payload)
                // },

        // getUsers(){
        //     userService.getUsers().then((res) =>{
        //         console.log(res)
        //         this.Users = res.data.data
        //     })
        // }
        // postSenha(){
        //     let payload = {password : this.senha, description : this.desc, url : this.url, user : this.usuario}
        //     senhaService.postSenha(payload).then((res) => {
        //         console.log(res)
        //         let payload2 = {id : res.data.id, password : this.senha, description : this.desc, url : this.url, user : this.usua
        //         this.$store.commit('saveListSenhas', payload2)
        //     })
        // }
        // editSenha(){
        //     let payload = {password : this.senha, description : this.desc, url : this.url, user : this.usuario}
        //     senhaService.editSenha(this.id, payload).then((res) => {
        //         console.log(res);
        //     })
        // }
        // findSenhaByDesc(){
        //     let payload = {description : this.search}
        //     senhaService.findSenhaByDesc(payload).then((res) => {
        //         console.log(res);
        //     })
        // }
        // deleteSenha(item){
        //     senhaService.delete(item.id).then((res) => {
        //         console.log(res);
        //         this.$store.commit('deleteInListSenhas', item.id)
        //     })
        // }
        // getSenhas(){
        //     senhaService.getSenhas().then((res) => {
        //         console.log(res)
        //         this.$store.commit('beginListSenhas', payload2)
        //     })
        // }
  },
  computed: {
        headers() {
            return [
                { text: "Detalhes", value: "info", sortable: false },
                {
                    text: "Senha",
                    align: "start",
                    value: "password",
                },
                { text: "Descrição", value: "description" },
                { text: "Url", value: "url" },
                { text: "User Id", value: "User_ID" }, // mudar User_Id para password.user.id
                { text: "Actions", value: "actions", sortable: false },
            ];
        },

    },
}
</script>

<style lang="scss" scoped>

</style>