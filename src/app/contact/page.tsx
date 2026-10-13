"use client"
import styles from './page.module.css';
import React, { useState } from 'react';

type Errors = {
  [key: string]: string;
}

export default function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const validate = () => {
    const validateErrs: Errors = {};
    const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._-]*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    if (!name) {
      validateErrs.name = "お名前を入力してください。";
    } else if (name.length > 30) {
      validateErrs.name = "お名前は30文字以内で入力してください。";
    }
    if (!email) {
      validateErrs.email = "メールアドレスを入力してください。";
    } else if (!emailRegex.test(email)) {
      validateErrs.email = "メールアドレスの形式が正しくありません。";
    }
    if (!message) {
      validateErrs.message = "お問い合わせを入力してください。";
    } else if (message.length > 500) {
      validateErrs.message = "お問い合わせは500文字以内で入力してください。";
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
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });
      if (!res.ok) {
          throw new Error('送信に失敗しました。時間をおいて再度お試しください。');
      }
      alert('送信しました！');
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch {
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSubmit(false);
    }
  };


  return (
    <>
      <h1 className="pagetitle">お問い合わせ</h1>
      <section className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.item}>
            <label htmlFor="name">お名前</label>
            <div>
              <input type="text"  name="name" id="name" placeholder="お名前を入力してください" value={name} onChange={e => setName(e.target.value)} disabled={isSubmit} />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
          </div>
          <div className={styles.item}>
            <label htmlFor="email">メールアドレス</label>
            <div>
              <input type="email" name="email" id="email" placeholder="メールアドレスを入力してください" value={email} onChange={e => setEmail(e.target.value)} disabled={isSubmit} />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
          </div>
          <div className={styles.item}>
            <label htmlFor="message">お問い合わせ内容</label>
            <div>
              <textarea  name="message" id="message" placeholder="お問い合わせ内容を入力してください" value={message} onChange={e => setMessage(e.target.value)} disabled={isSubmit} />
              {errors.message && <p className={styles.error}>{errors.message}</p>}
            </div>
          </div>
          <div className={styles.btn}>
            <button type="reset" className={styles.clear} onClick={() => {
              setName('');
              setEmail('');
              setMessage('');
              setErrors({});
            }} disabled={isSubmit}>
              クリア
            </button>
            <button type="submit" disabled={isSubmit}>
              送 信
            </button>
          </div>
        </form>
      </section>
    </>

  );
};