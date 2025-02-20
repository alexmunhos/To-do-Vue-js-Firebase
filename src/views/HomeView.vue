<template>
  <div class="card">
    <h2>Olá, {{ userName }}</h2>
    <Button label="Sair" @click="logout" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth, db, signOut, doc, getDoc } from '@/firebase'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const userName = ref('')
    const router = useRouter()

    onMounted(async () => {
      const user = auth.currentUser
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          userName.value = userDoc.data().name
        }
      } else {
        router.push('/login')
      }
    })

    const logout = async () => {
      await signOut(auth)
      router.push('/login')
    }

    return { userName, logout }
  },
}
</script>
