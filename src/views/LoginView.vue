<template>
    <div class="card">
        <h2>Login</h2>
        <form @submit.prevent="login" class="form-container">
            <InputText v-model="email" placeholder="Email" type="email" required />
            <Password v-model="password" placeholder="Senha" required toggleMask />
            <Button label="Entrar" type="submit" />
        </form>
        <p>Não tem conta? <router-link to="/register">Cadastrar</router-link></p>
    </div>
</template>

<script>
import { ref } from 'vue'
import { auth, signInWithEmailAndPassword } from '@/firebase'
import { useRouter } from 'vue-router'
import { useToast } from "primevue/usetoast";

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const router = useRouter()
        const toast = useToast()

        const login = async () => {
            try {
                await signInWithEmailAndPassword(auth, email.value, password.value)
                toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado!', life: 3000 })
                router.push('/home')
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Erro', detail: error.message, life: 5000 })
            }
        }

        return { email, password, login }
    },
}
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
}
</style>
