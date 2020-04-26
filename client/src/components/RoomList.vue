<template>
    <div class="block block_column block_high">
        <div class="header">Room list</div>

        <div class="room-list">
            <div class="room-list__item room-list__item_empty" v-if="rooms.length === 0">List is empty</div>
            <div class="room-list__item room-list__item_selectable"
                 v-for="room in rooms"
                 :key="room.id"
                 @click="joinRoom(room)">
                {{room.name}}
            </div>
        </div>

        <div class="control">
            <button class="btn" @click="createRoom()">Create room</button>
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
        user!: NameDto;

        @Prop()
        rooms!: NameDto[];

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
    .room-list {
        display: flex;
        flex-direction: column;
        height: 40vh;
        width: 400px;
        margin-bottom: 32px;
        box-sizing: border-box;

        &__item {
            display: flex;
            justify-content: center;
            line-height: 32px;
            padding: 8px 24px;

            &_empty {
                color: #aaa;
            }

            &_selectable {
                cursor: pointer;

                &:hover {
                    background: #f2f0fa;
                }
            }
        }
    }
</style>