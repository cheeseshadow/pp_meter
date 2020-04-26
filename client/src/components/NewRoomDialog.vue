<template>
    <form @submit.prevent="accept" class="modal block block_column block_high">
        <div class="header">{{$t('header')}}</div>
        <div class="modal-body block block_column">
            <ZlpInput v-model.trim="roomName"
                      type="text"
                      :placeholder="$t('placeholder')"
                      required/>

        </div>
        <div>
            <button class="btn" type="submit">{{$t('submitButton')}}</button>
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

<i18n locale="en" lang="yml">
    header: Create a room
    placeholder: Room name
    submitButton: Create
</i18n>