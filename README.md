# Pokémon API

This is an API developed with NestJS to interact with the PokeAPI. It allows you to obtain information about Pokémon, including details and types translated into Spanish.

## Description

The API provides the following endpoints:

1. **GET /api/pokemon**: Retrieves a list of the first 100 Pokémon.
2. **GET /api/pokemon/:id**: Retrieves the details of a specific Pokémon by its ID.
3. **GET /api/pokemon/types/:id**: Retrieves a Pokémon by its ID and translates its types into Spanish.

### Libraries and Tools Used

- **NestJS**: A progressive framework for building efficient and scalable server-side applications in Node.js.
- **Axios**: A library for making HTTP requests.
- **Class-Validator**: Used to validate objects based on classes.
- **Class-Transformer**: Used to transform plain objects into class instances.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Dotenv**: For managing environment variables (if needed).

## Code Structure

The code structure follows a modular pattern, dividing functionalities into modules to facilitate scalability.

- **src/**
  - **pokemon/**
    - `dto/`: Contains the Data Transfer Objects (DTOs) that define the expected data structures.
    - `pokemon.controller.ts`: Controller that defines the API endpoints and their logic.
    - `pokemon.service.ts`: Service that contains business logic and interactions with the PokeAPI.
    - `pokemon.module.ts`: Module that encapsulates the controller and the service.

## Endpoints

### 1. Get the first 100 Pokémon

- **Method**: `GET`
- **URL**: `/api/pokemon`
- **Response**:

  ```json
  [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    ...
  ]
  ```

  ### 2. Get Pokémon details by ID

- **Method**: `GET`
- **URL**: `/api/pokemon/:id`
- **Response**:

```json
{
  "name": "bulbasaur",
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "grass",
        "url": "https://pokeapi.co/api/v2/type/12/"
      }
    },
    ...
  ]
}
```

### 3. Get Pokémon with types translated into Spanish

- **Method**: `GET`
- **URL**: `/api/pokemon/types/:id`
- **Response**:

```json
{
  "name": "bulbasaur",
  "types": [
    {
      "slot": 1,
      "type": {
        "name": "grass",
        "url": "https://pokeapi.co/api/v2/type/12/",
        "names": [
          {
            "language": {
              "name": "es",
              "url": "https://pokeapi.co/api/v2/language/2/"
            },
            "name": "planta"
          }
        ]
      }
    },
    ...
  ]
}

```

## How to Run the Application

### 1. Clone the repository

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Configure environment variables (if necessary)

Create a `.env` file in the root of the project and add the necessary configurations.

### 4. Run the application

```bash
npm run start
```

### 5. Access the API

Open your browser and go to <http://localhost:3000/api/pokemon> to test the endpoints.

## Best Practices Implemented

- **Modularization:** The application is divided into modules to facilitate scalability.
- **Use of DTOs:** Clear structures have been defined for the expected data.
- **Error Handling:** Exceptions are caught, and appropriate responses are returned.
- **Documentation:** Detailed comments in the code to improve readability.

### Notes

1. Make sure to update the repository and user details where applicable.
2. If you use additional tools or libraries, add them to the corresponding section.
3. Adjust the configuration and execution instructions as necessary for your specific project.
