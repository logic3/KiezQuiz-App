# KiezQuiz App – Setup-Anleitung

## Architektur

```
KiezQuiz/          ← Web-App (GitHub Pages, unverändert weiterentwickeln)
KiezQuiz-App/      ← Native Hülle (Capacitor + Xcode)
  www/             ← automatische Kopie der Web-App (nicht manuell editieren)
  ios/             ← Xcode-Projekt (wird von Capacitor erzeugt)
```

---

## Teil 1: Einmal-Setup (Terminal)

Ordner `KiezQuiz-App` — neben `KiezQuiz`, nicht darin.

```bash
cd "../KiezQuiz-App"
npm install
npm run sync:web
npx cap add ios    # nur beim allerersten Mal nötig
npm run cap:sync
```

**Falls `cap sync` mit xcodebuild-Fehler abbricht:** Xcode ist installiert, aber die Command-Line-Tools zeigen noch nicht darauf. Einmal ausführen:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

Danach `npm run cap:sync` erneut.

**CocoaPods** (für iOS-Abhängigkeiten): Falls `pod` unbekannt ist:

```bash
brew install cocoapods
```

(CocoaPods ist auf deinem Mac bereits installiert.)

---

## Teil 2: Deine Schritte in Xcode

### 1. Projekt öffnen

```bash
cd "../KiezQuiz-App"
npm run cap:open:ios
```

Oder manuell: **`KiezQuiz-App/ios/App/App.xcworkspace`** öffnen (nicht `.xcodeproj`).

### 2. Signing (Simulator – kostenlos)

1. Links **App** (blaues Icon) auswählen.
2. Tab **Signing & Capabilities**.
3. **Team:** deine Apple-ID wählen („Add Account…“ falls nötig).
4. **Bundle Identifier:** `de.jeremiahlauer.kiezquiz` (oder anpassen, muss einzigartig sein).
5. Oben ein **Simulator** wählen (z. B. iPhone 16 oder iPad).

### 3. App starten

- **⌘R** (Run) — App sollte im Simulator starten.
- Karte, Touch, Sound und Spielstand (localStorage) sollten wie in Safari funktionieren.

### 4. Auf echtem iPhone/iPad (ohne TestFlight, kostenlos)

1. iPhone per Kabel verbinden, Gerät oben statt Simulator wählen.
2. Beim ersten Mal auf dem Gerät: **Einstellungen → Allgemein → VPN & Geräteverwaltung** → dein Developer-Zertifikat vertrauen.
3. **⌘R** — App wird sideloaded (Free Provisioning, ~7 Tage gültig, dann erneut deployen).

---

## Teil 3: Nach Änderungen an der Web-App

Immer in `KiezQuiz-App`:

```bash
npm run cap:sync
```

Dann in Xcode erneut **⌘R**. Xcode muss nicht neu konfiguriert werden.

---

## Optional später: macOS

In Xcode: **App** → **General** → **Supported Destinations** → **Mac (Designed for iPad)** aktivieren. Dann läuft dieselbe iOS-App auf dem Mac.

---

## Optional später: App-Icons

App Store braucht PNG-Icons; Simulator reicht mit Platzhalter. Wenn du Icons setzen willst:

1. In Xcode: **App → Assets → AppIcon**.
2. PNGs aus `../KiezQuiz/icons/icon.svg` exportieren (1024×1024 + kleinere Größen).

---

## Troubleshooting

| Problem | Lösung |
|---------|--------|
| Weißer Bildschirm | `npm run cap:sync` erneut, dann Clean Build (⇧⌘K) + Run |
| Signing-Fehler | Anderen Bundle Identifier wählen |
| Sound geht nicht | Einmal irgendwo tippen (iOS verlangt User-Gesture für Audio) |
| Alte Version im Simulator | Simulator → Device → Erase All Content and Settings |
| `Unable to resolve module Capacitor` | **`App.xcworkspace`** öffnen (nicht `.xcodeproj`) |
| Sandbox: bash deny file-read-data (Pods) | In Xcode: **Build Settings → User Script Sandboxing → No** (wird im Projekt bereits auf No gesetzt) |
| iPhone: Developer App Certificate not trusted | iPhone: **Einstellungen → Allgemein → VPN & Geräteverwaltung** → Developer-App → **Vertrauen** |
| Mac: Karte klicken/zoomen geht nicht | `npm run cap:sync`, App neu starten (Scroll + Klick-Fix in Web-App) |
