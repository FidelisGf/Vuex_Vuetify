<template>
   <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-data-table
                    :search="search"
                    :custom-filter="filterOnlyCapsText"
                    :loading="loading"
                    :headers="$store.getters.getHeader"
                    :items="$store.getters.listProducts"
                    :items-per-page="6"
                    hide-default-footer       
                    class="elevation-2"
                >
                <template v-slot:top>
                    <v-text-field
                    v-model="search"
                    color="teal lighten-1"
                    label="Search (APENAS COM CAPS)"
                    class="mx-4"
                    ></v-text-field>
                </template>
            </v-data-table>
            <v-pagination
                color="teal lighten-1"
                v-model="current_page"
                :length="totalPage"
                @input="onPageChange">  
            </v-pagination> 
            </v-col>
        </v-row>
   </v-container>
</template>

<script>
import axios from 'axios'


export default {
    props:{
        route : String,
       
    },
    data(){
        return{
            current_page : 1,
            totalPage : 0,
            loading: true,
            search: "",
        }
    },
    methods:{
        getLista(route){
            this.loading = true
            this.$store.commit('clearListProduct')
            axios.get("http://127.0.0.1:8000/api/" + route +"?page=" + this.current_page).then((response) => {
                this.$store.commit('beginListProduct', response.data.data)
                this.loading = false
                this.current_page = response.data.current_page
                this.totalPage =  response.data.last_page
            })
        },
        onPageChange(){
            this.getLista(this.route);
        },
        clearPages(){
            this.current_page = 1;
            this.totalPage = 0;
        },
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === "string" &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1;
        },
    },
    created(){
        this.clearPages()
        this.getLista(this.route);
        console.log(this.current_page)
    }
}
</script>

<style lang="scss" scoped>

</style>