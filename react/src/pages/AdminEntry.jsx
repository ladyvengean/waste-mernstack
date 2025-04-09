import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminEntry() {
    const navigate = useNavigate();
    //we have an input field to fill passeword.
    const [isAllowed, setIsAllowed] = useState(true);
    const [formData, setFormData] = useState({
        password:''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isAllowed){
            if(!formData.password){
                alert('Please fill password yaar');
                return;
            }
            navigate('/list')
        }


    }
    const toggle = () => {
        setIsAllowed(!isAllowed);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <p className="mb-4">
                    Please enter your password to continue further!
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Type your password"
                            className="bg-blue-200 border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-200 border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminEntry;



// need the handleChange function even with just one input field. Here's why:
// In React, form inputs are controlled components, which means their values are controlled by React state rather than the DOM. Without a handler function to update the state when the input changes, your input would appear to be "read-only" to the user.
// When someone types in your password field, these steps need to happen:

// User types a character
// An onChange event fires
// Your handleChange function updates the state with the new value
// React re-renders with the updated state value
// The input shows the character the user typed

// Without handleChange, step 3 wouldn't happen, so the state would never update, and the input value would remain empty no matter what the user types.
// Even though you have just one field, you're using the object structure:
// jsxconst [formData, setFormData] = useState({
//     password: ''
// });
// So you need the handleChange function to update this object properly.
// Your intuition about multiple fields is correct - the same pattern works well when you have multiple fields, which is why many developers use this approach consistently even for single-field forms.