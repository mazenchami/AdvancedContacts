import Foundation
import Contacts

@objc(ContactsModule)
class ContactsModule: NSObject {

  @objc
  func hasContactsPermission(_ callback: RCTResponseSenderBlock) -> Void {
    let authorizationStatus = CNContactStore.authorizationStatus(for: .contacts)
    callback([authorizationStatus == .authorized])
  }

  @objc
  func requestContactsPermission(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    let contactStore = CNContactStore()
    contactStore.requestAccess(for: .contacts) { (granted, error) in
      if ((error) != nil) {
        return reject("Error", "An Error occured while requesting permission", error)
      }
      resolve(granted)
    }
  }

  @objc
  func getAllContacts(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    var contacts: [[String: Optional<String>]] = []
    
    let keysToFetch = [CNContactGivenNameKey, CNContactFamilyNameKey, CNContactPhoneNumbersKey] as [CNKeyDescriptor]
    
    let request = CNContactFetchRequest(keysToFetch: keysToFetch)
    
    do {
      try CNContactStore().enumerateContacts(with: request) { (contact, _) in
        contacts.append([
          "firstName": contact.givenName,
          "lastName": contact.familyName,
          "phoneNumber": contact.phoneNumbers.first?.value.stringValue
        ])
      }
      
      resolve(contacts)
    } catch {
      reject("Error", "An error occured while fetching contacts", error)
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

}
