const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000;
const notes =[]
let nextId = 1;
app.use(express.json())

app.get('/health',(req,res)=>{
    res.json({status:'ok'})


})
app.get('/notes', (req, res) => {
    res.json(notes);
});

app.post('/notes', (req, res) => {
    const {title,content} = req.body || {}
    if (!title || !content){
        return res.status(400).json({error:'title and content are required'})


    }
    const newNote = {
        id: nextId++,
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    notes.push(newNote);
    return res.status(201).json(newNote);
});

app.put('/notes/:id',(req,res)=>{
    const id = req.params.id
    const note = notes.find(n=> n.id ==id);
    if (!note){
        return res.status(404).json({error:"No such notes found"})
    }
    const {title, content}= req.body || {}
    if (!title && !content){
        return res.status.apply(400).json({error:'enter something please'})
    }
    if (title) note.title=title;
    if (content) note.content = content;
    note.updatedAt = new Date().toISOString();
    return res.json(note);

})

app.delete('/notes/:id', (req,res)=>{
    const id = req.params.id
    const index = notes.findIndex(n=> n.id ==id);
    if (notes==-1){
        return res.status(404).json({error:'Note not found'})
    }
    const [deleted]=notes.splice(index,1);
    return res.json({message:'Deleted',note: deleted})

})
app.use((req,res)=>{
    res.status(404).json({error:'Not Found'})

});

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).json({error:'Something wrong'})
})

app.listen(PORT,()=>{
    console.log("Listening")
})