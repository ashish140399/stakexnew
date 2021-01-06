/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
<template>
  <div class="stake-inner radius-20" style="height: 100vh">
    <v-card class="mx-auto blue-table radius-20" max-width="800" flat style="margin-top:75px">
      <v-card-title style="color:white">Your Referral Link</v-card-title>
      <v-card-text style="color:white">Your referrals will earn an extra 5% minted STX tokens on their Auction Lobby Purchase. As a referrer you will earn an extra 10%. There are no limits on number nor the amount of referrals that you can get.</v-card-text>
      <v-row class="ml-4 mr-4 blue-table radius-20" style="color:white">
        <v-text-field
          id="referralInput"
          outlined
          class="px-4 white white--text"
          label="Referral Link"
          readonly
          :value="referral"
          required
          style="color:white !important"
        ></v-text-field>
        <v-btn
          @click="copyLink()"
          block
          class="mt-1 mb-6"
          style="background: linear-gradient(90deg, #8262ff 0%, #5124ff 100%); color:white; margin-bottom: 20px"
        >Copy Link</v-btn>
      </v-row>

      <!-- <v-card ><v-card-subtitle>Referral History</v-card-subtitle></v-card> -->
    </v-card>
  </div>
</template>

<script>
//const walletAddress = "placeholder";
import background from '../assets/images/StakeX-Auction2.jpg';

export default {


  data() {
    return {
      address: "",
      referral: `https://www.some-url.io?ref=${this.address}`,
    };
  },
  updated() {
    document.getElementById('backgroundImage').style.backgroundImage = "url(" + background + ")";
  },
      mounted() {
          document.getElementById('backgroundImage').style.backgroundImage = "url(" + background + ")";
        /*socket.on("newRecords", (data) => {
          //console.log("newRecords==>>>>", data);
          //this.myObj = data;
        });*/
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
                this.address = userAddress;
                this.referral  = `https://www.some-url.io?ref=${this.address}`;
                try {
                    setInterval(() => {
                        if (
                            window.tronWeb &&
                            this.address !== window.tronWeb.defaultAddress.base58
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
  methods: {
    copyLink() {
        const inputField = document.getElementById('referralInput');
        inputField.focus();
        inputField.select();
        inputField.setSelectionRange(0, 999999); //for mobile devices
        document.execCommand('copy');
    },
  },
};
</script>
