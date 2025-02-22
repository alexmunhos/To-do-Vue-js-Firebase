<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const route = useRoute();
const router = useRouter();
const checklist = ref(null);

// Carregar o checklist específico
const loadChecklist = async () => {
    console.log(route.params.id);
    const docRef = doc(db, 'checklists', route.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        checklist.value = { id: docSnap.id, ...docSnap.data() };
    } else {
        router.push('/'); // Redireciona se o checklist não existir
    }
};

// Adicionar um item
const addItem = async () => {
    const newItem = { text: '', done: false };
    checklist.value.items.push(newItem);
    await updateDoc(doc(db, 'checklists', checklist.value.id), { items: checklist.value.items });
};

// Remover item
const removeItem = async (index) => {
    checklist.value.items.splice(index, 1);
    await updateDoc(doc(db, 'checklists', checklist.value.id), { items: checklist.value.items });
};

// Marcar item como concluído
const toggleItem = async (index) => {
    checklist.value.items[index].done = !checklist.value.items[index].done;
    await updateDoc(doc(db, 'checklists', checklist.value.id), { items: checklist.value.items });
};

// Atualizar status do checklist
const toggleChecklist = async () => {
    checklist.value.completed = !checklist.value.completed;
    await updateDoc(doc(db, 'checklists', checklist.value.id), { completed: checklist.value.completed });
};

// Excluir checklist
const deleteChecklist = async () => {
    await deleteDoc(doc(db, 'checklists', checklist.value.id));
    router.push('/');
};

onMounted(loadChecklist);
</script>

<template>
    <div v-if="checklist">
        <h2>{{ checklist.title }}</h2>
        <Button label="Voltar" @click="router.push('/')" style="margin-bottom: 15px;" />

        <div v-for="(item, index) in checklist.items" :key="index" class="flex items-center"
            style="margin-bottom: 15px;">
            <Checkbox v-model="item.done" @change="toggleItem(index)"
                style="margin-right: 15px; position: relative; bottom: 13px;" />
            <InputText v-model="item.text" placeholder="Descrição do item" style="margin-right: 15px;" />
            <Button icon="pi pi-trash" severity="danger" @click="removeItem(index)" class="ml-2" />
        </div>

        <div class="flex items-center" style="margin-top: 15px;">
            <Button label="Adicionar Item" icon="pi pi-plus" @click="addItem" style="margin-right: 15px;" />
            <Button label="Excluir Checklist" severity="danger" @click="deleteChecklist" class="ml-2" />
        </div>
    </div>
    <div v-else>
        <p>Carregando checklist...</p>
    </div>
</template>
