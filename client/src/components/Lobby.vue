<template>
    <div class="block block_column block_high">
        <RoomList
                v-if="!currentRoom"
                :user="user"
                :rooms="rooms"
                :currentRoom="currentRoom"

                @context-signal="onContextSignal"
        />

        <Room
                v-if="currentRoom"
                :room="currentRoom"
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
    import {ContextUpdate} from "../../../src/model/context/types";
    import {NameDto} from "../../../src/model/types";
    import {Signal} from "../../../src/model/signal/types";
    import {send} from "@/utils";
    import Room from "./Room.vue";
    import {QueueEntryDto, RoomState, RoomUpdate} from "../../../src/model/room/types";
    import {UserDto} from "../../../src/model/user/types";
    import RoomList from "@/components/RoomList.vue";

    @Component({components: {RoomList, Room}})
    export default class Lobby extends Vue {
        @Prop()
        username!: string;

        ws: WebSocket | null = null;

        user: NameDto | null = null;

        roomName: string = "";

        rooms: NameDto[] = [];
        currentRoom: NameDto | null = null;

        roomHost!: NameDto;
        roomUsers: UserDto[] = [];
        roomQueue: QueueEntryDto[] = [];
        roomState: RoomState = RoomState.Idle;

        onContextSignal(signal: Signal) {
            send(this.ws!, signal)
        }

        mounted() {
            const base = process.env.VUE_APP_URL;
            const url = `ws://${base}/lobby/${this.username}`;
            this.ws = new WebSocket(url);

            this.ws.onmessage = event => {
                const update: Update = JSON.parse(event.data) as Update;

                if (update.type === UpdateType.Context) {
                    const data = update.data as ContextUpdate;
                    this.rooms = data.rooms;

                    if (this.currentRoom && !this.rooms.find(room => room.id === this.currentRoom!.id)) {
                        this.currentRoom = null
                    }

                } else if (update.type === UpdateType.Room) {
                    const data = update.data as RoomUpdate;

                    if (this.currentRoom && !data.users.find(user => user.id === this.user!.id)) {
                        this.currentRoom = null
                    } else if (!this.currentRoom && data.users.find(user => user.id === this.user!.id)) {
                        this.currentRoom = data.room
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
            };
        }

        beforeDestroy() {
            !!this.ws && this.ws.close();
        }
    }
</script>

<style lang="scss">
</style>