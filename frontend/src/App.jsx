import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout/Layout";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { About } from "./pages/About";
import { PropiedadesPage } from "./pages/PropiedadesPage";
import { RegistroPropiedadPage } from "./pages/RegistroPropiedadPage";
import { PropiedadesProvider } from "./context/PropiedadesContext";
import { MisPropiedades } from "./pages/MisPropiedades";
import { PropiedadesPreview } from "./components/Propiedades/Preview/PropiedadesPreview";
import { ReservaPage } from "./pages/ReservaPage";
import { ReservasProvider } from "./context/ReservasContext";
import { ProfilePage } from "./pages/ProfilePage";
import { MisReservasPage } from "./pages/MisReservasPage";

export const App = () => {
  const { user } = useAuth();
  // Cuando recargo la página, se reseteaba el isAuth del useAuth, lo que ocasionaba que se
  // redireccione otra vez las rutas protegidas por el usuario. La solución fue
  // guardar el isAuth en el localStorage.
  const isAuth = localStorage.getItem("isAuth");

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute isAllowed={!user} />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={!!isAuth} />}>
          <Route
            element={
              <PropiedadesProvider>
                <Outlet />
              </PropiedadesProvider>
            }
          >
            <Route
              path="/registro-propiedad"
              element={<RegistroPropiedadPage />}
            />
            <Route
              path="/registro-propiedad/:id/edit"
              element={<RegistroPropiedadPage />}
            />
            <Route path="/mis-propiedades" element={<MisPropiedades />} />
            <Route path="/propiedades" element={<PropiedadesPage />} />
            <Route path="/propiedades/:id" element={<PropiedadesPreview />} />
            <Route
              element={
                <ReservasProvider>
                  <Outlet />
                </ReservasProvider>
              }
            >
              <Route path="/reservas/:id" element={<ReservaPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/mis-reservas" element={<MisReservasPage />} />
            </Route>
          </Route>
        </Route>
        <Route
          path="/about"
          element={
            <ProtectedRoute
              isAllowed={!!user && user.rol === "ADMIN"}
            ></ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
};
