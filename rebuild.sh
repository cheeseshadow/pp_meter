rm -r build
rm -r client/dist
cd client || exit
npm ci
npm run build
cd ..
npm ci
npm run build