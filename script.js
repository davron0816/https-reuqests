const API_URL = `https://680f7a3867c5abddd1957aec.mockapi.io/name`;
const contactList = document.getElementById('contactList');

// Sahifa yuklanganda kontaktlarni yuklaydi
window.onload = fetchContacts;

async function fetchContacts() {
    const response = await fetch(API_URL);
    const contacts = await response.json();
    renderContacts(contacts);
}

function renderContacts(contacts) {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${contact.name} - ${contact.number}</span>
            <button onclick="editContact(${contact.id}, '${contact.name}', '${contact.number}')">✏️ Tahrirlash</button>
            <button onclick="deleteContact(${contact.id})">🗑 O‘chirish</button>
        `;
        contactList.appendChild(li);
    });
}

async function createContact() {
    const name = document.getElementById('name').value.trim();
    const number = document.getElementById('number').value.trim();

    if (name && number) {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, number })
        });
        document.getElementById('name').value = '';
        document.getElementById('number').value = '';
        fetchContacts();
    } else {
        alert('Iltimos, ism va raqam kiriting.');
    }
}

async function deleteContact(id) {
    if (confirm("Haqiqatan ham o‘chirmoqchimisiz?")) {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        fetchContacts();
    }
}

function editContact(id, oldName, oldNumber) {
    const newName = prompt("Yangi ism:", oldName);
    const newNumber = prompt("Yangi raqam:", oldNumber);

    if (newName && newNumber) {
        updateContact(id, newName, newNumber);
    }
}

async function updateContact(id, name, number) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, number })
    });
    fetchContacts();
}

document.getElementById('dark').addEventListener('click', () => {
    const currentColor = document.body.style.backgroundColor;
    if (currentColor === 'black') {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    } else {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    }
});
