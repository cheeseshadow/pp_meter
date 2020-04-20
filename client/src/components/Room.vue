<template>
    <div class="room">
        <div class="control">
            <div>
                <button @click="clickHandler">ultra button</button>
            </div>
        </div>

        <div class="list">
            <div>current: {{current}}</div>
            <div v-for="user in users" :key="user.id">{{user.name}} ({{user.id}})</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Room extends Vue {
    @Prop()
    user!: string;

    ws!: WebSocket;
    users: string[] = [];
    current: string = "";

    clickHandler() {
        this.ws.send(
            JSON.stringify({ username: this.user, timestamp: new Date().getTime() })
        );
    }

    mounted() {
        console.log("soochara!", this.user);

        const url = `ws://localhost:3000/room/${this.user}`;
        this.ws = new WebSocket(url);

        this.ws.onmessage = event => {
            const update = JSON.parse(event.data);
            this.users = update.users;
            this.current = update.current;
            console.log(update);
        };
    }

    beforeDestroy() {
        console.log("fuck");
        !!this.ws && this.ws.close();
    }
}
</script>

<style lang="scss" scoped>
.room {
    display: flex;
}

.list {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.control {
    flex: 1;
}
</style>