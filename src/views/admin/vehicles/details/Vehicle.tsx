import { useParams } from 'react-router-dom';

export default function Vehicle() {
  const params = useParams();

  console.log(params); // 👉️ {userId: '4200'}

  return <h2>userId is 👉️ {params.id}</h2>;
}
