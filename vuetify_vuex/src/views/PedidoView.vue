<template>
    <v-container fluid grid-list-md >
        <v-row dense >
            <v-col cols="12">
                <v-card
                color="#e9e4e4"
                dark
                dense
                class="elevation-4"
                height="auto"
                >   
                <v-container >
                    <v-card-title class="text-h6 black--text">
                    Ultimos Pedidos
                    </v-card-title>
                    <v-card-subtitle class="black--text">Seus Ultimos Pedidos Realizados Estão listados abaixo</v-card-subtitle>
                        <v-row v-for="(pedido,index) in pedidos" :key="index">
                            <v-col >
                                <v-card  class="rounded-lg rounded-bl-0" color="#e9e2e2" elevation="3" height="auto" width="auto" :style="'border: 1px solid black;'">
                                    <v-card-title class="black--text">Pedido {{pedido.id}}</v-card-title>
                                    <v-row>
                                        <v-col cols="10" xl="10" md="10" lg="10"  sm="10"  class="mt-n5">
                                            <v-card-subtitle span v-if="pedido.situacao == 'Entregue'" class="light-green--text font-weight-medium"> 
                                             <v-icon color="light-green" large left>mdi-package-variant-closed-check</v-icon> {{pedido.situacao}}
                                            </v-card-subtitle>
                                            <v-card-subtitle span v-if="pedido.situacao == 'Encaminhado'" class=" blue--text font-weight-black" > 
                                              <v-icon large color="blue" left>mdi-truck-fast-outline</v-icon> Pedido encaminhado ao destino
                                            </v-card-subtitle>
                                            <v-card-subtitle span v-if="pedido.situacao == 'Pagamento pendente'" class="red--text font-weight-medium"> 
                                              <v-icon large color="red" left>mdi-currency-usd-off</v-icon> {{pedido.situacao}} !
                                            </v-card-subtitle>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="mt-n2">
                                            <v-btn class="btn" flat icon color="transparent" @click="activeButton">
                                                <v-icon dark large color="blue" span v-if="active" left>mdi-chevron-down</v-icon>
                                                <v-icon dark large color="blue" span v-if="!active">mdi-chevron-up</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-divider color="black" class="mt-n5"></v-divider>
                                    <div v-if="active">
                                        <v-row v-for="(produto,index) in pedidos[index].produtos" :key="index">
                                            <v-col cols="2" xl="1" md="1" lg="1"  sm="2">
                                                <v-img
                                                    height="50"
                                                    width="50"
                                                    :src="produto.src"
                                                    class="ml-6 mt-2"
                                                ></v-img>
                                            </v-col>
                                            <v-col class="ml-2" cols="6"  xl="3" md="3" lg="3"  sm="4"  >
                                                <p class="mt-3 item-name black--text">{{produto.nome}}</p>
                                                <p class="mt-n4 item-name black--text">Valor Unitário : R$ {{produto.valor}}</p>
                                                <p class="mt-n4 mt-md-n3 mt-lg-n3 mt-xl-n3 item-name black--text" >Quantidade : {{produto.quantidade}}</p>
                                                <v-divider color="black"></v-divider>
                                            </v-col>
                                        </v-row>
                                        <p class="mt-3 ml-7 font-weight-black black--text">Valor Total do Pedido : R$ {{pedido.valorTotal}}</p>
                                    </div>   
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
            active : false,
            ativos : [],
            pedidos: [
            { id: 1, situacao: "Entregue", 
            produtos: [
                {id: 1, nome: 'Sabonete Intimo', valor : 10.00, quantidade : 15, src : "https://shopblob.blob.core.windows.net/39-produtoimagem/grd-zoom_ne-soft-green-sabonete-barra(0).png"},
                {id: 2, nome: 'Shampoo do Cristiano', valor : 30.00, quantidade : 3, src : "https://pngimg.com/uploads/shampoo/small/shampoo_PNG99887.png"}
            ], 
            valorTotal: 40.00 },
            { id: 2, situacao: "Encaminhado", 
            produtos: [
                {id: 3, nome: 'Sabonete Intimo', valor : 10.00, quantidade : 15, src : "https://shopblob.blob.core.windows.net/39-produtoimagem/grd-zoom_ne-soft-green-sabonete-barra(0).png"},
                {id: 4, nome: 'Shampoo do Cristiano', valor : 30.00, quantidade : 3, src : "https://pngimg.com/uploads/shampoo/small/shampoo_PNG99887.png"}
            ], 
            valorTotal: 40.10 },
            { id: 3, situacao: "Pagamento pendente", 
            produtos: [
                {id: 4, nome: 'Sabonete Intimo', valor : 10.00, quantidade : 15, src : "https://shopblob.blob.core.windows.net/39-produtoimagem/grd-zoom_ne-soft-green-sabonete-barra(0).png"},
                {id: 5, nome: 'Shampoo do Cristiano', valor : 30.00, quantidade : 3, src : "https://pngimg.com/uploads/shampoo/small/shampoo_PNG99887.png"}
            ], 
            valorTotal: 40.50 },
            ]
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
    },
    created(){
        console.log(this.ativos);
    }

}
</script>

<style  scoped>
    .item-name{
        font-size: 13px;
    }
</style>