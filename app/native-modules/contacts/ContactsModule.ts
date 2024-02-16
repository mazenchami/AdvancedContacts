import { useCallback, useEffect, useState } from "react"
import { NativeModules, PermissionsAndroid, Platform } from "react-native"
import { Contact } from "./types"
import { is } from "date-fns/locale"

const isIos = Platform.OS === "ios"

const READ_CONTACTS_PERMISSION = PermissionsAndroid.PERMISSIONS.READ_CONTACTS

const { ContactsModule } = NativeModules
const { hasContactsPermission, requestContactsPermission, getAllContacts } = ContactsModule

export const useContactsModule = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [contacts, setContacts] = useState<Array<Contact>>([])

  useEffect(() => {
    if (isIos) {
      hasContactsPermission(setHasPermission)
    } else {
      PermissionsAndroid.check(READ_CONTACTS_PERMISSION).then(setHasPermission).catch(console.error)
    }
  }, [])

  const fetchContacts = useCallback(() => {
    getAllContacts().then(setContacts).catch(console.error)
  }, [])

  const requestPermission = useCallback(() => {
    if (isIos) {
      requestContactsPermission().then(setHasPermission).catch(console.error)
    } else {
      PermissionsAndroid.request(READ_CONTACTS_PERMISSION)
        .then((granted) => setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED))
        .catch(console.error)
    }
  }, [])

  return {
    contacts,
    fetchContacts,
    hasPermission,
    requestPermission,
  }
}
