import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function userRegistrationEmail(username) {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [process.env.MY_EMAIL],
    subject: 'Sign Up Succesful',
    html: `<strong>You successfully signed up with username: ${username}</strong>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};