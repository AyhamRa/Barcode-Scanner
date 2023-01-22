# KDC-Scanner

KDC-Scanner is a web application for barcode scanning. It allows users to scan barcodes and retrieve information about the scanned products.

## Requirements

- Node.js version 19 or higher: [Download Node.js](https://nodejs.org/en/download/)

- Docker: [Download Docker](https://www.docker.com/products/docker-desktop/)

## Installation

- Open a new Terminal

- Navigate to the Database directory:

  ```bash
  cd Database
  ```

- Run the following command in terminal:

  ```bash
  docker-compose up
  ```

## Usage

Once the installation is complete, the application can be accessed at http://localhost:3000 for the backend and http://localhost:5173 for the frontend.

The application is using a MySQL database that can be accessed at http://localhost:8080 with user root and password example.
