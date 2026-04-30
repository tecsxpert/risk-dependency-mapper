const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    // 👇 ADD IT HERE
    if (res.ok) {
      localStorage.setItem("token", data.token);   // save login
      window.location.href = "/dashboard";         // redirect
    } else {
      alert("Login failed");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Server error");
  }
};