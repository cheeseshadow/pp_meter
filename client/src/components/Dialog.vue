<template>
    <div class="modal">
        <div class="modal__header">{{header}}</div>
        <div class="modal__body">{{body}}</div>
        <div class="modal__footer">
            <button class="btn">{{ok}}</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({components: {}})
    export default class Dialog extends Vue {
        @Prop()
        header!: string;

        @Prop()
        body!: string;

        @Prop()
        ok!: string;
    }
</script>

<style>

</style>