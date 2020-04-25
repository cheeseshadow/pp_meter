<template>
    <form @submit.prevent="accept" class="modal block block_column block_high">
        <div class="header">Create a room</div>
        <div class="modal-body block block_column">
            <ZlpInput v-model.trim="roomName"
                      type="text"
                      placeholder="Room name"
                      required/>

        </div>
        <div>
            <button class="btn" type="submit">Create</button>
        </div>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ZlpInput from "@/components/ZlpInput.vue";

    @Component({components: {ZlpInput}})
    export default class Dialog extends Vue {
        roomName: string = ''

        accept() {
            this.$emit('close')
            this.$parent.$emit('accept', this.roomName)
        }

    }
</script>

<style lang="scss">
    .modal-body {
        margin-bottom: 32px;
    }
</style>