import { useState } from 'react';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

 function CreatePost() {
  const nav = useNavigate();
  const [f, setF] = useState({ title:'', bodyHtml:'<p>Nội dung</p>', tags:'', price:'', sku:'', inStock:false });
  const [loading, setLoading] = useState(false);

  function onChange(e: any) {
    const { name, value, type, checked } = e.target;
    setF(s => ({ ...s, [name]: type === 'checkbox' ? checked : value }));
  }

  async function create() {
    setLoading(true);
    try {
      const tags = f.tags.split(',').map(t => t.trim()).filter(Boolean);
      const attributes = [
        f.price && { key: 'price', type: 'DECIMAL', value: String(Number(f.price).toFixed(2)) },
        f.sku   && { key: 'sku',   type: 'STRING',  value: f.sku },
        { key: 'inStock', type: 'BOOL', value: !!f.inStock }
      ].filter(Boolean);
      const r = await api.post('/create-post', { title: f.title, bodyHtml: f.bodyHtml, tags, attributes });
      nav(`/p/${r.data.id}`);
    } catch (e: any) {
      alert(e?.response?.data?.error ?? 'Lỗi tạo bài');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3>Tạo bài</h3>
      <input name="title" placeholder="Tiêu đề" value={f.title} onChange={onChange} />
      <textarea name="bodyHtml" rows={8} value={f.bodyHtml} onChange={onChange} />
      <input name="tags" placeholder="tags, cách nhau bằng dấu phẩy" value={f.tags} onChange={onChange} />
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
        <input name="price" placeholder="Giá (VD 199000)" value={f.price} onChange={onChange} />
        <input name="sku" placeholder="SKU" value={f.sku} onChange={onChange} />
        <label><input type="checkbox" name="inStock" checked={f.inStock} onChange={onChange} /> Còn hàng</label>
      </div>
      <button onClick={create} disabled={loading || !f.title || !f.bodyHtml}>Lưu</button>
    </div>
  );
}

export default CreatePost;