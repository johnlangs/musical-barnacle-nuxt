<script setup lang="js">
import { onMounted, ref } from 'vue'

const token = ref(null)
const loading = ref(true)

// :( theres better ways, gets pushed to the head, so maybe move it over to meta?
onMounted(() => {
      // Load jQuery from CDN
      const jQueryScript = document.createElement('script');
      jQueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js';
      jQueryScript.async = true;
      document.head.appendChild(jQueryScript);

      jQueryScript.onload = () => {
        console.log('jQuery is loaded:', window.jQuery);

        // Now that jQuery is loaded, load Plaid from CDN
        const plaidScript = document.createElement('script');
        plaidScript.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
        plaidScript.async = true;
        document.head.appendChild(plaidScript);

        plaidScript.onload = () => {
          console.log('Plaid is loaded');

          // Load custom script from inline text
          const customScript = document.createElement('script');
          customScript.textContent = `
          (async function($) {

            var handler = Plaid.create({

                // Create a new link_token to initialize Link

                token: (await $.post('/api/create_link_token')).link_token,

                onLoad: function() {

                // Optional, called when Link loads

                },

                onSuccess: function(public_token, metadata) {

                // Send the public_token to your app server.

                // The metadata object contains info about the institution the

                // user selected and the account ID or IDs, if the

                // Account Select view is enabled.

                $.post('/api/exchange_public_token', {

                    public_token: public_token,

                });

                },

                onExit: function(err, metadata) {

                // The user exited the Link flow.

                if (err != null) {

                    // The user encountered a Plaid API error prior to exiting.

                }

                // metadata contains information about the institution

                // that the user selected and the most recent API request IDs.

                // Storing this information can be helpful for support.

                },

                onEvent: function(eventName, metadata) {

                // Optionally capture Link flow events, streamed through

                // this callback as your users connect an Item to Plaid.

                // For example:

                // eventName = "TRANSITION_VIEW"

                // metadata  = {

                //   link_session_id: "123-abc",

                //   mfa_type:        "questions",

                //   timestamp:       "2017-09-14T14:42:19.350Z",

                //   view_name:       "MFA",

                // }

                }

            });

            $('#link-button').on('click', function(e) {

                handler.open();

            });

            })(jQuery);
          `;
          document.head.appendChild(customScript);
        };
      };
});

</script>

<template>
    <button id="link-button">Link Account</button> 
</template>


<style scoped>
button {
  border: 1px solid black;
  border-radius: 5px;
  background: black;
  height: 48px;
  width: 155px;
  margin-top: 25px;
  margin-left: 20;
  color: white;
  font-size: 18px;
}
</style>
