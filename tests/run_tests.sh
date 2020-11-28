
echo "----- Waiting for containers initializations -----"

sleep 30

# Tests for api/auth

echo "----- Tests for Auth API -----"

cd ./api/auth

echo "----- Install dependencies ... -----"

npm install

echo "----- Starting tests ... -----"

npm test

echo "----- Tests for Auth API -----"

cd ../server

echo "----- Install dependencies ... -----"

npm install

echo "----- Starting tests ... -----"

npm test

echo "----- Tests finished ! -----"