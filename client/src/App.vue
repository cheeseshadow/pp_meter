<template>
    <div id="app">
        <router-view />
        <!-- <Room /> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Room from "./components/Room.vue";

@Component({
    components: {
        Room
    }
})
export default class App extends Vue {}
</script>

<style>
</style>
