import { projectFirestore } from "../firebase/config";
const { ref } = require("@vue/runtime-dom");

const useDocument = (collection, id) => {
  let error = ref(null);
  let isPending = ref(false);
  const docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      error.value = null;
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not delete the document ";
      isPending.value = false;
    }
  };
  const UpdateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;

    try {
      error.value = null;
      const res = await docRef.update(updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not update the document ";
      isPending.value = false;
    }
  };

  return { error, isPending, deleteDoc, UpdateDoc };
};

export default useDocument;
