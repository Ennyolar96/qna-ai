import express from "express";
import * as tf from "@tensorflow/tfjs-node";
import qna from "@tensorflow-models/qna";

const PORT = process.env.PORT || 3001;
const app = express();

// Eager execution to pre-load the model
tf.enableProdMode();
const model = await qna.load();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", async (req, res) => {
  const { question, paragraph } = req.body;
  // Finding the answers (model is already loaded)
  const answers = await model.findAnswers(question, paragraph);
  res.status(200).json({
    result: answers,
  });
});

app.listen(PORT, () => console.log("connected"));
