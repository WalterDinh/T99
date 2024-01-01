
#import "RNBuildConfig.h"

@implementation RNConfig

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
#if DEV
  NSString *env=@"dev";
#elif STAGING
  NSString *env=@"stag";
#else
  NSString *env=@"prod";
#endif
  return @{ @"RNConfig":env};
}
+ (BOOL)requireMainQueueSetup
{
  return YES;
}
@end
