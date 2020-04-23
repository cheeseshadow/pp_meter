<template>
    <div class="room">
        <div class="control">
            <div>
                <button @click="onButtonClick()">ultra button</button>
            </div>
        </div>

        <div class="list">
            <div v-for="user in users" :key="user.id">{{user.name}} ({{user.id}})</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NameDto } from "../../../src/model/types";
import { RoomState, RoomAction } from "../../../src/model/room/types";
import { Signal, SignalType } from "../../../src/model/signal/types";
import { send } from "../utils";

@Component({})
export default class Room extends Vue {
    @Prop()
    id!: string;

    @Prop()
    user!: NameDto;

    @Prop()
    host!: NameDto[];

    @Prop()
    users!: NameDto[];

    @Prop()
    queue!: NameDto[];

    @Prop()
    state!: RoomState;

    @Prop()
    ws!: WebSocket;

    onButtonClick() {
        const signal: Signal = {
            type: SignalType.Room,
            data: {
                id: this.id,
                userId: this.user.id,
                timestamp: Date.now(),
                action: RoomAction.Queue
            }
        };

        send(this.ws, signal);
    }

    mounted() {}

    beforeDestroy() {}
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