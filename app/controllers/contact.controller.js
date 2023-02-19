const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { client } = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name cannot be empty"));
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occured " + req.body.email));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await contactService.findByName(name);
    } else {
      documents = await contactService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An error occured "));
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found "));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Error retrieving contact id: ${req.params.id}`));
  }

  // res.send({ message: "findOne" });
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(404, "Data to update can not be empty"));
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    return res.send("contact was updated successfully");
  } catch (error) {
    return next(new ApiError(500, `Error updating contact id: ${req.params.id}`));
  }
  // res.send({ message: "update" });
};

exports.delete = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found "));
    }
    res.send({ message: "contact was deleted successfully" });
  } catch (error) {
    return next(new ApiError(500, `Error delete contact id: ${req.params.id}`));
  }

  // res.send({ message: "delete" });
};

exports.deleteAll = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const deleteCount = await contactService.deleteAll();
    return res.send({
      message: `delete all ${deleteCount} contacts.`,
    });
  } catch (error) {
    return next(new ApiError(500, `Error delete all contacts.`));
  }
  // res.send({ message: "deleteAll" });
};

exports.findAllFavorites = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const documents = await contactService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(new ApiError(500, `Error find all favorites.`));
  }
  // res.send({ message: "findAllFavorites" });
};
