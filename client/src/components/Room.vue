<template>
    <div :class="['room', inProgress ? 'room_in-progress' : '']">
        <div class="control">
            <div class="block">
                <button @click="onButtonClick()">ultra button</button>
            </div>

            <div v-if="isHost" class="block">
                <button @click="toggleState()">Toggle state</button>
            </div>
        </div>

        <div class="list">
            <div v-for="user in queue" :key="'queue_' + user.id">{{user.name}} ({{user.id}})</div>
        </div>

        <div class="list">
            <div v-for="user in users" :key="'room_' + user.id">{{user.name}} ({{user.id}})</div>
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
    host!: NameDto;

    @Prop()
    users!: NameDto[];

    @Prop()
    queue!: NameDto[];

    @Prop()
    state!: RoomState;

    @Prop()
    ws!: WebSocket;

    toggleState() {
        const signal: Signal = {
            type: SignalType.Room,
            data: {
                id: this.id,
                userId: this.user.id,
                timestamp: Date.now(),
                action:
                    this.state === RoomState.Idle
                        ? RoomAction.SetInProgress
                        : RoomAction.SetIdle
            }
        };

        send(this.ws, signal);
    }

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

    get isHost(): boolean {
        return this.host.id === this.user.id;
    }

    get inProgress(): boolean {
        return this.state === RoomState.InProgress;
    }

    mounted() {}

    beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.room {
    display: flex;

    &_in-progress {
        background: pink;
    }
}

.list {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.control {
    flex: 1;
}

.block {
    margin: 4px;
}
</style>