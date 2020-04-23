<template>
    <form @submit.prevent="login()">
        <div>
            <label for="uname">
                <b>Username</b>
            </label>
            <input
                v-model.trim="username"
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
            />
        </div>

        <button type="submit">Login</button>
    </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Login extends Vue {
    username: string = "";

    login() {
        console.log(this.username);
        this.$router.replace({ name: "lobby", params: { username: this.username } });
    }
}
</script>