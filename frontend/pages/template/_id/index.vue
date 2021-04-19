<template>
  <v-container>
    <EmailTemplate/>
  </v-container>
</template>

<script>


import EmailTemplate from "@/components/template/EmailTemplate";

export default {
  components: {EmailTemplate},
  data() {
    return {
      templateId: null,
      template: {
        templateId: null,
        name: '',
        subject: '',
        body: '',
        addTrackingImg: false
      }
    }
  },
}
</script>

