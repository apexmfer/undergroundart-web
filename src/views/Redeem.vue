<template>
  <div>
   <PrimaryLayout> 

  <div class="section w-container flex flex-col py-16"> 

   
      <div> Redeem your digital asset </div>


      <div > 

 
        <input class="p-2 border-2 border-gray-500 my-2 rounded " v-model="secretMessage" placeholder="redemption code" /> 

        <ButtonDefault 
        class="p-2 bg-blue-400 hover:bg-gray-400 inline text-white mx-2 "
        @clicked="claim"
        > 
        Claim 
        </ButtonDefault>

      </div>  





     </div>


  


   </PrimaryLayout>
  </div>
</template>


<script>
 

import AppHelper, {routeTo,redirectTo} from '@/js/app-helper'
import {getRouteTo} from '@/js/frontend-helper'
 
 import {resolveRoutedApiQuery} from '@/js/rest-api-helper'
import PrimaryLayout from './PrimaryLayout.vue';
 
import TiledGalleryBrowser from '@/views/components/gallery/TiledGalleryBrowser.vue'
import ButtonDefault from '@/views/elements/button_default.vue'
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


    claim(){
      console.log('claim',this.secretMessage)
    }
  
 
    
  },
};
</script>
