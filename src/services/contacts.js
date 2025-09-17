import { ContactModel } from "../db/models/contact.js";


export async function getAllContacts() {
    const contacts = await ContactModel.find();
    return contacts;
};

export async function getContactById(contactId) {
    const contact = await ContactModel.findById(contactId);
    return contact;
};

export async function createContact(payload) {
    const contact = await ContactModel.create(payload)
    return contact;
};

export async function updateContact(contactId, payload, options = {}) {
    const rawResult = await ContactModel.findOneAndUpdate(
        { _id: contactId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value)
        return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export async function deleteContact(contactId) {
    const contact = await ContactModel.findOneAndDelete({
        _id: contactId,
    });

    return contact;
};