# MH Apps Gallery — Build for every device

One codebase (`web/`) becomes every app. **You do not need a Mac or Android Studio** if you use the cloud build (Option A).

| Device | Result | How |
|---|---|---|
| Windows 10/11 | `MH-Apps-Gallery-Setup.exe` | Cloud build or `Build-Windows.bat` |
| MacBook / macOS | `MH-Apps-Gallery-x64.dmg` + `-arm64.dmg` (Intel and Apple Silicon) | Cloud build or `Build-macOS.command` |
| Android phone/tablet | `app-debug.apk` | Cloud build or `Build-Android-Project.bat` |
| iPhone / iPad | Installable web app (PWA) now; App Store/TestFlight app needs an Apple Developer account | Pages link, or `Build-iOS-Project.command` |
| Any browser | Installable PWA (HTTPS link) | GitHub Pages (automatic) |

## Option A — Cloud build with GitHub (recommended, free)
1. Create a free GitHub account and a **new repository**.
2. Upload everything in this folder (keep the hidden `.github` folder). With Git: `git init && git add . && git commit -m "MH Apps Gallery" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`
3. In the repo: **Settings → Pages → Source: GitHub Actions** (needed once, for the web app link).
4. Open the **Actions** tab. The workflow *Build MH Apps Gallery (all platforms)* runs by itself (about 10–20 minutes the first time).
5. When it finishes, open the run and download from **Artifacts**: Windows, macOS, Android. The web-app link appears under the *pages* job.
6. For a public download page: tag a version (`git tag v2.0.0 && git push --tags`) and the installers are attached to a GitHub **Release**.

## Option B — Build on your own computer
Install Node.js LTS, then in this folder run `npm install` once.
- Windows installer: `Build-Windows.bat` → `release\MH-Apps-Gallery-Setup.exe`
- macOS (on a Mac): `Build-macOS.command` → `release/*.dmg`
- Android: `Build-Android-Project.bat` opens Android Studio → **Build → Build APK(s)**
- iOS (on a Mac with Xcode): `Build-iOS-Project.command` → run on a device from Xcode

## Installing on each device
- **Android APK:** copy to the phone, open it, allow "install unknown apps". It is a *debug-signed* APK for testing/sideloading. Play Store needs your own signed release (AAB) and a Google Play developer account (one-time fee).
- **Windows:** run the .exe. Windows SmartScreen may warn because the installer is not code-signed (a paid certificate removes this): *More info → Run anyway*.
- **macOS:** the .dmg is not notarized. First launch: right-click the app → **Open**. (Notarizing needs an Apple Developer account.)
- **iPhone / iPad (no account needed):** open the Pages link in **Safari → Share → Add to Home Screen**. It runs full-screen like an app and works offline for pages you have already opened.
- **iPhone / iPad (real App Store/TestFlight app):** needs an Apple Developer account (about $99/year) plus signing in Xcode. The cloud `ios` job only checks that the project compiles for the simulator; it cannot produce an installable .ipa without your signing certificate.

## Before publishing — set up these two things
1. **Live Chat:** put your Firebase config in `web/firebase-config.js` and publish `firebase/firestore.rules` (see `docs/LIVE-CHAT-WHATSAPP-SETUP-BN.md`). Until then, the chat shows "Backend setup required" and WhatsApp still works. The admin reply dashboard is **not** built yet.
2. **Test on real devices** before sharing: the cloud jobs prove the apps compile, but nobody has run them on your phones/PCs yet.

## বাংলায় সংক্ষেপে
1. GitHub-এ ফ্রি অ্যাকাউন্ট খুলে নতুন repository বানান এবং এই ফোল্ডারের সব ফাইল (`.github` সহ) আপলোড করুন।
2. Settings → Pages → Source = **GitHub Actions** দিন।
3. Actions ট্যাব থেকে build শেষ হলে **Artifacts** থেকে Windows (.exe), macOS (.dmg), Android (.apk) ডাউনলোড করুন।
4. iPhone/iPad: Pages লিংক Safari-তে খুলে **Share → Add to Home Screen**। App Store-এর জন্য Apple Developer account লাগবে।
5. Live Chat চালু করতে `web/firebase-config.js`-এ Firebase config বসান।
