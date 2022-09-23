<template>
    <v-container fluid grid-list-md>
        <v-row dense>
            <v-col cols="12">
                <v-card
                color="#D8D3D2"
                dark
                class="elevation-5"
                height="100vh"
                >   
                <v-container >
                    <v-card-title class="text-h6 black--text">
                    Ultimos Pedidos
                    </v-card-title>
                    <v-card-subtitle class="black--text">Seus Ultimos Pedidos Realizados Estão listados a baixo</v-card-subtitle>
                    
                        <v-row>
                            <v-col>
                                <v-card color="#37474F" class="rounded-xl" height="auto" width="auto">
                                    <v-card-title>Pedido #0001</v-card-title>
                                    <v-row>
                                        <v-col class="mt-n5">
                                            <v-card-subtitle class="light-green--text font-weight-black">
                                                <v-btn class="btn" color="transparent" @click="activeButton">
                                                    <v-icon dark large color="blue" span v-if="active" left>mdi-chevron-down</v-icon>
                                                    <v-icon dark large color="blue" span v-if="!active">mdi-chevron-up</v-icon>
                                                </v-btn>
                                                Pedido entregue :)
                                            </v-card-subtitle>
                                        </v-col>
                                    </v-row>
                                    <v-divider class="mt-n5"></v-divider>
                                    <v-row v-if="active">
                                        <v-col cols="2" xl="1" md="1" lg="1"  sm="2">
                                            <v-img
                                                height="60"
                                                width="60"
                                                src="https://i.pinimg.com/originals/69/9b/87/699b87ec80493386f3e846753baf2c0d.png"
                                                class="ml-6 mt-2"
                                            ></v-img>
                                        </v-col>
                                        <v-col cols="6"  xl="3" md="3" lg="3"  sm="4">
                                            <p class="mt-5 item-name">Garrafa de agua basica</p>
                                            <p class="mt-n3 mt-md-n3 mt-lg-n3 mt-xl-n3 item-name">Quantidade : 1</p>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                        
                 </v-container>
              </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            active : false
        }
    },

    methods:{
        activeButton(){
            if(this.active){
                this.active = false;
                console.log(this.active);
            }else{
                this.active = true;
            }
            
        }
    }

}
</script>

<style  scoped>
    .item-name{
        font-size: 12px;
    }
</style>