<template>
    <v-card width="100%" color="color1">
        <v-data-table
                :options.sync="options"
                :headers="headers"
                :items="loading ? [] : items"
                :footer-props="footers"
                :loading="loading"
        >
            <template v-slot:body="{ items }">
                <tbody>
                <tr v-for="el in items" :key="el.id" >
                    <td>
                        <div class="c-img">
                            <div :class="getImg(el)"/>
                            {{ el.currencies }}
                        </div>
                    </td>
                    <td>{{ el.symbol_code }}</td>
                    <td>{{ el.number_code }}</td>
                    <td>
                        <span :class="'trend-' + el.trend">{{ el.change }}</span>
                        <v-icon class="ml-1" :color="'color_'+el.trend" style="margin-top: -3px">
                            {{ 'mdi-trending-' + el.trend }}
                        </v-icon>
                    </td>
                    <td>{{ el.exchange_rate | currency }}</td>
                    <td>
                        <v-icon @click="onDelete(el)" small color="error">
                            mdi-delete
                        </v-icon>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-data-table>

        <ModalDelete v-model="deleteModal" @deleted="itemDeleted" />
    </v-card>
</template>

<script>
import ModalDelete from "@/components/UI/ModalDelete";
import { mapGetters, mapMutations } from 'vuex';
export default {
    name: "CurrencyTable",
    components: {ModalDelete},
    props: {
        currencyData: { type: Array, default: [] },
        loading: { type: Boolean, default: false }
    },
    data: () => ({
        headers: [
            { text: 'Currencies', value: 'currencies', sortable: false },
            { text: 'Symbol code', value: 'symbol_code', sortable: false },
            { text: 'Number code', value: 'number_code', sortable: false },
            { text: 'Change', value: 'change' },
            { text: 'Exchange rate', value: 'exchange_rate' },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        footers: {
            itemsPerPageOptions: [25, 50, 100]
        },
        options: { itemsPerPage: 25, page: 1 },

        deleteModal: false,
        deletingItem: false,
    }),
    methods: {
        ...mapMutations(['setDeletedData']),
        onDelete(el) {
            this.deletingItem = el;
            this.deleteModal = true;
        },
        itemDeleted() {
            if(this.deletingItem) {
                let delData = [...this.deletedData];
                let i = delData.findIndex(el => el.id === this.deletingItem.id);
                if(i === -1) { delData.push(this.deletingItem); }
                this.setDeletedData(delData);
            }
        },
        getImg(el) {
            let Ccy = el.Ccy ? el.Ccy.toLowerCase() : ''
            return `currency-flag currency-flag-${Ccy}`
        },
    },
    computed: {
        ...mapGetters(['deletedData']),
        items() {
            let filteredItems = [];
            this.currencyData.forEach(el => {
                let delIndex = this.deletedData && this.deletedData.findIndex(it => it.id === el.id);
                if(delIndex === -1) {
                    filteredItems.push({
                        ...el,
                        trend: el.Diff.includes('-') ? 'down' : 'up',
                        currencies: `${el.Nominal} ${el.CcyNm_EN}`,
                        symbol_code: el.Ccy,
                        number_code: el.Code,
                        change: el.Diff.includes('-') ? el.Diff : `+${el.Diff}`,
                        exchange_rate: el.Rate,
                    })
                }
            });
            return filteredItems;
        }
    },
    mounted() {
        let delData = JSON.parse(localStorage.getItem('deletedData'));
        if(delData && delData.length > 0) { this.setDeletedData(delData) }
    }
}
</script>

<style scoped lang="scss">
    .trend-up { margin-right: 2px; color: #219653 }
    .trend-down { margin-right: 2px; color: #EB5757 }
    .c-img {
        display: flex;
        align-items: center;

        .currency-flag {
            margin-right: 5px;
            box-shadow: 0 3px 1px -2px rgb(0 0 0 / 18%),
            0 2px 2px 0px rgb(0 0 0 / 12%),
            0 1px 5px 0px rgb(0 0 0 / 8%);
        }
    }
</style>
