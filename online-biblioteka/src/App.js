// Lazy loading components
const Settings = lazy(() => import("./app/components/Settings"));
const Me = lazy(() => import("./app/me/Me"));
const Login = lazy(() => import("./app/login/Login"));
const Register = lazy(() => import("./app/register/Register"));
const ForgotPassword = lazy(() => import("./app/login/ForgotPassword"));
const Books = lazy(() => import("./app/CRUDBooks/Books"));
const Ucenici = lazy(() => import("./app/ucenici/Ucenici"));
const NoviUcenik = lazy(() => import("./app/ucenici/NoviUcenik"));
const Ucenik = lazy(() => import("./app/ucenici/Ucenik"));
const EvidencijaIzdavanja = lazy(() =>
  import("./app/components/EvidencijaIzdavanja")
);
const EvidencijaRezervacija = lazy(() =>
  import("./app/components/EvidencijaRezervacija")
);

const App = () => {
  const isAuthenticated = !!localStorage.getItem("jwt");
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(false);
  const location = useLocation();

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const isAuthRoute = ["/login", "/register", "/forgotpassword"].includes(
    location.pathname
  );
  const showHeader = isAuthenticated || !isAuthRoute;

  return (
      {showHeader && <Header />}
      {isAuthenticated ? (
        <div
          className={`main-container-app ${
            isSidebarExpanded ? "expanded" : ""
          }`}
        >
          <Sidebar onToggle={handleSidebarToggle} />
          <div className="content">
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/me" element={<Me />} />
                <Route path="/" element={<Settings />} />
                <Route path="/books" element={<Books />} />
                <Route path="/ucenici" element={<Ucenici />} />
                <Route path="/ucenici/noviucenik" element={<NoviUcenik />} />
                <Route path="/ucenici/ucenik/:id" element={<Ucenik />} />
                <Route path="/ucenici/ucenik/:id/edit" element={<Ucenik />} />
                <Route path="/me/izdavanje" element={<EvidencijaIzdavanja />} />
                <Route
                  path="/me/rezervacija"
                  element={<EvidencijaRezervacija />}
                />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/bibliotekari" element={<Bibliotekari />} />
                <Route path="/bibliotekari/add" element={<AddBibliotekar />} />
                <Route
                  path="/bibliotekari/bibliotekar/:id"
                  element={<BibliotekarDetalji />}
                />
                <Route
                  path="/bibliotekari/bibliotekar/:id/edit"
                  element={<BibliotekarEdit />}
                />
              </Routes>
            </Suspense>
          </div>
        </div>
      ) : (
        <Suspense fallback={<ImageFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
};

export default App;
