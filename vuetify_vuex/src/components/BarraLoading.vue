<template>
    <v-overlay
        :value="$store.state.loading"
       
    >
        
                <v-progress-circular
                indeterminate
                color="white"
                class="mt-7"
                >
                </v-progress-circular>   
       
    </v-overlay>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>

</style>