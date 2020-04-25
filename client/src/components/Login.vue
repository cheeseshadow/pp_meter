<template>
    <form @submit.prevent="login()" class="main">
        <div class="block block_column">
            <div class="block main__zaloopa">
                <span class="main__letter main__letter_z">z</span>
                <span class="main__letter main__letter_a1">a</span>
                <span class="main__letter main__letter_l">l</span>
                <span class="main__letter main__letter_o1">o</span>
                <span class="main__letter main__letter_o2">o</span>
                <span class="main__letter main__letter_p">p</span>
                <span class="main__letter main__letter_a2">a</span>
            </div>

            <div class="block main__hueta">
                <input class="main__input"
                       v-model.trim="username"
                       type="text"
                       placeholder="Username"
                       required/>

                <button class="main__btn" type="submit">Continue</button>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({})
    export default class Login extends Vue {
        username: string = "";

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

        &__zaloopa {
            padding-bottom: 32px;
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

        &__hueta {
            box-sizing: border-box;
            padding: 0 24px;
            height: 72px;
            border: 1px solid #f7f7f7;
            border-radius: 12px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
        }

        &__input {
            box-sizing: border-box;
            margin: 0 20px 0 0;
            height: 48px;
            width: 360px;
            border: none;
        }

        &__input:focus {
            outline: none;
        }

        &__btn {
            box-sizing: border-box;
            height: 48px;
            padding: 0 32px;
            border: none;
            border-radius: 8px;
            background-image: linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);
            color: white;
            font-weight: 600;
        }
    }
</style>