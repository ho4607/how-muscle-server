import dotenv from "dotenv";
dotenv.config();

export const corsOptions = {
    origin: [
        /localhost:*/,
        /192.168.0.137:*/,
    ],
    credentials: true,
};

