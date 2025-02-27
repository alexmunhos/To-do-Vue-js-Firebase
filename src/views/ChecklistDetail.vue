<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const route = useRoute();
const router = useRouter();
const checklist = ref(null);

// Carregar o checklist específico
const loadChecklist = async () => {
    const docRef = doc(db, 'checklists', route.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        checklist.value = { id: docSnap.id, ...docSnap.data(), items: docSnap.data().items || [] };
    } else {
        router.push('/');
    }
};

// Adicionar um item
const addItem = async () => {
    checklist.value.items.push({ text: '', done: false });
};

// Remover item
const removeItem = async (index) => {
    checklist.value.items.splice(index, 1);
};

// Watch para monitorar mudanças no item.text e atualizar no Firebase
watch(
    () => checklist.value?.items.map(item => ({ text: item.text, done: item.done })),
    async () => {
        if (!checklist.value) return;
        await updateDoc(doc(db, 'checklists', checklist.value.id), { items: checklist.value.items });
    },
    { deep: true }
);

onMounted(loadChecklist);
</script>

<template>
    <div v-if="checklist">
        <div class="flex items-center" style="margin-bottom: 15px;">
            <h2>{{ checklist.title }}</h2>
            <Button label="Voltar" @click="router.push('/')" />
            <Button label="Adicionar Item" icon="pi pi-plus" @click="addItem"
                style="margin-left: 15px; position: relative; top: 1px;" />
        </div>

        <div v-for="(item, index) in checklist.items" :key="index" class="flex items-center"
            style="margin-bottom: 15px;">
            <Checkbox v-model="item.done" binary style="margin-right: 15px; position: relative; bottom: 13px;" />
            <InputText v-model="item.text" placeholder="Descrição do item" style="margin-right: 15px;" />
            <Button icon="pi pi-trash" severity="danger" @click="removeItem(index)" class="ml-2" />
        </div>
    </div>
    <div v-else>
        <p>Carregando checklist...</p>
    </div>
</template>
