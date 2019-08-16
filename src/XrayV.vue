<template> 
  <div ref="wrap" id="wrap">
    <Timelines v-ref="tlines"></Timelines>
    <button @click="hideme()" class="button--m button--primary">Close</button>
  </div>
</template>

<script>
import axios from 'axios';
import Timelines from './timelines.vue'
export default {
  components: {
    Timelines
  },
  mounted () {
    this.hideme();
    // scanning and injecting
    bar_scan(this);
    setInterval(() => {bar_scan(this)}, 1000);

    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.ask == 'openmd') {
        this.showme();
        this.assetData = request.asset;
      }
    });
    if (localStorage['shared-authentication-api-v3-tokens']) {
      this.token = JSON.parse(localStorage['shared-authentication-api-v3-tokens']).accessToken;
    }
  },
  data () {
    return {
      token: undefined,
      assetData: undefined
    }
  },
  methods: {
    hideme() {
      this.$refs.wrap.style.display="none";
    },
    showme() {
      this.$refs.wrap.style.display="flex";
    }
  }
}

function bar_scan(_th) {
  // Content "ROI Explorer" navbar item
  if (!document.getElementById('roiex_injected')) {
    const elem = document.createElement('li');
    elem.className = 'item header__bottom-bar__navigation item__link';
    elem.id = 'roiex_injected';
    elem.textContent = 'ROI Explorer';
    elem.onclick = () => {
      chrome.runtime.sendMessage({ask: "openext"});
    }
    document.getElementById('tab-labels').appendChild(elem);
  }

  // XRay buttons in library asset view
  if (document.getElementsByClassName('customxraybutton').length <= 1) {
    for (let i of document.getElementsByClassName('control__indicator')) {
      let elem = genButton(_th);
      if (i.getAttribute('data-test-label') == 'dam-item-checkbox' && i.className.indexOf('customxraybutton') == -1) {
        i.parentElement.insertBefore(elem, i);
      }
    }	
  }
  // Asset view footer button
  if (document.getElementsByClassName('asset-viewer__footer')[0].children.length == 1) {
    let elem = genButton(_th);
    elem.style.bottom = '0px';
    elem.style.right = '0px';
    document.getElementsByClassName('asset-viewer__footer')[0].appendChild(elem);
  }
}

function genButton(_th) {
  let elem = document.createElement('button');
  elem.className = 'button--m button--primary customxraybutton';
  elem.textContent = 'XRay';
  elem.style.position = 'relative';
  elem.style.outline = 'none';
  elem.style.padding = '1px';
  elem.style.margin = '0px';
  elem.style.borderRadius = '2px';
  elem.style.bottom = '6px';
  elem.style.right = '3px';
  elem.onclick = (e) => {
      _th.assetData = 'none for now';
      _th.showme();
      e.stopPropagation();
  }
  return elem;
}
</script>

<style scoped>
#wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  background-color: rgba(0,0,0,.3);
  justify-content: center;
  align-items: center;
}

#mainw {
  max-width: 640px;
  max-height: 640px;
  color: #262626;
  /* background-color: white; */
  border-radius: 2px;
  border-width: 1px;
  /* border-style: solid; */
  border-color: #ccc;
  box-sizing: border-box;
  box-shadow: 0 4px 4px 0 rgba(0,0,0,.25);
  
}

p {
  word-wrap: break-word;
  margin: 0px;
  padding: 5px;
}
</style>
