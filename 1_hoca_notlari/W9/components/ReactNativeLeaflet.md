# Maps with Leaflet (WebView + Leaflet CDN)

## Overview
Leaflet is a popular web mapping library. In React Native (and Expo Snack), the most reliable way to use Leaflet is to render it inside a `WebView` and load Leaflet from a CDN.

Important note for Snack:
- `react-native-webview-leaflet` is not Snack-friendly because it publishes TypeScript (`index.ts`) as its entry point, so Snack fails to bundle it.
- Some other Leaflet wrappers rely on bundling local `.html` assets, which Snack also struggles to resolve.

This approach is useful when you want:
- A Leaflet-like API and ecosystem
- Custom tile providers
- A “web map” experience inside a native app

## Key Concepts
- `WebView`: Hosts an HTML page that runs Leaflet.
- `mapCenterPosition`: Center point (`{ lat, lng }`).
- `mapMarkers`: Markers rendered on the map (you can use emoji icons like `'📍'`).
- `mapShapes`: Circles, polygons, and polylines.
- `onMessage`: Receives events from the WebView (e.g., map clicks).
- `postMessage` + injected JavaScript: The bridge between React Native and the Leaflet page.

## Example 1: Leaflet Map + Marker + Tap to Read Coordinates

Dependencies (Snack):
- `react-native-webview`

```jsx
import { useMemo, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const START = { lat: 41.015137, lng: 28.97953 };

const html = `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
      html, body, #map { height: 100%; margin: 0; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      const start = ${JSON.stringify(START)};
      const map = L.map('map').setView([start.lat, start.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      L.marker([start.lat, start.lng]).addTo(map).bindPopup('Meeting point');

      map.on('click', (e) => {
        window.ReactNativeWebView?.postMessage(JSON.stringify({
          type: 'mapPress',
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }));
      });
    </script>
  </body>
</html>`;

export default function LeafletBasicsExample() {
  const [lastTap, setLastTap] = useState(null);

  const hint = useMemo(() => {
    if (!lastTap) return 'Tap the map to read coordinates.';
    return `Last tap: ${lastTap.lat.toFixed(5)}, ${lastTap.lng.toFixed(5)}`;
  }, [lastTap]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        onMessage={(event) => {
          try {
            const msg = JSON.parse(event.nativeEvent.data);
            if (msg.type === 'mapPress') setLastTap({ lat: msg.lat, lng: msg.lng });
          } catch (error) {
            console.warn('Leaflet WebView message parse error:', error);
          }
        }}
      />

      <View style={{ padding: 12, backgroundColor: '#0b1220' }}>
        <Text style={{ color: '#e5e7eb' }}>{hint}</Text>
      </View>
    </SafeAreaView>
  );
}
```

## Example 2: Tap to Add Markers + Render Shapes (Circle + Polygon)

Dependencies (Snack):
- `react-native-webview`

```jsx
import { useMemo, useRef, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const START = { lat: 41.015137, lng: 28.97953 };

const makeHtml = (start) => `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>html, body, #map { height: 100%; margin: 0; }</style>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
      const start = ${JSON.stringify(start)};
      const map = L.map('map').setView([start.lat, start.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);

      // Static shapes
      L.polygon([[41.0205, 28.975],[41.0185, 28.987],[41.011, 28.983]], { color: '#2563eb' }).addTo(map);
      L.circle([start.lat, start.lng], { radius: 700, color: '#22c55e' }).addTo(map);

      const setMarkers = (markers) => {
        markersLayer.clearLayers();
        markers.forEach((m) => {
          const icon = L.divIcon({ html: m.icon, className: '', iconSize: [28, 28] });
          L.marker([m.lat, m.lng], { icon }).addTo(markersLayer);
        });
      };

      window.addEventListener('message', (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'setMarkers') setMarkers(msg.markers || []);
        } catch (error) {
          console.warn('Leaflet HTML message parse error:', error);
        }
      });

      map.on('click', (e) => {
        window.ReactNativeWebView?.postMessage(JSON.stringify({
          type: 'mapPress',
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }));
      });
    </script>
  </body>
</html>`;

export default function LeafletShapesExample() {
  const webRef = useRef(null);
  const [markers, setMarkers] = useState([{ lat: START.lat, lng: START.lng, icon: '📌' }]);

  const html = useMemo(() => makeHtml(START), []);

  const syncMarkers = (nextMarkers) => {
    webRef.current?.postMessage(
      JSON.stringify({ type: 'setMarkers', markers: nextMarkers })
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webRef}
        originWhitelist={['*']}
        source={{ html }}
        onLoadEnd={() => syncMarkers(markers)}
        onMessage={(event) => {
          try {
            const msg = JSON.parse(event.nativeEvent.data);
            if (msg.type !== 'mapPress') return;
            const next = [...markers, { lat: msg.lat, lng: msg.lng, icon: '📌' }];
            setMarkers(next);
            syncMarkers(next);
          } catch (error) {
            console.warn('Leaflet WebView message parse error:', error);
          }
        }}
      />

      <View style={{ padding: 12, backgroundColor: '#0b1220', gap: 10 }}>
        <Text style={{ color: '#e5e7eb' }}>
          Tap to add markers (total: {markers.length})
        </Text>
        <Button
          title="Clear markers"
          onPress={() => {
            const next = [];
            setMarkers(next);
            syncMarkers(next);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
```

## Notes (Expo)
- In Snack, add `react-native-webview` from the Dependencies panel.
- These examples load Leaflet from a CDN; they need network access.
- If web preview fails, run on **iOS/Android** via Expo Go.
