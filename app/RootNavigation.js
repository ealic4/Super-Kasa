// RootNavigation.js

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}


export function reset(name) {
  if (navigationRef.isReady()) {
    navigationRef.reset({index: 0,routes: [{ name: name}],});
  }
}

export function navigateParam(name, param) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, {naziv:param})
  }
}

// add other navigation functions that you need and export them