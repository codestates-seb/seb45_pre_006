import { useState } from "react";

export default function useForm(initialData) {
  const [form, setForm] = useState(initialData);

  const onInputChangeHandler = (e, name, value) => {
    if (e) {
      const { name, value } = e.target;
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const clearForm = () => setForm(initialData);

  return [form, onInputChangeHandler, clearForm];
}
