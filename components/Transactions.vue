<script setup lang="js">

const loading = ref(true)
const transactions = ref([])

const fetchData = async () => {
    loading.value = true
    const { data } = await useFetch("/api/transactions")
    transactions.value = data.value.transactions
    loading.value = false
}

onMounted(() => (
    fetchData()
))
</script>

<template>
    <div class="overflow-x-auto rounded border-2">
    <p class="cardTitle">Transactions</p>
    <table class="table">
        <!-- head -->
        <thead>
        <tr>
            <th>Amount</th>
            <th>Account</th>
            <th>Merchant</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>
        <!-- row 1 -->
        <tr v-for="t in transactions">
            <td>{{ "$ " + t.amount }}</td>
            <td>{{ t.account }}</td>
            <td>{{ t.merchant_name }}</td>
            <td>{{ t.date }}</td>
        </tr>
        </tbody>
    </table>
    </div>
</template>

<style>

</style>