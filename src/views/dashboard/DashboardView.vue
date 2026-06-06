<script>
    const user = JSON.parse(localStorage.getItem('user'))
</script>

<template>
    <h1>Logged in as {{ user.name }}</h1>

    <DefaultLayout>
            <div class="container">
                <h1>Dashboard</h1>
                <p>Bem-vindo ao dashboard, {{ user.name }}!</p>
            </div>
    </DefaultLayout>
</template>