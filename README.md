# MH Apps Gallery — Universal Cross-Platform Build Kit

Official website/content source: https://mhappsgallery.blogspot.com/

## লক্ষ্য প্ল্যাটফর্ম
- Android ফোন ও ট্যাবলেট
- Windows 10/11 PC
- macOS / MacBook
- iPhone ও iPad
- সমর্থিত আধুনিক Web Browser (PWA)

## অন্তর্ভুক্ত সুবিধা
- Modern Premium responsive interface এবং Blue Glow / logo motion
- ব্যবহারকারীর দেওয়া আসল লোগো অপরিবর্তিতভাবে `assets/` ও `web/`-এ রাখা হয়েছে
- Blogger public JSON feed থেকে পোস্ট, সার্চ ও ক্যাটাগরি
- Favourite/bookmark এবং Dark/Light theme
- PWA app-shell cache এবং IndexedDB-তে আগে লোড করা পোস্টের তথ্য সংরক্ষণ
- Online/Offline status indicator
- Electron desktop wrapper (Windows/macOS)
- Capacitor Android/iOS project configuration
- Windows build scripts ও privacy notice

## Windows 11-এ শুরু
1. Node.js LTS ইনস্টল করুন।
2. ZIP Extract করুন।
3. Extract করা ফোল্ডারে Command Prompt খুলুন।
4. `npm install` চালান।
5. Windows installer তৈরি করতে `npm run desktop:win` চালান।
6. Android project তৈরি/সিঙ্ক করতে `Build-Android-Project.bat` চালান; এরপর Android Studio-তে APK build করুন।

## Online + Offline কীভাবে কাজ করে
প্রথমবার ইন্টারনেট থাকা অবস্থায় অ্যাপ খুললে app shell cache হয় এবং Blogger feed-এর পোস্ট IndexedDB-তে রাখা হয়। পরে ইন্টারনেট না থাকলেও অ্যাপ shell এবং আগে সংরক্ষিত পোস্টের তথ্য দেখা ও সার্চ করা যায়। ইন্টারনেট ফিরে এলে live feed আবার লোড হয়।

Offline সীমাবদ্ধতা: প্রথমবার পোস্ট ক্যাশ করতে ইন্টারনেট দরকার। নতুন পোস্ট, নতুন download এবং বাইরের সাইটের ফাইলের জন্য ইন্টারনেট লাগবে। সব remote image offline-এ থাকবে এমন নিশ্চয়তা নেই। iOS/browser storage eviction নীতি অনুযায়ী cache মুছে যেতে পারে। বিস্তারিত `docs/OFFLINE-ONLINE-BN.txt`-এ।

## Build status ও প্রয়োজনীয়তা
এটি source build kit, precompiled APK/EXE/DMG/IPA নয়। APK/IPA তৈরি করতে সংশ্লিষ্ট platform toolchain লাগবে। iOS ও macOS build-এর জন্য macOS ও Xcode প্রয়োজন। Push notification সক্রিয় করতে আলাদা provider/backend ও platform credentials লাগবে। Windows/macOS Electron build-এর জন্য dependencies install করতে হবে।

## Download behaviour
Post card মূল Blogger article খোলে, যেখানে প্রকাশিত download link ব্যবহার করা যায়। এই starter কোনো external download page bypass করে না এবং native background download queue-কে এখনো implement করে না।

## Branding
Original logo file `assets/mh-apps-gallery-original-logo.png` এবং `web/logo-original.png` হিসেবে সংরক্ষিত। Logo artwork পরিবর্তন করা হয়নি।


## Live Chat + WhatsApp
See `docs/LIVE-CHAT-WHATSAPP-SETUP-BN.md`. A responsive visitor chat widget, offline text draft queue, Firebase client integration scaffold and WhatsApp support link are included. Firebase project configuration and secure admin deployment are required before real-time support can go live. Admin dashboard, attachment upload and push notifications are not yet production-complete.


## v2.0 — সব ডিভাইসের জন্য Build
দেখুন `docs/BUILD-ALL-DEVICES.md`। GitHub Actions workflow (`.github/workflows/build-all.yml`) Windows .exe, macOS .dmg, Android .apk বানায় এবং PWA-র জন্য HTTPS লিংক প্রকাশ করে। লোগো `web/logo-original.png` ও `assets/mh-apps-gallery-original-logo.png` হিসেবে অপরিবর্তিত (byte-identical) আছে; ছোট আইকন সাইজগুলো কেবল স্টোর/ব্রাউজারের প্রয়োজনে তৈরি কপি।
