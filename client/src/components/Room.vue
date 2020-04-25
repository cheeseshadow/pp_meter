<template>
    <div :class="room">
        <div v-if="inProgress" class="room__in-progress"></div>

        <div class="room__header header">
            {{room.name}}
        </div>

        <div class="room__table">
            <UserList class="room__list" :users="leftPlayers" :activeUserId="activePlayerId" reverse="true"/>

            <Queue class="room__queue" :users="queue"></Queue>

            <UserList class="room__list" :activeUserId="activePlayerId" :users="rightPlayers"/>
        </div>

        <div class="room__control">
            <div v-if="!isHost" class="block">
                <button @click="sendSignal(roomAction.Queue)" :disabled="!inProgress">ultra button</button>
                <button v-if="isQueued && !isAnswering" @click="sendSignal(roomAction.Unqueue)">withdraw!</button>
            </div>

            <div v-if="isHost" class="block block_wide">
                <button class="btn room__btn" v-if="!inProgress" @click="sendSignal(roomAction.StartRound)">Start
                    round
                </button>
                <button :class="['btn', 'btn_white', activePlayerId ? 'room__btn_left' : '']" v-if="inProgress"
                        @click="sendSignal(roomAction.EndRound)">End round
                </button>
                <button class="btn btn_green room__btn" v-if="thereIsAnAnswer"
                        @click="sendSignal(roomAction.AcceptAnswer)">
                    Accept
                </button>
                <button class="btn btn_yellow room__btn" v-if="thereIsAnAnswer"
                        @click="sendSignal(roomAction.AcceptHalf)">Half
                </button>
                <button class="btn btn_red room__btn" v-if="thereIsAnAnswer"
                        @click="sendSignal(roomAction.RejectAnswer)">Reject
                </button>
                <button class="btn btn_white room__btn_right" v-if="thereIsAnAnswer"
                        @click="sendSignal(roomAction.Unqueue)">Skip
                </button>
            </div>
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
    import UserList from "@/components/UserList.vue";
    import Queue from "@/components/Queue.vue";

    @Component({
        components: {Queue, UserList}
    })
    export default class Room extends Vue {
        @Prop()
        room!: NameDto;

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
                    id: this.room.id,
                    userId: this.user.id,
                    timestamp: Date.now(),
                    action: action
                }
            }

            send(this.ws, signal)
        }

        get leftPlayers(): UserDto[] {
            return this.players.filter((user, index) => index % 2 === 0)
        }

        get rightPlayers(): UserDto[] {
            return this.players.filter((user, index) => index % 2 === 1)
        }

        get players(): UserDto[] {
            return this.users.filter(user => user.id !== this.host.id)
        }

        get activePlayerId(): (string | undefined) {
            return this.queue.length > 0 ? this.queue[0].id : undefined
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
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;

        &__btn {
            &:not(:last-child) {
                margin-right: 12px;
            }

            &_left {
                margin-left: 20px;
                margin-right: auto;
            }

            &_right {
                margin-right: 20px;
                margin-left: auto;
            }
        }

        &__header {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 32px;
        }

        &__table {
            display: flex;
            flex: 1;
            // cumulative padding of header and footer
            height: calc(100vh - 214px);
        }

        &__queue {
            display: flex;
            flex-direction: column;
            flex: 2;
            overflow: hidden;
            margin: 0 24px;
        }

        &__list {
            flex: 3;
            overflow: hidden;
        }

        &__control {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 0 0 42px;
            margin-top: 32px;
            margin-bottom: 20px;
        }

        &__in-progress {
            @keyframes pulse {
                from {
                    opacity: .5;
                }
                to {
                    opacity: 1;
                }
            }

            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            border: 8px solid;
            border-image-source: linear-gradient(-225deg, #AC32E4 0%, #4801FF 100%);
            border-image-slice: 1;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            animation-name: pulse;
            animation-duration: 1s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            animation-timing-function: ease;
        }
    }

    .control {
        flex: 1;
    }

    .block {
        margin: 4px;
    }
</style>