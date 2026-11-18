import { useState, useEffect } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ eid: "", ename: "", salary: "", age: "", city: "", state: "" });
  const [isEdit, setIsEdit] = useState(false);
  const API = "http://localhost:4040";

  const loadData = () => {
    fetch(`${API}/getEmpList`).then(r=>r.json()).then(setEmployees);
  };
  useEffect(()=>{loadData()},[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eid: form.eid ? parseInt(form.eid) : null,
      ename: form.ename,
      salary: parseInt(form.salary),
      age: parseInt(form.age),
      city: form.city,
      state: form.state
    };

    if(isEdit){
      await fetch(`${API}/updateEmp`, { method: "PUT", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload)});
      setIsEdit(false);
    } else {
      await fetch(`${API}/createEmp`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload)});
    }
    setForm({ eid:"", ename:"", salary:"", age:"", city:"", state:"" });
    loadData();
  };

  const handleDelete = async (eid) => {
    await fetch(`${API}/deleteEmp/${eid}`);
    loadData();
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setIsEdit(true);
    window.scrollTo(0,0);
  };

  return (
    <div style={{padding:"20px", background:"#0a0a0a", color:"white", minHeight:"100vh"}}>
      <h2 style={{textAlign:"center"}}>Employee79 - Add / Update / Delete</h2>

      <form onSubmit={handleSubmit} style={{background:"#1a1a1a", padding:"15px", display:"flex", gap:"8px", flexWrap:"wrap", justifyContent:"center", borderRadius:"10px"}}>
        <input placeholder="EID (for update)" value={form.eid} onChange={e=>setForm({...form, eid:e.target.value})} style={inp} />
        <input placeholder="Name" required value={form.ename} onChange={e=>setForm({...form, ename:e.target.value})} style={inp} />
        <input placeholder="Salary" required type="number" value={form.salary} onChange={e=>setForm({...form, salary:e.target.value})} style={inp} />
        <input placeholder="Age" required type="number" value={form.age} onChange={e=>setForm({...form, age:e.target.value})} style={inp} />
        <input placeholder="City" required value={form.city} onChange={e=>setForm({...form, city:e.target.value})} style={inp} />
        <input placeholder="State" required value={form.state} onChange={e=>setForm({...form, state:e.target.value})} style={inp} />
        <button type="submit" style={{background: isEdit?"#2196F3":"#4CAF50", color:"white", padding:"10px 20px", border:"none", borderRadius:"5px"}}>{isEdit ? "Update" : "Add"}</button>
        {isEdit && <button type="button" onClick={()=>{setIsEdit(false); setForm({eid:"", ename:"", salary:"", age:"", city:"", state:""})}} style={{background:"#555", color:"white", padding:"10px", border:"none", borderRadius:"5px"}}>Cancel</button>}
      </form>

      <table style={{width:"100%", marginTop:"20px", borderCollapse:"collapse", textAlign:"center"}}>
        <thead><tr style={{background:"#222"}}><th style={th}>EID</th><th style={th}>Name</th><th style={th}>Salary</th><th style={th}>Age</th><th style={th}>City</th><th style={th}>State</th><th style={th}>Action</th></tr></thead>
        <tbody>
          {employees.map(emp=>(
            <tr key={emp.eid} style={{borderBottom:"1px solid #333"}}>
              <td style={td}>{emp.eid}</td><td style={td}>{emp.ename}</td><td style={td}>{emp.salary}</td><td style={td}>{emp.age}</td><td style={td}>{emp.city}</td><td style={td}>{emp.state}</td>
              <td style={td}>
                <button onClick={()=>handleEdit(emp)} style={{background:"#2196F3", color:"white", border:"none", padding:"5px 10px", marginRight:"5px", borderRadius:"4px"}}>Edit</button>
                <button onClick={()=>handleDelete(emp.eid)} style={{background:"#ff3333", color:"white", border:"none", padding:"5px 10px", borderRadius:"4px"}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const inp = {padding:"8px", borderRadius:"5px", border:"1px solid #444", background:"#222", color:"white"};
const th = {padding:"10px", border:"1px solid #444"};
const td = {padding:"8px", border:"1px solid #444"};
export default App;