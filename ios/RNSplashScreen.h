#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

@interface RNSplashScreen : NSObject<RCTBridgeModule>
+ (void)showSplash:(NSString*)splashScreen inRootView:(UIView*)rootView;
+ (void)showLottieSplash:(UIView*)splashScreen inRootView:(UIView*)rootView;
+ (void)show;
+ (void)setAnimationFinished:(Boolean)flag;
+ (void)hide;
@end
