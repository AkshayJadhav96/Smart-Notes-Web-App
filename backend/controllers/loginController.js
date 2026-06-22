import jwt from "jsonwebtoken";
import pool from "../db/database.js";
import bcrypt from "bcrypt"
import dotenv from "dotenv"

// const USER = {
//     id: 1,
//     name: "Akshay",
//     email: "a@gmail.com",
//     password: "pass1234"
// };

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;

    // if (
    //     email !== USER.email ||
    //     password !== USER.password
    // ) {
    //     return res.status(401).json({
    //         message: "Invalid credentials"
    //     });
    // }

    const result = await pool.query(
        `select *
         from users
         where email = $1`,
        [email]
    )

    if(result.rowCount==0){
        return res.status(401).json({
            message: "Email doesn't exist"
        });
    }

    const user = result.rows[0];

    const passwordMatches =
        await bcrypt.compare(
            password,
            user.password
    );

    if(!passwordMatches){
        return res.status(401).json({
            message: "Password doesn't match"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        token: token
    });
};
