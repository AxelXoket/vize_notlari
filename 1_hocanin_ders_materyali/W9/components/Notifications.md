# Notifications (`expo-notifications`)

## Overview
`expo-notifications` lets Expo apps display notifications and respond to user interaction. A typical notifications flow has four parts:

1. **Ask for permission** (iOS always requires it; Android 13+ also requires it).
2. **Configure a notification handler** (what happens when a notification arrives while the app is foregrounded).
3. **Send a local notification** (immediate) or **schedule** one for later.
4. (Optional) Handle taps on notifications and navigate the user.

In Expo Snack / Expo Go, **local notifications** work well. Push notifications require additional setup and a real device.

## Key APIs
- `Notifications.requestPermissionsAsync()` / `Notifications.getPermissionsAsync()`
- `Notifications.setNotificationHandler(...)`
- `Notifications.scheduleNotificationAsync(...)`
- `Notifications.cancelScheduledNotificationAsync(...)`
- `Notifications.addNotificationReceivedListener(...)`
- `Notifications.addNotificationResponseReceivedListener(...)`

## Example 1: Permission Request + Immediate Local Notification

Dependencies (Snack):
- `expo-notifications`

```jsx
import { useEffect, useState } from 'react';
import { Button, Platform, SafeAreaView, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function ImmediateNotificationExample() {
  const [permissionStatus, setPermissionStatus] = useState('unknown');
  const [lastNotification, setLastNotification] = useState(null);

  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener((notification) => {
      setLastNotification(notification.request.content);
    });
    return () => sub.remove();
  }, []);

  const ensurePermission = async () => {
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) {
      setPermissionStatus('granted');
      return true;
    }

    const requested = await Notifications.requestPermissionsAsync();
    setPermissionStatus(requested.granted ? 'granted' : 'denied');
    return requested.granted;
  };

  const sendNow = async () => {
    const ok = await ensurePermission();
    if (!ok) return;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hello from Expo',
        body: 'This is an immediate local notification.',
        sound: 'default',
      },
      trigger: null,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 14 }}>
        <Text style={{ color: '#e5e7eb', fontSize: 20, fontWeight: '700' }}>
          Local Notifications
        </Text>
        <Text style={{ color: '#9ca3af' }}>
          Permission status: {permissionStatus}
        </Text>

        <Button title="Request permission" onPress={ensurePermission} />
        <Button title="Send notification now" onPress={sendNow} />

        <View style={{ marginTop: 14, padding: 14, borderRadius: 12, backgroundColor: '#111827' }}>
          <Text style={{ color: '#e5e7eb', fontWeight: '600' }}>
            Last received (foreground):
          </Text>
          <Text style={{ color: '#9ca3af' }}>
            {lastNotification
              ? `${lastNotification.title ?? ''} — ${lastNotification.body ?? ''}`
              : 'No notification received yet.'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
```



## Tips
- iOS requires permission; on Android permission is required on Android 13+ (API 33).
- For Android, channels control importance/sound/behavior; configure them early in your app.
