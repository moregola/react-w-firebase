// pages/login.tsx
"use client";

// pages/register.tsx
import { useEffect } from 'react';
import {
  GoogleAuthProvider,
  
} from "firebase/auth";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/app/firebase/firebaseConfig';
import Image from 'next/image';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';

const RegisterPage = () => {
  const { currentUser } = auth;
  const router = useRouter();
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [createWithGmail] = useSignInWithGoogle(auth) 
  // Add this line
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await createWithGmail();
      if(res){
        router.push("/");
      }

      if(!res){
        alert("Erro ao registrar com o Google");
        router.refresh();
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    try {
      const res = await createUserWithEmailAndPassword(email.value, password.value);
      if(res){
        router.push("/");
      }
      if(!res){
        alert("Erro ao registrar com o email");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 bg-white rounded-lg shadow-lg w-80">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Registrar
        </h2>
        <button
          onClick={handleGoogleRegister}
          className="flex items-center justify-center w-full py-2 mb-4 text-gray-600 bg-gray-200 border border-gray-300 rounded hover:bg-gray-300"
        >
          <Image
            src="/google-icon.svg"
            alt="Google Icon"
            className="w-5 h-5 mr-2"
            width={20}
            height={20}
          />
          Registrar com Google
        </button>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button
            type="submit"
            className="w-full py-2 mt-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Registrar
          </button>
        </form>
        <p className="mt-4 text-center text-gray-500">
          Já tem uma conta?{" "}
          <Link href="/login">
            <p className="font-semibold text-gray-700 hover:underline">Login</p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
