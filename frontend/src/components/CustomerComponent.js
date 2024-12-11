import { useEffect, useState } from "react";

function CustomerComponent() {
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [editCustomerId, setEditCustomerId] = useState(null); // Track customer being edited
  const [editCustomerName, setEditCustomerName] = useState("");
  const [editCustomerEmail, setEditCustomerEmail] = useState("");

  // Function to create a new customer
  async function createNewCustomer(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: customerName,
          customer_email: customerEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      const data = await response.json();

      if (data.customer_id) {
        setCustomers([...customers, data]);
      }

      setCustomerName("");
      setCustomerEmail("");
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  }

  // Function to fetch customers data
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch("http://localhost/api/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }

    fetchCustomers();
  }, []);

// Function to edit a customer
async function editCustomer(e) {
    e.preventDefault();

    const response = await fetch(
      `http://localhost/api/customers/${editCustomerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: editCustomerName,
          customer_email: editCustomerEmail,
        }),
      }
    );

    const updatedCustomer = await response.json();

    // Update the customer list
    setCustomers(
      customers.map((customer) =>
        customer.customer_id === updatedCustomer.customer_id
          ? updatedCustomer
          : customer
      )
    );

    // Reset edit state
    setEditCustomerId(null);
    setEditCustomerName("");
    setEditCustomerEmail("");
  }
  
  // Function to delete a customer
  async function deleteCustomer(customerId) {
    try {
      const response = await fetch(`http://localhost/api/customers/${customerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      const updatedCustomers = customers.filter(
        (customer) => customer.customer_id !== customerId
      );
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  }

  // Function to toggle customer details
  function toggleExpanded(index) {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer, i) => ({
        ...customer,
        expanded: i === index ? !customer.expanded : customer.expanded,
      }))
    );
  }

  return (
    <div className="customer-component">
      {/* New Customer Form */}
      <form className="new-customer" onSubmit={createNewCustomer}>
        <input
          type="text"
          placeholder="Customer Name"
          onChange={(e) => setCustomerName(e.target.value)}
          value={customerName}
          required
        />
        <input
          type="email"
          placeholder="Customer Email Address"
          onChange={(e) => setCustomerEmail(e.target.value)}
          value={customerEmail}
          required
        />
        <button className="button green" type="submit">
          Create New Customer
        </button>
      </form>

      <hr />

      {/* Customer List */}
      <div className="customer-list">
        <h2>Customers</h2>

        {customers.map((customer, index) => (
          <div
            key={customer.customer_id}
            className="customer"
            onClick={() => toggleExpanded(index)}
          >
            <div className="title">
              <div className="customer-info">
                <p>
                  <strong>Customer Name:</strong> {customer.customer_name}
                </p>
                <p>
                  <strong>Email Address:</strong> {customer.customer_email}
                </p>
              </div>
            </div>

            {customer.expanded && (
              <div style={{ display: "block" }}>
                <button
                  className="button red"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCustomer(customer.customer_id);
                  }}
                >
                  Delete Customer
                </button>
                <button
                  className="button blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditCustomerId(customer.customer_id);
                    setEditCustomerName(customer.customer_name);
                    setEditCustomerEmail(customer.customer_email);
                  }}
                >
                  Edit Customer
                </button>
              </div>
            )}
            {/* Edit Form */}
        {editCustomerId && (
          <form className="edit-customer-form" onSubmit={editCustomer}>
            <h3>Edit Customer</h3>
            <input
              type="text"
              placeholder="Customer Name"
              onChange={(e) => setEditCustomerName(e.target.value)}
              value={editCustomerName}
              required
            />
            <input
              type="text"
              placeholder="Customer Email Address"
              onChange={(e) => setEditCustomerEmail(e.target.value)}
              value={editCustomerEmail}
              required
            />
            <button className="button green" type="submit">
              Save Changes
            </button>
            <button
              className="button gray"
              type="button"
              onClick={() => setEditCustomerId(null)}
            >
              Cancel
            </button>
          </form>
        )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerComponent;