import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import config from "./config/config.js"
import nodemailer from "nodemailer"
import winston from "winston";
const SECRET_KEY_JWT = config.secret_jwt

//ruta 
export const __dirname = dirname(fileURLToPath(import.meta.url));

//hasheo de contraseña con bcrypt
export const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(data, salt);
  };
  
export const compareData = async (data, hashedData) => {
  return bcrypt.compare(data, hashedData);
};

//generador de token con jwt
export const generateToken = (user) => {
  const token = jwt.sign(user, config.secret_jwt, { expiresIn: 300 });
  logger.information("token", token);
  return token;
};

//generador de productos con facker
export function generateMockProducts(quantity) {
  const products = [];

  for (let i = 0; i < quantity; i++) {
      const product = {
          
          status:faker.datatype.boolean(2),
          code: faker.string.alphanumeric(),
          stock: faker.number.int(100),
          category:faker.commerce.department(),
          title: faker.commerce.productName(),
          price: faker.commerce.price(),
          description: faker.lorem.sentence(),

      };
      products.push(product);
  }

  return products;
}


//loggers con winston

const customLevels = {
  levels: {
    fatal: 0,
    error:1,
    warning: 2,
    information: 3,
    http:4,
    debug:5,
  },
  colors: {
    fatal: "black",
    error:"red",
    warning: "yellow",
    information: "green",
    http:"blue",
    debug:"gray",
  },
};

export let logger;

if (config.environment === "production") {
  logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: "information",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevels.colors }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        level: "error",
        filename:"errors.log"
      })
    ],
  });
} else {
  logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevels.colors }),
          winston.format.simple()
        ),
      }),

    ],
  });
}
