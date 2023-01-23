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

