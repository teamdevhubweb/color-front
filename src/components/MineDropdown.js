import React from 'react'
import {  Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdReorder, MdCardGiftcard, MdAccountBalanceWallet } from 'react-icons/md';
import { RiBankCardLine } from 'react-icons/ri';
import { FaRegAddressCard } from 'react-icons/fa';
import { SiSpringsecurity} from 'react-icons/si';
import { BiCommentDetail} from 'react-icons/bi';
import { FcAbout} from 'react-icons/fc';
import { MdPayment} from 'react-icons/md';
import {FaTicketAlt} from 'react-icons/fa';
import {AiFillSetting} from 'react-icons/ai';

function MineDropdown() {
  return (
    <>
         <div>
                <div>

                    <div style={{ marginTop: '15px' }}>
                        <Dropdown>
                        <Link to='/orders' style={{color:'black', textDecoration:'none'}}><Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                        <MdReorder/>  
                                Order
                            </Dropdown.Toggle></Link>
                        </Dropdown>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Dropdown>
                        <Link to='/promotion' style={{color:'black', textDecoration:'none'}}><Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                                
                        <MdCardGiftcard/> Promotion
                            </Dropdown.Toggle></Link>
                        </Dropdown>
                    </div>

                    <div style={{ marginTop: '15px' }} >
                        <Dropdown >
                            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                                
                            <MdAccountBalanceWallet/> Wallet
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="light" style={{ width: '98vw' }}>
                                <Dropdown.Item active>
                                   
                                    <Link to='/recharge' style={{color:'black', textDecoration:'none'}}> Recharge</Link>
                                </Dropdown.Item>
                                <Dropdown.Item > <Link to='/withdrawal' style={{color:'black', textDecoration:'none'}}>Withdrawal</Link></Dropdown.Item>
                                <Dropdown.Item > <Link to='/transactions' style={{color:'black', textDecoration:'none'}}>Transactions</Link></Dropdown.Item>
                                <Dropdown.Divider />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                            <Link to='/add/bank' style={{color:'black', textDecoration:'none'}}><RiBankCardLine/> Bank Card</Link>
                            </Dropdown.Toggle>
                        </Dropdown>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                            <Link to='/add/address' style={{color:'black', textDecoration:'none'}}><FaRegAddressCard/> Address</Link>
                            </Dropdown.Toggle>
                        </Dropdown>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                                
                            <SiSpringsecurity/> Account Security
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="light" style={{ width: '98vw' }}>
                                <Dropdown.Item active>
                                <Link to='/reset/password' style={{color:'black', textDecoration:'none'}}> Reset Password</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                                
                                <Link to='/ComplaintsSuggestions' style={{color:'black', textDecoration:'none'}}><BiCommentDetail/> Complaints & Suggestions</Link>
                            </Dropdown.Toggle>
                        </Dropdown>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                                
                            < FcAbout/> About
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="light" style={{ width: '98vw' }}>
                                <Dropdown.Item active>
                                <Link to='/about' style={{color:'black', textDecoration:'none'}}> About US</Link>
                                </Dropdown.Item>
                                <Dropdown.Item > <Link to='/terms/condition' style={{color:'black', textDecoration:'none'}}>Terms & Conditions </Link></Dropdown.Item>
                                <Dropdown.Item active>
                                <Link to='/privacy/policy' style={{color:'black', textDecoration:'none'}}>Privacy Policy</Link>
                                </Dropdown.Item>
                                <Dropdown.Item > <Link to='/RiskDisclosure' style={{color:'black', textDecoration:'none'}}>Risk Disclosure Agreement </Link></Dropdown.Item>

                           
                           
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                            <Link to='/payment' style={{color:'black', textDecoration:'none'}}><MdPayment/> Payment</Link>
                            </Dropdown.Toggle>
                        </Dropdown>
                    </div>

                    <div style={{ marginTop: '15px', marginBottom:'5rem' }}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                            <Link to='/user/ticket' style={{color:'black', textDecoration:'none'}}><FaTicketAlt/> Ticket</Link>
                            </Dropdown.Toggle>
                        </Dropdown>

                        <div style={{ marginTop: '15px', marginBottom:'5rem' }}>
                        <Dropdown>
                            <Dropdown.Toggle style={{ width: '98vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                            <Link to='/user/setting' style={{color:'black', textDecoration:'none'}}><AiFillSetting/> Settings</Link>
                            </Dropdown.Toggle>
                        </Dropdown>
                    </div>
                    </div>
                    
                  
                 
                </div>
            </div>
    </>
  )
}

export default MineDropdown