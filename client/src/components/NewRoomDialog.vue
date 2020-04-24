<template>
    <form @submit.prevent="accept" class="modal block block_column block_high">
        <div class="modal__header">Create a room</div>
        <div class="modal__body block block_column">
            <input class="main__input"
                   v-model.trim="roomName"
                   type="text"
                   placeholder="Username"
                   required/>
        </div>
        <div class="modal__footer">
            <button class="btn" type="submit">Create</button>
        </div>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({components: {}})
    export default class Dialog extends Vue {
        roomName: string = ''

        accept() {
            this.$emit('close')
            this.$parent.$emit('accept', this.roomName)
        }

    }
</script>

<style lang="scss">
    .modal {

        &__header {
            padding: 20px;
        }

        &__body {
            padding: 20px;
        }

        &__footer {
            padding: 20px;
        }

    }
</style>