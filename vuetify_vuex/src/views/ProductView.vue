<template>
    <v-container fluid grid-list-md>
        <v-row>
           <v-col cols="12">
             <SearchBar></SearchBar>
           </v-col>
        </v-row>
        <v-row >
            <v-col v-for="product in products" :key="product.id">
                <v-card
                
                class="mx-auto my-5"
                max-width="274"
              >
                <v-img
                  height="250"
                  src="https://archive.org/download/no-photo-available/no-photo-available.png"
                ></v-img>
                <v-card-title>{{product.title}}</v-card-title>
                <v-card-text>
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>
            
                    <div class="grey--text ms-4">
                      4.5 (413)
                    </div>
                  </v-row>
            
                  <div class="my-4 text-subtitle-1">
                    R$ {{product.valor}}
                  </div>
            
                  <div>{{product.desc}}</div>
                </v-card-text>
            
                <v-divider class="mx-4"></v-divider>
              </v-card>
            </v-col>
        </v-row>
       
    </v-container>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';

export default {
    data: () => ({
        selection: 1,
        products: [
            { id: 1, title: "Sabonete", desc: "Sabonete muito bom", valor: 10 },
            { id: 2, title: "Detergente", desc: "Detergente super famoso", valor: 4 },
            { id: 3, title: "Amaciante", desc: "Amaciante Colorido", valor: 12 },
            { id: 4, title: "Kiboa", desc: "Resolve Tudo", valor: 12 },
            { id: 5, title: "Shampoo Header", desc: "Shampoo Header and Shower, o melhor para o banho", valor: 12 },
            { id: 6, title: "Amaciante", desc: "Sabão em Pó Omu, o melhor para você", valor: 22 },
        ]
    }),
  
    components: { SearchBar }
}
</script>

<style lang="scss" scoped>

</style>

