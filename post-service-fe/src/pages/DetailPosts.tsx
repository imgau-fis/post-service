import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useParams } from 'react-router-dom';

function DetailPost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/posts/${id}`)
      .then(r => { setPost(r.data); setErr(null); })
      .catch(e => setErr(e?.response?.data?.error ?? 'Không tìm thấy'));
  }, [id]);

  if (err) return <p style={{color:'crimson'}}>{err}</p>;
  if (!post) return <p>Đang tải…</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="muted">{new Date(post.createdAt).toLocaleString('vi-VN')}</p>
      <div dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
      {post.attributes?.length ? (
        <p className="muted">Thuộc tính: {post.attributes.map((a:any)=>`${a.key}=${a.value}`).join(' • ')}</p>
      ) : null}
    </article>
  );
}

export default DetailPost;
