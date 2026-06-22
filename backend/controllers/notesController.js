import pool from "../db/database.js";

// let notes = [
//     {
//         id: 1,
//         title: "Learn React",
//         content: "Learn react for frontend with AI assistance"
//     },
//     {
//         id: 2,
//         title: "Learn Express",
//         content: "Learn express after react for backend, you can use chatgpt"
//     }
// ];

export const getNotes = async (req,res) => {

    // res.json(notes);
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page-1)*limit

    try {
        const noteResult = await pool.query(
            `select * from notes
             where user_id = $1
             order by id desc
             limit $2
             offset $3
            `,[
            req.user.id,
            limit,
            offset
            ]
        )

        const countResult = await pool.query(
                    `SELECT COUNT(*)
                    FROM notes
                    WHERE user_id = $1`,
                    [req.user.id]
                )
        
        res.json({
            notes: noteResult.rows,
            totalNotes: Number(countResult.rows[0].count),
            currentPage: page
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Database Error"
        })
    }
}

export const createNote = async (req,res) => {
    if (!req.body.title){
        return res.status(400).json({
            message: "Title is required"
        });
    }
    if (!req.body.content){
        return res.status(400).json({
            message: "Content is required"
        });
    }

    // const newNote = {
    //     id: notes.length+1,
    //     title: req.body.title,
    //     content: req.body.content
    // };

    // notes.push(newNote);

    // res.status(201).json(newNote);

    const result = await pool.query(
        `insert into notes
        (title,content,category,user_id)
        values ($1, $2, $3, $4)
        returning *
        `,[
            req.body.title,
            req.body.content,
            req.body.category,
            req.user.id
        ]
    );

    res.status(201).json(
        result.rows[0]
    );
}

export const deleteNote = async (req,res) => {

    const deleteId = Number(req.params.id);

    // notes = notes.filter((note) => note.id !==  deleteId)

    // res.status(204).send();

    const result = await pool.query(
        `delete from notes 
         where id = $1 
         and user_id = $2
         returning *`
        ,[
            deleteId,
            req.user.id
        ]
    )

    if(result.rows.length === 0){
        return res.status(404).json({
            message: "Note not found"
        })
    }

    res.status(204).send()
}

export const updateNote = async (req,res) => {
    const updateId = Number(req.params.id);

    // const noteIndex = notes.findIndex(
    //     note => note.id === updateId
    // )

    // if(noteIndex === -1){
    //     return res.status(404).json({
    //         message: "Message not found"
    //     })
    // }

    // notes[noteIndex] = {
    //     ...notes[noteIndex],
    //     title:req.body.title,
    //     content:req.body.content
    // };

    // res.status(200).json(notes[noteIndex]);

    const result = await pool.query(
        `update notes
         set title = $1,
           content = $2,
           category = $3
          where id = $4
          and user_id = $5
          returning *
        `,[
            req.body.title,
            req.body.content,   
            req.body.category,
            updateId,
            req.user.id
        ]
    )

    if(result.rows.length === 0){
        return res.status(404).json({
            message: "note not found"
        });
    }

    res.status(200).json(result.rows[0]);
}
