# Build on Windows 11 (no GitHub required)

## Prerequisites
1. Install Node.js LTS (includes npm): https://nodejs.org/
2. Install Android Studio for Android builds: https://developer.android.com/studio
3. For Android, install Android SDK Platform + Build Tools from Android Studio SDK Manager.
4. For Windows EXE, this kit uses Electron Builder and NSIS (downloaded through npm dependencies).
5. iOS and macOS builds require a Mac with Xcode; they cannot be compiled natively on Windows 11.

## Windows desktop installer
1. Extract the ZIP to a folder such as `C:\MH-Apps-Gallery`.
2. Open Terminal/Command Prompt in that folder.
3. Run `npm install`.
4. Run `npm run desktop:win`.
5. Output is in `release\MH-Apps-Gallery-Setup.exe`.

The NSIS installer includes a privacy notice acceptance step before installation can continue.

## Android APK
1. In the project folder run `npm install`.
2. Run `npx cap add android` once (if the `android` folder is not already present).
3. Run `npx cap sync android`.
4. Run `npx cap open android` and wait for Gradle sync.
5. In Android Studio choose Build > Build Bundle(s) / APK(s) > Build APK(s).
6. Debug APK: `android\app\build\outputs\apk\debug\app-debug.apk`.
7. For public release, create and protect your own signing key and build a signed release APK/AAB.

## PWA
Serve the `web` folder over HTTPS (or localhost for testing). Open it in a supported browser and use Install App / Add to Home Screen. A static host is needed for public PWA deployment.

## macOS and iOS
On a Mac, run `npm install`, then `npx cap add ios` once and `npx cap sync ios`; open with `npx cap open ios` in Xcode. For macOS desktop, run `npm run desktop:mac` on a Mac. iOS distribution requires Apple signing/provisioning and App Store review or an approved alternative distribution method.

## Blogger connection
The app reads the public Blogger JSON feed at:
`https://mhappsgallery.blogspot.com/feeds/posts/default?alt=json&max-results=150`
Keep the Blogger blog public and its feed enabled. Posts are opened on the original Blogger website. This starter does not modify the Blogger theme or content.

## Important feature status
- Search and categories: implemented using Blogger post titles, summaries and labels.
- Download links: opens the original post; download links remain controlled by each post.
- Dark/light mode: implemented and saved locally.
- Bookmarks: implemented and saved locally.
- Push notifications: requires a push service/backend and platform credentials; not enabled in this source-only starter.
- Original logo: the app attempts to load the existing Blogger favicon. For exact branding, place the original logo files in the platform icon resources after providing the original asset; no replacement logo is fabricated.


### Original logo
The exact logo image supplied by the owner is included in `assets/mh-apps-gallery-original-logo.png` and copied to `web/logo-original.png`. Do not replace, crop, recolor or redraw this file. The animated presentation is created with CSS around the unchanged image.

### Website content
The app reads the public Blogger posts feed and links each card to its original post. Keep the Blogger public feed enabled in Blogger Settings → Site feed. Blogger's feed visibility settings determine how much post content is exposed to feed readers. See https://support.google.com/blogger/answer/9691230.
