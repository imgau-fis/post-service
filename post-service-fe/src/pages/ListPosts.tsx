import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import type { Post } from '../utils/api';

function ListPost() {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts').then(r => setItems(r.data.items)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải…</p>;
  if (!items.length) return <p>Chưa có bài. <Link to="/create">Tạo bài</Link></p>;

  return (
    <>
      <h3>Danh sách</h3>
      <ul>
        {items.map(p => (
          <li key={p.id}>
            <Link to={`/p/${p.id}`}>{p.title}</Link>
            <small style={{marginLeft:8, color:'#666'}}>
              {new Date(p.createdAt).toLocaleString('vi-VN')}
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListPost;