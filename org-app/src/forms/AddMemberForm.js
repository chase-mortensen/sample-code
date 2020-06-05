import React, { useState } from 'react';

const AddMemberForm = props => {
  const initialFormState = { member_id: null, name: '', address: '', email: '', phone: '', position: '', department: '', start_date: '', end_date: '', employment_status: '', shift: '', manager: '', color: ''};
  const [member, setMember] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setMember({ ...member, [name]: value });
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!member.name) return;
        // if (!member.name || !member.username) return // add more for required data

        props.addMember(member);
        setMember(initialFormState);
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={member.name} onChange={handleInputChange} />
      <label>Address</label>
      <input type="text" name="address" value={member.address} onChange={handleInputChange} />
      <label>Email</label>
      <input type="email" name="email" value={member.email} onChange={handleInputChange} />
      <label>Phone</label>
      <input type="text" name="phone" value={member.phone} onChange={handleInputChange} />
      <label>Position</label>
      <input type="text" name="position" value={member.position} onChange={handleInputChange} />
      <label>Department</label>
      <select name="department" onChange={handleInputChange}>
        <option value="none" selected disabled hidden /> 
        <option value="CS">Customer Service</option>
        <option value="HR">Human Resources</option>
        <option value="IT">IT</option>
      </select>
      <label>Start Date</label>
      <input type="date" name="start_date" value={member.start_date} onChange={handleInputChange} />
      <label>End Date</label>
      <input type="date" name="end_date" value={member.end_date} onChange={handleInputChange} />
      <label>Employment Status</label>
      <select name="employment_status" onChange={handleInputChange}>
        <option value="none" selected disabled hidden /> 
        <option value="current">Current</option>
        <option value="former">Former</option>
      </select>
      <label>Shift</label>
      <select name="shift" onChange={handleInputChange}>
        <option value="none" selected disabled hidden /> 
        <option value="day">Day</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="night">Night</option>
      </select>
      <label>Manager</label>
      <input type="text" name="manager" value={member.manager} onChange={handleInputChange} />
      <label>Favorite Color</label>
      <input type="color" name="color" width="100" height="100" value={member.color} onChange={handleInputChange} />
      <button>Add new user</button>
    </form>
  );
}

export default AddMemberForm