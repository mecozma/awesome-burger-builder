import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postatCode: ''
    }
  }

  render() {
    return (
      <div className={Classes.ContactData}>
        <h4>Enter your contact details</h4>
        <form>
          <input className={Classes.Input} type="text"  name="name" placeholder="Your name" />
          <input className={Classes.Input} type="email"  name="email" placeholder="your_name@email.com" />
          <input className={Classes.Input} type="text"  name="street" placeholder="Your street" />
          <input className={Classes.Input} type="text"  name="postal" placeholder="Postal code" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;