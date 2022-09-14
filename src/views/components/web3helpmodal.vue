
<template>

<div>
<!-- Modal toggle -->
  
<div v-if="isShown()" id="popup-modal" tabindex="-1" class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full" style="background:#3334" @click="hide()">
    <div class="relative  p-4 w-full max-w-md h-full md:h-auto" style="margin: 0 auto;">
        <!-- Modal content -->
        <div class="relative bg-neutral-600 rounded-lg shadow">
            <!-- Modal header -->

            
            <div class="flex justify-end p-4">

                 <div class="px-2 text-white text-2xl font-sharp"> No Web3 Connection Found 🔌   </div>
               
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal" @click="hide()">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <!-- Modal body -->
            <div class="pb-12 pt-6 text-center">
                <div class="p-4 text-center bg-neutral-900 hover:bg-black text-white cursor-pointer"  >
                 
                    <a href="https://metamask.io" class="text-white" target="_blank">     <img src="@/assets/images/MetaMask_Fox.svg" class="inline" width="24px" /> Download Metamask Wallet </a>
                </div>
                 
                 
                  
                 
            </div>
        </div>
    </div>
</div>

</div>

</template>

<script>
 
export default {
  name: 'Web3ConnectModal',
  props: [   ],
  components: { },
  data() {
    return {
         
    }
  },
  mounted(){
 

  },
  methods: { 
      
      

      hide(){
        this.$store.commit('setShowWeb3HelpModal',false)
      },


      web3IsActive(){          
         return this.$store.state.web3Storage.active
       },


      isShown(){
        return this.$store.state.frontendStorage.showWeb3HelpModal

          
      }
 
  }
}

</script>
