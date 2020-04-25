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
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ContextAction} from "../../../src/model/context/types";
    import {NameDto} from "../../../src/model/types";
    import {Signal, SignalType} from "../../../src/model/signal/types";
    import Room from "./Room.vue";
    import NewRoomDialog from "@/components/NewRoomDialog.vue";

    @Component({components: {Room}})
    export default class Lobby extends Vue {
        @Prop()
        ws!: WebSocket;

        @Prop()
        user: NameDto | null = null;

        @Prop()
        rooms!: NameDto[];

        @Prop()
        currentRoom: string = "";

        roomName: string = "";

        createRoom() {
            this.$modal.show(NewRoomDialog, {}, {
                height: 330,
                width: 520,
                adaptive: true
            }, {
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

                    this.$emit('context-signal', signal)
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

            this.$emit('context-signal', signal)
        }

        mounted() {
        }

        beforeDestroy() {
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