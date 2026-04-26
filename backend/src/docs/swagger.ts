import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Salary Management API",
      version: "1.0.0",
      description: "APIs for managing employees and salary insights",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    tags: [
      { name: "Employees", description: "Employee management APIs" },
      { name: "Salary", description: "Salary insights APIs" },
    ],
  },
  apis: ["src/**/*.ts"], 
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);