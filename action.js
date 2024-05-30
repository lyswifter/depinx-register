const {
    onMounted,
    onUpdated,
    onUnmounted,
    ref,
    reactive,
    getCurrentInstance
} = Vue;

//Define Vue app
const App = {
    data() {
        return {
            input: ref(""),
            message: "Press Me!",
            form: {
                email: '',
                code: '',
                nftNum: 1,
                tgName: '',
            },
            uploadUrl: "https://data-center.skyipfs.com" + "/api/aethir/",
        };
    },
    methods: {
        // do not use same name with ref
        validateEmail(email) {
            var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
            return reg.test(email);
        },

        async onSubmit() {
            if (this.form.email == '') {
                this.$notify({
                    title: "Warning",
                    message: "Email address must be filled!",
                    type: "warning",
                });
                return
            }

            if (!this.validateEmail(this.form.email)) {
                this.$notify({
                    title: "Error",
                    message: "Please type a validated email address!",
                    type: "error",
                });
                return
            }

            if (!this.form.nftNum) {
                this.$notify({
                    title: "Warning",
                    message: "Nft number must be filled!",
                    type: "warning",
                });
                return
            }

            if (!this.form.tgName) {
                this.$notify({
                    title: "Warning",
                    message: "telegram name must be filled!",
                    type: "warning",
                });
                return
            }

            let ret = await axios.post(this.uploadUrl, {
                'email': this.form.email,
                'code': this.form.code,
                'nft_num': this.form.nftNum,
                'tg_name': this.form.tgName,
            })

            if (ret.status == 200) {
                console.log(ret)
                this.$notify({
                    title: "Success",
                    message: "Upload successed!",
                    type: "success",
                });
            } else {
                this.$notify({
                    title: "Error",
                    message: ret.data.message,
                    type: "error",
                });
            }
        },

        reloadAction() {
            location.reload();
        }
    },

    setup(props, context) {
        onMounted(() => {
            // Lets digg into app
            // console.info("App mounted!");
            // console.info("Vue version", app.version);
            console.info("Element Plus version", ElementPlus.version);
            // console.info("app", app);
            // console.info("props", props);
            // console.info("context", context);
            // console.info("getCurrentInstance()", getCurrentInstance());
            // An example how to call methods
            // let _this = getCurrentInstance().withProxy;
            // console.info("this", _this);
        });
        onUpdated(() => {
            console.info("App updated!");
        });
        onUnmounted(() => {
            console.info("App unmounted!");
        });
    }
};

// Create new Vue app
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");
