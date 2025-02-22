// src/composables/useAuth.js
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const user = ref(null);

export function useAuth() {
    const auth = getAuth();

    onMounted(() => {
        onAuthStateChanged(auth, (currentUser) => {
            user.value = currentUser;
        });
    });

    return { user };
}
