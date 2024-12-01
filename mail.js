function sendMail() {
  const email = document.getElementById("email").value.trim();
  if (email) {
    const body = `Please confirm your registration for the email: ${email}`;
    window.location.href = `mailto:${email}?subject=Confirm Your Registration&body=${body}`;
  } else {
    alert("Please enter a valid email address before sending.");
  }
}
