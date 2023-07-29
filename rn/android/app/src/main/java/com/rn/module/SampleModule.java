package com.rn.module;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class SampleModule extends ReactContextBaseJavaModule {
    private static final String TAG = "SampleModule";
    private int listenerCount = 0;

    public SampleModule(ReactApplicationContext context){
        super(context);
    }
    @NonNull
    @Override
    public String getName() {
        return "SampleModule";
    }

    @ReactMethod
    public void sampleMethodCall(String some, Promise promise){
        try {
            Log.d(TAG, "sampleMethodCall: some: " + some);
            promise.resolve(some + "_sample");
            if(listenerCount > 0){
                WritableMap params = Arguments.createMap();
                params.putString("eventProperty", "someValue" + some);
                sendEvent(this.getReactApplicationContext(), "sampleEventEmitter", params);
            }
        } catch (Exception e){
            promise.reject("sampleMethodCall", e.getMessage());
        }
    }

    @ReactMethod
    public void addListener(String eventName) {
        if (listenerCount == 0) {
            // Set up any upstream listeners or background tasks as necessary
        }

        listenerCount += 1;
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        listenerCount -= count;
        if (listenerCount == 0) {
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params){
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
