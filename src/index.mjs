import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


import Paid from "./models/paid.js";

const app = new express();

mongoose.connect("mongodb://localhost/Assignment", {
        useNewUrlParser: true,
        useCreateIndex: true
    })
  .then(() => console.log('DB Connected'))
  .catch(err => console.error('Something went wrong', err));

 app.use(bodyParser.json());

const port = 8000;

app.get("/", (req, res) => {
  res.status(200).send("here: Form For adding items");
});

app.post("/addItem", (req, res) => {
    const item = new Paid(req.body);
    item.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to create the item!"
                });
            }
            res.json({ data });
     });
});

app.post("/Items", (req, res) => {
    const s = req.body.streamId;
      Paid.find({streamId: s})
              .exec((err, items)  => {
                if(err)
                {
                  return res.status(400).json({
                      error: "Something went wrong!!"
                  });
                }
                return res.json({"items": items});
                });
});


app.listen(port, () => {
   console.log(`Welcome :  Server is running at ${port}`);
 });