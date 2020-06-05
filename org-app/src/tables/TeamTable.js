import React, { useState, useMemo } from 'react'

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const TeamTable = props => {
  const { team } = props;
  const { items, requestSort, sortConfig } = useSortableData(team);

  console.log(items, sortConfig);

  return (
    <table id="teamTable">
      <thead>
        <tr>
          <th className="customCursor" onClick={() => requestSort('name')}>Name</th>
          <th className="customCursor" onClick={() => requestSort('address')}>Address</th>
          <th className="customCursor" onClick={() => requestSort('email')}>Email</th>
          <th className="customCursor" onClick={() => requestSort('phone')}>Phone</th>
          <th className="customCursor" onClick={() => requestSort('position')}>Position</th>
          <th className="customCursor" onClick={() => requestSort('department')}>Department</th>
          <th className="customCursor" onClick={() => requestSort('start_date')}>Start Date</th>
          <th className="customCursor" onClick={() => requestSort('end_date')}>End Date</th>
          <th className="customCursor" onClick={() => requestSort('employment_status')}>Employment Status</th>
          <th className="customCursor" onClick={() => requestSort('shift')}>Shift</th>
          <th className="customCursor" onClick={() => requestSort('manager')}>Manager</th>
          <th className="customCursor" onClick={() => requestSort('color')}>Favorite Color</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="searchArea">
        {team.length > 0 ? (
          items.map(member => (
            <tr key={member.member_id}>
              <td>{member.name}</td>
              <td>{member.address}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.position}</td>
              <td>{member.department}</td>
              <td>{member.start_date}</td>
              <td>{member.end_date}</td>
              <td>{member.employment_status}</td>
              <td>{member.shift}</td>
              <td>{member.manager}</td>
              <td title={member.color}><svg width="30" height="30">
                <rect width="30" height="30" rx="5" ry="5"
                fill={member.color} />
              </svg></td>
              <td>
                <button 
                  className="button muted-button"
                  onClick={() => {
                    props.editRow(member)
                  }}
                >Edit</button>
                <button 
                  className="button alert-button" //custom css class
                  onClick={() => props.deleteMember(member.member_id)}
                >Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No team members</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TeamTable;