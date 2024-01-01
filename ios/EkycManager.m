#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"
#import <React/RCTViewManager.h>
#import "EkycManager.h"

@interface RCT_EXTERN_REMAP_MODULE(VnptEkycModule, EkycVnpt, NSObject)
RCT_EXTERN_METHOD(startChecking:
                  (NSDictionary)data
                  resolver: (RCTPromiseResolveBlock)resolve
rejecter: (RCTPromiseRejectBlock)reject)


@end
