export const

cant_find_user = email => usernameOrEmail => (
  `I couldn't find any users with ${email ? `email` : `username`} ${usernameOrEmail}. 🙁`
),

incorrect_password = `That password doesn't seem to be correct. 🤨`,

email_taken = email => `We've met already! 😊 Go  ahead and log in with email ${email}.`,

username_taken = username => `Username ${username} is already taken. 😕`