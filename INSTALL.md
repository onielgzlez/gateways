# INSTALL backend devs

cd /api

yarn or npm install

## Available Scripts

In the project directory, you can run:

### `node server.js`

Runs the api 
Open [http://localhost:4000/api](http://localhost:4000/api) to view base api in the browser.

# Request for devices
GET http://localhost:4000/api/devices to show all devices
POST http://localhost:4000/api/devices to add new device
GET http://localhost:4000/api/devices/:id to show devices details
PUT http://localhost:4000/api/devices/:id to update a device
DELETE http://localhost:4000/api/devices/:id to remove a device

## Params for add new device
POST http://localhost:/api/devices
{
  "uid": "41313322127513225",
  "vendor": "Class B",
  "createdAt": "2021-12-01",
  "status": "online"
}
## Params for add new device
PUT http://localhost:4000/api/devices/:id
{
  "uid": "41313322127513225",
  "vendor": "Class B",
  "createdAt": "2021-12-01",
  "status": "offline"
}

# Request for gateways
GET http://localhost:4000/api/gateways to show all gateways
POST http://localhost:4000/api/gateways to add new gateway
GET http://localhost:4000/api/gateways/:id to show gateway details
PUT http://localhost:4000/api/gateways/:id to update a gateway
DELETE http://localhost:4000/api/gateways/:id to remove a gateway

## Params for add new gateway
POST http://localhost:4000/api/gateways
{
  "serialNumber": "41313322127513225",
  "name": "Class B",
  "ipv4": "127.0.0.1",
  "devices": []
}
### param devices can be mixed array
"devices":["61a8f814c7f922f0b1c6999f","61a8f814c7f922f0b1c699a0",{"uid":"3","vendor":"3","createdAt":"2021-12-02","status":"offline"},{"uid":"4","vendor":"4","createdAt":"2021-12-02","status":"online"}]
keys of devices can be an array of id devices to find device or array of object to create a new device or
merge both
## Params for edit gateway
PUT http://localhost:/api/gateways/:id
{
  "serialNumber": "41313322127513225",
  "name": "Class B",
  "ipv4": "127.0.0.1",
  "devices": []
}

# Install front
In the root gateways directory run yarn o npm install 

### `yarn start` can run concurrently api and front apps

Runs the web 
Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.


### yarn global add serve to install a local server to run optimize build generate by the cmd yarn build
serve -s build
run web in production mode