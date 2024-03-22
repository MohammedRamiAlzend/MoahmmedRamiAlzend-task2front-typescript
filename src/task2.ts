class Contact {
    name: string;
    email: string;
    phone: string;
    group: string;

    constructor(name: string, email: string, phone: string,group: string = "") {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.group=group;
    }
}

class AddressBook {
    contacts: Contact[] = [];


    addContact(contact: Contact) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
            throw new Error("Invalid email format");
        }
        if (!contact.name || contact.name.trim() === "") {
            throw new Error("Name cannot be empty")
        }
        this.contacts.push(contact);
    }

    findContactByName(name: string): Contact | undefined {
        return this.contacts.find((contact) => contact.name === name);
    }
    filterByGroup(group: string): Contact[] {
        return this.contacts.filter((contact: Contact) => contact.group === group);
    }
    sortByName() {
        this.contacts.sort((a: Contact, b: Contact) => a.name.localeCompare(b.name));
    }
    searchContactS(searchTerm: string): Contact[] {
        const normalizedSerchterm: string = searchTerm.toLowerCase();
        return this.contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedSerchterm));
    }
    printContacts() {
        for (const contact of this.contacts) {
            console.log(`Name: ${contact.name}`);
            console.log(`Email: ${contact.email}`);
            console.log(`Phone: ${contact.phone}`);
            console.log("-----");
        }
    }
}

const addressBook: AddressBook = new AddressBook();
const contact1 = new Contact("John Doe", "johndoe@example.com", "123-456-7890");
const contact2 = new Contact("Alice Smith", "alice.smith@invalid", "456-789-0123"); // Invalid email
const contact3 = new Contact("", "valid@email.com", "789-012-3456"); // Empty name

addressBook.addContact(contact1);

try{
    addressBook.addContact(contact2);
    addressBook.addContact(contact3);
}
catch(error:any)
{
    console.error("Error adding contact:",error.Message)
}


console.log("Contacts:");
addressBook.printContacts();

const searchResults = addressBook.searchContactS("john");
console.log("Search results (name containing 'john'):");
searchResults.forEach((contact) => console.log(`  - ${contact.name}`));

export { }