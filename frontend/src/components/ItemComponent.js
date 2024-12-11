import { useEffect, useState } from "react";

function ItemComponent() {
  const [items, setItems] = useState([]);
  const [item_name, setItemName] = useState(""); // Retaining item_name
  const [price, setPrice] = useState(""); // Updated item_price to price
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // Fetch items data
  useEffect(() => {
    fetch("http://localhost/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Create a new item
  async function createItem(e) {
    e.preventDefault();

    if (!item_name || !price || isNaN(price)) {
      alert("Please enter a valid name and price!");
      return;
    }

    try {
      const response = await fetch("http://localhost/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_name, price: parseFloat(price) }),
      });

      if (response.ok) {
        const newItem = await response.json();
        setItems([...items, newItem]);
        setItemName("");
        setPrice("");
      } else {
        console.error("Failed to create item");
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  }

  // Edit an existing item
  async function editItem(e) {
    e.preventDefault();

    if (!editItemName || !editPrice || isNaN(editPrice)) {
      alert("Please enter a valid name and price!");
      return;
    }

    try {
      const response = await fetch(`http://localhost/api/items/${editItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: editItemName, // Using item_name
          price: parseFloat(editPrice), // Using price
        }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setItems(
          items.map((item) =>
            item.item_id === updatedItem.item_id ? updatedItem : item
          )
        );
        setEditItemId(null);
        setEditItemName("");
        setEditPrice("");
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  // Delete an item
  async function doDelete(item_id) {
    try {
      const response = await fetch(`http://localhost/api/items/${item_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setItems(items.filter((item) => item.item_id !== item_id));
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  // Toggle item details
  function toggleExpanded(index) {
    setItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        expanded: i === index ? !item.expanded : item.expanded,
      }))
    );
  }

  return (
    <div className="item-component">
      {/* New Item Form */}
      <form className="new-item-form" onSubmit={createItem}>
        <h3>Create New Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={item_name}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="button green">
          Create
        </button>
      </form>

      <hr />

      {/* Items List */}
      <h3>Item List</h3>
      <div className="items">
        {items.map((item) => (
          <div key={item.item_id} className="item">
            <div>
              <p>
                <strong>{item.item_name}</strong>: ${item.price}
              </p>
              <button
                className="button yellow"
                onClick={() => {
                  setEditItemId(item.item_id);
                  setEditItemName(item.item_name);
                  setEditPrice(item.price);
                }}
              >
                Edit
              </button>
              <button
                className="button red"
                onClick={() => doDelete(item.item_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editItemId && (
        <form className="edit-item-form" onSubmit={editItem}>
          <h3>Edit Item</h3>
          <input
            type="text"
            placeholder="Item Name"
            value={editItemName}
            onChange={(e) => setEditItemName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Price"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />
          <button type="submit" className="button green">
            Save
          </button>
          <button
            type="button"
            className="button gray"
            onClick={() => setEditItemId(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default ItemComponent;