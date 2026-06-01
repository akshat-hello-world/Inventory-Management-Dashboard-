import AppRoutes from "./routes/AppRoutes";

import ToastProvider from "./components/ui/ToastProvider";

const App = () => {
  return (
    <>
      <ToastProvider />
      <AppRoutes />
    </>
  );
};

export default App;