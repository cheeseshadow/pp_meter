rm -r build
rm -r client/dist
cd client || exit
npm run build
cd ..
npm run build