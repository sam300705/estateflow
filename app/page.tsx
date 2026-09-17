"use client";

import { FormEvent, useMemo, useState } from "react";

type Stage = "New" | "Contacted" | "Qualified" | "Visit Scheduled" | "Negotiation" | "Won" | "Lost";
type Priority = "Hot" | "Warm" | "Cold";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  source: string;
  location: string;
  propertyType: string;
  budget: number;
  stage: Stage;
  priority: Priority;
  owner: string;
  followUp: string;
};

const seedLeads: Lead[] = [
  { id: 1, name: "Aarav Mehta", phone: "+91 98765 10001", email: "aarav@example.com", source: "99acres", location: "Noida Sector 150", propertyType: "3 BHK", budget: 13500000, stage: "Qualified", priority: "Hot", owner: "Sambhav", followUp: "Today, 4:00 PM" },
  { id: 2, name: "Riya Sharma", phone: "+91 98765 10002", email: "riya@example.com", source: "Referral", location: "Greater Noida West", propertyType: "2 BHK", budget: 7800000, stage: "Visit Scheduled", priority: "Hot", owner: "Sambhav", followUp: "Tomorrow, 11:30 AM" },
  { id: 3, name: "Kabir Singh", phone: "+91 98765 10003", email: "kabir@example.com", source: "Website", location: "Yamuna Expressway", propertyType: "Plot", budget: 5200000, stage: "Contacted", priority: "Warm", owner: "Neha", followUp: "Sep 19, 2:00 PM" },
  { id: 4, name: "Ananya Gupta", phone: "+91 98765 10004", email: "ananya@example.com", source: "MagicBricks", location: "Noida Sector 137", propertyType: "3 BHK", budget: 11500000, stage: "Negotiation", priority: "Hot", owner: "Sambhav", followUp: "Today, 6:30 PM" },
  { id: 5, name: "Dev Malhotra", phone: "+91 98765 10005", email: "dev@example.com", source: "Instagram", location: "Greater Noida", propertyType: "Villa", budget: 22000000, stage: "New", priority: "Warm", owner: "Neha", followUp: "Sep 20, 10:00 AM" },
];

const stages: Array<"All" | Stage> = ["All", "New", "Contacted", "Qualified", "Visit Scheduled", "Negotiation", "Won", "Lost"];

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export default function Home() {
  const [leads, setLeads] = useState(seedLeads);
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<(typeof stages)[number]>("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return leads.filter((lead) => {
      const matchesSearch = !q || [lead.name, lead.phone, lead.email, lead.location, lead.source].some((value) => value.toLowerCase().includes(q));
      return matchesSearch && (stage === "All" || lead.stage === stage);
    });
  }, [leads, search, stage]);

  const pipelineValue = leads.filter((lead) => lead.stage !== "Lost").reduce((sum, lead) => sum + lead.budget, 0);
  const hotLeads = leads.filter((lead) => lead.priority === "Hot" && lead.stage !== "Won" && lead.stage !== "Lost").length;
  const visits = leads.filter((lead) => lead.stage === "Visit Scheduled").length;
  const wins = leads.filter((lead) => lead.stage === "Won").length;

  function addLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const newLead: Lead = {
      id: Date.now(),
      name: String(form.get("name") || "New lead"),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      source: String(form.get("source") || "Website"),
      location: String(form.get("location") || "Noida"),
      propertyType: String(form.get("propertyType") || "Apartment"),
      budget: Number(form.get("budget") || 0),
      stage: "New",
      priority: String(form.get("priority") || "Warm") as Priority,
      owner: "Sambhav",
      followUp: "Not scheduled",
    };
    setLeads((current) => [newLead, ...current]);
    setShowForm(false);
    event.currentTarget.reset();
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div>
          <div className="brandMark">EF</div>
          <div className="brandText"><strong>EstateFlow</strong><span>Sales CRM</span></div>
        </div>
        <nav>
          <a className="active" href="#dashboard">Dashboard</a>
          <a href="#leads">Leads</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#followups">Follow-ups</a>
          <a href="#reports">Reports</a>
        </nav>
        <div className="sidebarFoot">Demo workspace<br/><strong>NorthStar Realty</strong></div>
      </aside>

      <section className="workspace" id="dashboard">
        <header className="topbar">
          <div><p className="eyebrow">REAL-ESTATE SALES OPERATIONS</p><h1>Good afternoon, Sambhav</h1><p>Keep every enquiry moving toward a site visit and closure.</p></div>
          <button className="primary" onClick={() => setShowForm(true)}>+ Add lead</button>
        </header>

        <div className="metrics">
          <article><span>Active leads</span><strong>{leads.filter((l) => !["Won", "Lost"].includes(l.stage)).length}</strong><small>Across all active stages</small></article>
          <article><span>Pipeline value</span><strong>{money.format(pipelineValue)}</strong><small>Budget value of open opportunities</small></article>
          <article><span>Hot leads</span><strong>{hotLeads}</strong><small>Need fast sales attention</small></article>
          <article><span>Visits scheduled</span><strong>{visits}</strong><small>{wins} closed-won in demo data</small></article>
        </div>

        <section className="panel" id="leads">
          <div className="panelHead">
            <div><p className="eyebrow">LEAD PIPELINE</p><h2>All enquiries</h2></div>
            <div className="filters">
              <input aria-label="Search leads" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, location..." />
              <select aria-label="Filter by stage" value={stage} onChange={(e) => setStage(e.target.value as (typeof stages)[number])}>{stages.map((item) => <option key={item}>{item}</option>)}</select>
            </div>
          </div>

          <div className="tableWrap">
            <table>
              <thead><tr><th>Lead</th><th>Requirement</th><th>Budget</th><th>Stage</th><th>Priority</th><th>Next follow-up</th></tr></thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id}>
                    <td><strong>{lead.name}</strong><span>{lead.phone}</span><span>{lead.source}</span></td>
                    <td><strong>{lead.propertyType}</strong><span>{lead.location}</span></td>
                    <td>{money.format(lead.budget)}</td>
                    <td><span className="pill stage">{lead.stage}</span></td>
                    <td><span className={`pill ${lead.priority.toLowerCase()}`}>{lead.priority}</span></td>
                    <td><strong>{lead.followUp}</strong><span>Owner: {lead.owner}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty">No leads match your filters.</div>}
          </div>
        </section>

        <section className="twoCol" id="pipeline">
          <article className="panel compact"><p className="eyebrow">PIPELINE SNAPSHOT</p><h2>Stage health</h2>{stages.slice(1, -1).map((item) => { const count = leads.filter((lead) => lead.stage === item).length; return <div className="progressRow" key={item}><span>{item}</span><div><i style={{ width: `${Math.min(100, count * 32)}%` }} /></div><strong>{count}</strong></div>; })}</article>
          <article className="panel compact" id="followups"><p className="eyebrow">TODAY</p><h2>Priority follow-ups</h2>{leads.filter((lead) => lead.priority === "Hot").slice(0, 4).map((lead) => <div className="follow" key={lead.id}><div><strong>{lead.name}</strong><span>{lead.location} · {lead.stage}</span></div><b>{lead.followUp}</b></div>)}</article>
        </section>
      </section>

      {showForm && <div className="modalBackdrop" role="presentation" onMouseDown={() => setShowForm(false)}><form className="modal" onSubmit={addLead} onMouseDown={(e) => e.stopPropagation()}><div className="modalHead"><div><p className="eyebrow">NEW ENQUIRY</p><h2>Add lead</h2></div><button type="button" className="iconBtn" onClick={() => setShowForm(false)}>×</button></div><label>Name<input name="name" required placeholder="Lead name" /></label><div className="formGrid"><label>Phone<input name="phone" required placeholder="+91..." /></label><label>Email<input name="email" type="email" placeholder="name@example.com" /></label><label>Source<input name="source" placeholder="Website / Referral" /></label><label>Location<input name="location" placeholder="Noida Sector 150" /></label><label>Property type<input name="propertyType" placeholder="3 BHK / Plot / Villa" /></label><label>Budget (INR)<input name="budget" type="number" min="0" placeholder="10000000" /></label><label>Priority<select name="priority" defaultValue="Warm"><option>Hot</option><option>Warm</option><option>Cold</option></select></label></div><button className="primary full" type="submit">Save lead</button></form></div>}
    </main>
  );
}
