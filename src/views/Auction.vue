<template>
  <div class="">
    <div>
      <div class="auction">
        <div>
          <v-row class="mb-6" no-gutters>
            <v-dialog v-model="dialog" max-width="400" class="radius-20 blue-table">
              <v-system-bar color="#2b2b33" dark>
                <v-spacer></v-spacer>
                <v-icon>mdi-window-minimize</v-icon>
                <v-icon v-on:click="close()">mdi-close</v-icon>
              </v-system-bar>
              <v-card class="p-2">
                <v-text-field
                  outlined
                  class="px-4"
                  label="TRX Amount"
                  required
                  v-model="amountToStake"
                ></v-text-field>
                <v-btn
                  block
                  style="
                    background: linear-gradient(90deg, #8262ff 0%, #292684 100%);
                    border-width: 1.2px;
                    border-color: white;
                    border-style: solid;
                    min-width: 90% !important;
                    margin-left: 5%;
                    box-shadow: none !important;
                  "
                  class="mb-2"
                  dark
                  color="primary"
                  v-on:click="enterLobbyFinal()"
                  >Enter the Auction</v-btn
                >
              </v-card>
            </v-dialog>



            </v-col>
          </v-row>
        </div>

        <v-snackbar
          v-model="snackbar"
          timeout="10000"
          :color="color"
          top
          center
          >{{ text }}</v-snackbar
        >
      </div>
    </div>
    <section class="stake-inner banner-container" style="background-repeat: no-repeat;
    background-size: auto;
    background-position: top;
    margin-top: -25px;">
      <div class="container">
        <div class="stake-wrapper">
          <div class="stake-tabs">

            <!-- Tab panes -->
            <div class="tab-content">
              <div class="stake-wrapper">
                <div class="row">
                  <div class="col-lg-8">
                      <v-skeleton-loader
                        v-if="myObj.length < 0"
                        class="mx-auto"
                        type="table"
                      ></v-skeleton-loader>

                      <v-card transition="fade-transition" class="radius-20 blue-table">
                        <v-toolbar fixed style="margin-top: 0px !important;" class="dsp-titlebar mt-5 pl-0 pr-0 elevation-0 radius-20 blue-table">
                          <v-toolbar-title style="color:white; margin-left:15px; margin-top:5px" class="ml-1 pl-0 pr-0 mr-0">Auction Lobby</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn
                            class="mr-4"
                            small
                            dark
                            style="float: right;
                                  width: 169px;
                                  font-size: 11px;
                                  padding: 7px 10px;
                                  border-radius: 6px;
                                  background-color: #5d76ff;
                                  box-shadow: none;
                                  margin-top:5px;"
                            v-on:click="enterLobby()"
                            >enter auction lobby</v-btn
                          >
                        </v-toolbar>
                        <v-data-table
                          :headers="headers"
                          :items="myObj"
                          :items-per-page="25"
                          default-sort="day:desc"
                          mobile-breakpoint="100"
                          multi-sort
                          class="elevation-0 blue-table"
                          loading-text="Loading... Please wait"
                        >
                          <template v-slot:item.status="{ item }">
                            <span v-if="item">
                              <v-btn
                                style="border-color: #5d76ff !important;
                                       color: #fff !important;
                                       background-color: #5d76ff; !important"
                                v-if="item.state == 'open'"
                                x-large
                                dark
                                v-on:click="enterLobby(item)"
                                min-width="100px"
                                >{{ auctionBtn }}</v-btn
                              >
                              <v-btn
                                v-else-if="item.state == 'closed' && item.entry > 0"
                                small
                                dark
                                style="background: #8262ff; background-color: #5d76ff; !important; box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 6px,rgba(0, 0, 0, 0.2) 0px 0px 10px 3px inset,rgb(130 98 255 / 0.51) 0px 3px 20px,rgb(81 36 255 / 0.48) 0px 3px 35px;"
                                v-on:click="collectLobby(item)"
                                min-width="100px"
                                >collect</v-btn
                              >
                              <v-btn
                                v-else-if="item.state == 'closed'"
                                small
                                color="#757575"
                                disabled
                                min-width="100px"
                                style="color: rgba(255,255,255,0.35) !important;
                                       border: 2px solid #2a2e88 !important;
                                       background-color: transparent !important"
                                >ended</v-btn
                              >
                            </span>
                          </template>
                          <template v-slot:item.status="{ item }">
                            <span v-if="item">
                              <v-btn
                                v-if="item.state == 'open'"
                                small
                                dark
                                v-on:click="enterLobby(item)"
                                min-width="100px"
                                style="border-color: #5d76ff !important;
                                       color: #fff !important;
                                       background-color: #5d76ff; !important"
                                >Enter</v-btn
                              >
                              <v-btn
                                v-else-if="item.state == 'closed' && item.entry > 0"
                                small
                                dark
                                style="background: #8262ff; background-color: #5d76ff; !important; box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 6px,rgba(0, 0, 0, 0.2) 0px 0px 10px 3px inset,rgb(130 98 255 / 0.51) 0px 3px 20px,rgb(81 36 255 / 0.48) 0px 3px 35px;"
                                v-on:click="collectLobby(item)"
                                min-width="100px"
                                >collect</v-btn
                              >
                              <v-btn
                                v-else-if="item.state == 'closed'"
                                small
                                color="#757575"
                                disabled
                                min-width="100px"
                                style="color: rgba(255,255,255,0.35) !important;
                                       border: 2px solid #2a2e88 !important;
                                       background-color: transparent !important"
                                >ended</v-btn
                              >
                            </span>
                          </template>
                          <template v-slot:item.received="{ item }">
                            <span v-if="item.received" style="text-align=center">
                              {{ item.received }}
                            </span>
                            <span v-else vstyle="text-align=center"> -- </span>
                          </template>
                          <template v-slot:item.entry="{ item }">
                            <span v-if="item.entry" style="text-align=center">
                              {{ item.entry }}
                            </span>
                            <span v-else style="text-align=center"> -- </span>
                          </template>
                        </v-data-table>
                      </v-card>
                  </div>
                  <div class="col-lg-4">
                    <div class="stake-side">
                      <div class="stake-side-details wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.20s">
                        <h4>Current Dividends Pool</h4>
                        <p>One of the benefits of Staking STX is TRON dividends. At the end of each day a TRON dividends pool will be calculated and allocated to all the open stakes based on their stake amount. The TRON dividends pool comes from the total daily entry of auction lobby.The only way to receive TRON Dividends is having open stakes</p>
                        <a href="#" class="btn-main">{{TRXDividendsFormated}}</a>
                      </div>
                      <div class="stake-side-auction wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.20s">
                        <h4>Auction FAQ</h4>

                        <div class="accordion" id="accordionExample">
                          <div class="card">
                            <div class="card-head" id="headingOne">
                              <h2 class="mb-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                What are auction lobbies ?
                              </h2>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                              <div class="card-body">
                                <p>Auction lobbies are Daily Auctions that offer STX tokens for TRON based on the STX and TRON pool at the end of the day.</p>
                              </div>
                            </div>
                          </div>
                          <div class="card">
                            <div class="card-head" id="headingTwo">
                              <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                How much STX do lobbies pay ?
                              </h2>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                              <div class="card-body">
                                <p>Lobbies STX pool will start from 5 million STX per day and goes until 1 million over the next 365 days but never goes lower than 1 million tokens per day.</p>
                              </div>
                            </div>
                          </div>
                          <div class="card">
                            <div class="card-head" id="headingThree">
                              <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Buying tokens from exchnage or participating in auction ?
                              </h2>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                              <div class="card-body">
                                <p>Auction lobbies are an other way to buy STX tokens that might be more profitable that purchasing on exchanges. Plus the TRX spent is rewarded back to Stakers.</p>
                              </div>
                            </div>
                          </div>
                          <div class="card">
                            <div class="card-head" id="headingFour">
                              <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Where does all the TRON go ?
                              </h2>
                            </div>
                            <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                              <div class="card-body">
                                <p>Dividends, well at least 95% of them !! The other 5% reserve for promotion and platform development costs.</p>
                              </div>
                            </div>
                          </div>
                          <div class="card">
                            <div class="card-head" id="headingFour">
                              <h2 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                When do lobbies end ?
                              </h2>
                            </div>
                            <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                              <div class="card-body">
                                <p>Lobbies are daily, Every day at 00:00 UTC</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                        <span>Current Dividends Pool: {{ TRXDividendsFormated }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// eslint-disable no-unused-vars
/* eslint-disable no-unused-vars */
import axios from "axios";
import Bottleneck from "bottleneck";
import numeral from 'numeral';
import { contractAddress, zeroAddress } from "../config.js";
import background from '../assets/images/body-bg.jpg';
// eslint-disable-next-line no-unused-vars
const DESI = 100000000;
const SUN = 1000000;

export default {
  data() {
    return {
      secondsAgo: 0,
      TRXDividends: null,
      TRXDividendsFormated: null,
      valuesObj: { 0: 0 },
      valuesObj2: [0],
      value: [0],
      limiter: null,
      snackbar: false,
      color: "",
      text: "",
      auctionBtn: "Enter",
      currentItemIndex: -1,
      currentItem: null,
      dialog: false,
      amountToStake: null,
      myObj: [],
      anotherObj: [],
      tempdata: {
        day: null,
      },
      user: {
        address: null,
        balance: null,
        referrer: zeroAddress,
      },
      day: null,
      amount: null,
      mainContract: {},
      endedStatesHeaders: [],
      currentDay: null,
      daysToStake: null,
      headers: [
        { text: "Day", value: "day" },
        { text: "STX Pool", value: "amount" },
        { text: "STX/TRON", value: "ratio" },
        { text: "State", value: "state" },
        { text: "STX Received", value: "received" },
        { text: "Your Entry", value: "entry" },
        { text: "Daily Entry", value: "dayEntry" },
        { text: "Status", value: "status" },
      ],
    };
  },
  mounted() {
    setInterval(()=>{this.secondsAgo++},1000)
    document.getElementById('backgroundImage').style.backgroundImage = "url(" + background + ")";
    // eslint-disable-next-line no-unused-vars

    const loginPromise = new Promise((resolve, reject) => {
      if (window.tronWeb && window.tronWeb.ready) {
        resolve(true);
      } else {
        window.addEventListener("load", () => {
          let timer = setInterval(() => {
            if (window.tronWeb && window.tronWeb.ready) {
              resolve(true);
            }
            clearInterval(timer);
          }, 200);
          setTimeout(() => {
            clearInterval(timer);
          }, 200);
        });
      }
    })
      .then(() => {
        console.log("Tronweb installed and logged in");
        return true;
      })
      .catch((e) => {
        console.error("Error while detecting tronweb", e);
        return false;
      });

    // eslint-disable-next-line no-unused-vars
    loginPromise["then"]((data2) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const userAddress = window.tronWeb.defaultAddress.base58;
        if (!userAddress) {
          return resolve(false);
        }
        this.user.address = userAddress;

        // eslint-disable-next-line no-unused-vars
        await this.setUpContracts();

        try {
          setInterval(() => {
            if (
              window.tronWeb &&
              this.user.address !== window.tronWeb.defaultAddress.base58
            ) {
              location.reload();
            }
          }, 700);
        } catch (err) {
          console.log("err==>>", err);
        }
      });
    });
  },
  updated() {
    document.getElementById('backgroundImage').style.backgroundImage = "url(" + background + ")";
  },
  methods: {
    setUpContracts(address) {
      return new Promise((resolve, reject) => {
        if (!contractAddress && !address) {
          return resolve(null);
        }
        window.tronWeb
          .contract()
          .at(contractAddress || address, async (err, data) => {
            if (!err) {
              this.mainContract = data;
              await this.getDivChartData();
              await this.getCurrentDay();
              await this.runDividends();
              await this.getTrxDividendsFormated();
              this.secondsAgo = 0;
              setInterval(async () => {
                await this.getCurrentDay();
                await this.runDividends();
                await this.getTrxDividendsFormated();
                this.secondsAgo = 0;
              }, 30000);

              try {
                await this.getLobbyTable();
              } catch (err) {
                console.log(err);
              }
              resolve();
            } else {
              console.error("data1 error==>>", err);
              reject(err);
            }
          });
      });
    },

    async getLobbyTable() {
      //console.log("curvvvrentDayyyy in getLobbyTable==>>", this.currentDay);
      this.myObj = Array.from(Array(this.currentDay).keys())
        .reverse()
        .map((i, ind) => {
          const currentDay = i + 1;
          const entry = {};

          entry.state = currentDay === this.currentDay ? "open" : "closed";
          entry.day = currentDay;
          entry.amount = this.abbreviate_number(
            this.calcDaysLobbyPayout(currentDay) / DESI,
            2
          );
          return entry;
        });

      //let index = 0;
      if (this.limiter) await this.limiter.stop();
      this.limiter = new Bottleneck({
        maxConcurrent: 1,
        minTime: 300,
      });

      await Promise.allSettled(
        // eslint-disable-next-line no-unused-vars
        this.myObj.map(async (entry, index) => {
          await this.limiter.schedule(async () => {
            const dayEntryValue = await this.mainContract
              .xfLobby(entry.day)
              .call({
                shouldPollResponse: true,
              });
            const parsedDayEntryValue = parseFloat(
              window.tronWeb.fromSun(dayEntryValue)
            );

            entry.ratio =
              parsedDayEntryValue === 0
                ? "-"
                : (this.calcDaysLobbyPayout(entry.day) /
                    DESI /
                    parsedDayEntryValue)["toFixed"](3);

            let dayEntry = 0;
            entry.dayEntry = await this.mainContract
              .xfLobby(entry.day)
              .call({
                shouldPollResponse: true,
                // eslint-disable-next-line no-unused-vars
              })
              .then((dayEntryValue) => {
                const parsedDayEntryValue5 = parseFloat(
                  window.tronWeb["fromSun"](dayEntryValue)
                );
                //console.log("parsedDayEntryValue5==>>>", parsedDayEntryValue5);
                return this.abbreviate_number(parsedDayEntryValue5, 2);
              });

            const dayEntryValue2 = await this.mainContract["xfLobbyMembers"](
              entry.day,
              this.user.address
            ).call({
              shouldPollResponse: true,
            });

            await Promise.allSettled(
              Array.from(Array(dayEntryValue2.tailIndex).keys()).map(
                async (index2) => {
                  const dayEntryValue3 = await this.mainContract
                    .xfLobbyEntry(this.user.address, entry.day, index2)
                    .call({
                      shouldPollResponse: false,
                    });

                  dayEntry += parseFloat(
                    window.tronWeb["fromSun"](dayEntryValue3["rawAmount"]._hex)
                  );

                  entry.entry = dayEntry;
                  entry.received = this.abbreviate_number(
                    ((this.calcDaysLobbyPayout(entry.day) / DESI) * dayEntry) /
                      parsedDayEntryValue,
                    2
                  );
                }
              )
            );
          });
          this.myObj.splice(index, 1, entry);
        })
      );
    },
    async getDataEntry(dayEntryValue2, walletAddress) {
      const limiter = new Bottleneck({
        maxConcurrent: 25,
        minTime: 300,
      });
      let entry = {};
      let dayEntry = 0;
      let currentDay = this.currentDay;

      await Promise.allSettled(
        Array.from(Array(dayEntryValue2.tailIndex).keys()).map(
          async (index) => {
            return limiter.schedule(async () => {
              const dayEntryValue3 = await this.mainContract
                .xfLobbyEntry(walletAddress, currentDay, index)
                .call({
                  shouldPollResponse: false,
                });

              dayEntry += await parseFloat(
                window.tronWeb["fromSun"](dayEntryValue3["rawAmount"]._hex)
              );
              entry.entry = dayEntry;
            });
          }
        )
      );
      console.log("Entry===>", entry);
      return entry;
    },
    calcDaysLobbyPayout(currentDay) {
      if (currentDay <= 365) {
        return 4000000 * 100000000 - (currentDay - 1) * 410958904109;
      } else {
        return 1000000 * 100000000;
      }
    },
    getCurrentDay: async function () {
      const res = await this.mainContract.currentDay().call({
        shouldPollResponse: true,
      });
      this.currentDay = window.tronWeb.fromSun(res._hex) * 1000000;
    },

    async runDividends() {
      const res = await this.mainContract.xfLobby(this.currentDay).call({
        shouldPollResponse: true,
      });
      const dayEntry = numeral(window.tronWeb["fromSun"](res._hex)).format('0.000am');
      this.valuesObj =  {
        ...this.valuesObj,
        [this.currentDay]: parseFloat(dayEntry.slice(0, -1)),
      };
      console.log("Values===>", dayEntry)
      this.TRXDividends = dayEntry + " TRX";
    },
    async getTrxDividendsFormated() {
      const res1 = await this.mainContract.xfLobby(this.currentDay).call({
          shouldPollResponse: true
      })
      this.TRXDividendsFormated = this.abbreviate_number(window.tronWeb.fromSun(res1._hex), 2) + " TRX"
      return
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
    abbreviate_number(item, precision) {
      let floatNum = parseFloat(item);
      if (floatNum === null) {
        return null;
      }
      if (floatNum === 0) {
        return "0";
      }
      precision = !precision || precision < 0 ? 0 : precision;
      const _0xe5a7x23 = floatNum["toPrecision"](2)["split"]("e"),
        _0xe5a7x24 =
          _0xe5a7x23["length"] === 1
            ? 0
            : Math["floor"](Math["min"](_0xe5a7x23[1]["slice"](1), 14) / 3),
        _0xe5a7x25 =
          _0xe5a7x24 < 1
            ? floatNum["toFixed"](0 + precision)
            : (floatNum / Math["pow"](10, _0xe5a7x24 * 3))["toFixed"](
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
    close() {
      this.dialog = false;
      this.amountToStake = null;
    },
    enterLobby(item) {
      this.dialog = true;
      this.currentItemIndex = this.myObj.indexOf(item);
      this.currentItem = item;
    },
    async collectLobby(item) {
      try {
        await this.mainContract.xfLobbyExit(item.day, 0).send({
          shouldPollResponse: false,
        });
        const currentItemIndex = this.myObj.findIndex(
          (i) => i.day === item.day
        );
        //console.log("indexxxodd==>>", currentItemIndex);
        this.myObj.splice(currentItemIndex, 1, {
          ...item,
          received: null,
          entry: null,
          state: "closed",
        });
      } catch (err) {
        console.log("err occurred", err);
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async delay() {
      await this.sleep(5000);
      await this.getCurrentDay();
      await this.getLobbyTable();
    },


    async enterLobbyFinal() {
      this.dialog = false;
      this.snackbar = true;
      this.color = "#8161ff";
      this.text =
        "Confirming " + this.amountToStake + " into auction, standby...";
        let referrer = localStorage.getItem("referrerAddress") || "TFqiUZ1VTi2wqB1MJqkDzavH8aN3q7REL1";
      // console.log("Index==>", this.currentItemIndex);
      // console.log("DataRow==>", this.currentItem);

      try {
        await this.mainContract
          .xfLobbyEnter(referrer)
          .send({
            shouldPollResponse: false,
            callValue: parseInt(parseFloat(this.amountToStake * SUN)),
          })
          .then(async (res) => {
            // Get daily entry for all users
            const dayEntry = await this.mainContract
              .xfLobby(this.currentItem.day)
              .call({
                shouldPollResponse: true,
              });
            const parsedDayEntryValue = parseFloat(
              window.tronWeb.fromSun(dayEntry)
            );
            this.text = this.amountToStake + " successfully entered lobby.";
            this.snackbar = true;
          })
          .catch((err) => {
            console["error"](err, "er");
          })
          .finally(async () => {
            this.delay();
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
