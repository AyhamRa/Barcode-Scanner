# KDC-Scanner

KDC-Scanner is a web application for barcode scanning. It allows users to scan barcodes and retrieve information about the scanned products.

## Requirements

- Node.js version 19 or higher: [Download Node.js](https://nodejs.org/en/download/)

- Docker: [Download Docker](https://www.docker.com/products/docker-desktop/)

## Installation

- Requires installation of npm

  ```bash
  npm install -g npm
  ```

## Run the Application

- Open a new Terminal

- Navigate to KDC-Scanner directory:

  ```bash
  cd KDC-Scanner
  ```

- Afterward navigate to the Database directory:

  ```bash
  cd Database
  ```

- Run the following command in terminal:

  ```bash
  docker-compose up
  ```

## Usage

Once the installation is complete, the application can be accessed at:

http://localhost:3000 for the backend and 

http://localhost:5173 for the frontend.

Use the following username and password to log in:

  ```bash
  Username: admin
  Password: admin
  ```

The application is using a MySQL database that can be accessed at http://localhost:8080 

  ```bash
  Username: root 
  Password: example
  ```
In order to test the secret phrase:

  ```bash
  Repeat Shadow Fire Voltage Memory Duty Relax Estimated Agency Author Campus Emotion
  ```
## License

Copyright 2023 Ayham Raee

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
