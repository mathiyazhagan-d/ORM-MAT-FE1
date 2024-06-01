import React, { useState } from 'react';
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { FaHome, FaBox, FaUsers, FaShoppingCart } from 'react-icons/fa';
import UserList from './UserList';
import OrderList from './OrderList';
import { Link } from 'react-router-dom';
import AdminHome from '../components/AdminHome';
import OtherProducts from '../components/OtherProducts/OtherProducts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  
  return (
    <>
      <div>
        <Row>
          <Col xs="2" sm="3" md="2" lg="2" className="sidebar pt-3">
            <Nav vertical>
              <NavItem className="m-2">
                <NavLink className={activeTab === 'home' ? 'active bg-white text-dark rounded-2 ' : 'text-dark'} onClick={() => { toggle('home'); }}>
                  <FaHome /> <span className='responsive'>Home</span>
                </NavLink>
              </NavItem>
              <NavItem className="m-2">
                <NavLink className={activeTab === 'orders' ? 'active bg-white text-dark rounded-2 ' : 'text-dark'} onClick={() => { toggle('orders'); }}>
                  <FaShoppingCart /> <span className='responsive'>Orders</span>
                </NavLink>
              </NavItem>
              <NavItem className="m-2">
                <NavLink className={activeTab === 'products' ? 'active bg-white text-dark rounded-2 ' : 'text-dark'} onClick={() => { toggle('products'); }}>
                  <FaBox /> <span className='responsive'>Products</span>
                </NavLink>
              </NavItem>
              <NavItem className="m-2">
                <NavLink className={activeTab === 'users' ? 'active bg-white text-dark rounded-2 ' : 'text-dark'} onClick={() => { toggle('users'); }}>
                  <FaUsers /> <span className='responsive'>Users</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xs="10" sm="9" md="10" lg="10" className="main-content my-4 px-4">
            {activeTab === 'home' && (
              <div>
                <AdminHome />
              </div>
            )}
            {activeTab === 'orders' && (
              <div>
                <OrderList />
              </div>
            )}
            {activeTab === 'products' && (
              <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          gap: '1rem',
          padding: '1rem',
          borderRadius: '0.75rem',
          backgroundColor: '#f8f9fa', // Light gray background for better visibility
        }}
      >
        <h2 style={{ margin: 0, padding: 0, fontWeight: 'bold', fontSize: '1.5rem' }}>Products</h2>
       
      </div>
      <Link
          to="/admin/productlist/page/:page"
          style={{
            color: 'black', // Set font color to black
            backgroundColor: '######', 
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          + Product Actions
        </Link>
      <OtherProducts />
    </>
            )}
            {activeTab === 'users' && (
              <div>
                <UserList />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
