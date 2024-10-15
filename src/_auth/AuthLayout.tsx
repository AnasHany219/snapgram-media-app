import { Outlet, Navigate } from "react-router-dom";

// import { useUserContext } from "@/context/AuthContext";

export default function AuthLayout() {
  const isAuthenticated = false;
  // const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-col items-center justify-center flex-1 py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/side-img.svg"
            alt="logo"
            className="object-cover w-1/2 h-screen bg-no-repeat  xl:block"
          />
        </>
      )}
    </>
  );
}
