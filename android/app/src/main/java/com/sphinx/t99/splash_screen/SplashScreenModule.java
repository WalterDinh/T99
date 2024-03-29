package com.sphinx.t99.splash_screen;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class SplashScreenModule extends ReactContextBaseJavaModule {
  public SplashScreenModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "SplashScreen";
  }

  @ReactMethod
  public void hide() {
    SplashScreen.hide(getCurrentActivity());
  }

}
