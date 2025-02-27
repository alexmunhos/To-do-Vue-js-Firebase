<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

const checklists = ref([]);
const checklistName = ref('');
const router = useRouter();

// Carregar checklists do Firestore
const loadChecklists = async () => {
    const querySnapshot = await getDocs(collection(db, 'checklists'));
    checklists.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Criar um novo checklist
const createChecklist = async () => {
    if (checklistName.value.trim() === '') {
        alert('Por favor, insira um nome para o checklist.');
        return;
    }

    const newChecklist = {
        title: checklistName.value,
        items: []
    };

    try {
        const docRef = await addDoc(collection(db, 'checklists'), newChecklist);
        checklists.value.push({ id: docRef.id, ...newChecklist });
        checklistName.value = '';
        alert('Checklist criado com sucesso!');
    } catch (error) {
        console.error("Erro ao criar checklist:", error);
        alert('Não foi possível criar o checklist.');
    }
};

// Excluir checklist
const deleteChecklist = async (checklist) => {
    await deleteDoc(doc(db, 'checklists', checklist.id));
    checklists.value = checklists.value.filter(c => c.id !== checklist.id);
};

// Abrir checklist
const openChecklist = (checklistId) => {
    router.push({ name: 'checklistDetail', params: { id: checklistId } });
};

onMounted(loadChecklists);
</script>

<template>
    <div>
        <h2>Meus Checklists</h2>
        <div class="flex items-center">
            <InputText v-model="checklistName" type="text" placeholder="Novo Checklist" class="border rounded"
                style="margin-right: 15px;" />
            <Button label="Criar Checklist" icon="pi pi-plus" @click="createChecklist" />
        </div>

        <div v-for="checklist in checklists" :key="checklist.id" class="p-3 border rounded-lg my-3">
            <div class="flex justify-between items-center">
                <h3 @click="openChecklist(checklist.id)" class="cursor-pointer">{{ checklist.title }}</h3>
                <Button icon="pi pi-trash" severity="danger" @click="deleteChecklist(checklist)" />
            </div>
        </div>
    </div>
</template>
