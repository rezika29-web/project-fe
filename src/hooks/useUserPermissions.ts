'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/lib/api';

// Define more specific types
type PermissionActions = {
  showMenu: boolean;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  export: boolean;
};

// type Permissions = {
//   [key: string]: PermissionActions;
// };

type User = {
  id: string;
  fullName: string;
  nip: string;
  // profilePictureFile: string;
  // Add other user properties as needed
};

type Role = {
  id: string;
  roleName: string;
  // Add other role properties as needed
};

export type UserInfo = {
  user: User;
  role: Role;
};

export function useUserPermissions() {
  const { status } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchUserInfo = async () => {
        try {
          const response = await api.get('/v1/auth/my-account');
          setUserInfo({
            user: response.data.userActive,
            role: response.data.userActive.role,
          });
        } catch (error) {
          console.error('Error fetching user information:', error);
        }
      };

      fetchUserInfo();

      // Set up polling to check for updates every 5 minutes
      const intervalId = setInterval(fetchUserInfo, 5 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [status]);

  return userInfo;
}
