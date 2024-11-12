import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Alert } from 'antd';
import { useUserPermissions, UserInfo } from '@/hooks/useUserPermissions';

interface WithAuthProps {
  userInfo: UserInfo | null;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & WithAuthProps>, requiredPermission: string) => {
  return function AuthComponent(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const userInfo = useUserPermissions();

    if (status === 'loading') {
      return <div className="p-12">Loading...</div>;
    }

    if (!session) {
      router.push('/login');
      return null;
    }

    if (!userInfo) {
      return <div className="p-12">Loading permissions...</div>;
    }

    // if (!userInfo.permissions[requiredPermission] || !userInfo.permissions[requiredPermission].read) {
    //   return (
    //     <Alert
    //       message="Akses Ditolak"
    //       description="Anda tidak memiliki izin untuk mengakses halaman ini."
    //       type="warning"
    //       showIcon
    //       className="m-12"
    //     />
    //   );
    // }

    return <WrappedComponent {...props} userInfo={userInfo} />;
  };
};

export default withAuth;
