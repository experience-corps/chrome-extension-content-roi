<template>
  <div>
    <p>This is the injected script. Yeah, it's a vue component.</p>
    <p>API Token: {{ token }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  mounted () {
    if (localStorage['shared-authentication-api-v3-tokens']) {
      this.token = JSON.parse(localStorage['shared-authentication-api-v3-tokens']).accessToken;
    }
    function scan() {
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
    }
    // Scan every second to see if we can inject
    scan();
    setInterval(scan, 1000);
  },
  data () {
    return {
      token: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  background-color: lightcoral;
  color: white;
  margin: 0px;
  padding: 5px;
}
</style>
