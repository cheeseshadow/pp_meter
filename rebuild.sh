rm -r build
rm -r client/dist
cd client
npm run build
cd ..
npm run build