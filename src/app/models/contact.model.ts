export class Contact {
    constructor(public name: string, public number: string) { }
}

export const checkEquality = (c1: Contact, c2: Contact) => {
    return c1.name === c2.name && c1.number === c2.number;
}

export const getRandomContact = () => {
    // randomly select a name from the list 'Bob, Alice, Eve'
    const names = ['Bob', 'Alice', 'Eve', 'Mallory', 'Joel', 'Candace', 'Curtis', 'Jamie', 'Jared'];
    const name = names[Math.floor(Math.random() * names.length)];
    // generate random phone number of form +1-xxx-xxx-xxxx
    const number = '+1-555-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 10000);
    return new Contact(name, number);
}

export const getSelfContact = () => {
    return new Contact('Me', '+1-555-123-4567');
}