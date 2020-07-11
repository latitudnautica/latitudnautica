import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export  function ProtectRoute(Component) {
  return () => {
    // const { user, isAuthenticated, loading } = useAuth();
    const [user, setUser] = useState(true);
    const Router = useRouter();

    useEffect(() => {
      if (!user) Router.push("/cms/login");
    }, [user]);

    return <Component {...arguments} />;
  };
}
