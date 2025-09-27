import { ContactModel } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";


export async function getAllContacts({page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = "name", filter = {}}) {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    
    const contactsQuery = ContactModel.find();
    if (filter.contactType) {
        contactsQuery.where("contactType").in(filter.contactType);
    }
    if (filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite);
    }

    const [contactsCount, contacts] = await Promise.all([
        ContactModel.find().merge(contactsQuery).countDocuments(),
        contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec(),
    ]);

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
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