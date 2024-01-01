package com.sphinx.t99.buildconfig;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.sphinx.t99.BuildConfig;
import java.util.Map;
import java.util.HashMap;

public class RNConfigModule extends ReactContextBaseJavaModule {
    RNConfigModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "RNConfig";
    }

    @ReactMethod
    public Map<String, Object> getConstants() {
        final Map<String, Object> map = new HashMap<>();
        map.put("RNConfig", BuildConfig.FLAVOR);
        return map;
    }
}