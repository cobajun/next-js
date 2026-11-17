"use client"
import { PostForm } from '@/app/admin/posts/_components/PostForm';
import { useState } from 'react';
import type { AdminCreatePostRequest } from '@/app/api/admin/posts/route';

type Errors = {
  [key: string]: string;
}


export default function CreatePost() {
  const [title, setTitle] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

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
      const body: AdminCreatePostRequest = {
        title,
        thumbnailUrl,
        content,
        categories: selectedCategoryIds.map(id => ({ id })),
      };
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
          throw new Error('作成に失敗しました。時間をおいて再度お試しください。');
      }
      alert('記事を作成しました！');
      setTitle('');
      setThumbnailUrl('');
      setContent('');
      setSelectedCategoryIds([])
      setErrors({});
    } catch {
      alert('作成に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmit(false);
    }
  };


  return (
    <>
      <h1 className="pagetitle">新規記事作成</h1>
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
        submitLabel="作 成"
      />
    </>
  );
};