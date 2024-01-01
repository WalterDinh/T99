package com.sphinx.t99.splash_screen;

import android.animation.Animator;
import android.app.Activity;
import android.app.Dialog;
import android.os.Build;

import com.airbnb.lottie.LottieAnimationView;
import com.sphinx.t99.R;

import java.lang.ref.WeakReference;

public class SplashScreen {
  private static Dialog mSplashDialog;
  private static WeakReference<Activity> mActivity;
  private static final Boolean isAnimationFinished = false;
  private static final Boolean waiting = false;


  public static void show(final Activity activity, final int themeResId, final int lottieId) {
    if (activity == null)
      return;
    mActivity = new WeakReference<Activity>(activity);
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (!activity.isFinishing()) {
          mSplashDialog = new Dialog(activity, themeResId);
          mSplashDialog.setContentView(R.layout.launch_screen);
          mSplashDialog.setCancelable(false);

//          lottie.addAnimatorListener(new Animator.AnimatorListener() {
//            @Override
//            public void onAnimationStart(Animator animation) {
//              System.out.println("asdf");
//            }
//
//            @Override
//            public void onAnimationEnd(Animator animation) {
//              SplashScreen.setAnimationFinished(true);
//            }
//
//            @Override
//            public void onAnimationCancel(Animator animation) {}
//
//            @Override
//            public void onAnimationRepeat(Animator animation) {}
//          });

          if (!mSplashDialog.isShowing()) {
            mSplashDialog.show();
          }
        }
      }
    });
  }

  public static void show(final Activity activity, int lottieId) {
    int resourceId = R.style.SplashScreen_SplashTheme;
    show(activity, resourceId, lottieId);
  }

  /**
   * 关闭启动屏
   */
  public static void hide(Activity activity) {
    if (activity == null) {
      if (mActivity == null) {
        return;
      }
      activity = mActivity.get();
    }

    if (activity == null) return;

    final Activity _activity = activity;

    _activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (mSplashDialog != null && mSplashDialog.isShowing()) {
          boolean isDestroyed = false;

          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            isDestroyed = _activity.isDestroyed();
          }

          if (!_activity.isFinishing() && !isDestroyed) {
            mSplashDialog.dismiss();
          }
          mSplashDialog = null;
        }
      }
    });
  }
}
