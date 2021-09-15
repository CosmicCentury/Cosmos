const { receiptController } = require("../controller");

module.exports = {
  GET: [
    {
      name: "receipt",
      description: "",
      version: "1",
      roles: ["DELETE"],
      param: "id",
      controller: receiptController.getReceipt,
    },
    {
      name: "receipt",
      description: "",
      version: "2",
      roles: ["DELETE"],
      param: "id",
      controller: receiptController.getReceipt,
    },
    {
      name: "second",
      description: "",
      version: "1",
      param: "id3",
      roles: [],
      rootPath: "first",
      controller: receiptController.getReceipt,
    },
    {
      name: "first",
      description: "",
      version: "1",
      param: "id2",
      roles: [],
      rootPath: "receipt",
      controller: receiptController.getReceipt,
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};
