#!/bin/bash
set -e

echo "🔧 Fixing iOS build environment..."

# 1. Pastikan Xcode Command Line Tools sudah dipilih
if ! xcode-select -p &>/dev/null; then
  echo "⚠️ Xcode Command Line Tools belum terinstall. Install dengan: xcode-select --install"
  exit 1
fi

# 2. Set path Xcode (kalau belum)
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer || true

# 3. Tampilkan versi Xcode
echo "📦 Xcode version:"
xcodebuild -version || true

# 4. Accept license kalau belum
sudo xcodebuild -license accept || true

# 5. Bersihkan cache CocoaPods & DerivedData
echo "🧹 Cleaning Pods & cache..."
cd ios
rm -rf Pods
rm -rf ~/Library/Caches/CocoaPods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
pod install --repo-update
cd ..

# 6. Cek SDK iOS
echo "📂 iOS SDK Path:"
xcrun --sdk iphoneos --show-sdk-path || echo "❌ iPhoneOS SDK tidak ditemukan!"

echo "✅ Done! Coba jalankan: npx react-native run-ios"

