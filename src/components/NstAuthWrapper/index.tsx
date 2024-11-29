import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface NstAuthWrapperProps {
  children: ReactNode;
}

export const NstAuthWrapper: React.FC<NstAuthWrapperProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (status === "loading" || !isClient) {
    return (
      <div className="p-16">
        <p>Melakukan pengecekan autentikasi...</p>
      </div>
  );
  }

  if (!session) {
    router.push("/user/home");
    return null;
  }

  return <>{children}</>;
};
