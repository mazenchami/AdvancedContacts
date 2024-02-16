import { type ContactsModuleProps } from "./contacts/types"

declare module "react-native" {
  interface NativeModulesStatic {
    ContactsModule: ContactsModuleProps
  }
}
