#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ContactsModule, NSObject)

RCT_EXTERN_METHOD(hasContactsPermission:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(requestContactsPermission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getAllContacts:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end