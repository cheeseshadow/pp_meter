<template>
    <form @submit.prevent="login()" class="main">
        <div class="block block_column main__anchor">
            <div class="block main__zaloopa">
                <span class="main__letter main__letter_z">z</span>
                <span class="main__letter main__letter_a1">a</span>
                <span class="main__letter main__letter_l">l</span>
                <span class="main__letter main__letter_o1">o</span>
                <span class="main__letter main__letter_o2">o</span>
                <span class="main__letter main__letter_p">p</span>
                <span class="main__letter main__letter_a2">a</span>
            </div>

            <div :class="['block', 'main__input-container', inputIsFocused ? 'main__input-container_focused' : '']">
                <input class="main__input"
                       @focusin="inputIsFocused = true"
                       @focusout="inputIsFocused = false"
                       v-model.trim="username"
                       type="text"
                       :placeholder="$t('placeholder')"
                       required/>

                <button class="btn" type="submit">{{$t('login')}}</button>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class Login extends Vue {
        username: string = "";
        inputIsFocused: boolean = false;

        login() {
            this.$router.replace({name: "lobby", params: {username: this.username}});
        }
    }
</script>

<style lang="scss">
    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        &__anchor {
            position: relative;
        }

        &__zaloopa {
            line-height: normal;
            position: absolute;
            bottom: calc(100% + 32px);
            font-size: 100px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
        }

        &__letter {
            &_z {
                color: #4285F4;
            }

            &_a1 {
                color: #DB4437;
            }

            &_l {
                color: #F4B400;
            }

            &_o1 {
                color: #4285F4;
            }

            &_o2 {
                color: #0F9D58;
            }

            &_p {
                color: #DB4437;
            }

            &_a2 {
                color: #4285F4;
            }
        }

        &__input-container {
            padding: 0 24px;
            height: 72px;
            border: 1px solid #f7f7f7;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
            transition: all ease .5s;

            &_focused {
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
            }
        }

        &__input {
            margin: 0 20px 0 0;
            height: 48px;
            width: 360px;
            border: none;

            &:focus {
                outline: none;
            }

            &::placeholder {
                color: #aaa;
            }
        }
    }
</style>

<i18n locale="en" lang="yml">
    placeholder: Username
    login: Come in
</i18n>