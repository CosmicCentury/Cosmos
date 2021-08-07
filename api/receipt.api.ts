const { receiptController } = require("../controller");

module.exports = {
  GET: [
    {
      name: "receipt",
      description: "",
      version: "1",
      permissions: ["DELETE"],
      param: "id",
      controller: receiptController.getReceipt,
    },
    {
      name: "receipt",
      description: "",
      version: "2",
      permissions: ["DELETE"],
      param: "id",
      controller: receiptController.getReceipt,
    },
    {
      name: "second",
      description: "",
      version: "1",
      param: "id3",
      permissions: [],
      rootPath: "first",
      controller: receiptController.getReceipt,
    },
    {
      name: "first",
      description: "",
      version: "1",
      param: "id2",
      permissions: [],
      rootPath: "receipt",
      controller: receiptController.getReceipt,
    },
  ],
  POST: [],
  PUT: [],
  PATCH: [],
  DELETE: [],
};
