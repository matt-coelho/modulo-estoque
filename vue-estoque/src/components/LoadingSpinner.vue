<template>
    <div class="d-flex align-items-center">
        <strong role="status">{{ mensagem }}</strong>
        <template v-if="comSpinner">
            <div class="spinner-border ms-auto text-warning" aria-hidden="true"></div>
        </template>
    </div>
</template>

<script>
export default{
    name: "LoadingSpinner",
    props:{
        mensagem:{
            type: String,
            default: "Carregando...",
        },
        comSpinner:{
            type: Boolean,
            default: true,
        }
    },
}
</script>