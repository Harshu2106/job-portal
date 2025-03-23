export const testPostController = (req, res) => {
    const { name } = req.body
    try{
        res.status(200).send(`Your name is ${name}`);
    }catch(err){
        res.status(500).send(`Error: ${err}`);
    }
};    