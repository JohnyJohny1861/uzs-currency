<template>
    <v-dialog :value="value"
              @input="$emit('input', $event.target.value)"
              @click:outside="$emit('input', false)"
              @keydown.esc="$emit('input', false)"
              :max-width="width">
        <v-card class="pa-4">
            <v-card-text class="mb-4">
                <div class="del-text">
                    <h3 class="dt-title">{{ title }}</h3>
                    <v-divider />
                    <h4 class="dt-subtitle">{{ subtitle }}</h4>
                </div>
                <v-divider />
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <div>
                    <v-btn color="light"
                           class="mr-3 px-6" outlined
                           :disabled="loading"
                           @click="$emit('input', false)">
                        Cancel
                    </v-btn>
                    <v-btn color="colorBtn"
                           class="px-6 delBtn" dark
                           @click="onDelete">
                        Delete
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "ModalDelete",
    props: {
        value: Boolean,
        width: { type: String, default: '600px' },
        title: { type: String, default: "Confirm delete" },
        subtitle: { type: String, default: "Are you sure you want to delete?" },
    },
    data: () => ({
        loading: false,
        timer: false,
    }),
    methods: {
        onDelete() {
            this.$emit('input', false);
            this.$emit('deleted');
        },
        sleep(time) {
            return new Promise(res => setTimeout(res, time) )
        },
    },
    watch: {
        async value(newVal) {
            if(newVal) {
                await this.sleep(100);
                let delBtn = document.querySelector('.delBtn');
                if(delBtn) {
                    delBtn.focus();
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.del-text {
    .dt-title {
        margin: 10px 0 15px;
        font-weight: 700;
        font-size: 21px;
        line-height: 25px;
        letter-spacing: 0.15px;
        color: #000000;
    }
    .dt-subtitle {
        margin: 10px 0 15px;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 20px;
        letter-spacing: 0.15px;
        color: #e4a216;
    }
}

</style>
