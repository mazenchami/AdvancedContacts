
// ./android/app/src/main/java/com/myapp/AdvancedContactsPackage.java
package com.advancedcontacts;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AdvancedContactsPackage implements ReactPackage {
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      List<ViewManager> modules = new ArrayList<>();

      // Add all react-native-colo-loco view managers from ./colocated/ColoLoco.java
      modules.addAll(ColoLoco.colocatedViewManagers(reactContext));

      return modules;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
      List<NativeModule> modules = new ArrayList<>();

      // Add all react-native-colo-loco modules from ./colocated/ColoLoco.java
      modules.addAll(ColoLoco.colocatedModules(reactContext));

      return modules;
    }
}
