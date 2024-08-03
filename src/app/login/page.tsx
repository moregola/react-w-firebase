// pages/login.tsx
"use client";
import { useEffect } from "react";


import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "../firebase/firebaseConfig";
import Image from "next/image";
import { GoogleAuthProvider } from "firebase/auth";
import { useSignInWithGoogle,useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'



const LoginPage = () => {
  const { currentUser } = auth;
  const router = useRouter();
  const [signInWithGoogle] = useSignInWithGoogle(auth); // Move the hook call here
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth); // Add this line
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithGoogle(); 
      if(res){
        sessionStorage.setItem("user", JSON.stringify(res.user));
        alert("Sucesso ao logar com o Google, redirecionando...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }

      if(!res){
        alert("Erro ao logar com o Google");
        setTimeout(() => {
          router.refresh();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Rest of the code...


 const handleEmailLogin = async (e: React.FormEvent) => {
   e.preventDefault();
   const { email, password } = e.target as typeof e.target & {
     email: { value: string };
     password: { value: string };
   };
   try {

     const res = await signInWithEmailAndPassword(email.value, password.value);
     
     if (res) {
       sessionStorage.setItem("user", JSON.stringify(res.user));
       alert("Sucesso ao logar com o Email, redirecionando...");
       setTimeout(() => {
         router.push("/");
       }, 2000);
     }

     if (!res) {
       alert("Erro ao logar com o Email");
       setTimeout(() => {
         router.refresh();
       }, 2000);
     }
   } catch (error) {
     console.error(error);
   }
 };

 return (
   <div className="flex items-center justify-center min-h-screen bg-gray-200">
     <div className="p-6 bg-white rounded-md shadow-lg w-80">
       <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
         Login
       </h2>
       <button
         onClick={() => handleGoogleLogin()}
         className="flex items-center justify-center w-full py-2 mb-4 text-gray-600 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
       >
         <Image
           src="/google-icon.svg"
           alt="Google Icon"
           className="w-4 h-4 mr-2"
           width={24}
           height={24}
         />
         Continue com Google
       </button>
       <form onSubmit={handleEmailLogin}>
         <input
           type="email"
           name="email"
           placeholder="Email"
           className="w-full px-3 py-2 mb-3 border border-gray-300 rounded bg-gray-50"
         />
         <input
           type="password"
           name="password"
           placeholder="Password"
           className="w-full px-3 py-2 mb-3 border border-gray-300 rounded bg-gray-50"
         />
         <button
           type="submit"
           className="w-full py-2 mt-2 font-semibold text-white bg-gray-700 rounded hover:bg-gray-800"
         >
           Login
         </button>
       </form>
       <p className="mt-4 text-center text-gray-600">
         Não tem uma conta?{" "}
         <Link href="/register">
           <p className="text-gray-700 hover:underline">Registrar</p>
         </Link>
       </p>
     </div>
   </div>
 );
}
 export default LoginPage;
