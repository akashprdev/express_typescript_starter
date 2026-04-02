interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
}

export const registerService = async ({ name, email, password }: RegisterInput) => {
  return {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: password.trim(),
  };
};
