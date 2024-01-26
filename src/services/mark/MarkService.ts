import { BASE_API_URL } from '../../config/variables';
import { IMark } from '../../views/admin/marks/models/Mark';

class MarkService {
  static async POST(mark: IMark): Promise<Response | undefined> {
    const endpoint = `${BASE_API_URL}${'api/marks'}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(mark),
        headers: { 'Content-Type': 'application/json' }
      });

      return response;
    } catch (e) {
      console.error(e);
    }
  }
  static async PUT(mark: IMark): Promise<Response | undefined> {
    const endpoint = `${BASE_API_URL}${'api/marks/'}${mark.id}`;
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(mark),
        headers: { 'Content-Type': 'application/json' }
      });

      return response;
    } catch (e) {
      console.error(e);
    }
  }
}
export default MarkService;
