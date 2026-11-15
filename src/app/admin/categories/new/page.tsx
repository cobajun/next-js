"use client"
import { CategoryForm } from '@/app/admin/categories/_components/CategoryForm';
import type { AdminCreateCategoryRequest } from '@/app/api/admin/categories/route';
import { useState } from 'react';

type Errors = {
  [key: string]: string;
}


export default function CreateCategory() {
  const [name, setName] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const validate = () => {
    const validateErrs: Errors = {};

    if (!name) {
      validateErrs.name = "カテゴリ名を入力してください。";
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
      const body: AdminCreateCategoryRequest = { name };
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
          throw new Error('作成に失敗しました。時間をおいて再度お試しください。');
      }
      alert('カテゴリを作成しました！');
      setName('');
      setErrors({});
    } catch {
      alert('作成に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmit(false);
    }
  };


  return (
    <>
      <h1 className="pagetitle">カテゴリ作成</h1>
      <CategoryForm
        name={name}
        setName={setName}
        isSubmit={isSubmit}
        errors={errors}
        handleSubmit={handleSubmit}
        submitLabel="作 成"
      />
    </>
  );
};