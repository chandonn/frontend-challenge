/* TODO:
Complete the following API functions to fetch user's data and its unmasked phone number.
Each request should be authenticated with a Bearer token of 'WellTheoryCode2023'.
Use the default fetch API.
*/

import { User } from "src/types/types";

const token = "WellTheoryCode2023"
const fetchOptions = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }

export const me = (): Promise<User> => {
  return new Promise( async (resolve, reject) => {
    const url = "https://us-central1-internals-358114.cloudfunctions.net/react-challenge/me"

    const response = await fetch(url, fetchOptions )
    const user: User = await response.json()

    resolve(user)
  })
};

export const phone = (): Promise<{ phone: string }> => {
  return new Promise( async (resolve, reject) => {
    const url = "https://us-central1-internals-358114.cloudfunctions.net/react-challenge/phone"
    const token = "WellTheoryCode2023"

    const response = await fetch(url, fetchOptions)
    resolve(response.json())
  })
};

export const createSupportTicket = (title: string, message: string): Promise<{ message?: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = "https://us-central1-internals-358114.cloudfunctions.net/react-challenge/support-tickets"
      const body = { title, message }
  
      const response = await fetch(url, { ...fetchOptions, method: 'POST', body: JSON.stringify(body) })
  
      resolve(response.json())      
    } catch (error) {
      resolve({})
    }
  })
};
