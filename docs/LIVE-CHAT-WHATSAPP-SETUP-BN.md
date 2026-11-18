# MH Apps Gallery — Live Chat ও WhatsApp সেটআপ (বাংলা)

## এখন Build Kit-এ কী যুক্ত হয়েছে
- সব পেজে floating Live Chat UI
- WhatsApp floating button: https://wa.me/8801540085661
- বাংলা welcome text
- Firebase configuration placeholder
- Firebase Anonymous Auth + Firestore visitor message integration (Firebase config ও backend rules deploy করার পর)
- Offline pending-message draft queue; ইন্টারনেট এলে retry
- Firestore security rules starter
- Service Worker cache-এ chat client script

## গুরুত্বপূর্ণ: লাইভ করার আগে Firebase সেটআপ আবশ্যক
1. Firebase Console-এ একটি project তৈরি করুন।
2. Authentication > Sign-in method-এ **Anonymous** enable করুন।
3. Firestore Database তৈরি করুন।
4. Project settings > Your apps থেকে Web App config নিয়ে `web/firebase-config.js`-এ বসান।
5. `firebase/firestore.rules` rules Firestore Rules-এ publish করুন।
6. HTTPS hosting-এ `web/` deploy করুন। Local `file://` দিয়ে Firebase/PWA পরীক্ষা করবেন না।

Firebase web config frontend-এ থাকা স্বাভাবিক; কিন্তু service-account JSON, private key, admin password বা privileged token কখনো frontend-এ দেবেন না।

## Admin dashboard / নিরাপদ Admin access
Visitor chat client তৈরি হয়েছে। Admin reply dashboard এখনো deploy করা নেই। Production-এ Admin Dashboard আলাদা secured web app হিসেবে তৈরি করতে হবে:
- Firebase Email/Password sign-in
- trusted server/Admin SDK দিয়ে account-এ `admin: true` custom claim
- Firestore rules-এ custom claim check (starter rules-এ আছে)
- Admin-only conversation list এবং reply UI
- Admin SDK credentials কেবল server environment-এ

কখনো visitor account-কে admin claim দেবেন না। Custom claim client থেকে সেট করা যায় না; trusted server environment লাগবে।

## Attachment ও notifications
এই starter build-এ image/file upload এবং FCM push notification UI/backend সম্পূর্ণ সক্রিয় নয়। এগুলোর জন্য Firebase Storage rules, upload validation, Cloud Functions/FCM credentials, Android/iOS app configuration এবং অনুমতি দরকার। এগুলো configure না করা পর্যন্ত চালু বলে দাবি করবেন না।

## WhatsApp
Floating WhatsApp বাটন সরাসরি `https://wa.me/8801540085661` খুলে। এটি প্রকৃত WhatsApp conversation link; অ্যাপের ভেতরে নকল WhatsApp chat নয়।

## Offline সীমাবদ্ধতা
Offline অবস্থায় text draft localStorage-এ রাখা হয় এবং internet ফিরলে Firebase-এ পাঠানোর চেষ্টা হয়। Realtime chat, WhatsApp, file upload এবং push notification-এর জন্য internet দরকার। Browser storage clear/eviction হলে local draft হারাতে পারে। সংবেদনশীল তথ্য offline draft-এ রাখবেন না।

## পরীক্ষা
- HTTPS-এ PWA install এবং service worker check
- Firebase Anonymous sign-in
- visitor নিজের conversation-ই পড়তে পারে তা যাচাই
- দুইটি browser/device দিয়ে visitor/admin flow যাচাই (admin claim setup হওয়ার পর)
- Offline draft → reconnect → send
- WhatsApp link opens configured number
- Firebase Rules Emulator দিয়ে unauthorized access পরীক্ষা

এই ZIP source build kit; APK/EXE/DMG/IPA compiled release নয়।
