# Comp0016-Server

Server for login system for orthoPROMS

## Getting started
These instructions can be used to run the project locally for development and testing.

### Prerequisites

- Git
- Node.js (v12) and the npm package manager (v6)
- MongoDB - running on the default port (27017), though the port can be different if specified in the MONGO_URL environment variable. Download and installation guide is found here: https://docs.mongodb.com/manual/installation/ . You can check it is running by running (on Linux)
```shell script
$ mongo --port 27017
```
See the Mongo installation guide linked above for more details (especially regarding Windows/macOS).

### Installation

1. Install dependencies:
```shell script
$ npm install
```
2. Provide a `.env` file in the format of `.env.example` and populate relevant details for CDR, email, and accepted client URL.
3. Start the server:
```shell script
$ npm start
```
4. To ensure the server is running correctly open a browser and navigate to localhost:6060. Any issues should be reported in the log in the terminal.

## Author

- [Menghang Hao](https://github.com/haomenghang)

### Contributors

- [Charlie Cowan](https://github.com/charlie-g-cowan)
- [Haze Al Johary](https://github.com/ihaze111)

## License

Licensed under the MIT License. See LICENSE for more details.
