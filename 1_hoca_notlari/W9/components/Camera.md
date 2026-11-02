# Camera (`expo-camera`)

## Overview
`expo-camera` provides access to the device cameras in Expo apps. A typical camera flow has three parts:

1. **Ask for permission at runtime** (iOS/Android require it).
2. **Render a camera preview** only when permission is granted.
3. **Capture or scan** (take a photo, scan a barcode/QR code, etc.).

In Expo Snack, you can run camera examples on a physical device using **Expo Go**. Camera access usually does not work in web preview.

## Key APIs
- `useCameraPermissions()`: Reads and requests camera permission.
- `CameraView`: Renders the camera preview.
- `CameraView` props like `facing`, `onBarcodeScanned`, `barcodeScannerSettings`.
- `ref.takePictureAsync()`: Captures an image (requires a `ref` to `CameraView`).

## Example 1: Permission Gate + Take a Photo + Preview

Dependencies (Snack):
- `expo-camera`

```jsx
import { useRef, useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraCaptureExample() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [photoUri, setPhotoUri] = useState(null);
  const [status, setStatus] = useState('Ready');

  if (!permission) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Checking camera permission…</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ fontSize: 16, marginBottom: 12 }}>
          Camera access is required to take photos.
        </Text>
        <Button title="Grant camera permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  const flipCamera = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    try {
      setStatus('Capturing…');
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.7,
        skipProcessing: true,
      });
      setPhotoUri(photo?.uri ?? null);
      setStatus(photo?.uri ? 'Captured' : 'No photo returned');
    } catch (error) {
      setStatus(`Error: ${String(error?.message ?? error)}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <View style={{ flex: 1 }}>
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />

        <View style={styles.controls}>
          <Text style={styles.statusText}>{status}</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button title="Flip" onPress={flipCamera} />
            <Button title="Take photo" onPress={takePhoto} />
            <Button title="Clear" onPress={() => setPhotoUri(null)} />
          </View>
        </View>
      </View>

      {photoUri && (
        <View style={styles.preview}>
          <Text style={{ color: '#e5e7eb', marginBottom: 8 }}>Last photo:</Text>
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.55)',
    gap: 10,
  },
  statusText: { color: '#e5e7eb', fontSize: 14 },
  preview: {
    padding: 16,
    backgroundColor: '#111827',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  previewImage: { width: '100%', height: 220, borderRadius: 14 },
});
```

## Example 2: QR Code Scanner (Permission + `onBarcodeScanned`)

Dependencies (Snack):
- `expo-camera`

```jsx
import { useMemo, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function QrScannerExample() {
  const [permission, requestPermission] = useCameraPermissions();
  const [lastValue, setLastValue] = useState(null);
  const [scanningEnabled, setScanningEnabled] = useState(true);

  const hint = useMemo(() => {
    if (!lastValue) return 'Point the camera at a QR code.';
    return `Last scan: ${lastValue}`;
  }, [lastValue]);

  if (!permission) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <Text>Checking camera permission…</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
        <Text style={{ fontSize: 16 }}>
          Camera permission is required to scan QR codes.
        </Text>
        <Button title="Grant camera permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1220' }}>
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={
            scanningEnabled
              ? ({ data }) => {
                  setLastValue(data);
                  setScanningEnabled(false);
                }
              : undefined
          }
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 16,
            backgroundColor: 'rgba(0,0,0,0.55)',
            gap: 10,
          }}
        >
          <Text style={{ color: '#e5e7eb' }}>{hint}</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button title="Scan again" onPress={() => setScanningEnabled(true)} />
            <Button title="Clear" onPress={() => setLastValue(null)} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
```

## Tips
- Always handle the “permission denied” state (don’t render the camera view without permission).
- On Android, camera access can be blocked by system settings even after your app requests it.

