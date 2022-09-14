<template>
  <div class="section py-4 text-white h-full bg-neutral-800" style="  min-height: 250px;">
    <div class=" h-full flex flex-col" style="min-height: 250px;">
      <div class=" flex flex-grow flex-row  ">
         
        <div class="w-1/3 p-2 flex flex-col">
          <h3 class=" text-md   ">Documentation</h3>

           <a v-for="item in config.documentation" :key="item.title" :href="item.path" target="_blank"> {{item.title}} </a>
         
           
          </div>
        <div class="w-1/3 h-full p-2 flex flex-col">
          <h3 class=" text-md  ">Quick Links</h3>

              <a v-for="item in config.quicklinks" :key="item.title" :href="item.path" target="_blank"> {{item.title}} </a>
         
         
         </div>


             <div class="w-1/3 h-full p-2 flex flex-col">
          <h3 class=" text-md  ">Community &amp; Social</h3>

              <a v-for="item in config.community" :key="item.title" :href="item.path" target="_blank"> {{item.title}} </a>
         
         
         </div>


      </div>
       <div class=" flex flex-row w-full" style="height:60px;">


        <div class="text-center w-full"> Built by  <a href="https://twitter.com/ethereumdegen"> @EthereumDegen </a></div>
         
      </div>

    </div>
  </div>
</template>


<script>

const footerConfig = require('../config/footer-config.json')


export default {
  name: 'Footer',
  props: [],
  data() {
    return {
      config: footerConfig
    }
  },
  created(){

  },
  methods: {

  }
}
</script>
