# Maps with `react-native-maps`

## Overview
`react-native-maps` renders native map views (Apple Maps on iOS, Google Maps on Android) and provides primitives such as markers, callouts, polygons, and polylines. It’s the most common choice when you want a **native-feeling** map experience and smooth gestures.

In Expo, `react-native-maps` works well in Expo Go. Some features (like Google Maps on iOS) require additional native configuration when you build a custom dev client or standalone app.

## Key Components / Props
- `MapView`: The map container.
- `initialRegion` / `region`: Sets the visible area; `region` makes it controlled.
- `Marker`: Adds a pin at a coordinate; supports `title`, `description`, custom children.
- `Polyline` / `Polygon`: Draw routes and areas.
- Events: `onPress`, `onRegionChangeComplete`, `onLongPress`.

## Example 1: Basic Map + Marker + Controlled Region

Dependencies (Snack):
- `react-native-maps`

```jsx
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const START = {
  latitude: 41.015137,
  longitude: 28.97953,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06,
};

export default function BasicMapExample() {
  const [region, setRegion] = useState(START);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        <Marker
          coordinate={{ latitude: 41.015137, longitude: 28.97953 }}
          title="Meeting point"
          description="Tap to see details"
        />
      </MapView>

      <View style={{ padding: 12, backgroundColor: '#0b1220' }}>
        <Text style={{ color: '#e5e7eb' }}>
          Center: {region.latitude.toFixed(4)}, {region.longitude.toFixed(4)}
        </Text>
      </View>
    </SafeAreaView>
  );
}
```

## Example 2: Tap to Add Markers + Draw a Polyline Route

Dependencies (Snack):
- `react-native-maps`

```jsx
import { useMemo, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const START = {
  latitude: 41.015137,
  longitude: 28.97953,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function RouteBuilderExample() {
  const [points, setPoints] = useState([
    { latitude: 41.015137, longitude: 28.97953 },
    { latitude: 41.028, longitude: 28.965 },
  ]);

  const distanceHint = useMemo(() => {
    if (points.length < 2) return 'Add at least 2 points.';
    return `Route points: ${points.length}`;
  }, [points.length]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={START}
        onPress={(event) => {
          const { coordinate } = event.nativeEvent;
          setPoints((prev) => [...prev, coordinate]);
        }}
      >
        {points.map((p, i) => (
          <Marker key={`${p.latitude}-${p.longitude}-${i}`} coordinate={p} />
        ))}
        <Polyline coordinates={points} strokeWidth={4} strokeColor="#2563eb" />
      </MapView>

      <View style={{ padding: 12, backgroundColor: '#0b1220', gap: 10 }}>
        <Text style={{ color: '#e5e7eb' }}>{distanceHint}</Text>
        <Button title="Clear route" onPress={() => setPoints([])} />
      </View>
    </SafeAreaView>
  );
}
```

## Tips
- Prefer `initialRegion` unless you truly need a controlled map (`region`), because controlling every frame can feel “jittery”.
- For performance, keep marker counts reasonable or cluster markers at high zoom levels.

