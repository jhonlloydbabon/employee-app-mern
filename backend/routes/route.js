const router = require('express').Router();
const db = require('../config/db');


router.get('/employee', async(req, res)=>{
    await db.query('SELECT * FROM employee',(err, result)=>{
        if(err) { return res.status(500).send({ error: err})};

        res.status(200)
        .send({
            message: result
        })
    })
})

router.post('/employee',async(req, res)=>{
    const {
        firstname,
        lastname,
        email
    } = req.body;

    await db.query(`INSERT INTO employee(firstname, lastname, email) VALUES(?,?,?)`,[firstname, lastname, email], (err)=>{
        if(err) { return res.status(500).send({error: err})}

        res.status(200).send({ message: "Created successfully!"})
    })
})

router.put('/employee/:id', async(req,res)=>{
    const {id} = req.params;
    const {
        firstname,
        lastname,
        email
    } = req.body;

    const queryStatement = `UPDATE employee SET firstname=?, lastname=?, email=? WHERE id=?`;
    await db.query(queryStatement,[firstname,lastname,email,id],(err,result)=>{
        if(err){ return res.status(500).send({ error:err})}
        res.status(200).send({ 
            result: result[0],
            message: "Updated Successfully!"
        })
    })
})

router.delete('/employee/:id', async(req,res)=>{
    const {id} = req.params;
    await db.query(`DELETE FROM employee WHERE id=?`,[id],(err,result)=>{
        if(err){ res.status(500).send({ error: err }) };

        res.status(200).send({
            message: "Deleted successfully!"
        })
    })
})

module.exports = router;