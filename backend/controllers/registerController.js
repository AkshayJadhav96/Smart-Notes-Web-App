import pool from "../db/database.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const {name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    // console.log(name,email,password);
    const response = await pool.query(
        `select *
         from users
         where email = $1`,
        [email]
    )

    if(response.rowCount>0){
        return res.status(401).json({
            message: "Email already exists"
        });
    }

    const result = await pool.query(
        `insert into users
         (name,email,password)
         values ($1,$2,$3)
         returning *
         `,[
            name,
            email,
            hashedPassword
         ]
    )

    res.status(201).json(result.rows[0]);
};
