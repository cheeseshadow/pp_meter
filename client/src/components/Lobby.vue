<template>
    <div class="block block_column block_high">
        <div>Ultra header</div>

        <div class="lobby" v-if="!currentRoom">
            <div class="room-list">
                <div
                        class="room-item"
                        v-for="room in rooms"
                        :key="room.id"
                        @click="joinRoom(room)"
                >{{room.name}} ({{room.id}})
                </div>
            </div>
            <div class="control">
                <button @click="createRoom()">Create room</button>
            </div>
        </div>

        <Room
                v-if="currentRoom"
                :id="currentRoom"
                :user="user"
                :host="roomHost"
                :users="roomUsers"
                :state="roomState"
                :queue="roomQueue"
                :ws="ws"
        />
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Init, Update, UpdateType} from "../../../src/model/update/types";
    import {ContextAction, ContextUpdate} from "../../../src/model/context/types";
    import {NameDto} from "../../../src/model/types";
    import {Signal, SignalType} from "../../../src/model/signal/types";
    import {send} from "@/utils";
    import Room from "./Room.vue";
    import {QueueEntryDto, RoomState, RoomUpdate} from "../../../src/model/room/types";
    import {UserDto} from "../../../src/model/user/types";
    import NewRoomDialog from "@/components/NewRoomDialog.vue";

    @Component({components: {Room}})
    export default class Lobby extends Vue {
        @Prop()
        username!: string;

        ws!: WebSocket;

        user!: NameDto;

        roomName: string = "";

        rooms: NameDto[] = [];
        currentRoom: string = "";

        roomHost!: NameDto;
        roomUsers: UserDto[] = [];
        roomQueue: QueueEntryDto[] = [];
        roomState: RoomState = RoomState.Idle;

        createRoom() {
            this.$modal.show(NewRoomDialog, {}, {}, {
                'accept': (roomName: any) => {
                    if (!roomName) {
                        return;
                    }

                    const signal: Signal = {
                        type: SignalType.Context,
                        data: {
                            roomId: roomName,
                            action: ContextAction.Create
                        }
                    };

                    send(this.ws, signal);
                }
            })
        }

        joinRoom(room: NameDto) {
            const signal: Signal = {
                type: SignalType.Context,
                data: {
                    roomId: room.id,
                    action: ContextAction.Join
                }
            };

            send(this.ws, signal);
        }

        mounted() {
            console.log("soochara!", this.user);

            const base = process.env.VUE_APP_URL;
            const url = `ws://${base}/lobby/${this.username}`;
            this.ws = new WebSocket(url);

            this.ws.onmessage = event => {
                const update: Update = JSON.parse(event.data) as Update;

                if (update.type === UpdateType.Context) {
                    const data = update.data as ContextUpdate;
                    this.rooms = data.rooms;

                    if (this.currentRoom && !this.rooms.find(room => room.id === this.currentRoom)) {
                        this.currentRoom = ''
                    }

                } else if (update.type === UpdateType.Room) {
                    const data = update.data as RoomUpdate;

                    if (this.currentRoom && !data.users.find(user => user.id === this.user.id)) {
                        this.currentRoom = ''
                    } else if (!this.currentRoom && data.users.find(user => user.id === this.user.id)) {
                        this.currentRoom = data.id;
                    }

                    if (this.currentRoom) {
                        this.roomHost = data.host;
                        this.roomUsers = data.users;
                        this.roomState = data.state;
                        this.roomQueue = data.queue;
                    }

                } else if (update.type === UpdateType.Init) {
                    const data = update.data as Init;
                    this.user = {
                        id: data.id,
                        name: this.username
                    };
                }

                // console.log(update);
            };
        }

        beforeDestroy() {
            console.log("fuck");
            !!this.ws && this.ws.close();
        }
    }
</script>

<style lang="scss" scoped>
    .lobby {
        display: flex;
    }

    .room-list {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .room-item {
        padding: 12px;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;

        &:hover {
            background: #e6e6e6;
            cursor: pointer;
        }
    }

    .control {
        flex: 1;
    }
</style>