import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import  {WaitScreen}  from "../components/waitScreen";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated or not
    if (typeof isAuthenticated == "undefined") {
      return;
    }
    const inApp = segments[0] == "(app)";

    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("home");
    } else if (isAuthenticated == false) {
      // redirect to signin
      router.replace("signIn");
    }
  }, [isAuthenticated]);
  
  if (typeof isAuthenticated === "undefined") {
    return <WaitScreen></WaitScreen>;
  }

  return <Slot />;
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </Provider>
  );
}
