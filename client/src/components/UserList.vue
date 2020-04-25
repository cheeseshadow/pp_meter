<template>
    <div :class="['user-list', reverse ? 'user-list_reverse' : '']">
        <div class="user-list__item" v-for="user in users" :key="'room_' + user.id">
            <div>
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
        users!: NameDto[]

        @Prop()
        reverse!: boolean
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
            background: #4285F4;
            padding: 32px 32px;
            margin: 8px;
            width: 160px;
            height: 84px;
            box-sizing: border-box;
            /*min-width: 120px;*/
            /*max-width: 240px;*/
            /*margin: 0 32px;*/

            &:not(:last-child) {
                /*margin-bottom: 60px;*/
            }
        }
    }
</style>