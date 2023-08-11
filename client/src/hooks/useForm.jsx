import { useState } from "react";
export default function useForm(data) {
  const [form, setForm] = useState(data);
  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const clearForm = () => setForm(data);
  return [form, onInputChangeHandler, clearForm];
}
