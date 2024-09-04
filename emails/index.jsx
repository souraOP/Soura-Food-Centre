import { Html, Button } from "@react-email/components"
import * as React from 'react';

export default function Email() {
    return (
        <Html>
            <table cellSpacing = "0" cellPadding="0" width = "100%" style={{fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4'}}>
                <tbody>
                    <tr>
                        <td align="center">
                            <table cellSpacing="0" cellPadding = "0" width="600" >
                                <tbody>
                                    {/* Header */}
                                    <tr>
                                        <td
                                            align="center"
                                            style={{
                                                padding: '20px',
                                                borderBottom: '1px solid #e0e0e0',
                                                backgroundColor: '#ffffff'
                                            }}
                                        >
                                            <h1 style={{margin: '0', color: '#ff5722'}}>Soura Food Centre</h1>
                                        </td>
                                    </tr>

                                    {/* Order Details */}
                                    <tr>
                                        <td align="center" style={{padding: '20px', backgroundColor: '#ffffff'}}>
                                            <h2 style={{margin: '0', fontSize: '24px', color: '#000000'}}>Order Confirmation</h2>
                                            <p style={{marginTop: '20px', fontSize: '16px'}}>
                                                Your order has been confirmed and will be delivered to you within few minutes.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" style={{padding: '20px', backgroundColor: '#ffffff'}}>
                                            <h3 style={{margin: '20px 0 10px', fontSize: '20px'}}>Thank your ordering with us !</h3>
                                            <p style={{fontSize: '16px'}}>
                                                Address: 43, Surya Sen Pally, Dum Dum Cantt, Kolkata, India<br />
                                                Contact: (+91) 890-244-3764
                                            </p>
                                        </td>
                                    </tr>

                                    {/* Footer */}
                                    <tr>
                                        <td align="center" style={{padding: '20px', borderTop: '1px solid #e0e0e0', backgroundColor: '#ffffff'}}>
                                            <p
                                                style={{margin: '0', fontSize: '14px'}}
                                            >
                                                Thank you for choosing Soura Food Centre!<br></br>
                                                For any inquiries, please contact us at support@sourafoodcentre
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Html>
    );
}