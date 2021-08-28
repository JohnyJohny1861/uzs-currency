<template>
    <div class="Converter">
        <div class="C-content">
            <Heading1 title="Converter" class="mt-4"/>
            <template v-if="isUZS">
                <div class="c-wrapper">
                    <v-btn dark color="color1" class="mr-4"
                           width="40" height="40"
                           @click="isUZS = !isUZS"
                    >
                        <v-icon large>mdi-cached</v-icon>
                    </v-btn>
                    <span class="c-input mr-4">
                        <v-text-field
                                v-model="amountCurrency" label=""
                                outlined dense color="color1" hide-details
                                v-currency="{
                                    currency: null, precision: 2,
                                    locale: 'en-US'
                                }"
                        />
                    </span>
                    <span class="c-input c-currency">
                        <v-select
                                v-model="currency" label=""
                                :items="items"
                                outlined dense hide-details
                                item-text="Ccy"
                                item-value="id"
                                return-object
                        >

                            <template v-slot:selection="data">
                                <span class="c-currFlag">
                                    <div class="c-img">
                                        <div :class="getImg(data.item)"/>
                                    </div>
                                    <span class="c-name">{{ data.item.Ccy }}</span>
                                </span>
                            </template>
                            <template v-slot:item="data">
                                <span class="c-currFlag">
                                    <div class="c-img">
                                        <div :class="getImg(data.item)"/>
                                    </div>
                                    <span class="c-name">{{ data.item.Ccy }}</span>
                                </span>
                            </template>
                        </v-select>
                    </span>
                </div>
                <div class="c-wrapper">
                    <span class="c-equlIcon mr-4">
                        <span class="eq-line"/>
                        <span class="eq-line"/>
                    </span>
                    <span class="c-result">
                        <span class="res-txt">{{ resultUZS | currency }}</span>
                        <span class="c-currFlag">
                            <div class="c-img">
                                <div class="currency-flag currency-flag-uzs"/>
                            </div>
                            <span class="c-name">UZS</span>
                        </span>
                    </span>
                </div>
            </template>
            <template v-else>
                <div class="c-wrapper">
                    <v-btn dark color="color1" class="mr-md-4"
                           width="40" height="40"
                           @click="isUZS = !isUZS"
                    >
                        <v-icon large>mdi-cached</v-icon>
                    </v-btn>
                    <v-text-field
                            v-model="amountUZS" label=""
                            outlined dense color="color1" hide-details
                            v-currency="{
                                currency: null, precision: 2,
                                locale: 'en-US'
                            }"
                    >
                        <template v-slot:append>
                            <span class="c-currFlag pt-1">
                                <div class="c-img">
                                    <div class="currency-flag currency-flag-uzs"/>
                                </div>
                                <span class="c-name">UZS</span>
                            </span>
                        </template>
                    </v-text-field>
                </div>
                <div class="c-wrapper">
                    <span class="c-equlIcon mr-md-4">
                        <span class="eq-line"/>
                        <span class="eq-line"/>
                    </span>
                    <span class="c-result mr-md-4">
                        <span class="res-txt">{{ resultCurrency | currency }}</span>
                    </span>
                    <span class="c-input c-currency">
                        <v-select
                                v-model="currency" label=""
                                :items="items"
                                outlined dense hide-details
                                item-text="Ccy"
                                item-value="id"
                                return-object
                        >

                            <template v-slot:selection="data">
                                <span class="c-currFlag">
                                    <div class="c-img">
                                        <div :class="getImg(data.item)"/>
                                    </div>
                                    <span class="c-name">{{ data.item.Ccy }}</span>
                                </span>
                            </template>
                            <template v-slot:item="data">
                                <span class="c-currFlag">
                                    <div class="c-img">
                                        <div :class="getImg(data.item)"/>
                                    </div>
                                    <span class="c-name">{{ data.item.Ccy }}</span>
                                </span>
                            </template>
                        </v-select>
                    </span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Heading1 from "@/components/UI/Heading1";
import 'currency-flags/dist/currency-flags.min.css';
import {CurrencyDirective} from 'vue-currency-input';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: "Converter",
    components: {Heading1},
    props: {
        currencyData: {type: Array, default: []}
    },
    directives: {
        currency: CurrencyDirective
    },
    data: () => ({
        amountCurrency: 1,
        amountUZS: 10000,
        currency: false,
        isUZS: true
    }),
    methods: {
        ...mapMutations(['setDeletedData']),
        getImg(item) {
            let Ccy = item.Ccy ? item.Ccy.toLowerCase() : ''
            return `currency-flag currency-flag-${Ccy}`
        }
    },
    computed: {
        ...mapGetters(['deletedData']),
        resultUZS() {
            let cur = typeof this.amountCurrency === 'string' ?
                this.amountCurrency.split(',').join('') :
                this.amountCurrency;
            return +cur * (+this.currency.Rate);
        },
        resultCurrency() {
            let uzs = typeof this.amountUZS === 'string' ?
                this.amountUZS.split(',').join('') :
                this.amountUZS;
            return +uzs / (+this.currency.Rate);
        },
        items() {
            let filteredItems = [];
            this.currencyData.forEach(el => {
                let delIndex = this.deletedData && this.deletedData.findIndex(it => it.id === el.id);
                if(delIndex === -1) {
                    filteredItems.push(el)
                }
            });
            return filteredItems;
        }
    },
    watch: {
        currencyData(val) {
            this.currency = val[0];
        },
        deletedData(delData) {
            let i = delData.find(el => el.id === this.currency.id);
            if(i !== -1) {
                this.currency = this.currency = this.items[0];
            }
        }
    },
    mounted() {
        this.currency = this.items[0];
    }
}
</script>

<style lang="scss">
.Converter {
    border-left: 2px solid #e4a216;
    height: 100%;
    padding-left: 90px;
    display: flex;
    align-items: center;

    .C-content {
        margin-top: -90px;
    }

    .c-wrapper {
        max-width: 490px;
        display: flex;
        align-items: center;

        &:not(:last-child) {
            margin-bottom: 25px;
        }

        .c-equlIcon {
            width: 64px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #e4a216;
            height: 40px;
            border-radius: 4px;
            box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%),
            0 2px 2px 0px rgb(0 0 0 / 14%),
            0 1px 5px 0px rgb(0 0 0 / 12%);

            .eq-line {
                width: 50%;
                height: 4px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 16px;

                &:not(:last-child) {
                    margin-bottom: 6px
                }
            }
        }

        .c-result {
            flex: 1;
            border: 1px solid rgba(0, 0, 0, 0.42);
            border-radius: 4px;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 8px;
        }
    }

    .c-currency {
        flex: 1;
    }

    @media (max-width: 960px) {
        border-left: none;
        width: 100%;
        height: 220px;
        padding-left: 0;
        justify-content: center;
        .C-content {
            margin-top: -60px;
        }
    }
}

.c-currFlag {
    width: 70px;
    display: flex;
    align-items: center;

    .c-img {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;

        .currency-flag {
            box-shadow: 0 3px 1px -2px rgb(0 0 0 / 18%),
            0 2px 2px 0px rgb(0 0 0 / 12%),
            0 1px 5px 0px rgb(0 0 0 / 8%);
        }
    }

    .c-name {
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 14px;
    }
}
</style>
