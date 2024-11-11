import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./stores";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { checkAuthAsync } from "./stores/auth/async";
import Router from "./router";
import { theme } from "./config/chakra-theme";

function App() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);
  if (authState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraBaseProvider theme={theme}>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ChakraBaseProvider>
  );
}

export default App;
