package com.sphinx.t99;

import com.facebook.react.ReactActivity;
import com.sphinx.t99.splash_screen.SplashScreen;

import android.os.Bundle;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "T99";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, R.id.lottie);
  super.onCreate(savedInstanceState);
}
}
