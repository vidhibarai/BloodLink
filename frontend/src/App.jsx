import bloodlinkLogo from"./assets/bloodlink-logo.png";
import React, { useState } from "react";
import "./App.css";

/* =========================
   INITIAL DONORS
========================= */

const initialDonors = [
  {
    id: 1,
    name: "Aarav Sharma",
    blood: "O+",
    city: "Nagpur",
    phone: "9876543210",
  },
  {
    id: 2,
    name: "Priya Patil",
    blood: "A+",
    city: "Nagpur",
    phone: "9876543211",
  },
  {
    id: 3,
    name: "Rahul Verma",
    blood: "B+",
    city: "Pune",
    phone: "9876543212",
  },
  {
    id: 4,
    name: "Sneha Joshi",
    blood: "O-",
    city: "Mumbai",
    phone: "9876543213",
  },
  {
    id: 5,
    name: "Aditya Singh",
    blood: "AB+",
    city: "Nagpur",
    phone: "9876543214",
  },
];

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

/* =========================
   NAVBAR
========================= */

function Navbar({ setPage }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setPage("home")}>
        <img src={bloodlinkLogo}alt="BloodLinkLogo"/>
      </div>

      <div className="nav-links">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("find")}>Find Donor</button>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("request")}>Request Blood</button>
        <button onClick={() => setPage("banks")}>Blood Banks</button>
        <button onClick={() => setPage("about")}>About</button>
      </div>

      <button
        className="login-btn"
        onClick={() => setPage("login")}
      >
        Login
      </button>
    </nav>
  );
}

/* =========================
   HOME
========================= */

function Home({ setPage }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="tagline">EVERY DROP COUNTS</p>

          <h1>
            Connecting Blood.
            <br />
            <span>Saving Lives.</span>
          </h1>

          <p className="hero-description">
            BloodLink connects blood donors and patients quickly,
            helping people find the right blood when they need it most.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => setPage("find")}
            >
              🔎 Find a Donor
            </button>

            <button
              className="secondary-btn"
              onClick={() => setPage("register")}
            >
              🩸 Become a Donor
            </button>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>How BloodLink Helps</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🔎</div>
            <h3>Find Donors</h3>
            <p>
              Search for compatible blood donors by blood group and city.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Nearby Donors</h3>
            <p>
              Find available donors in your required location.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚨</div>
            <h3>Emergency Requests</h3>
            <p>
              Submit urgent blood requests when blood is needed.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏥</div>
            <h3>Blood Banks</h3>
            <p>
              Find blood banks and hospitals near your location.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================
   FIND DONOR
========================= */

function FindDonor({ donors }) {
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchDonors = (event) => {
    event.preventDefault();

    const city = location.trim().toLowerCase();

    const filtered = donors.filter((donor) => {
      const bloodMatch = donor.blood === bloodGroup;

      const locationMatch =
        city === "" ||
        donor.city.toLowerCase().includes(city);

      return bloodMatch && locationMatch;
    });

    setResults(filtered);
    setSearched(true);
  };

  return (
    <main className="page">
      <div className="page-title">
        <h1>Find a Blood Donor</h1>
        <p>Search for a compatible donor near you.</p>
      </div>

      <form className="form-card" onSubmit={searchDonors}>
        <div className="input-group">
          <label>Blood Group</label>

          <select
            value={bloodGroup}
            onChange={(event) =>
              setBloodGroup(event.target.value)
            }
          >
            {bloodGroups.map((group) => (
              <option key={group}>{group}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Location</label>

          <input
            type="text"
            placeholder="Enter your city"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
          />
        </div>

        <button className="primary-btn full-width" type="submit">
          🔎 Search Donors
        </button>
      </form>

      {searched && (
        <section className="results-section">
          <h2>
            {results.length} Donor
            {results.length !== 1 ? "s" : ""} Found
          </h2>

          {results.length === 0 ? (
            <div className="no-results">
              <h3>No donors found</h3>
              <p>
                Try another blood group or location.
              </p>
            </div>
          ) : (
            <div className="donor-grid">
              {results.map((donor) => (
                <div className="donor-card" key={donor.id}>
                  <div className="blood-circle">
                    {donor.blood}
                  </div>

                  <div className="donor-info">
                    <h3>{donor.name}</h3>
                    <p>📍 {donor.city}</p>
                    <p>🩸 {donor.blood}</p>
                    <p>📞 {donor.phone}</p>
                  </div>

                  <a
                    className="direction-btn"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      donor.city
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📍 Get Directions
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

/* =========================
   REGISTER DONOR
========================= */

function Register({
  registration,
  setRegistration,
  registerDonor,
}) {
  return (
    <main className="page">
      <div className="page-title">
        <h1>Become a Blood Donor</h1>
        <p>
          Register yourself and help save a life.
        </p>
      </div>

      <form
        className="form-card"
        onSubmit={registerDonor}
      >
        <div className="input-group">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={registration.name}
            onChange={(event) =>
              setRegistration({
                ...registration,
                name: event.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <label>Blood Group</label>

          <select
            value={registration.blood}
            onChange={(event) =>
              setRegistration({
                ...registration,
                blood: event.target.value,
              })
            }
          >
            {bloodGroups.map((group) => (
              <option key={group}>{group}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>City</label>

          <input
            type="text"
            placeholder="Enter your city"
            value={registration.city}
            onChange={(event) =>
              setRegistration({
                ...registration,
                city: event.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <label>Phone Number</label>

          <input
            type="tel"
            placeholder="Enter your phone number"
            value={registration.phone}
            onChange={(event) =>
              setRegistration({
                ...registration,
                phone: event.target.value,
              })
            }
          />
        </div>

        <button
          className="primary-btn full-width"
          type="submit"
        >
          🩸 Register as Donor
        </button>
      </form>
    </main>
  );
}

/* =========================
   REQUEST BLOOD
========================= */

function RequestBlood() {
  const [request, setRequest] = useState({
    name: "",
    blood: "O+",
    city: "",
    hospital: "",
    phone: "",
    units: "1",
  });

  const submitRequest = (event) => {
    event.preventDefault();

    if (
      !request.name ||
      !request.city ||
      !request.hospital ||
      !request.phone
    ) {
      alert("Please fill all the details.");
      return;
    }

    alert(
      "Blood request submitted successfully! 🚨"
    );

    setRequest({
      name: "",
      blood: "O+",
      city: "",
      hospital: "",
      phone: "",
      units: "1",
    });
  };

  return (
    <main className="page">
      <div className="page-title">
        <h1>Request Blood</h1>
        <p>
          Submit a blood request during an emergency.
        </p>
      </div>

      <form
        className="form-card"
        onSubmit={submitRequest}
      >
        <div className="input-group">
          <label>Patient Name</label>

          <input
            type="text"
            value={request.name}
            placeholder="Enter patient name"
            onChange={(event) =>
              setRequest({
                ...request,
                name: event.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <label>Blood Group Required</label>

          <select
            value={request.blood}
            onChange={(event) =>
              setRequest({
                ...request,
                blood: event.target.value,
              })
            }
          >
            {bloodGroups.map((group) => (
              <option key={group}>{group}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>City</label>

          <input
            type="text"
            value={request.city}
            placeholder="Enter city"
            onChange={(event) =>
              setRequest({
                ...request,
                city: event.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <label>Hospital</label>

          <input
            type="text"
            value={request.hospital}
            placeholder="Enter hospital name"
            onChange={(event) =>
              setRequest({
                ...request,
                hospital: event.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <label>Contact Number</label>

          <input
            type="tel"
            value={request.phone}
            placeholder="Enter contact number"
            onChange={(event) =>
              setRequest({
                ...request,
                phone: event.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <label>Units Required</label>

          <input
            type="number"
            min="1"
            value={request.units}
            onChange={(event) =>
              setRequest({
                ...request,
                units: event.target.value,
              })
            }
          />
        </div>

        <button
          className="primary-btn full-width emergency-btn"
          type="submit"
        >
          🚨 Submit Blood Request
        </button>
      </form>
    </main>
  );
}

/* =========================
   BLOOD BANKS
========================= */

function BloodBanks() {
  const banks = [
    {
      name: "Government Medical College Blood Bank",
      city: "Nagpur",
      phone: "0712-1234567",
    },
    {
      name: "Red Cross Blood Bank",
      city: "Nagpur",
      phone: "0712-2345678",
    },
    {
      name: "Central Blood Bank",
      city: "Pune",
      phone: "020-3456789",
    },
    {
      name: "City Hospital Blood Bank",
      city: "Mumbai",
      phone: "022-4567890",
    },
  ];

  return (
    <main className="page">
      <div className="page-title">
        <h1>Blood Banks</h1>
        <p>Find blood banks and get directions.</p>
      </div>

      <div className="bank-grid">
        {banks.map((bank, index) => (
          <div className="bank-card" key={index}>
            <div className="bank-icon">🏥</div>

            <h3>{bank.name}</h3>

            <p>📍 {bank.city}</p>

            <p>📞 {bank.phone}</p>

            <a
              className="direction-btn"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                bank.name + " " + bank.city
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              📍 Get Directions
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}

/* =========================
   LOGIN
========================= */

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (event) => {
    event.preventDefault();

    if (!login.email || !login.password) {
      alert("Please enter email and password.");
      return;
    }

    alert("Login successful! 🔐");
  };

  return (
    <main className="page">
      <div className="page-title">
        <h1>Login</h1>
        <p>Login to your BloodLink account.</p>
      </div>

      <form
        className="form-card small-form"
        onSubmit={handleLogin}
      >
        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={login.email}
            onChange={(event) =>
              setLogin({
                ...login,
                email: event.target.value,
              })
            }
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={login.password}
            onChange={(event) =>
              setLogin({
                ...login,
                password: event.target.value,
              })
            }
          />
        </div>

        <button
          className="primary-btn full-width"
          type="submit"
        >
          🔐 Login
        </button>
      </form>
    </main>
  );
}

/* =========================
   ABOUT
========================= */

function About() {
  return (
    <main className="page">
      <div className="page-title">
        <h1>About BloodLink</h1>
        <p>Connecting donors with people who need blood.</p>
      </div>

      <div className="about-card">
        <h2>Our Mission 🩸</h2>

        <p>
          BloodLink is a blood donor management platform
          designed to make finding blood donors faster and
          easier.
        </p>

        <p>
          Users can search for compatible donors, register
          as donors, submit emergency blood requests and
          locate nearby blood banks.
        </p>

        <h2>Our Goal</h2>

        <p>
          To connect the right donor with the right person
          at the right time and help save lives.
        </p>
      </div>
    </main>
  );
}

/* =========================
   MAIN APP
========================= */

function App() {
  const [page, setPage] = useState("home");

  const [donors, setDonors] =
    useState(initialDonors);

  const [registration, setRegistration] =
    useState({
      name: "",
      blood: "O+",
      city: "",
      phone: "",
    });

  /* =========================
     REGISTER DONOR FUNCTION
  ========================= */

  const registerDonor = (event) => {
    event.preventDefault();

    if (
      !registration.name.trim() ||
      !registration.city.trim() ||
      !registration.phone.trim()
    ) {
      alert("Please fill all the details.");
      return;
    }

    const newDonor = {
      id: Date.now(),
      name: registration.name,
      blood: registration.blood,
      city: registration.city,
      phone: registration.phone,
    };

    setDonors((previousDonors) => [
      ...previousDonors,
      newDonor,
    ]);

    alert(
      "You have been successfully registered as a donor! 🩸"
    );

    setRegistration({
      name: "",
      blood: "O+",
      city: "",
      phone: "",
    });

    setPage("find");
  };

  /* =========================
     PAGE CONTENT
  ========================= */

  const getPage = () => {
    if (page === "home") {
      return <Home setPage={setPage} />;
    }

    if (page === "find") {
      return <FindDonor donors={donors} />;
    }

    if (page === "register") {
      return (
        <Register
          registration={registration}
          setRegistration={setRegistration}
          registerDonor={registerDonor}
        />
      );
    }

    if (page === "request") {
      return <RequestBlood />;
    }

    if (page === "banks") {
      return <BloodBanks />;
    }

    if (page === "login") {
      return <Login />;
    }

    if (page === "about") {
      return <About />;
    }

    return <Home setPage={setPage} />;
  };

  return (
    <div className="app">
      <Navbar setPage={setPage} />

      {getPage()}

      <footer>
        <p>
          © 2026 BloodLink | Every Drop Counts 🩸
        </p>
      </footer>
    </div>
  );
}

export default App;