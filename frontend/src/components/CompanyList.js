import { useState } from "react";

function CompanyList({ companies, setCompanies, contact }) {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    // Create a new company
    async function createCompany(e) {
        e.stopPropagation(); // Prevent triggering parent onClick
        e.preventDefault();

        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                company_name: companyName,
                company_address: companyAddress,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setCompanies([...companies, data]);
            setCompanyName('');
            setCompanyAddress('');
        } else {
            console.error("Failed to create company");
        }
    }

    // Delete a company
    async function deleteCompany(companyId) {
        const response = await fetch(`http://localhost/api/contacts/${contact.id}/companies/${companyId}`, {
            method: "DELETE",
        });
    
        if (response.ok) {
            const updatedCompanies = companies.filter((c) => c.company_id !== companyId);
            setCompanies(updatedCompanies);
        } else {
            console.error("Failed to delete company. Response status:", response.status);
        }
    }    

    return (
        <div className="company-list">
            <h3>Companies</h3>
            <form onSubmit={createCompany} className="new-company">
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Prevent toggle collapse
                    required
                />
                <input
                    type="text"
                    placeholder="Company Address"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Prevent toggle collapse
                    required
                />
                <button
                    className="button green add-company-button"
                    type="submit"
                    onClick={(e) => e.stopPropagation()} // Prevent toggle collapse
                >
                    Add Company
                </button>
            </form>
            <ul>
                {companies.map((company) => (
                    <li key={company.id}>
                        <div className="company-item">
                            <p><b>{company.company_name}</b>: {company.company_address}</p>
                            <button className="button red" onClick={(e) => {
                                e.stopPropagation();
                                deleteCompany(company.company_id);
                                }}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CompanyList;