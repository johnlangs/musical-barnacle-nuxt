<script setup lang="js">
import { onMounted, ref } from 'vue'
import SignIn from './SignIn.vue';

const balance = ref(0)
const accounts = ref(null)
const loading = ref(true)

const fetchData = async () => {
  loading.value = true
  const { data } = await useFetch("/api/accountsList")
  accounts.value = data.value.accounts.map((item) => item.name).join(", ")
  balance.value = "$ " + data.value.balance.toLocaleString()
  loading.value = false
}

onMounted(() => (
  fetchData()
))

</script>

<template>
    <section class="HeaderContainer">
        <!-- Balance Amount Field -->
        <p v-if="loading" id="accountSum"> $ Loading . . . </p>
        <p v-else id="accountSum"> {{ balance }} </p>

        <!-- Bank List Field -->
        <p v-if="loading" id="bankList">
            <b> Accounts Connected: </b>
            Loading . . .
        </p>
        <p v-else id="bankList">
            <b> Accounts Connected: </b>
            {{ accounts }}
        </p>
        <SignIn></SignIn>
    </section>
</template>

<style scoped>
/* CSS needed for Header.jsx */

/* Used to contain header, provides background color*/
.HeaderContainer {
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 30px;
  background-color: #F2A1FF;
  font-family: Inter;
}

/* large number*/
#accountSum {
  margin:inherit;
  font-size: 2.8125rem;
  font-size: clamp(2.7rem, 1.6rem + 5.4vw, 6rem);
  font-weight:900;
}
@media screen and (min-width: 1000px) {
  #accountSum {
    font-size: 96px;
  }
}

/* list of banks the user has connected */
#bankList {
  margin:inherit;
  font-size:calc(10px + .45vw); /*min width of 10px*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
@media screen and (min-width: 1000px) {
  #bankList {
    font-size: 15px
  }
}

.dialogButton {
  margin:inherit;
}

.dialogButton p {
  font-size: 1.25rem;
  margin: calc(5px + .25vw);
}

/*Card that shows the user their options*/
#cardSelector {
  margin-top: calc(10px + .5vw);
  pad: 10px;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  border-radius: 10px;
}
#cardSelector p {
  color:  black;
}
</style>
