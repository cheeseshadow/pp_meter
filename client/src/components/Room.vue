<template>
    <div :class="['room', inProgress ? 'room_in-progress' : '']">
        <div class="control">
            <div v-if="!isHost" class="block">
                <button @click="sendSignal(roomAction.Queue)" :disabled="!inProgress">ultra button</button>
                <button v-if="isQueued && !isAnswering" @click="sendSignal(roomAction.Unqueue)">withdraw!</button>
            </div>

            <div v-if="isHost" class="block">
                <button v-if="!inProgress" @click="sendSignal(roomAction.StartRound)">Start round</button>
                <button v-if="inProgress" @click="sendSignal(roomAction.EndRound)">End round</button>
                <button v-if="thereIsAnAnswer" @click="sendSignal(roomAction.AcceptAnswer)">Accept answer</button>
                <button v-if="thereIsAnAnswer" @click="sendSignal(roomAction.RejectAnswer)">Reject answer</button>
            </div>
        </div>

        <div class="list">
            <div v-for="user in queue" :key="'queue_' + user.id">{{user.name}} ({{new Date(user.timestamp)}})</div>
        </div>

        <div class="list">
            <div v-for="user in players" :key="'room_' + user.id">{{user.name}} ({{user.score}})</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {NameDto} from "../../../src/model/types";
    import {QueueEntryDto, RoomAction, RoomState} from "../../../src/model/room/types";
    import {Signal, SignalType} from "../../../src/model/signal/types";
    import {send} from "@/utils";
    import {UserDto} from "../../../src/model/user/types";

    @Component({})
    export default class Room extends Vue {
        @Prop()
        id!: string;

        @Prop()
        user!: NameDto;

        @Prop()
        host!: NameDto;

        @Prop()
        users!: UserDto[];

        @Prop()
        queue!: QueueEntryDto[];

        @Prop()
        state!: RoomState;

        @Prop()
        ws!: WebSocket;

        roomAction = RoomAction;

        sendSignal(action: RoomAction) {
            const signal: Signal = {
                type: SignalType.Room,
                data: {
                    id: this.id,
                    userId: this.user.id,
                    timestamp: Date.now(),
                    action: action
                }
            }

            console.log('start!', signal)

            send(this.ws, signal)
        }

        get players(): UserDto[] {
            return this.users.filter(user => user.id !== this.host.id)
        }

        get isHost(): boolean {
            return this.host.id === this.user.id;
        }

        get isQueued(): boolean {
            return this.queue.length > 0 && this.queue[0].id === this.user.id
        }

        get isAnswering(): boolean {
            return this.queue.length > 0 && this.queue[0].id === this.user.id
        }

        get inProgress(): boolean {
            return this.state === RoomState.InProgress;
        }

        get thereIsAnAnswer(): boolean {
            return this.inProgress && this.queue.length > 0
        }

        mounted() {
        }

        beforeDestroy() {
        }
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