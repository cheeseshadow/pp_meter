<template>
    <div :class="['user-list', reverse ? 'user-list_reverse' : '']">
        <div :class="['user-list__item', (activeUserId && activeUserId === user.id) ? 'user-list__item_active' : '']"
             v-for="user in users" :key="'room_' + user.id">
            <div class="user-list__item_name">
                {{user.name}}
            </div>
            <div>
                {{user.score}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {NameDto} from "../../../src/model/types";

    @Component({})
    export default class Room extends Vue {
        @Prop()
        reverse!: boolean

        @Prop()
        users!: NameDto[]

        @Prop()
        activeUserId: string | undefined
    }
</script>

<style lang="scss">
    .user-list {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;

        &_reverse {
            flex-wrap: wrap-reverse;
        }

        &__item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-image: linear-gradient(-225deg, #F2F0FA 0%, #DCD8EB 100%);
            padding: 32px 32px;
            margin: 8px;
            width: 160px;
            height: 84px;
            border-radius: 12px;

            &_name {
                font-weight: 700;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 136px;
                flex: 0 0 26px;
            }

            &_active {
                background-image: linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);
                color: #fff;
            }
        }
    }
</style>