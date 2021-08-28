<template>
    <div class="Home">
        <AlertError v-model="alert" />
        <v-container>
            <v-row>
                <v-col cols="12" md="5" class="pickerCol my-md-4">
                    <Heading1 :title="'Exchange rates on ' + getTitle()" />
                    <v-date-picker
                            v-model="date"
                            :allowed-dates="allowedDates"
                            full-width elevation="4"
                            color="color1"
                    />
                </v-col>
                <v-col cols="12" md="7">
                    <Converter v-if="currencyData.length > 0" :currencyData="currencyData"/>
                </v-col>
            </v-row>
        </v-container>
        <v-row class="mt-10">
            <CurrencyTable :currencyData="currencyData" :loading="loading"/>
        </v-row>
    </div>
</template>

<script>
import Heading1 from "@/components/UI/Heading1";
import Converter from "@/components/Converter";
import axios from "@/axios";
import moment from "moment";
import AlertError from "@/components/UI/AlertError";
import CurrencyTable from "@/components/CurrencyTable";
export default {
    name: 'Home',
    components: {CurrencyTable, AlertError, Converter, Heading1},
    data: () => ({
        date: moment().format("YYYY-MM-DD"),
        currencyData: [],
        loading: false,
        alert: {success: false, error: false, msg: false},
    }),
    methods: {
        async getCurrencyData(val) {
            let date = moment(val || this.date).format('DD/MM/YYYY');
            try {
                let formData = new FormData();
                if(date) { formData.append('date', date)}
                const {data} = await axios('common/json/', {
                    method: "POST",
                    headers: { "Content-Type": "multipart/form-data" },
                    data: formData
                });
                this.currencyData = data;
            }
            catch (err) {
                this.alert = {success: false, error: true, msg: "Oops something went wrong"};
                console.log(err)
            }
        },
        getTitle() { return moment(this.date).format('MMMM Do YYYY')},
        allowedDates(val) {
            let date = moment(val);
            let today = moment();
            return date.isSameOrBefore(today);
        },
    },
    watch: {
        async date(newVal) {
            await this.getCurrencyData(newVal)
        }
    },
    async mounted() {
        await this.getCurrencyData();
    }
}
</script>
<style scoped lang="scss">
    .Home {
        position: relative;
        padding: 50px 0;
        max-width: 1400px;
        margin: 0 auto;
        .pickerCol {
            padding-right: 90px;
            @media (max-width: 960px) {
                padding-right: 12px;
            }
        }
    }
</style>

