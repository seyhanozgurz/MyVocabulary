 import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { createContext, useContext, useEffect, useState } from "react";
  import { auth, db } from "../firebaseConfig";
  import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
  
  export const AuthContext = createContext();
  
  export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
          setUser(user);
  
          //updataUserData(user.uid);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      });
      return unsub;
    }, []);
  
    const updataUserData = async (userId) => {
      console.log("user data update")
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        let data = docSnap.data();
        setUser({
          ...user,
          username: data.username,
          profileUrl: data.profileUrl,
          userId: data.userId,
        });
      }
    };
  
    const login = async (email, password) => {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        //console.log("response:", response?.user);
  
        return { success: true, data: response.user };
      } catch (e) {
        let message = e.message;
        if (message.includes("(auth/invalid-email)")) message = "Invalid email";
        if (message.includes("(auth/invalid-credential)"))
          message = "Wrong credentials";
        return { success: false, message: message };
      }
    };
  
    const logout = async () => {
      try {
        console.log("logout");
        await signOut(auth);
        return { success: true };
      } catch (e) {
        return { success: false, message: e.message, error: e };
      }
    };
  
    const register = async (email, password, username, profileUrl) => {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        await setDoc(doc(db, "users", response.user.uid), {
          email,
          username,
          profileUrl,
          userId: response.user.uid,
        });
        return { success: true, data: response.user };
      } catch (e) {
        let message = e.message;
        if (message.includes("(auth/invalid-email)")) message = "Invalid email";
        return { success: false, message };
      }
    };
  
    return (
      <AuthContext.Provider
        value={{ user, isAuthenticated, login, logout, register }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const value = useContext(AuthContext);
  
    if (!value) {
      throw new Error("useAuth must be wrapped inside AuthContextProviderr");
    }
    return value;
  };
  