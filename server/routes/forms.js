const express = require("express");
const router = express.Router();
const fs = require("fs");
const promises = fs.promises;
const path = require("path");

router.get("/all_ids_and_names", async (req, res) => {
  try {
    let ids = await promises.readdir("./survey_documents");
    const idsAndNames = await Promise.all(
      ids.map(async (id) => {
        let file = await promises.readFile(`./survey_documents/${id}`);
        file = JSON.parse(file);
        return { documentId: id, documentName: file.documentName };
      })
    );
    const idsAndNamesJSON = JSON.stringify(idsAndNames);
    console.log(idsAndNamesJSON);
    res.send(idsAndNamesJSON);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.data || { errorMsg: "server unexpected server error..." });
  }
});

router.get("/:form_id", (req, res) => {
  const name = req.params.form_id;
  fs.readFile(`./survey_documents/${name}`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let doc_data = JSON.parse(data);
      console.log(req.params.form_id, "--> was sent to the client");
      res.send({ form_data: doc_data });
    }
  });
});

router.post("/:form_id", async (req, res) => {
  const doc_data = req.body;
  const name = req.params.form_id;
  // console.log({ doc_data });
  // DOTO:
  const doc_name = doc_data.documentName;
  const doc_id = req.params.form_id;

  // const dirPath = path.join(__dirname, "../", `survey_documents`);
  const data = JSON.stringify(doc_data);

  try {
    let files = await promises.readdir("./survey_documents");

    let listOfTakenNames = [];
    let has_duplicate_document_name = false;

    for (const file of files) {
      let cur_doc_json = await promises.readFile(path.join(`./survey_documents/${file}`));
      let cur_doc_obj = JSON.parse(cur_doc_json);
      listOfTakenNames = [...listOfTakenNames, cur_doc_obj.documentName];
      if (
        cur_doc_obj.documentId.trim() !== doc_id.trim() &&
        cur_doc_obj.documentName.trim() === doc_name.trim()
      ) {
        has_duplicate_document_name = true;
      }
    }
    console.log({ has_duplicate_document_name, listOfTakenNames: listOfTakenNames });
    if (has_duplicate_document_name) {
      let error = new Error();
      error.data = {
        errorMsg: "Name of document already exists please choose another name.",
        listOfTakenNames,
        errorCode: 10,
      };

      throw error;
    } else {
      if(/\.json$/.test(name)) {
        await promises.writeFile(`./survey_documents/${name}`, data);
      } else {
        await promises.writeFile(`./survey_documents/${name}.json`, data);
      }
    }
    res.status(200).json("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.data || { errorMsg: "server unexpected server error..." });
  }
});

module.exports = router;
