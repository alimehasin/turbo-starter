import * as prompts from '@inquirer/prompts';
import { auth } from '@/utils/auth';

const name = await prompts.input({
  message: 'Name',
  required: true,
});

const email = await prompts.input({
  message: 'Email',
  required: true,
  validate: (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input) || 'Please enter a valid email address';
  },
});

const password = await prompts.password({
  message: 'Password',
});

await auth.api.createUser({
  body: { name, email, password, role: 'admin' },
});

console.log('Admin created successfully');
