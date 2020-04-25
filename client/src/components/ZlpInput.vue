<template>
    <div :class="['zlp-input-container', inputIsFocused ? 'zlp-input-container_focused' : '']">
        <input class="zlp-input" type="text"
               @input="updateValue($event.target.value)"
               @focusin="inputIsFocused = true"
               @focusout="inputIsFocused = false"
               :required="required"
               :placeholder="placeholder"
               :value="value">
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({components: {}})
    export default class ZlpInput extends Vue {
        @Prop()
        value!: string;

        @Prop()
        placeholder!: string

        @Prop()
        required!: boolean

        inputIsFocused: boolean = false

        updateValue(value: string) {
            this.$emit('input', value)
        }

    }
</script>

<style lang="scss" scoped>
    .zlp-input-container {
        display: flex;
        height: 52px;
        width: 360px;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1px 1px;

        &_focused {
            border: 1px solid transparent;
            background-image: linear-gradient(white, white), linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);
            background-origin: border-box;
            background-clip: content-box, border-box;
        }
    }

    .zlp-input {
        border: none;
        border-radius: 8px;
        flex: 1;
        padding-left: 24px;
        outline: none;

        &::placeholder {
            color: #aaa;
        }
    }
</style>