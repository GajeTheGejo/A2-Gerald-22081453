import { useState, useEffect } from 'react';  // import useEffect
import PhoneList from './PhoneList.js';

function Contact(props) {
    const {contact, contacts, setContacts} = props;
    const [expanded, setExpanded] = useState(false);
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts/' + contact.id + '/phones')
            .then(response => response.json())
            .then(data => setPhones(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const expandStyle = {
        display: expanded ? 'block' : 'none'
    };

    async function doDelete(e) {
        e.stopPropagation();

        const response = await fetch('http://localhost/api/contacts/' + contact.id, {
            method: 'DELETE',
        });

        let newContacts = contacts.filter((c) => {
            return c.id !== contact.id;
        });

        setContacts(newContacts);
    }

    return (
        <div key={contact.id} className='contact' onClick={(e) => setExpanded(!expanded)}>
            <div className='title'>
            <h2 className="contact-title">Contact Summary</h2>
                <div className="contact-details">
                    <p><b>Name:</b> {contact.name}</p>
                    <p><b>Address:</b> {contact.address}</p>
                    <p className="contact-note">
                        Click the contact to <b>{expanded ? 'collapse' : 'expand'}</b> {contact.name}'s phone list
                    </p>
                </div>
                    <button className="button red delete-contact-button" onClick={doDelete}>
                        Delete Contact
                    </button>
            </div>
            <div style={expandStyle}>
                <hr />
                <PhoneList phones={phones} setPhones={setPhones} contact={contact} />
            </div>
        </div>
    );
}

export default Contact;
