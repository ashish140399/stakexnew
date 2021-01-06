<template>
<div id="backgroundImage" style="background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;">
  <!-- Header -->
  <nav class="navbar navbar-expand-md wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.20s">
      <div class="container">
          <router-link to="/"><a class="navbar-brand" href="index.html"><img src="./assets/images/logo.png" alt="LOGO"></a></router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span class="navbar-toggler-icon"></span>
              <span class="navbar-toggler-icon"></span>
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <router-link class="nav-link" to="/stake">Stake</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link" to="/auction">Auction</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link" to="/referral">Referral</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link" to="/dividends">Dividends</router-link>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Contract</a>
                  </li>
              </ul>
              <ul class="navbar-nav nav-right">
                  <li class="nav-item auc-main">
                      <a class="nav-link" style="width:200px">
                        <countdown  :time="countdownTime" :transform="transform">
                          <template slot-scope="props"> <a class="nav-link" style="padding:0">Auction Ends {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}</a></template>
                        </countdown>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
  <!-- Header -->

  <div>
    <router-view></router-view>
  </div>


  <!-- Footer -->
  <footer class="wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.60s">
    <div class="container">
      <div class="footer-wrapper">
        <div class="footer-logo">
          <a href="#"><img src="./assets/images/logo.png" alt="icon" style="width:auto"></a>
        </div>
        <div class="footer-nav">
          <ul>
            <li>
                <router-link to="/stake">Stake</router-link>
            </li>
            <li>
                <router-link to="/auction">Auction</router-link>
            </li>
            <li>
                <router-link to="/referral">Referral</router-link>
            </li>
            <li>
                <router-link to="/dividends">Dividends</router-link>
            </li>
            <li>
                <a href="#">Contract</a>
            </li>
          </ul>
        </div>
        <div class="footer-btn">
          <a href="#" class="auc-main">
            <countdown  :time="countdownTime" :transform="transform">
              <template slot-scope="props"> <a class="nav-link" style="padding:0">Auction Ends {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}</a></template>
            </countdown>
          </a>
        </div>
      </div>
      <div class="footer-company">
          <a href="#"><img src="./assets/images/vimerco.png" alt="icon"></a>
      </div>
    </div>
  </footer>
</div>
</template>

<script>

import './assets/js/jquery.min.js';
import './assets/js/popper.min.js';
import './assets/js/bootstrap.min.js';
import WOW from './assets/js/wow.min.js';

/* eslint-disable no-unused-vars */
import moment from "moment-timezone";
import { contractAddress, zeroAddress } from "./config";



let holder,
    clcD1 = true,
    clcD2 = true;

export default {
    name: "App",
    data: () => ({
        countdownTime: null,
        group: null,
        drawer: false,
        events: [],
        stVal1: null,
        stVal12: null,
        stVal8: null,
        myEndedStakesList: null,
        stakeData: {
            entered_amount: 0,
            entered_days: 0,
            currentDay: void 0,
            stakingShare: void 0,
            clc_1: 0,
            clc_2: 0,
            shareRate: 0,
        },
        myAccAdd: "",
        mainContract: null,
        currentDay: null,
        yourTokenBalanceHd: "",
        user: {
            address: null,
            balance: null,
            referrer: zeroAddress,
        },
        background,
    }),
    watch: {
        group() {
            this.drawer = false;
        },
    },
    methods: {
        transform(props) {
            Object.entries(props).forEach(([key, value]) => {
                // Adds leading zero
                const digits = value < 10 ? `0${value}` : value;

                // uses singular form when the value is less than 2
                const word = value < 2 ? key.replace(/s$/, '') : key;

                props[key] = `${digits}`;
            });

            return props;
        },
        accessCookie(_0xe5a7x3a) {
            let _0xe5a7x3b = _0xe5a7x3a + "=";
            let _0xe5a7x3c = document["cookie"]["split"](";");
            for (
                let _0xe5a7x3d = 0; _0xe5a7x3d < _0xe5a7x3c["length"]; _0xe5a7x3d++
            ) {
                let _0xe5a7x3e = _0xe5a7x3c[_0xe5a7x3d]["trim"]();
                if (_0xe5a7x3e["indexOf"](_0xe5a7x3b) == 0) {
                    return _0xe5a7x3e["substring"](
                        _0xe5a7x3b["length"],
                        _0xe5a7x3e["length"]
                    );
                }
            }
            return "";
        },

        validateAddress(_0xe5a7x40) {
            if (typeof _0xe5a7x40 !== "string") {
                return false;
            }
            if (_0xe5a7x40[0] === "T" && _0xe5a7x40["length"] == 34) {
                return true;
            }
            return false;
        },
        updateHeadAddress() {
            const abrAddress = this.user["address"]["slice"](34 - 5);
            this.myAccAdd = this.user["address"]["slice"](0, 5) + "..." + abrAddress;
        },
        setUpContracts(address) {
            if (!contractAddress && !address) {
                return null;
            }
            window.tronWeb["contract"]()["at"](
                contractAddress || address,
                (data1, data2) => {
                    if (!data1) {
                        this.mainContract = data2;
                        //this.$store.commit('mainContract', data2);
                        this.mainContract.stakeLists().call({
                            address: this.user.address,
                        });
                        //console.log('mainn==>>>', )
                        this.contractLoaded();
                    } else {
                        console.error("data1 error==>>", data1);
                    }
                }
            );
        },
        contractLoaded() {
            if (!this.user.address) {
                return;
            }
            this.getUserBalance();
            setInterval(() => {
                this.getUserBalance();
            }, 1000 * 6);
            this.getCurrentDay();
            const _0xe5a7x1c = setInterval(() => {
                if (this.currentDay) {
                    clearInterval(_0xe5a7x1c);
                    // console.log('run_Stake==>>>', typeof run_Stake, 'run_Auction==>>', typeofrun_Auction, 'run_Dividends')
                    if (typeof this.run_Stake === "function") {
                        this.run_Stake();
                    }
                    if (typeof this.run_Auction === "function") {
                        //run_Auction();
                    }
                    if (typeof this.run_Dividends === "function") {
                        //run_Dividends();
                    }
                }
            }, 100);
        },
        getUserBalance() {
            this.mainContract
                .balanceOf(this.user.address)
                .call({
                    shouldPollResponse: false,
                })
                .then((_0xe5a7x3) => {
                    this.user["balance"] =
                        parseFloat(window.tronWeb.fromSun(_0xe5a7x3)) / 100;
                    this.yourTokenBalanceHd =
                        "Your D2X balance: " + this.user["balance"]["toLocaleString"]();
                });
        },
        getCurrentDay() {
            this.mainContract
                .globalInfo()
                .call({
                    shouldPollResponse: true,
                })
                .then((_0xe5a7x3) => {
                    this.currentDay =
                        window.tronWeb.fromSun(_0xe5a7x3[4]._hex) * this.SUN;
                });
        },
        run_Stake(nIrstRn) {
            console.log("in run_Stake==>>>");
            this.mainContract
                .globalInfo()
                .call({
                    shouldPollResponse: true,
                })
                .then((res) => {
                    this.stakeData.stakingShare =
                        window.tronWeb.fromSun(res[2]["_hex"]) * this.SUN;
                    this.stVal1 = this.currentDay + 1;

                    this.stakeData.shareRate =
                        (100000 / this.stakeData.stakingShare) * 100000000;
                    this.stVal12 =
                        this.abbreviate_number(this.stakeData.shareRate, 2) + "/D2X";
                });

            this.mainContract
                .xfLobby(this.currentDay)
                .call({
                    shouldPollResponse: true,
                })
                .then((res) => {
                    this.stVal8 =
                        this.abbreviate_number(window.tronWeb.fromSun(res._hex), 2) +
                        " TRX";
                });

            if (nIrstRn) return;

            this.getMyEndedStakes();
            // getDaysData();
            // estimateNextDay();
        },
        abbreviate_number(_0xe5a7x20, _0xe5a7x21) {
            let _0xe5a7x22 = parseFloat(_0xe5a7x20);
            // if (_0xe5a7x22 === null) {
            //     return null;
            // }
            // if (_0xe5a7x22 === 0) {
            //     return "0";
            // }
            // _0xe5a7x21 = !_0xe5a7x21 || _0xe5a7x21 < 0 ? 0 : _0xe5a7x21;
            // const _0xe5a7x23 = _0xe5a7x22["toPrecision"](2)["split"]("e"),
            //     _0xe5a7x24 =
            //     _0xe5a7x23["length"] === 1 ?
            //     0 :
            //     Math["floor"](Math["min"](_0xe5a7x23[1]["slice"](1), 14) / 3),
            //     _0xe5a7x25 =
            //     _0xe5a7x24 < 1 ?
            //     _0xe5a7x22["toFixed"](0 + _0xe5a7x21) :
            //     (_0xe5a7x22 / Math["pow"](10, _0xe5a7x24 * 3))["toFixed"](
            //         1 + _0xe5a7x21
            //     ),
            //     _0xe5a7x26 = _0xe5a7x25 < 0 ? _0xe5a7x25 : Math["abs"](_0xe5a7x25),
            //     response = _0xe5a7x26 + ["", "K", "M", "B", "T"][_0xe5a7x24];
            // return response;
            return _0xe5a7x22;
        },

        async getMyEndedStakes() {},
        renderMyEndedStakes(data) {},
    },
    mounted() {
        this.countdownTime = moment.utc().add(1, 'day').startOf("day").tz("Etc/UTC").valueOf() - moment.utc().tz("Etc/UTC").valueOf();

        if (this.accessCookie("ref")["length"] > 0) {
            if (this.validateAddress(this.accessCookie("ref"))) {
                this.user["referrer"] = this.accessCookie("ref");
            }
        }
    },
    updated() {
        new WOW.WOW().init();
    },
    async created() {

        console.log("created in app");
        const loginPromise = new Promise((resolve, reject) => {
                if (window["tronWeb"] && window["tronWeb"]["ready"]) {
                    resolve(true);
                } else {
                    window["addEventListener"]("load", () => {
                        let poller = setInterval(() => {
                            if (window["tronWeb"] && window["tronWeb"]["ready"]) {
                                resolve(true);
                            }
                            clearInterval(poller);
                        }, 200);
                        setTimeout(() => {
                            clearInterval(poller);
                        }, 10000);
                    });
                }
            })
            .then(() => {
                console["log"]("Tronweb installed and logged in");
                return true;
            })
            .catch((e) => {
                console["error"]("Error while detecting tronweb", e);
                return false;
            });

        await loginPromise["then"]((data2) => {
            return new Promise((resolve, reject) => {
                const userAddress = window["tronWeb"]["defaultAddress"]["base58"];
                if (!userAddress) {
                    return resolve(false);
                }
                this.user.address = userAddress;
                let formatToHexAddress = window.tronWeb.address.toHex(userAddress);
                formatToHexAddress = "0x" + formatToHexAddress.slice(2);
                this.updateHeadAddress();
                setInterval(() => {
                    if (
                        window["tronWeb"] &&
                        this.user["address"] !==
                        window["tronWeb"]["defaultAddress"]["base58"]
                    ) {
                        location["reload"]();
                    }
                }, 700);
            });
        });
    },
};
</script>



<style>
@import "./assets/css/font-awesome.min.css";
@import "./assets/css/animate.css";
@import "./assets/css/bootstrap.min.css";
@import "./assets/css/style.css";
@import "./assets/css/styles.css";
@import "./assets/css/responsive.css";


#app {
    background-color: var(--v-background-base);
    background-image: url("./assets/images/brilliant.png");
    background-repeat: repeat;
}

@media (min-width: 1351px){
.container {
    width: 1250px !important;
    max-width: 1250px !important;
}
}
th.text-start{
  color: #8d90c5 !important;
  width: auto !important;
}
th.text-start > i{
  color:white !important;
}
th.text-center{
  color: #8d90c5 !important;
  width: auto !important;
}
td.text-start{
  color:white !important;
}
td.text-center{
  color:white !important;
}
.v-data-footer{
  color:white !important;
}
.v-select__selection{
  color:white !important;
}
.v-input__icon--append > i{
  color:white !important;
}
.v-btn__content > i{
  color:white !important;
}
.v-data-footer__icons-after > button > span > i{
  color:white !important;
}
.radius-20{
  border-radius: 20px !important;
}
.elevation-0{
  box-shadow: none !important;
}
.blue-table{
  background-color: #171b6e !important;
  margin-bottom: 20px !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: #eeeeee2e !important;
}
.v-dialog__container {
    display: block !important;
}
.v-text-field--outlined .v-label--active {
    margin-left: -19px !important;
}
footer {
    max-width: none !important;
    margin: 0 auto !important;
}
.v-dialog {
    border-radius: 20px !important;
    background-color: #3950c1 !important;
    border-width: 2px !important;
    border-color: white !important;
    border-style: solid !important;
}
#backgroundImage > div > div > div > div > div:nth-child(1) > div > div > div > div > div.p-2.v-card.v-sheet.theme--dark {
    box-shadow: none !important;
    background-color: #3950c1 !important;
}
.v-system-bar  {
    border-radius: 20px !important;
    background-color: #3950c1 !important;
}
#referralInput{
  color: white!important;
}
#backgroundImage > div > div > div > div.row.ml-4.mr-4.blue-table.radius-20 > div > div > div.v-input__slot > fieldset{
  color: white!important;
}
#backgroundImage > div > div > div > div.row.ml-4.mr-4.blue-table.radius-20 > div > div > div.v-input__slot > div > label{
  color: white!important;
  margin-left: -2px
}
#backgroundImage > div > div > section > div > div > div > div.col-lg-8 > div.stake-active-table.wow.fadeInRight > div:nth-child(1) > div.v-data-table.elevation-1.blue-table.theme--light > div.v-data-table__wrapper{
  overflow-x: hidden !important;
overflow-y: hidden !important;
}
#backgroundImage > div > div > div > div.row.ml-4.mr-4 > div.v-input.px-4.v-input--is-label-active.v-input--is-dirty.v-input--is-disabled.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined > div > div.v-input__slot > fieldset{
  color: white !important;
}
#backgroundImage > div > div > div > div.row.ml-4.mr-4 > div.v-input.px-4.v-input--is-label-active.v-input--is-dirty.v-input--is-disabled.theme--light.v-text-field.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined > div > div.v-input__slot > div > input[type=text]{
  color: white !important;
}
html {

    -webkit-font-smoothing: unset !important;

}
</style>
