/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
<template>
  <div >
    <div class="stake">


    <v-snackbar v-model="snackbar" timeout="10000" :color="color" top center>{{
      text
    }}</v-snackbar>
  </div>
    <!-- Stake Inner -->
    <section class="stake-inner">
      <div class="container">
        <div class="stake-income">
          <div class="row">
            <div class="col-lg-4">
              <div class="stake-side stake-fr-side">
                <div class="stake-side-form wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.20s">
                  <div class="stake-from-head">
                    <h4>Stake</h4>
                    <h5 class="st-bal">Your STX Balance: <input disabled type="text" class="from-control" placeholder="0000.0" v-bind:value="user.formattedBalance"></h5>
                  </div>
                  <div class="stake-from-blk">
                    <div class="from-group-blk">
                      <label>Amount to Stake:</label>
                      <div class="from-group">
                        <input type="text" class="from-control" placeholder="1000.0" v-model="amountToStake"/>
                        <span class="fr-icon"><img src="../assets/images/icons/ic-fr.png" alt="icons"></span>
                      </div>
                    </div>
                    <div class="from-group">
                      <label>Days to Stake:</label>
                      <div class="from-group">
                        <input type="text" class="from-control" placeholder="10" v-model="daysToStake"/>
                        <span class="fr-icon"><img src="../assets/images/icons/ic-fr.png" alt="icons"></span>
                      </div>
                    </div>
                    <div class="from-group">
                      <a href="#" class="btn-main" v-on:click="doStake()">Stake</a>
                    </div>
                    <ul class="stake-from-day">
                      <li><h4>{{ currentDay + 1 }}</h4> <span>Start Day</span></li>
                      <li>
                        <h4 v-if="daysToStake">{{ lastFullDay }}</h4>
                        <h4 v-else>--</h4>
                        <span>Last Full Day</span>
                      </li>
                      <li>
                        <h4 v-if="daysToStake">{{ lastFullDay + 1 }}</h4>
                        <h4 v-else>--</h4>
                        <span>End Day</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="stake-side-auction wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.20s">
                  <h4>Auction FAQ</h4>

                  <div class="accordion" id="accordionExample">
                    <div class="card">
                      <div class="card-head" id="headingOne">
                        <h2 class="mb-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          What is staking?
                        </h2>
                      </div>

                      <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div class="card-body">
                          <p>You can stake your STX token for a fixed number of days to earn interest on them. Make sure to stake more than 5 days to be eligible to get bonus days reward.
At the end of every day a daily stake pool of STX tokens will be calculated and it will be shared and allocate to all the open stakes between all the open stakes based on their staked tokens amount which will be available for user to withdraw when the stake ends.</p>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-head" id="headingTwo">
                        <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          How is stake pool calculated ?
                        </h2>
                      </div>
                      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div class="card-body">
                          <p>[STX supply * 50000 / 5.42% inflation per year ], this daily pool will be distributed between all the Stakers as their stake interest.</p>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-head" id="headingThree">
                        <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          Bonus for Staking ?
                        </h2>
                      </div>
                      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                          <p>For starting a stake you get bonus reward for your stake which is based on the amount and time that you are staking.</p>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-head" id="headingFour">
                        <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                          What is a reward day ?
                        </h2>
                      </div>
                      <div id="collapseFour" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                          <p>Every stake will get a bonus day every 5 days that it has been active, stakes get 2X interest on bonus days. Example: creating a stake at day 4 for 15 days gives this stake 3 bonus at days 10,15, and day 20 etc.</p>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-head" id="headingFive">
                        <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                          What if i end my stake early ?
                        </h2>
                      </div>
                      <div id="collapseFive" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                          <p>You are subject up to a 100% penalty depending on your stake terms.</p>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-head" id="headingSix">
                        <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                          Do i get TRON dividends for staking ?
                        </h2>
                      </div>
                      <div id="collapseSix" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                          <p>Yes! One of the benefits of Staking STX is TRON dividends. At the end of each day a TRON dividends pool will be calculated and allocated to all the open stakes based on their stake amount. The dividends pool comes from the daily auction lobby total entry amount.</p>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-head" id="headingSeventh">
                        <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                          How is dividends pool calculated ?
                        </h2>
                      </div>
                      <div id="collapseSeven" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                          <p>95% of all TRX that enters the daily Auction Lobby is pooled and distributed back out to Stakers.</p>
                        </div>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-head" id="headingEight">
                        <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                          When will I receive my TRON dividends ?
                        </h2>
                      </div>
                      <div id="collapseEight" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                        <div class="card-body">
                          <p>After you exit your stakes you will receive your TRON dividends.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="stake-bonus wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.20s">
                <div class="stake-bonus-head">
                  <h4>Stake Bonus Info</h4>
                  <a href="#" class="btn-main">Eligible for {{Math.floor(parseFloat((this.daysToStake || 1) / 5))}} BonusDays</a>
                </div>
                <div class="stake-bonus-blk">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="stake-bonus-list">
                        <ul>
                          <li class="lr-color"><p>Time Bonus: <span class="greed">{{timeBonus}}</span></p></li>
                          <li class="lr-color"><p >Value Bonus: <span class="greed">{{valueBonus}}</span></p></li>
                          <li><p>Total: <span>{{total}}</span></p></li>
                          <li><p>Effective STX: <span>{{effectiveT2x}}</span></p></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="stake-bonus-list">
                        <ul>
                          <li><p>Today Div Pool: <span class="red">{{TRXDividends}}</span></p></li>
                          <li><p>Average Daily Div Pool: <span>{{avgDivPool}}</span></p></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="stake-bonus-list">
                        <ul>
                          <li><p>Share Rate: <span>{{abbreviate_number(stakeShareRate, 2) + "/STX"}}</span></p></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="stake-active-table wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.20s">
                <v-card class="radius-20 blue-table">
                  <v-overlay :absolute="true" :value="loading">
                    <v-progress-circular
                      indeterminate
                      size="64"
                    ></v-progress-circular>
                  </v-overlay>
                  <v-toolbar fixed style="margin-top: 0px !important;" class="titlebar mt-5 pl-0 elevation-0 radius-20 blue-table">
                    <v-toolbar-title style="color:white">My Active Stakes</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <p style="color:white !important">Your Balance 0 DSP</p> -->
                  </v-toolbar>
                  <v-data-table
                    :headers="headersActiveStake"
                    :items="activeStakes"
                    :items-per-page="25"
                    mobile-breakpoint="100"
                    :multi-sort="false"
                    :sort-desc="true"
                    color="amber"
                    sort-by="lockedDay"
                    class="elevation-1 blue-table"
                  >

                    <template v-slot:item.progress="{ item }">
                      <span v-if="isWaiting(item)">Waiting</span>
                      <v-progress-linear
                        v-else
                        :width="300"
                        :background-opacity="0.9"
                        :buffer-value="getProgressBar(item)"
                        stream
                        color="amber"
                      ></v-progress-linear>
                    </template>

                    <template v-slot:item.stakedSuns="{ item }">{{
                      getPayout(item.stakedSuns._hex)
                    }}</template>

                    <template v-slot:item.actions="{ item }">
                      <v-btn
                        width=""
                        v-if="getStatus(item) == 'collect'"
                        small
                        style="background: #8262ff;background: linear-gradient(90deg,#8262ff 0%, #5124ff 100%);box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 6px,rgba(0, 0, 0, 0.2) 0px 0px 10px 3px inset, rgb(130 98 255 / 0.51) 0px 3px 20px,  rgb(81 36 255 / 0.48) 0px 3px 35px;"
                        v-on:click="endStake(item.stakeId)"
                        >Collect</v-btn
                      >
                      <v-btn
                        width=""
                        v-else-if="getStatus(item) == 'cancel'"
                        small
                        style=""
                        v-on:click="endStake(item.stakeId)"
                        >Cancel</v-btn
                      >
                      {{ item.action }}
                    </template>

                    <!-- <template v-slot:item.bonus="{ item }">
                      <span v-if="item.bonus">
                        {{ item.bonus }}
                      </span>
                      <span v-else>0</span>
                    </template> -->
                    <template v-slot:item.interest="{ item }">
                      <span>
                        {{ abbreviate_number(item.interest, 2) }}
                      </span>
                    </template>
                    <template v-slot:item.currentValue="{ item }">
                      <span>
                        {{ abbreviate_number(item.currentValue, 2) }}
                      </span>
                    </template>

                    <!-- <template v-slot:item.divRewards="{ item }">{{
                      item.divRewards
                    }}</template> -->
                  </v-data-table>
                </v-card>
                <v-card class="radius-20 blue-table">
                  <v-toolbar fixed style="margin-top: 0px !important;" class="titlebar mt-5 pl-0 radius-20 blue-table elevation-0">
                    <v-toolbar-title style="color:white">My Ended Stakes</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <p style="color:white !important">Your Balance 0 DSP</p> -->
                  </v-toolbar>
                  <v-data-table
                    :headers="headersEndedStake"
                    :items="endedStakes"
                    loading="true"
                    :items-per-page="15"
                    mobile-breakpoint="100"
                    multi-sort
                    class="elevation-1 radius-20 blue-table"
                  >
                    <template v-slot:item.payout="{ item }">{{
                      getPayout(item.payout)
                    }}</template>

                    <template v-slot:item.stakedSuns="{ item }">{{
                      getPayout(item.stakedSuns)
                    }}</template>

                    <template v-slot:item.stakeReturn="{ item }">{{
                      getPayout(item.stakeReturn)
                    }}</template>


                    <template v-slot:item.progress="{ item }">
                      <v-chip
                        width="100px"
                        small
                        label
                        style="color: white;
                        border-radius: 20px !important;
                        background: #e95059;
                        font-weight: 500;"
                        v-if="getProgress(item) == 'Canceled'"
                        >canceled</v-chip
                      >
                      <v-chip
                        width="100px"
                        small
                        label
                        style="color: white;
                        border-radius: 20px !important;
                        background: #e95059;
                        font-weight: 500;"
                        v-if="getProgress(item) == 'Finished'"
                        >Finished</v-chip
                      >
                    </template>

                    <template v-slot:item.stakeShares="{ item }">{{
                      getPayout(item.stakeShares)
                    }}</template>

                    <template v-slot:item.servedDays="{ item }">{{
                      add(item.lockedDay, item.servedDays)
                    }}</template>
                  </v-data-table>
                </v-card>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="dividends-wrapper wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.20s">
                <div class="dividends-title">
                  <h4>Daily Dividends</h4>
                  <span>last updated: {{secondsAgo}}s ago</span>
                </div>
                <div class="dividends-img">
                  <v-sparkline
                    :value="value"
                    auto-draw
                    :smooth="25"
                    :gradient="['#f72047', '#ffd200', '#1feaea']"
                    line-width="1.2"
                    height="50px"
                    padding="8"
                    label-size="3"
                  ></v-sparkline>
                </div>
                <div class="dividends-footer">
                  <h4>Daily Dividends Cart</h4>
                  <span>Current Dividends Pool: {{ TRXDividends }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Stake Inner End -->
  </div>
</template>

<script>
import axios from "axios";
import Bottleneck from "bottleneck";
import moment from "moment-timezone";
import numeral from "numeral";
import {range} from 'lodash';
import { contractAddress, zeroAddress } from "../config.js";
import background from '../assets/images/StakeX-Auction2.jpg';



// eslint-disable-next-line no-unused-vars
const DESI = 100000000;
const LPB_MAX_DAYS = 3640;
const SUN = 1000000;

const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 30 });



export default {
  data() {
    return {
      secondsAgo: 0,
      avgDivPool: 0,
      stakeShareRate: 0,
      daysEligible: 0,
      clc1: 0,
      clc2: 0,
      timeBonus: 0,
      valueBonus: 0,
      total: 0,
      effectiveT2x: 0,
      lastUpdated: new Date(),
      labels: [0],
      value: [0],
      loadingCollectStake: false,
      valuesObj: null,
      TRXDividends: null,
      valid: true,
      snackbar: false,
      color: "",
      text: "",
      loading: false,
      user: {
        address: null,
        balance: null,
        formattedBalance: null,
        referrer: zeroAddress,
      },
      mainContract: null,
      activeStakes: [
        {
          bonus: 0,
        },
      ],
      endedStakes: [],
      endedStatesHeaders: [],
      daysData: [],
      bonus: null,
      currentDay: null,
      amountToStake: null,
      daysToStake: null,
      headersActiveStake: [
        { text: "Start", value: "lockedDay" },
        { text: "End", value: "servedDays" },
        { text: "Progress", value: "progress", sortable: false },
        { text: "Staked Amount", value: "stakedSuns", align: "center" },
        { text: "Shares", value: "stakeShares", align: "center" },
        // { text: "stakerAddr", value: "stakerAddr" },
        // { text: "penalty", value: "penalty" },
        { text: "BonusDay Rewards", value: "bonus", align: "center" },
        { text: "Divs Rewards", value: "divRewards", align: "center" },
        { text: "Interest", value: "interest", align: "center" },
        { text: "Current Value", value: "currentValue", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ],
      headersEndedStake: [
        { text: "Start", value: "lockedDay" },
        { text: "End", value: "servedDays" },
        { text: "Progress", value: "progress" },
        { text: "Staked Amount", value: "stakedSuns", align: "center" },
        { text: "Shares", value: "stakeShares" },
        // { text: "stakerAddr", value: "stakerAddr" },
        // { text: "penalty", value: "penalty" },
        {
          text: "BonusDay Rewards + Stake Interest",
          value: "payout",
          align: "center",
        },
        { text: "Paid Amount", value: "stakeReturn" },
      ],
      numberRule: (v) => {
        if (v && !v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v > 0) return true;
        return "Number has to be greater than 0";
      },
    };
  },
  async created() {},
  updated() {
    document.getElementById('backgroundImage').style.backgroundImage = "url(" + background + ")";
  },
  mounted() {
    setInterval(()=>{this.secondsAgo++},1000)
    document.getElementById('backgroundImage').style.backgroundImage = "url(" + background + ")";
    // eslint-disable-next-line no-unused-vars
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
    });
    /*.then(() => {
        console["log"]("Tronweb installed and logged in");
        return true;
      })
      .catch((e) => {
        console["error"]("Error while detecting tronweb", e);
        return false;
      });*/

    // eslint-disable-next-line no-unused-vars
    loginPromise["then"]((data2) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        console.log(reject);
        const userAddress = window.tronWeb.defaultAddress.base58;
        if (!userAddress) {
          return resolve(false);
        }
        this.user.address = userAddress;
        // eslint-disable-next-line no-unused-vars
        let formatToHexAddress = window.tronWeb.address.toHex(userAddress);
        formatToHexAddress = "0x" + formatToHexAddress.slice(2);
        //console.log("formattedAddress", formatToHexAddress);

        try {
          // get list of ended stakes from current address
          const { data } = await axios.get(
            `/api/events?userAddress=${formatToHexAddress}`
          );
          // eslint-disable-next-line no-unused-vars
          this.endedStakes = data.map(({ ...rest }) => rest.result);
          //console.log("EndedStakes", this.endedStakes);
          this.endedStakes.sort((a, b) => {
            return b.lockedDay - a.lockedDay;
          });


//getLastFullDay

          await this.setUpContracts();
          await this.getBalance();
          setInterval(() => {
            if (
              window.tronWeb &&
              this.user.address !== window.tronWeb.defaultAddress.base58
            ) {
              location["reload"]();
            }
          }, 700);
        } catch (err) {
          console.log("err==>>", err);
        }
      });
    });
  },
  watch: {
    daysToStake(newVal) {
      console.log("new val==>>", newVal);
      let extraDays = newVal - 1;
      if (extraDays > LPB_MAX_DAYS) extraDays = LPB_MAX_DAYS;
      this.clc1 = extraDays / 1820;
      console.log('clc111==>>', this.clc1, 'ammttt==>>>', this.amountToStake)
      const holder = this.abbreviate_number_cu1(
        (
          this.clc1 * parseFloat(this.amountToStake)
        ).toLocaleString(void 0, {
          minimumFractionDigits: 8,
        })
      );
      this.timeBonus = "+ " + holder + " STX";
      this.calculator();
    },
    amountToStake(newVal) {
      console.log("new val==>>", newVal);
      this.clc2 = newVal * (Math.min(newVal, 150000000) / 1500000000);

            let  holder = this.abbreviate_number_cu1((this.clc2).toLocaleString(void 0, {
            minimumFractionDigits: 8
        }))
        this.valueBonus = "+ " + holder + " STX"

      holder = this.abbreviate_number_cu1((this.clc1, parseFloat(this.amountToStake)).toLocaleString(void 0, {
            minimumFractionDigits: 8
        }));
        this.timeBonus = "+ " + holder + " STX"

this.calculator();
      /*
        const entered_amount = parseFloat($('.stake-inp-amount')[0].value)

        stakeData.clc_2 = stakeData.entered_amount * (Math.min(stakeData.entered_amount, 150000000) / 1500000000)

        holder = abbreviate_number_cu1((stakeData.clc_1 * parseFloat($('.stake-inp-amount')[0].value)).toLocaleString(void 0, {
            minimumFractionDigits: 8
        }))
        $('.st-val-5')[0].innerHTML = "+ " + holder + " D2X"


        holder = abbreviate_number_cu1((stakeData.clc_2).toLocaleString(void 0, {
            minimumFractionDigits: 8
        }))
        $('.st-val-4')[0].innerHTML = "+ " + holder + " D2X"



        if (!currentDay) return

        holder = abbreviate_number(stakeData.clc_1 * parseFloat($('.stake-inp-amount')[0].value) + stakeData.clc_2, 2)
        $('.st-val-6')[0].innerHTML = holder + " D2X"

        let effective = parseFloat($('.stake-inp-amount')[0].value) + (stakeData.clc_1 * parseFloat($('.stake-inp-amount')[0].value) + stakeData.clc_2)
        holder = abbreviate_number(effective, 2)
        $('.st-val-7')[0].innerHTML = holder + " D2X"

        $('.st-val-13')[0].innerHTML = abbreviate_number(parseFloat(effective * stakeData.shareRate), 2)*/
    },
  },
  computed: {
    lastFullDay: {
      get() {
        if (this.daysToStake != null) {
          return Number(this.daysToStake) + Number(this.currentDay);
        } else {
          return "--";
        }
      },
      set(newVal) {
       return newVal
      }
    },
  },
  methods: {
    async estimateNextDay() {
    await this.getDaysData()
    let totalDivs = 0
    this.daysData.slice(this.daysData.length - 31, this.daysData.length - 1).forEach((item, i) => {
      totalDivs = item.totalDividends + totalDivs
    });
    this.avgDivPool = this.abbreviate_number(totalDivs/30)




//        $('.st-val-9')[0].innerHTML = "~" + abbreviate_number(pstEntries / 3, 2) + " TRX"
   /* for (let i = this.currentDay; i > this.currentDay - 3; i--) {
        getLobbyData(i - 1)
    }*/
    },
    async runStake(nIrstRn) {
      const res = await this.mainContract.globalInfo().call({
      shouldPollResponse: true
      })
      const stakingShare = window.tronWeb.fromSun(res[2]["_hex"]) * SUN

      //$('.st-val-1')[0].innerHTML = currentDay + 1
      this.lastFullDay = this.currentDay + 1;

      this.stakeShareRate = (100000 / stakingShare) * 100000000;

      const res1 = await this.mainContract.xfLobby(this.currentDay).call({
          shouldPollResponse: true
      })
      this.TRXDividends = this.abbreviate_number(window.tronWeb.fromSun(res1._hex), 2) + " TRX"

      if (nIrstRn) return

      this.estimateNextDay()
      return
    },
    calculator() {
      if (!this.currentDay) return;
      let holder = this.abbreviate_number(this.clc1 * parseFloat(this.amountToStake) + this.clc2, 2);
      this.total = holder + " STX"
      let effective = parseFloat(this.amountToStake) + (this.clc1 * parseFloat(this.amountToStake) + this.clc2);
      holder = this.abbreviate_number(effective, 2);
      this.effectiveT2x = holder + " STX";

      //this.daysEligible = this.abbreviate_number(parseFloat(effective * this.stakeShareRate), 2)

        /*if (!currentDay) return

        holder = abbreviate_number(stakeData.clc_1 * parseFloat($('.stake-inp-amount')[0].value) + stakeData.clc_2, 2)
        $('.st-val-6')[0].innerHTML = holder + " D2X"

        let effective = parseFloat($('.stake-inp-amount')[0].value) + (stakeData.clc_1 * parseFloat($('.stake-inp-amount')[0].value) + stakeData.clc_2)
        holder = abbreviate_number(effective, 2)
        $('.st-val-7')[0].innerHTML = holder + " D2X"

        $('.st-val-13')[0].innerHTML = abbreviate_number(parseFloat(effective * stakeData.shareRate), 2)*/
    },
    abbreviate_number_cu1(_0xe5a7x22) {
      let _0xe5a7x2b = _0xe5a7x22["replace"](/,/g, "");
      const _0xe5a7x2c = _0xe5a7x2b["indexOf"](".");
      let _0xe5a7x2d, _0xe5a7x2e;
      if (_0xe5a7x2c == 1 && _0xe5a7x2b[0] === "0") {
        _0xe5a7x2b = _0xe5a7x2b["slice"](0, _0xe5a7x2c + 9);
        _0xe5a7x2d = 8;
      } else {
        if (_0xe5a7x2c == 1 && _0xe5a7x2b[0] !== "0") {
          _0xe5a7x2b = _0xe5a7x2b["slice"](0, _0xe5a7x2c + 8);
          _0xe5a7x2d = 7;
        } else {
          if (_0xe5a7x2c == 2) {
            _0xe5a7x2b = _0xe5a7x2b["slice"](0, _0xe5a7x2c + 6);
            _0xe5a7x2d = 5;
          } else {
            if (_0xe5a7x2c == 3) {
              _0xe5a7x2b = _0xe5a7x2b["slice"](0, _0xe5a7x2c + 4);
              _0xe5a7x2d = 3;
            } else {
              if (_0xe5a7x2c > 3) {
                _0xe5a7x2b = this.abbreviate_number(parseFloat(_0xe5a7x2b), 2);
                _0xe5a7x2e = true;
              }
            }
          }
        }
      }
      if (_0xe5a7x2e) {
        return _0xe5a7x2b;
      } else {
        _0xe5a7x2b = parseFloat(_0xe5a7x2b)["toLocaleString"](void 0, {
          minimumFractionDigits: _0xe5a7x2d,
        });
        return _0xe5a7x2b;
      }
    },
    timeAgo(time) {
      moment.updateLocale("en", {
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: (number) => number + "s ago",
          ss: "%ds ago",
          m: "1m ago",
          mm: "%dm ago",
          h: "1h ago",
          hh: "%dh ago",
          d: "1d ago",
          dd: "%dd ago",
          M: "a month ago",
          MM: "%d months ago",
          y: "a year ago",
          yy: "%d years ago",
        },
      });

      let secondsElapsed = moment().diff(time, "seconds");
      let dayStart = moment("2018-01-01")
        .startOf("day")
        .seconds(secondsElapsed);

      if (secondsElapsed > 300) {
        return moment(time).fromNow(true);
      } else if (secondsElapsed < 60) {
        return dayStart.format("s") + "s ago";
      } else {
        return dayStart.format("m:ss") + "m ago";
      }
    },
    setUpContracts(address) {
      return new Promise((resolve, reject) => {
        if (!contractAddress && !address) {
          return null;
        }
        window.tronWeb["contract"]()["at"](
          contractAddress || address,
          async (err, data) => {
            if (!err) {
              this.mainContract = data;
              await this.getCurrentDay();

              await this.getDivChartData();

              this.loading = true;
              await this.getDaysData();
              await this.myStakesCount();
              await this.runDividends();
              setInterval(async () => {
                //     console.log(
                //      "this.getCurrentDay();, this.runDividends() running==>>>"
                //     );
                await this.getCurrentDay();
                await this.runDividends();
                this.lastUpdated = new Date();
                this.secondsAgo = 0;
                await this.getBalance();
              }, 10000);

              setInterval(async () => {
                // console.log("this.myStakesCount();, running==>>>");
                await this.myStakesCount();
              }, 20000);

this.runStake();
              setInterval(() => {
    this.runStake(true);
}, 1000 * 20)

              //await this.getDailyBonusRewards();
              // console.log("ISHOULDBELAST===>");
              resolve();
            } else {
              console.error("data1 error==>>", err);
              reject(err);
            }
          }
        );
      });
    },
    async myStakesCount() {
      try {
        const res = await this.mainContract.stakeCount(this.user.address).call({
          shouldPollResponse: true,
        });

        const myStakesCount =
          parseFloat(window.tronWeb.fromSun(res._hex)) * 1000000;
        // console.log('cron myStakesCount==>>>', myStakesCount)
        await this.ck1(myStakesCount);
        this.loading = false;
      } catch (err) {
        console.log("errrrr stake count==>>>", err);
      }
    },
    getStatus(item) {
      if (item.lockedDay + item.stakedDays < this.currentDay + 1) {
        return "collect";
      } else {
        return "cancel";
      }
    },
    getProgressBar: function (item) {
      // console.log("currentDay===>", this.currentDay);
      let clcR1 = this.currentDay - item.lockedDay;
      let clcR2 = (clcR1 / item.stakedDays) * 100;
      return clcR2;
    },
    getDrc: function (strt) {
      return this.mainContract.stakeLists(this.user.address, strt).call({
        shouldPollResponse: true,
      });
      /*.then((res) => {
                                  // console.log("toBeRenderedDRC===>", res);
                                  this.activeStakes.push(res);
                              });*/
    },

    async getDaysData() {
      const { data } = await axios.get(`/api/days`);
      this.daysData = data;
      // console.log("dayDataFromFunction===>", this.daysData);
    },

    async runDividends() {
      //console.log("in runDividends==>>>");
      const res = await this.mainContract.xfLobby(this.currentDay).call({
        shouldPollResponse: true,
      });
      const dayEntry = numeral(window.tronWeb["fromSun"](res._hex)).format(
        "0.000am"
      ).toUpperCase();
      // console.log(
      //  "dayeee==>>",
      //  dayEntry,
      //   "currr==>>>",
      //   this.currentDay,
      //    this.value,
      //    this.labels
      //   );
      const lastEntryDay = this.labels.slice(-1)[0];
      if (lastEntryDay !== this.currentDay) {
        this.value = [...this.value, parseFloat(dayEntry.slice(0, -1))];
        this.labels = [...this.labels, this.currentDay];
        this.TRXDividends = dayEntry + " TRX";
      }
    },

    ck1: async function (myStakesCount) {
      this.activeStakes = await Promise.all(
        Array.from(Array(myStakesCount).keys()).map(async (strt) => {
          const stake = await limiter.schedule(() => this.getDrc(strt));
          const { lockedDay, stakedDays, stakeShares } = stake;
          stake.servedDays = Number(lockedDay) + Number(stakedDays);
          console.log('gggg==>>>>?', typeof stake.stakeShares, 'cccc', stake.stakeShares)
          stake.stakeShares = typeof stake.stakeShares === "object"
                  ? this.getPayout(stakeShares)
                  : stakeShares //this.abbreviate_number(stakeShares / DESI, 2);

          stake.bonus = stake.bonus || 0;
          //calculate bonus
          let eleId = 0;
          for (let a = lockedDay + 4; a < lockedDay + stakedDays; a = a + 5) {
            const dayData = this.daysData.find((d) => d.day === a);
            if (dayData) {
              const { payoutTotal, stakeSharesTotal } = dayData;
              const parsedStakeShares =
                parseFloat(window.tronWeb.fromSun(stakeShares._hex)) / 100;
              const calc = (payoutTotal * parsedStakeShares) / stakeSharesTotal;
              stake.bonus = this.abbreviate_number(
                parseFloat(eleId) + parseFloat(calc),
                2
              );
              eleId = calc;
            }
          }

          //calculate Dividends
          let elm = 0;
          stake.divRewards = 0;
          let addUpDivs = 0;
          const parsedStakeShares =
            parseFloat(window.tronWeb.fromSun(stakeShares._hex)) / 100;

          for (let a = 0; a < stakedDays; a++) {
            this.daysData.forEach((item) => {
              if (item.day == lockedDay + a) {
                addUpDivs +=
                  (item.totalDividends * 0.95 * parsedStakeShares) /
                  item.stakeSharesTotal;
                //               console.log("totDiv", item.totalDividends, "parsedStakeShare", parsedStakeShares, "stakeSharesTotal", item.stakeSharesTotal)
                elm = this.abbreviate_number(addUpDivs * 100, 3) + " TRX";
              }
            });
          }
          stake.divRewards = elm;
          console.log("diiiivs====>", stake.divRewards);
          //calculate Interest
          // function calcInterest(item, item2, item3, stakeShares, startDay, endDay) {

          let interest = 0;

          for (var i = lockedDay; i < stakedDays + lockedDay; i++) {
            this.daysData.forEach((item) => {
              if (item.day == i) {
                //if (item.payoutTotal != 0) {
                interest +=
                  (item.payoutTotal *
                    parseFloat(window.tronWeb.fromSun(stakeShares._hex))) /
                  item.stakeSharesTotal;
              }
            });
          }

          stake.interest = interest / 100;

          //calculate Current Value
          stake.currentValue =
            Number(parseInt(stake.stakedSuns._hex) / DESI) +
            Number(stake.interest);

          return stake;
        })
      );
      console.log("YOOOOOOO====>", this.activeStakes);
    },
    getCurrentDay: async function () {
      const res = await this.mainContract.currentDay().call({
          shouldPollResponse: false,
      })
      this.currentDay = window.tronWeb.fromSun(res._hex) * 1000000;
      return
    },
    getProgress(item) {
      if (item.servedDays > 0 && item.payout !== "0") {
        var progress = "Finished";
        return progress;
      } else {
        return "Canceled";
      }
    },

    getPayout: function (item) {

      return this.abbreviate_number(parseInt(item) / DESI, 3);
    },

    isWaiting(item) {
      if (item.lockedDay == this.currentDay + 1) {
        return true;
      } else {
        return false;
      }
    },

    doStake: function () {
      this.loading = true;
      this.mainContract
        .balanceOf(this.user.address)
        .call({
          shouldPollResponse: false,
        })
        .then((res) => {
          if (
            window.tronWeb.fromSun(res._hex) / 100 <
            parseFloat(this.amountToStake)
          ) {
            //window.alert(3, "Not Enough Balance !");
            this.snackbar = true;
            this.text =
              "Something went wrong. Remove decimal value, if present, otherwise Insufficient Balance!";
            this.color = "error";

            // $('.btn-usertransfer-load')[0].style.display = "none"
            // $('.btn-usertransfer-txt')[0].innerHTML = "STAKE"
          } else {
            this.mainContract
              .stakeStart(
                parseFloat(this.amountToStake) * DESI,
                parseInt(this.daysToStake)
              )
              .send({
                shouldPollResponse: false,
                // eslint-disable-next-line no-unused-vars
              })
              .then(() => {
                //window.displayAlert(1, `Successfully staked ${parseFloat(this.amountToStake)} D2X for ${parseInt(this.daysToStake)} days.`)
                const newStake = {
                  lockedDay: this.currentDay + 1,
                  stakedDays: parseInt(this.daysToStake),
                  stakedSuns: parseInt(this.amountToStake),
                  stakeShares: "Waiting...",
                };
                this.activeStakes = this.activeStakes.concat(newStake);
                this.loading = false;
                setTimeout(() => this.myStakesCount(), 5000);
                this.snackbar = true;
                this.color = "#8161ff";
                this.text = `Successfully staked ${parseFloat(
                  this.amountToStake
                )} STX for ${parseInt(this.daysToStake)} days.`;
                // refreshMyStakes()
              })
              .catch((err) => {
                //window.displayAlert(3, "Something went wrong !");
                this.snackbar = true;
                this.text = "Something went wrong, check input and try again.";
                this.color = "error";
                console.log(err);
                // eslint-disable-next-line no-unused-vars
              })
              .finally(() => {
                this.amountToStake = "";
                this.daysToStake = "";
              });
          }
        });
    },
    async getBalance() {
      console.log('getting Balance')
      const res = await this.mainContract.balanceOf(this.user.address).call({shouldPollResponse: true})
      this.user.balance = window.tronWeb.fromSun(res._hex) / 100
      this.user.formattedBalance = this.user.balance.toFixed(2)
      return
    },

    abbreviate_number(item, precision) {
      let _0xe5a7x22 = parseFloat(item);
      if (_0xe5a7x22 === null) {
        return null;
      }
      if (_0xe5a7x22 === 0) {
        return "0";
      }
      precision = !precision || precision < 0 ? 0 : precision;
      const _0xe5a7x23 = _0xe5a7x22["toPrecision"](2)["split"]("e"),
        _0xe5a7x24 =
          _0xe5a7x23["length"] === 1
            ? 0
            : Math["floor"](Math["min"](_0xe5a7x23[1]["slice"](1), 14) / 3),
        _0xe5a7x25 =
          _0xe5a7x24 < 1
            ? _0xe5a7x22["toFixed"](0 + precision)
            : (_0xe5a7x22 / Math["pow"](10, _0xe5a7x24 * 3))["toFixed"](
                1 + precision
              ),
        _0xe5a7x26 = _0xe5a7x25 < 0 ? _0xe5a7x25 : Math["abs"](_0xe5a7x25),
        response = _0xe5a7x26 + ["", "K", "M", "B", "T"][_0xe5a7x24];
      return response;
    },

    add(a, b) {
      var c = parseInt(a);
      var d = parseInt(b);
      return Number(c) + Number(d);
    },

    getTime() {
      return this.timeAgo(this.lastUpdated);
    },

    async endStake(stakeId) {
      this.loading = true;
      this.loadingCollectStake = true;
      const stakeIndex = this.activeStakes.findIndex(
        (s) => s.stakeId === stakeId
      );

      try {
        const delayInMilliseconds = 5000;
        const transactionId = await this.mainContract
          .stakeEnd(stakeIndex, stakeId)
          .send({
            shouldPollResponse: false,
          });

        setTimeout(async () => {
          const { data } = await axios.get(
            `${process.env.VUE_APP_TRON_FULL_HOST}/v1/transactions/${transactionId}/events`
          );
          const newStake = data.data.find(
            (stake) => stake.event_name === "StakeEnd"
          );
          await axios.post(`/api/events`, { ...newStake });
          this.activeStakes = this.activeStakes.filter(
            (s) => s.stakeId !== stakeId
          );
          this.endedStakes.unshift(newStake.result);
          this.loadingCollectStake = false;
        }, delayInMilliseconds);
      } catch (err) {
        this.snackbar = true;
        this.text = "Something went wrong, " + err;
        this.color = "error";
        console.log("an err occcc==>>>", err);
        this.loadingCollectStake = false;
      } finally {
        this.mainContract.balanceOf(this.user.address).call({
          shouldPollResponse: false,
        });
        this.loading = false;
        this.loadingCollectStake = false;
      }
    },

    // eslint-disable-next-line no-unused-vars
    getDailyBonusRewards(data) {
      let startDay = data.lockedDay;
      let stakedDays = data.stakedDays;
      let stakeShares = parseFloat(
        window.tronWeb.fromSun(data.stakeShares._hex)
      );

      let counter = 0;
      let totalDiv = 0;
      for (var ii = startDay; ii < stakedDays + startDay; ii++) {
        if (counter < 4) {
          counter++;
        } else {
          totalDiv = this.processDailyBonus(ii, totalDiv, stakeShares);
          counter = 0;
        }
      }
      this.bonus = totalDiv;
      return totalDiv;
    },
    processDailyBonus(theDay, totalDiv, stakeShares) {
      this.daysData.forEach((item) => {
        if (item.day == theDay) {
          let calc = (item.payoutTotal * stakeShares) / item.stakeSharesTotal;
          totalDiv = this.abbreviate_number(parseFloat(calc), 2);
        }
      });
      return totalDiv;
    },
    async getDivChartData() {
      try {
        // eslint-disable-next-line no-unused-vars
        //await this.runDividends()
        const { data } = await axios.get(`/api/days`);
        /*this.valuesObj = data.reduce((a, b) => Object.assign(a, {
                    [b.day]: b.totalDividends * SUN
                }), {});*/
        //this.labels = null;

        this.value = [
          ...this.value,
          ...data.map((x) =>
            parseFloat(this.abbreviate_number(x.totalDividends, 2).slice(0, -1))
          ),
        ];
        this.labels = [...this.labels, ...data.map((x) => x.day)];
        // console.log("valuesss==>>", this.value, "labeee===>>>", this.labels);
      } catch (err) {
        console.log("an err occurred==>>>", err);
      }
      // eslint-disable-next-line no-unused-vars
    },
  },
};
</script>
