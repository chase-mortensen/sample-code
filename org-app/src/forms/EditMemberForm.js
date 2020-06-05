import React, { useState, useEffect } from 'react';

const EditMemberForm = props => {
  const [member, setMember] = useState(props.currentMember);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setMember({ ...member, [name]: value });
  }

  useEffect(() => {
    setMember(props.currentMember)
  }, [props])

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        props.updateMember(member.member_id, member);
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
        <option value="current">Current</option>
        <option value="former">Former</option>
      </select>
      <label>Shift</label>
      <select name="shift" onChange={handleInputChange}>
        <option value="day">Day</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="night">Night</option>
      </select>
      <label>Manager</label>
      <input type="text" name="manager" value={member.manager} onChange={handleInputChange} />
      <label>Favorite Color</label>
      <input type="color" name="color" value={member.color} onChange={handleInputChange} />
      <button>Update team member</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  );
}

export default EditMemberForm;