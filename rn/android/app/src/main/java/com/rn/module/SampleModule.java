package com.rn.module;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SampleModule extends ReactContextBaseJavaModule {
    private static final String TAG = "SampleModule";

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
        } catch (Exception e){
            promise.reject("sampleMethodCall", e.getMessage());
        }
    }
}
