// credit:
//  https://www.taniarascia.com/crud-app-in-react-with-hooks/
//  https://taniarascia.github.io/primitive/css/main.css
//  https://blog.logrocket.com/complete-guide-building-smart-data-table-react/
//  https://www.w3schools.com/
//  https://www.smashingmagazine.com/2020/03/sortable-tables-react/

import React, { useState, useMemo, useEffect } from 'react';
import TeamTable from './tables/TeamTable';
// import AltTable from './tables/AltTable';
import AddMemberForm from './forms/AddMemberForm';
import EditMemberForm from './forms/EditMemberForm';

let new_id = 4;

const App = () => {

  const teamData = [
    { member_id: 1, name: 'Ally', address: '123 road', email: 'ally@example.com', phone: "5555551234", position: "Manager", department: "IT", start_date: "2015-01-01", end_date: null, employment_status: "current", shift: "day", manager: null, color: "#c70000"},
    { member_id: 2, name: 'Beth', address: '234 lane', email: 'beth@example.com', phone: "555-555-0000", position: "HR Specialist", department: "HR", start_date: "2016-06-20", end_date: "2019-01-01", employment_status: "former", shift: "morning", manager: "Cole", color: "#5fedd6"},
    { member_id: 3, name: 'Cole', address: '345 ave', email: 'cole@example.com', phone: "(555) 555-9999", position: "Manager", department: "HR", start_date: "2015-01-01", end_date: null, employment_status: "current", shift: "day", manager: null, color: "#e9d549"},
  ]

  const [team, setTeam] = useState(teamData);
  const [editing, setEditing] = useState(false);
  const initialFormState = { member_id: null, name: '', address: '', email: '', phone: '', position: '', department: '', start_date: '', end_date: '', employment_status: '', shift: '', manager: '', color: ''};
  const [currentMember, setCurrentMember] = useState(initialFormState);

  // todo: connect to mysql
  const addMember = member => {
    member.member_id = new_id;
    new_id++;

    console.log(member);

    setTeam([...team, member]);
  }

  const deleteMember = member_id => {
    setEditing(false);

    setTeam(team.filter(member => member.member_id !== member_id));
  }

  const editRow = member => {
    setEditing(true);
  
    setCurrentMember({ member_id: member.member_id, name: member.name, address: member.address, email: member.email, phone: member.phone, position: member.position, department: member.department, start_date: member.start_date, end_date: member.end_date, employment_status: member.employment_status, shift: member.shift, manager: member.manager, color: member.color });
  }

  const updateMember = (member_id, updatedMember) => {
    setEditing(false)
  
    setTeam(team.map(member => (member.member_id === member_id ? updatedMember : member)))
  }

  return (
    <div className="container">
      <h1>Org App</h1>
      <div className="flex-row">
        
        <div className="flex-large">
          <h2>View team</h2>
          <input id="search" type="text" placeholder="Search name.."></input>
          <TeamTable team={team} deleteMember={deleteMember} editRow={editRow} />
          {/* <AltTable columns={columns} data={teamData} /> */}
        </div>
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit team member</h2>
              <EditMemberForm
                setEditing={setEditing}
                currentMember={currentMember}
                updateMember={updateMember}
              />
            </div>
          ) : (
            <div>
              <h2>Add Team Member</h2>
              <AddMemberForm addMember={addMember} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App