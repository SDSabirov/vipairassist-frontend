<template>
  <div>
    <div
      id="g_id_onload"
      data-client_id="YOUR_GOOGLE_CLIENT_ID"
      data-callback="handleCredentialResponse"
      data-auto_prompt="false"
    ></div>
    <div class="g_id_signin" data-type="standard"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.handleCredentialResponse = (response) => {
      console.log("Encoded JWT ID token: " + response.credential);
      // Send the token to your backend for validation and user creation
    };
  },
};
</script>
