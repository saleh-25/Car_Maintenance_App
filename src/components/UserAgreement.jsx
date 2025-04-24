
function UserAgreement({checked}){
  return(
  <>
  <div style={{
    width: '700px',
    height: '500px',
    padding: "30px",
    border: "3px solid", 
    textAlign: "center",
    justifySelf: "center"
  }} >
    <div className="p-6 max-w-3xl mx-auto text-sm leading-relaxed space-y-6">
      <h1 className="text-2xl font-bold">User Agreement</h1>

      <section>
        <h2 className="text-xl font-semibold">1. Introduction</h2>
        <p>
          Welcome to our service. By using this platform, you agree to the terms outlined in this agreement.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Account Requirements</h2>
        <p>
          You must be at least 18 years old to create an account. You are responsible for keeping your credentials secure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Usage Rules</h2>
        <ul className="list-disc pl-6">
          <li>Do not misuse the platform.</li>
          <li>Do not attempt to access restricted areas.</li>
          <li>Report any issues promptly.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">4. Termination</h2>
        <p>
          We may suspend or terminate your access if you violate these terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">5. Contact</h2>


      </section>
      <div>Please accept the user agreement to create an account</div>
        <input
          type="checkbox"
          checked={checked[0]}
          onChange={(e)=>{checked[1](e.target.checked);}}
        />
    </div>
  </div>
  </>
  )
}

export default UserAgreement;