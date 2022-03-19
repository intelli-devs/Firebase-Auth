const notification = document.querySelector('.notification')
import { initializeApp } from 'firebase/app'
import {
    getAuth, getIdTokenResult, getUs
} from 'firebase/auth'
import {
    getFirestore, collection, getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAZOw336ODfkCbHOh-aTi3khZLcnViAxTU",
    authDomain: "fir-auth-c6820.firebaseapp.com",
    projectId: "fir-auth-c6820",
    storageBucket: "fir-auth-c6820.appspot.com",
    messagingSenderId: "730580350423",
    appId: "1:730580350423:web:3ae62b8619a4422ccc0792"
  };
  initializeApp(firebaseConfig)

  //init services
  const db = getFirestore()
  const auth  = getAuth()

//   //colRef
//   const colRef = collection(db, 'posts')
//   const posts = []
//   //reading the post
//   getDocs(colRef)
//   .then((snap) => {
       
//         let html = ''
//         const display = document.querySelector('#post')
//         snap.docs.forEach((doc)=>{
//             posts.push({...doc.data(), id:doc.id})
//             //  posts.push(doc.data())
//             let post = doc.data()
//             // let li = ` <li> <div class="container post"> ${post.title}</div> </li>`
//             const li = ` <div class="container"> <h3> Title  <span id="closeModal" style="float: right">X</span> </h3> ${ post.title } <h3>Details</h3> ${ post.details}   </div>`
//             html+=li
           
//         })
//         display.innerHTML = html
        
//   })
//   .catch(err => {
//       console.log(err.message)
//   })
//   export {
//       posts
//   }
//   export default posts
const showAlert = (data) => {
    if(data){
        notification.textContent = 'Default Context'
        notification.innerHTML = 'In Default Content'
    }
    
    notification.classList.remove('errorActive')
    notification.textContent = data
    notification.innerHTML = `${data}`
    notification.classList.add('active')
    setTimeout(()=>{
        notification.classList.remove('active')
        notification.textContent = ''
    }, 2000)
}
const showError = (data) => {
    if(data==undefined){
    notification.textContent = 'Default Context'
    notification.innerHTML = 'In Default Content'
    }
    notification.classList.remove('active')
    notification.textContent = data
    notification.innerHTML = `${data}`
    notification.classList.add('errorActive')
    setTimeout(()=>{
        notification.classList.remove('errorActive')
        notification.textContent = ''
    }, 2000)
}


export {db, auth, showAlert, showError}