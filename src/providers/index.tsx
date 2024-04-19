import React, { useEffect, useState } from 'react';
import * as API from '@api';
import { User } from 'src/types/types';

/* TODO:
Complete the UserProvider to manage user data and phone number masking.
1. Fetch user data with API.me() on provider's mount.
2. Implement a function to toggle phone number masking (you can fetch unmasked phone number with API.phone()
3. Pass down the user data and the toggle function to the context value.
*/

interface UserProviderProps {
  children: React.ReactNode;
};

interface ApplicationState {
  user?: User
  phone?: string
  originalPhone?: string
  maskedPhone?: string
  togglePhoneMask?: (it: boolean) => void
}

const InitialState: ApplicationState = {

}

export const UserContext = React.createContext(InitialState);

export const UserProvider = (props: UserProviderProps) => {
  const [applicationState, setApplicationState] = useState<ApplicationState>()

  useEffect(() => {
    API.me().then(userdata => {
      let updatedState = {
        ...applicationState,
        user: userdata
      }

      API.phone().then(phonedata => {
        updatedState = {
          ...updatedState,
          phone: phonedata.phone,
          originalPhone: phonedata.phone.replaceAll("-", ""),
          maskedPhone: "",
        }
  
        setApplicationState(updatedState)
      })
    })
  }, [])

  const togglePhoneMask = (maskPhone = false) => {
    let updatedState = {
      ...applicationState
    }
    
    if (maskPhone) {
      if (applicationState.maskedPhone) {
        updatedState["phone"] = applicationState.maskedPhone
      } else {
        const groups = String(applicationState.originalPhone).replace(/D/g, "").match(/(\d{1})(\d{3})(\d{3})(\d{4})/)
        // USA default phone (555) 555-4444
        const mp = `${groups[1]}-${groups[2]}-${groups[3]}-${groups[4]}`
        updatedState["phone"] = mp
      }
    } else {
      updatedState["phone"] = applicationState.originalPhone
    }

    setApplicationState(updatedState)
  }

  return (
    <UserContext.Provider value={{ ...applicationState, togglePhoneMask }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  //
};