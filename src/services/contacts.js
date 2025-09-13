import { ContactModel } from "../db/models/contact.js";


export async function getAllContacts() {
    const contacts = await ContactModel.find();
    return contacts;
};

export async function getContactById(contactId) {
    const contact = await ContactModel.findById(contactId);
    return contact;
};