<template>
    <div class="app" id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Room from "./components/Room.vue";

    @Component({
        components: {
            Room
        }
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">
    @import "styles/common.scss";
    @import "styles/init.scss";

    .app {
        height: 100%;
    }
</style>
