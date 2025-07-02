import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type User = {
  id: string;
  name: string;
  email: string;
};

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const API_BASE = "https://us-central1-assignment-4ce55.cloudfunctions.net/api";

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/getUsers`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while saving user");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.warn("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address");
      return;
    }

    try {
      const endpoint = editId ? "updateUser" : "addUser";
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { id: editId, name, email } : { name, email }),
      });

      if (res.ok) {
        toast.success(`User ${editId ? "updated" : "added"} successfully`);
        setName("");
        setEmail("");
        setEditId(null);
        fetchUsers();
      } else {
        toast.error("Failed to save user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while saving user");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE}/deleteUser`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        toast.success("User deleted");
        fetchUsers();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while saving user");
    }
  };

  const handleEdit = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer position="top-right" autoClose={2500} />
      <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>

      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit User" : "Add User"}
        </h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-3 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update" : "Add"} User
        </button>
        {editId && (
          <button
            onClick={() => {
              setName("");
              setEmail("");
              setEditId(null);
            }}
            className="ml-3 text-sm text-gray-500 underline"
          >
            Cancel
          </button>
        )}
      </div>


      <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 border rounded bg-gray-50 shadow-sm flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
