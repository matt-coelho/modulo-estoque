<template>
    <div class="btn-group" role="group" aria-label="acoeslistagem">
        <button type="button" @click="$emit('editar', entidade)" class="btn btn-warning">Editar</button>
        <button type="button" @click="$emit('clonar', entidade)" class="btn btn-success">Clonar</button>
        <button type="button" @click="$emit('remover', entidade.id)" class="btn btn-danger">Deletar</button>
    </div>
</template>

<script>
export default {
    name: "AcoesListagem",
    props: {
        entidade: {
            type: Object,
            required: true,
        },
    },
    emits: ["editar", "remover", "clonar"],
}
</script>