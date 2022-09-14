<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-col py-16 " style="min-height:600px"> 

   
      <div> Redeem your digital asset </div>


      <div > 

 
        <input class="p-2 border-2 border-gray-500 my-2 rounded " v-model="secretMessage" placeholder="redemption code" /> 



        <ButtonDefault 
        v-if="web3IsActive()"
        class="p-2 bg-blue-400 hover:bg-gray-400 inline text-white mx-2 "
        @clicked="claim"
        > 
        Claim 
        </ButtonDefault>

        <ButtonDefault 
        v-if="!web3IsActive()"
        class="p-2 bg-indigo-600 hover:bg-gray-400 inline text-white mx-2 "
        @clicked="connect"
        > 
        Connect 
        </ButtonDefault>

      </div>  





     </div>


  


   </PrimaryLayout>
  </div>
</template>


<script>

import {ethers,Contract,utils} from 'ethers';
 

import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'
import {getRouteTo} from '@/js/frontend-helper'
 
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper'
import PrimaryLayout from './PrimaryLayout.vue';
 
import TiledGalleryBrowser from '@/views/components/gallery/TiledGalleryBrowser.vue'
import ButtonDefault from '@/views/elements/button_default.vue'
 
const ContractsConfig = require('/src/contracts/ContractsConfig.json');

const ArtContractABI = require('/src/contracts/UndergroundArt.abi.json');

export default {
  name: "Home",
  props: [],
  components: {
     PrimaryLayout,
      ButtonDefault 
      },
  data() {
    return {
         secretMessage: undefined,
    };
  },

  async created() {


 
     
  },


  async mounted(){

    let routerCode = this.$route.params.code 

    if(routerCode){
      this.secretMessage = routerCode 
    }

  },

  methods: {
    routeTo,
    
    getRouteTo,


      web3IsActive(){    
        return this.$store.state.web3Storage.active
      },
      activeAccount(){          
        return this.$store.state.web3Storage.account
      } ,



    async claim(){
      console.log('claim',this.secretMessage)

      let secretMessage = this.secretMessage


      let localConfig = ContractsConfig['goerli']

      let injectedEthereum = this.$store.state.web3Storage.injectedEthereum

       let primaryAccount= this.$store.state.web3Storage.account

       console.log({primaryAccount})
       console.log(localConfig.UndergroundArt.proxyContractAddress)
      let provider = new ethers.providers.Web3Provider(injectedEthereum)

     

      const signer = provider.getSigner();
      let artContract = new Contract( 
        localConfig.UndergroundArt.proxyContractAddress ,
        ArtContractABI,
        signer
      )



      let tx = await artContract.mintTokenFromSecretMessage(utils . arrayify(secretMessage),{from:primaryAccount})
    },


    async connect(){

      this.$store.commit('setShowWeb3ConnectModal',true)

    }
  
 
    
  },
};
</script>
