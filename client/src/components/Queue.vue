<template>
    <div class="room-queue">
        <div class="room-queue__item" v-for="user in queue" :key="user.id">
            <div class="room-queue__item_name">
                {{user.name}}
            </div>
            <div class="room-queue__item_time">
                +{{formatTime(user.time)}}
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {QueueEntryDto} from "../../../src/model/room/types";

    type Dto = {
        name: string,
        time: number
    }

    @Component({})
    export default class Queue extends Vue {
        @Prop()
        users!: QueueEntryDto[]

        get queue() {
            if (this.users.length === 0) {
                return []
            }

            const first = this.users[0].timestamp
            return this.users.map(user => {
                return {
                    name: user.name,
                    time: user.timestamp - first
                }
            })
        }

        formatTime(time: number) {
            if (time < 1000) {
                return `${time}ms`
            }

            return `${Math.floor(time / 1000)}s`
        }
    }
</script>

<style lang="scss">
    .room-queue {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 8px;

        &__item {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px 24px;
            margin-bottom: 12px;
            background-color: #f2f0fa;
            border-radius: 12px;
            /*min-width: 120px;*/
            /*max-width: 240px;*/
            /*margin: 0 32px;*/

            &_name {
                flex: 1;
                overflow: hidden;
                margin-right: 4px;
            }

            &_time {
                flex: 0 0 60px;
                display: flex;
                justify-content: flex-end;
                overflow: hidden;
            }
        }
    }
</style>