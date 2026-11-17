"use client"
import { useEffect, useState } from 'react';
import type { AdminPostShowResponse, AdminUpdatePostRequest } from '@/app/api/admin/posts/[id]/route';
import { useParams, useRouter } from 'next/navigation';
import { PostForm } from '../_components/PostForm';

type Errors = {
  [key: string]: string;
}

export default function ModifyPost() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`);
        if (!res.ok) {
          throw new Error('記事の取得に失敗しました。');
        }
        const { post }: AdminPostShowResponse = await res.json();
        setTitle(post.title);
        setThumbnailUrl(post.thumbnailUrl);
        setContent(post.content);
        setSelectedCategoryIds(post.postCategories.map(pc => pc.category.id));
      } catch {
        alert('記事の取得に失敗しました。時間をおいて再度お試しください。');
      }
    };
    getPost();
  }, [id]);

  const validate = () => {
    const validateErrs: Errors = {};

    if (!title) {
      validateErrs.title = "タイトルを入力してください。";
    } else if (title.length > 100) {
      validateErrs.title = "タイトルは100文字以内で入力してください。";
    }
    if (!thumbnailUrl) {
      validateErrs.thumbnailUrl = "サムネイルURLを入力してください。";
    }
    if (!content) {
      validateErrs.content = "内容を入力してください。";
    }
    if (selectedCategoryIds.length === 0) {
      validateErrs.selectedCategoryIds = "カテゴリを1つ以上選択してください。";
    }

    setErrors(validateErrs);
    return Object.keys(validateErrs).length === 0;
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();
    
    if (!isValid) return;
    
    setIsSubmit(true);
    try {
      const body: AdminUpdatePostRequest = {
        title,
        thumbnailUrl,
        content,
        categories: selectedCategoryIds.map(id => ({ id })),
      };
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
          throw new Error('更新に失敗しました。時間をおいて再度お試しください。');
      }
      alert('記事を更新しました！');
      setErrors({});
    } catch {
      alert('更新に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmit(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('本当に削除しますか？')) return;

    setIsSubmit(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
          throw new Error('削除に失敗しました。時間をおいて再度お試しください。');
      }
      alert('記事を削除しました！');
      router.push('/admin/posts');
    } catch {
      alert('削除に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmit(false);
    }
  };


  return (
    <>
      <h1 className="pagetitle">記事編集/削除</h1>
      <PostForm
        title={title}
        setTitle={setTitle}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        content={content}
        setContent={setContent}
        selectedCategoryIds={selectedCategoryIds}
        setSelectedCategoryIds={setSelectedCategoryIds}
        errors={errors}
        isSubmit={isSubmit}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        submitLabel="更 新"
      />
    </>
  );
}
