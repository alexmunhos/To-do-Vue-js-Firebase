<template>
    <div class="card">
        <h2>Cadastro</h2>
        <form @submit.prevent="register" class="form-container">
            <InputText v-model="name" placeholder="Nome" required />
            <InputText v-model="cpf" placeholder="CPF" required />
            <InputText v-model="email" placeholder="Email" type="email" required />
            <Password v-model="password" placeholder="Senha" required toggleMask />
            <Button label="Cadastrar" type="submit" />
        </form>
        <p>Já tem conta? <router-link to="/login">Entrar</router-link></p>
    </div>
</template>

<script>
import { ref } from 'vue'
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from '@/firebase'
import { useToast } from "primevue/usetoast";

export default {
    setup() {
        const name = ref('')
        const cpf = ref('')
        const email = ref('')
        const password = ref('')
        const toast = useToast()

        const register = async () => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    name: name.value,
                    cpf: cpf.value,
                    email: email.value,
                })

                toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário cadastrado com sucesso!', life: 3000 })
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Erro', detail: error.message, life: 5000 })
            }
        }

        return { name, cpf, email, password, register }
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
