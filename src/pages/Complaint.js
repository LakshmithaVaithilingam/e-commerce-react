import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const AdminComplaintContainer = styled.div`
  width: calc(100% - 200px);
  height: 100vh;
  padding: 20px;
  background-color: #fff;
`;

const AdminComplaintTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ComplaintCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ComplaintDetails = styled.div`
  margin-top: 10px;
`;

const ViewButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.hoverColor};
    color: #fff;
  }
`;

const EditStatusButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  background-color: #007bff;
  color: #fff;
  margin-left: 10px;
`;

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editStatus, setEditStatus] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userId}`);
      return response.data.user; // Assuming the user details are returned as 'user' key
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/reference/${productId}`);
      return response.data.reference; // Assuming the product details are returned as 'product' key
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/complaint');
      if (response.data.status === 200) {
        setComplaints(response.data.complaints);
      } else {
        console.error('No complaints found:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleView = async (complaint) => {
    const user = await fetchUserDetails(complaint.user_id);
    const product = await fetchProductDetails(complaint.reference_id);

    setSelectedComplaint({
      ...complaint,
      user,
      product,
    });

    setEditStatus(complaint.status);
  };

  const handleEditStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/complaint/${selectedComplaint.complaint_id}/edit`,
        { status: editStatus }
      );
      if (response.data.status === 200) {
        // Update the local state with the new status
        setSelectedComplaint({
          ...selectedComplaint,
          status: editStatus,
        });
        // Close the modal
        setSelectedComplaint(null);
      } else {
        console.error('Failed to update status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <AdminComplaintContainer>
      <AdminComplaintTitle>Admin Complaint Management</AdminComplaintTitle>
      {complaints.map((complaint) => (
        <ComplaintCard key={complaint.complaint_id}>
          <h2>Reference No: {complaint.reference_id}</h2>
          <p>Complaint Description: {complaint.description}</p>
          <p>Status: {complaint.status}</p>
          <ViewButton hoverColor="#555" onClick={() => handleView(complaint)}>
            View Details
          </ViewButton>
        </ComplaintCard>
      ))}

      {/* Modal-like Content */}
      {selectedComplaint && (
        <ComplaintDetails>
          <h2>Complaint Details</h2>
          <p>Reference No: {selectedComplaint.reference_id}</p>
          <p>Product Name: {selectedComplaint.product ? selectedComplaint.product.product_name : 'N/A'}</p>
          <p>User Name: {selectedComplaint.user ? selectedComplaint.user.name : 'N/A'}</p>
          <p>Phone Number: {selectedComplaint.user ? selectedComplaint.user.phone_no : 'N/A'}</p>
          <p>Email Address: {selectedComplaint.user ? selectedComplaint.user.email : 'N/A'}</p>
          <p>Complaint Description: {selectedComplaint.description}</p>
          <p>Status: {selectedComplaint.status}</p>
          <form onSubmit={handleSubmit(handleEditStatus)}>
            <label htmlFor="status">Edit Status:</label>
            <select
              id="status"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in_review">In Review</option>
              <option value="resolved">Resolved</option>
            </select>
            <EditStatusButton type="submit">Save</EditStatusButton>
          </form>
          <button onClick={() => setSelectedComplaint(null)}>Close</button>
        </ComplaintDetails>
      )}
    </AdminComplaintContainer>
  );
};

export default Complaint;
