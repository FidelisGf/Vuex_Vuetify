<template>
    <v-container fluid grid-list-md>
        <v-row dense>
            <v-col cols="12">
                <v-card
                color="#D8D3D2"
                dark
                class="elevation-5"
                >
                    <v-card-title class="text-h6 black--text">
                    Ultimos Pedidos
                    </v-card-title>
                    <v-card-subtitle class="black--text">Seus Ultimos Pedidos Realizados Estão listados a baixo</v-card-subtitle>
                    <!-- <v-card-text class="ml-3 text--white">
                                 <p>Diretor(a) Geral : Juliane Nunes</p>
                                 <p>Email : comercial@tresfronteiras.com.br</p>
                                 <p>Nome Fantasia : Kattamaram</p>
                                 <p>Numero de Funcionarios Ativos : 324</p>
                                 <p>Endereço da Empresa : Foz do Iguaçu, Rua Aguas Marinhas 1637, Ouro Verde</p>
                                 <p>Inscrição Estadual : 120000385</p>
                                 <p>Numero de Filiais : 6</p>
                    </v-card-text> -->
                    <v-card-text>
                        <v-list
                            nav
                            color="white"
                        >
                            <v-list-item @click="$router.push('/pedidos')" link >
                                <v-card >
                                    <v-card-title>Pedidos</v-card-title>
                                </v-card>
                            </v-list-item>
                         </v-list>
                </v-card-text>
              </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>