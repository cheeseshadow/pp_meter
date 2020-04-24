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

            <div class="block">
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
            padding: 20px;
            font-size: 120px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
        }

        &__letter {
            &_z {
                color: cornflowerblue;
            }

            &_a1 {
                color: darkmagenta;
            }

            &_l {
                color: chocolate;
            }

            &_o1 {
                color: burlywood;
            }

            &_o2 {
                color: blueviolet;
            }

            &_p {
                color: crimson;
            }

            &_a2 {
                color: hotpink;
            }
        }

        &__input {
            box-sizing: border-box;
            margin: 0;
            padding-left: 24px;
            height: 48px;
            width: 300px;
        }

        &__btn {
            box-sizing: border-box;
            height: 48px;
            padding: 0 32px;
            border: none;
        }
    }
</style>