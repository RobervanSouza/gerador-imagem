// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "gerar-imagem1007.firebaseapp.com",
  projectId: "gerar-imagem1007",
  storageBucket: "gerar-imagem1007.appspot.com",
  messagingSenderId: "935233596445",
  appId: "1:935233596445:web:ac6a09e80104904206eaf4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storege = getStorage(app)

export async function editarImagem(imagem_url: string, name: string){
    try {
        
        const response = await fetch(imagem_url)
        const data = await response.arrayBuffer()
        const nomeArquivo = name.replace('', '') + Date.now + ".jpeg"
        const storageRef = ref(storege, nomeArquivo)
        await uploadBytes(storageRef, data, {
            contentType: 'image/jpeg',
        })

        const firebase_url = await getDownloadURL(storageRef)
        return firebase_url;
    } catch (error) {
        console.error(error)
    }
}