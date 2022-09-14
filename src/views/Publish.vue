<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-col py-16 " style="min-height:600px"> 

   
      <div class="text-lg"> Publish a new Art Project </div>


      <div class="pt-8"> 

 
     

        <div class="flex flex-col w-1/2 ">

          <div class="pb-4">
          <div class="font-bold"> Metadata URI </div>
          <input class="p-2 border-2 border-gray-500 my-2 rounded " v-model="metadataURI" placeholder="Metadata URI" /> 
          </div>

          <div class="pb-4">
             <div class="font-bold"> Total Supply </div>
          <input class="p-2 border-2 border-gray-500 my-2 rounded " v-model="totalSupply" placeholder="Total Supply" /> 
          </div>
          
          <div class="pb-4">
             <div class="font-bold"> Mint Price </div>
          <input class="p-2 border-2 border-gray-500 my-2 rounded " v-model="mintPrice" placeholder="Mint price (ETH)" /> 
          </div>

        </div>

        <ButtonWeb3        
        class="p-2 bg-blue-400 hover:bg-gray-400 inline text-white mx-2 "
        @clicked="claim"
        > 
        Claim 
        </ButtonWeb3>
       

      </div>  

  <div>
  
    <ErrorBanner  
      ref="errorBanner"
    
    
    />
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
import ButtonWeb3 from '@/views/elements/button_web3_call.vue'
import ErrorBanner from '@/views/elements/ErrorBanner.vue'



const ContractsConfig = require('/src/contracts/ContractsConfig.json');

const ArtContractABI = require('/src/contracts/UndergroundArt.abi.json');

export default {
  name: "Home",
  props: [],
  components: {
     PrimaryLayout,
      ButtonDefault ,
      ButtonWeb3,
      ErrorBanner
      },
  data() {
    return {

         metadataURI: "ipfs://",
         totalSupply: 10,
         mintPrice: 0
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

      try{
       let tx = await artContract.defineProject(primaryAccount, this.metadataURI, this.totalSupply, this.mintPrice,{from:primaryAccount})

      }catch(e){

        this.$refs.errorBanner.renderError('Could not define project.')
      }
    },
 
    
  },
};
</script>
