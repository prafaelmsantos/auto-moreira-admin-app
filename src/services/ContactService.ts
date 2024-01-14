import { BASE_API_URL } from '../config/variables';
import { IContact } from '../models/Contact';

class ContactService {
  static async postContact(contact: IContact): Promise<Response | undefined> {
    const endpoint = `${BASE_API_URL}${'api/contacts'}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' }
      });

      return response;
    } catch (e) {
      console.error(e);
    }
  }
}

export default ContactService;
