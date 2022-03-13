import db from './index'
import {
    collection, getDocs
} from 'firebase/firestore'

// const y = []
const colRef = collection(db, 'posts')
getDocs(colRef, y)
.then((snap)=>{
  snap.docs.forEach((doc)=>{
    y.push({...doc.data(), id:doc.id})
  })
  // alert(t.value)
})
// export { y }
export default {
    y, getDocs
}
//

// toggleEditForm
    toggleEditForm(){
      this.editMode = !this.editMode
    }


    // const update = (id) => {
    //   const updateForm = document.querySelector("#update");
    //   const title = updateForm.title.value;
    //   const details = updateForm.details.value;
    //   const createAt = new Date();
    //   const docRef = doc(db, colRef, id)
    //   updateDoc(docRef, {
    //     title, details, createAt
    //   })
    //   .then(()=>{
    //     updateForm.reset()
    //     this.editMode = false
    //   })
    // }
