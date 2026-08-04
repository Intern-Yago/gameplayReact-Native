import { StatusBar, Platform } from 'react-native';
import { getStatusBarHeight as getIOSStatusBarHeight } from 'react-native-iphone-x-helper';

export function getStatusBarHeight(): number {
  return Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : getIOSStatusBarHeight();
}
