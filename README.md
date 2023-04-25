# Nest.JS Shopping Mall Server

## Used Technologies

- Nest.js 8.0
- MySQL 8.0.22
- TypeORM 0.3.15

## Specification

- JWT Login System
- Feature(Product filtering&Sorting,Commenting)
- Tables(User, Product, Comment)
- DDD

## API Documentation

At [here](https://documenter.getpostman.com/view/13208857/2s93Y6rdro)

## DB Specification

| Entity name | Column name | Type         | Key | Null | Default              | Extra          |
| ----------- | ----------- | ------------ | --- | ---- | -------------------- | -------------- |
| User        | id          | int          | pk  | N    |                      | Auto increment |
|             | email       | varchar(255) |     | N    |                      |                |
|             | password    | varchar(255) |     | N    |                      |                |
| Product     | id          | int          | pk  | N    |                      | Auto increment |
|             | created_at  | timestamp(6) |     | N    | current_timestamp(6) |                |
|             | deleted_at  | datetime(6)  |     | Y    |                      |                |
|             | name        | varchar(255) |     | N    |                      |                |
|             | description | varchar(255) |     | N    |                      |                |
|             | brand       | varchar(255) |     | N    |                      |                |
|             | price       | int          |     | N    |                      |                |
|             | discount    | int          |     | N    | 0                    |                |
| Comment     | id          | int          | pk  | N    |                      | Auto increment |
|             | created_at  | timestamp(6) |     | N    |                      |                |
|             | comment     | varchar(255) |     | N    |                      |                |
|             | productId   | int          | mk  | Y    |                      |                |
|             | userId      | int          | mk  | Y    |                      |                |
