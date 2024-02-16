export interface Contact {
  firstName: string
  lastName: string
  phoneNumber: string | null
}

export interface ContactsModuleProps {
  hasContactsPermission: (callback: (granted: boolean) => void) => void
  requestContactsPermission: () => Promise<boolean>
  getAllContacts: () => Promise<Array<Contact>>
}
