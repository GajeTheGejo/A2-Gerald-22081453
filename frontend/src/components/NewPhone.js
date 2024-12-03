import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [number, setNumber] = useState('');
    const [phoneType, setPhoneType] = useState('');

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                phoneType
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setNumber('');
        setPhoneType('');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            <select onChange={(e) => setPhoneType(e.target.value)} value={phoneType}>
                <option value="" disabled>Select a category</option>
                <option value="Category1">Phone Type 1</option>
                <option value="Category2">Phone Type 2</option>
                <option value="Category3">Phone Type 3</option>
                <option value="Category4">Phone Type 4</option>
            </select>
            <input type='text' placeholder='Phone Number' onChange={(e) => setNumber(e.target.value)} value={number}/>
            <button className='button green' type='submit'>Add {contact.name}'s Phone</button>
        </form>
	);
}

export default NewPhone;